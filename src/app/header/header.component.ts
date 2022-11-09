import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  private userSubs: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
      }
    );
  }
  
  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }
  
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  
}
