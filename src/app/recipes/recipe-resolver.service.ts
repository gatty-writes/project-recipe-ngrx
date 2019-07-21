import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { retry } from 'rxjs/operators';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dsService: DataStorageService, 
        private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipeService.getRecipes();
        // if(recipes.length === 0 ) {
            return this.dsService.fetchRecipe();
        // } else {
            // return recipes;
        // } 
    }

}