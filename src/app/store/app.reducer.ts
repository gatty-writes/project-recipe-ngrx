import { ActionReducerMap } from '@ngrx/store';

import * as FromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as FromAuth from '../auth/store/auth.reducer';
import * as FromRecipe from '../recipes/store/recipe.reducer';

export interface AppState {
    shoppingList: FromShoppingList.State;
    auth: FromAuth.State;
    recipes: FromRecipe.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: FromShoppingList.ShoppingListReducer,
    auth: FromAuth.AuthReducer,
    recipes: FromRecipe.RecipeReducer
}