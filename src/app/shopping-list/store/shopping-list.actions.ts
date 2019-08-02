import { Action } from '@ngrx/store';
import { Ingrediant } from 'src/app/shared/ingrediant.model';

export const ADD_INGREDIANT = '[Shopping List] Add Ingrediant';
export const ADD_INGREDIANTS = '[Shopping List] Add Ingrediants';
export const UPDATE_INGREDIANT = '[Shopping List] Update Ingrediant';
export const DELETE_INGREDIANT = '[Shopping List] Delete Ingrediant';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngrediant implements Action {
    readonly type = ADD_INGREDIANT;
    constructor(public payload: Ingrediant) {}
}

export class AddIngrediants implements Action {
    readonly type = ADD_INGREDIANTS;
    constructor(public payload: Ingrediant[]) {}
}

export class UpdateIngrediant implements Action {
    readonly type = UPDATE_INGREDIANT;
    constructor(public payload: { index: number, ingrediant :Ingrediant}) {}
}

export class DeleteIngrediant implements Action {
    readonly type = DELETE_INGREDIANT;
    constructor(public payload: number) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
    constructor() {}
}

export type ShoppingListActions = AddIngrediant | 
                                    AddIngrediants |
                                    UpdateIngrediant |
                                    DeleteIngrediant |
                                    StartEdit |
                                    StopEdit;
