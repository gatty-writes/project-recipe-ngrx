import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

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
  user$ = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6hYmhVfzjNto59wceDbAYy7hA5SzyJD0', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resp => {
       this.handleAuthenicatedUser(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
    }))
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6hYmhVfzjNto59wceDbAYy7hA5SzyJD0', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resp => {
      this.handleAuthenicatedUser(resp.email, resp.localId, resp.idToken, +resp.expiresIn)
   }));
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
        this.user$.next(user);
  }
}
