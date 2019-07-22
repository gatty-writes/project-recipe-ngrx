import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6hYmhVfzjNto59wceDbAYy7hA5SzyJD0', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        let error = "Unknown error occured";
        if(!errorResponse.error && !errorResponse.error.error.message) {
          return throwError(error);
        }

        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
              error = 'Email is already exists';
        }
        return throwError(error);
      })
    ); 
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6hYmhVfzjNto59wceDbAYy7hA5SzyJD0', {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}
