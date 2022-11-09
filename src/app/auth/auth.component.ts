import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  @ViewChild(PlaceholderDirective, { static: false }) placeholder: PlaceholderDirective;
  closeSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {

    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    this.errorMessage = null;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe({
      next: responseData => {
        //this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
        this.showErrorAlert();
      }
    });

    authForm.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert() {
    const viewComponentRef = this.placeholder.viewContainerRef;
    viewComponentRef.clear();
    const componentRef = viewComponentRef.createComponent(AlertComponent);

    componentRef.instance.message = this.errorMessage;
    this.closeSubs = componentRef.instance.close.subscribe(
      () => {
        this.closeSubs.unsubscribe();
        viewComponentRef.clear();
      }
    );


  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
  }

}
