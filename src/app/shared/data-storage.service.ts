import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) {
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
        return this.http.get<Recipe[]>('https://ng-recipe-backend-d5cac.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingrediants: recipe.ingrediants ? recipe.ingrediants : [] }
                });
            }
        ), tap(recipes => {
            this.recipeService.setRecipe(recipes);
        }))
    }
}