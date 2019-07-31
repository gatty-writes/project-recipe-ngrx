import { Ingrediant } from '../../shared/ingrediant.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {  
    ingrediants: [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomattoes', 10)
    ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIANT:
            return { ...state, ingrediants: [ ...state.ingrediants, action.payload] };
        case ShoppingListActions.ADD_INGREDIANTS:
            return { ...state, ingrediants: [ ...state.ingrediants, ...action.payload] };
        default:
            return state;
    }
}