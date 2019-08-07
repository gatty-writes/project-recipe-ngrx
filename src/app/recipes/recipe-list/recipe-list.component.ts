import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as FromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subs = new Subscription;

  constructor(private recipeService: RecipeService,
    private store: Store<FromApp.AppState>) { }

  ngOnInit() {
    this.subs = this.store
                .select('recipes')
                .pipe(map(recipeState => recipeState.recipes))
                .subscribe((recipes: Recipe[]) => {
                  this.recipes = recipes;
                });
    // this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
