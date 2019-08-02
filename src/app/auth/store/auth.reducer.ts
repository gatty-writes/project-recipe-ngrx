import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';
export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}
export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expiryDate),
                authError: null,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state, user: null
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                loading: false
            }

        default:
            return state;
    }
}