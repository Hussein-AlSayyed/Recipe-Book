import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }

    user = new BehaviorSubject<User>(null);
    private autoLogoutTimer: any;

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
                {
                    params: new HttpParams().set('key', environment.firebaseAPIKey),
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(
                    (responseData) => {
                        this.handleAuthentication(
                            responseData.email,
                            responseData.localId,
                            responseData.idToken,
                            +responseData.expiresIn
                        );
                    }
                )
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
                {
                    params: new HttpParams().set('key', environment.firebaseAPIKey),
                }
            ).pipe(
                catchError(this.handleError),
                tap(
                    (responseData) => {
                        this.handleAuthentication(
                            responseData.email,
                            responseData.localId,
                            responseData.idToken,
                            +responseData.expiresIn
                        );
                    }
                )
            );
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        } else {
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate),
            );
            if (loadedUser.token) {
                this.user.next(loadedUser);
                const logoutAfter: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(logoutAfter)
            }
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
        this.autoLogoutTimer = null;
    }

    autoLogout(expirationTime: number) {
        this.autoLogoutTimer = setTimeout(() => {
            this.logout();
        }, expirationTime);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occurred!'
        if (!errorResponse.error || !errorResponse.error.error!) {
            return throwError(() => errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(() => errorMessage);
    }

    private handleAuthentication(email: string, UserId: string, idToken: string, expireIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expireIn * 1000));
        const user = new User(email, UserId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expireIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

}