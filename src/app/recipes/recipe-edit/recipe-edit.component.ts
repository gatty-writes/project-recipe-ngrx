import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  editedRecipeItem: Recipe;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngrediants = new FormArray([]);
    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return this.id === index;
            })
          })
        )
        .subscribe(recipe => {
          this.editedRecipeItem = recipe;
          recipeName = this.editedRecipeItem.recipeName;
          recipeDescription = this.editedRecipeItem.description;
          recipeImagePath = this.editedRecipeItem.imagePath;
          if (this.editedRecipeItem.ingrediants) {
            for (const ingrediant of this.editedRecipeItem.ingrediants) {
              recipeIngrediants.push(
                new FormGroup({
                  name: new FormControl(ingrediant.name, Validators.required),
                  amount: new FormControl(ingrediant.amount, [
                    Validators.required,
                    Validators.pattern('^[1-9]+[0-9]*$')
                  ])
                })
              )
            }
          }
        });
    }
    
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingrediants: recipeIngrediants
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

  addIngrediant() {
    const ingrediant = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ])
    });
    (<FormArray>this.recipeForm.get('ingrediants')).push(ingrediant);
  }

  clearForm() {
    this.recipeForm.reset();
  }

  deleteIngrediant(index: number) {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

}
