import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as FromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = false;
  subs = new Subscription();
  constructor(private dsService: DataStorageService,
              private authService: AuthService,
              private store: Store<FromApp.AppState>) { }

  ngOnInit() {
    this.subs = this.store.select('auth').pipe(
      map((appState) => {
        if(appState) { 
          return appState.user;
        }})
      ).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  sendToDataStore() {
    this.dsService.storeRecipes();
  }

  fetchFromStore() {
    this.dsService.fetchRecipe().subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
