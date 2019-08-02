import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as AuthActions from '../store/auth.actions';

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
                    const expiryDate = new Date( new Date().getTime() + +responseData.expiresIn * 1000 )
                   return new AuthActions.Login({
                       email: responseData.email, 
                       id: responseData.localId, 
                       token: responseData.idToken, 
                       expiryDate: expiryDate});
                }),
                catchError((error) => {
                return of();
            }));
        })
    );


    constructor(private actions$: Actions, private http: HttpClient) { }
}