import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: { email: string, id: string, token: string, expiryDate: Date }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor() {}
}

export type AuthActions = Login | Logout; 
