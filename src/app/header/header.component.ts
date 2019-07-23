import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  subs = new Subscription();
  constructor(private dsService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subs = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    })
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
}
