import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import * as FromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<FromApp.AppState>) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-backend-d5cac.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-backend-d5cac.firebaseio.com/recipes.json'
      ).pipe(
        map(recipes => recipes.map(recipe => {
          return {
            ...recipe,
            ingrediants: recipe.ingrediants ? recipe.ingrediants : []
          };
        })),
        tap(recipes => {
          // replacing the below line with the recipes store 
          // this.recipeService.setRecipe(recipes);
          this.store.dispatch(new RecipeActions.SetRecipe(recipes));
        })
      );
  }
}