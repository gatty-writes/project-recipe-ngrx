import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl } from '@angular/forms';

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
    if(this.editMode) {
      this.editedRecipeItem = this.recipeService.getRecipe(this.id);
      recipeName = this.editedRecipeItem.name;
      recipeDescription = this.editedRecipeItem.description;
      recipeImagePath = this.editedRecipeItem.imagePath;
    }
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription)
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }

}
