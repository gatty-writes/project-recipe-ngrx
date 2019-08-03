import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from '../store/auth.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

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
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map((responseData) => {
                    const expiryDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
                    return new AuthActions.Login({
                        email: responseData.email,
                        id: responseData.localId,
                        token: responseData.idToken,
                        expiryDate: expiryDate
                    });
                }),
                catchError((errorResponse) => {
                    let error = "Unknown error occured";
                    if (!errorResponse.error && !errorResponse.error.error.message) {
                        return of(new AuthActions.LoginFail(error));
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
                    return of(new AuthActions.LoginFail(error));
                }));
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );


    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router) { }
}