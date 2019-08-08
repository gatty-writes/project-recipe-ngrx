import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from '../store/auth.actions';
import { User } from '../user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupData: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
                email: signupData.payload.email,
                password: signupData.payload.password,
                returnSecureToken: true
            }).pipe(
                map((responseData) => {
                    return this.handleSuccess(responseData);
                }),
                catchError((errorResponse) => {
                  return this.handleErrors(errorResponse);
                }));
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map((responseData) => {
                    return this.handleSuccess(responseData);
                }),
                catchError((errorResponse) => {
                    return this.handleErrors(errorResponse);
                }));
        })
    );

    @Effect({ dispatch: false })
    authReidrect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    private handleSuccess(responseData: AuthResponseData) {
        const expiryDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expiryDate); 
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.AuthenticateSuccess({
            email: responseData.email,
            id: responseData.localId,
            token: responseData.idToken,
            expiryDate: expiryDate
        });
    }

    private handleErrors(errorResponse: HttpErrorResponse) {
        let error = "Unknown error occured";
        if (!errorResponse.error && !errorResponse.error.error.message) {
            return of(new AuthActions.AuthenticateFail(error));
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
        return of(new AuthActions.AuthenticateFail(error));
    }

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router) { }
}