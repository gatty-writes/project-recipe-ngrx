import { Ingrediant } from '../../shared/ingrediant.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingrediants: Ingrediant[],
    editedIngrediant: Ingrediant,
    editedIngrediantIndex: number
}

const initialState: State = {  
    ingrediants: [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomattoes', 10)
    ],
    editedIngrediant: null,
    editedIngrediantIndex: -1
}

export function ShoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIANT:
            return { ...state, ingrediants: [ ...state.ingrediants, action.payload] };
        case ShoppingListActions.ADD_INGREDIANTS:
            return { ...state, ingrediants: [ ...state.ingrediants, ...action.payload] };
        case ShoppingListActions.DELETE_INGREDIANT:
            return {
                ...state,
                ingrediants: state.ingrediants.filter((ig, index) => {
                    return index !== action.payload
                })
            };
        case ShoppingListActions.UPDATE_INGREDIANT:
            const ingrediant = state.ingrediants[action.payload.index];
            const updatedIngrediant = {
                ...ingrediant, ...action.payload.ingrediant
            }
            const currentIngrediants = [...state.ingrediants];
            currentIngrediants[action.payload.index] = updatedIngrediant;
            return {
                ...state, ingrediants: currentIngrediants
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngrediantIndex: action.payload,
                editedIngrediant: { ...state.ingrediants[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngrediantIndex: -1,
                editedIngrediant: null
            };

        default:
            return state;
    }
}
