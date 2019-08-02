import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';
export interface State {
    user: User
}

const initialState: State = {
    user: null
}
export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
   switch (action.type) {
       case AuthActions.LOGIN:
           return {
               ...state,
               user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expiryDate)
           }
        case AuthActions.LOGOUT:
            return {
                ...state, user: null
            }
       default:
           break;
   }
}