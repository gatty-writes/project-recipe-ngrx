import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


@Injectable()
export class RecipeService {
    public recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    
    // [
    //     new Recipe('Zucchini', 'Perfectly grilled zucchini recipe', 'https://www.skinnytaste.com/wp-content/uploads/2019/07/Perfectly-Grilled-Zucchini-11-1.jpg',
    //     [
    //         new Ingrediant('Green leaf', 10),
    //         new Ingrediant('Cucumber', 1),
    //         new Ingrediant('Meat', 1),
    //     ]),
    //     new Recipe('Roasted Chicken', 'Butter milk roasted chicken', 'https://www.skinnytaste.com/wp-content/uploads/2019/07/Buttermilk-Roast-Chicken-in-the-Air-Fryer-6.jpg',
    //     [
    //         new Ingrediant('Green leaf', 5),
    //         new Ingrediant('Butter Milk', 1),
    //         new Ingrediant('Chicken', 1),
    //         new Ingrediant('Tomatoes', 5),
    //     ]),
    //     new Recipe('Green Pasta Salad', 'healthy awesome salad', 'https://www.skinnytaste.com/wp-content/uploads/2019/06/Greek-Pasta-Salad-4.jpg',
    //     [
    //         new Ingrediant('Tomatoes', 1),
    //         new Ingrediant('Cucumber', 1),
    //         new Ingrediant('Carrot', 1),
    //     ])
    // ];

    constructor(private slService: ShoppingListService,
                private store: Store<fromShoppingList.AppState>) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
        // this.slService.addIngrediants(ingrediants)
        // use the add ingrediants actions to dispatch the action
        this.store.dispatch(new ShoppingListActions.AddIngrediants(ingrediants));
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
}