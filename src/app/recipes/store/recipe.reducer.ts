import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}
export function RecipeReducer(state = initialState, action: RecipeActions.RecipeAction) {


    switch (action.type) {
        case RecipeActions.SET_RECIPE:
            return {
                ...state.recipes,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}