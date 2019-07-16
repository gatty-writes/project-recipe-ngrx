import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
    private recipeService: RecipeService) { }

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
    let  recipeDescription = '';
    let  recipeImagePath = '';
    let recipeIngrediants = new FormArray([]);
    if(this.editMode) {
      this.editedRecipeItem = this.recipeService.getRecipe(this.id);
      recipeName = this.editedRecipeItem.name;
      recipeDescription = this.editedRecipeItem.description;
      recipeImagePath = this.editedRecipeItem.imagePath;
      if(this.editedRecipeItem.ingrediants) {
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
    }
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingrediants: recipeIngrediants
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value);
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

}
