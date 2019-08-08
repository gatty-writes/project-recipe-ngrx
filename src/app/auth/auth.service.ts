import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import * as FromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user$ = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;
  constructor(private http: HttpClient,
    private router: Router,
    private store: Store<FromApp.AppState>) { }

  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(catchError(this.handleError), tap(resp => {
  //      this.handleAuthenicatedUser(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
  //   }))
  // }

  // signIn(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(catchError(this.handleError), tap(resp => {
  //     this.handleAuthenicatedUser(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
  //  }));
  // }

  logout() {
    // this.user$.next(null);
    // this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    if(this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    // this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: { email: string, 
                      id: string, 
                      _token: string, 
                      _tokenExpirationDate: string
                    } = JSON.parse(localStorage.getItem('userData'));
    
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
      // this.user$.next(loadedUser);
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        id: loadedUser.id,
        token: loadedUser.token,
        expiryDate: new Date(userData._tokenExpirationDate)
      }));
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    this.autoLogoutTimer = null;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let error = "Unknown error occured";
    if(!errorResponse.error && !errorResponse.error.error.message) {
      return throwError(error);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'Email is already exists';
        break;
      case 'INVALID_PASSWORD':
        error = 'Password is incorrect'
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'Email not found'
        break;
    }
    return throwError(error);
  }

  private handleAuthenicatedUser(email: string, localId: string, token: string, expiresIn: number) {
    const expiryDate = new Date( new Date().getTime() + expiresIn * 1000 )
        const user = new User(
          email, 
          localId, 
          token, 
          expiryDate
        );
        // this.user$.next(user);
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
          email: email,
          id: localId,
          token: token,
          expiryDate: expiryDate
        }));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
  }
}
