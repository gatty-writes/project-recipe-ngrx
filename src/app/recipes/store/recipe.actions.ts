import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[Recipes] Set Recipe'

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) {}
}

export type RecipeAction = SetRecipe;