import { Action } from '@ngrx/store';
import { Ingrediant } from 'src/app/shared/ingrediant.model';

export const ADD_INGREDIANT = 'ADD_INGREDIANT';
export const ADD_INGREDIANTS = 'ADD_INGREDIANTS';

export class AddIngrediant implements Action {
    readonly type = ADD_INGREDIANT;
    constructor(public payload: Ingrediant) {}
}

export class AddIngrediants implements Action {
    readonly type = ADD_INGREDIANTS;
    constructor(public payload: Ingrediant[]) {}
}

export type ShoppingListActions = AddIngrediant | AddIngrediants;
