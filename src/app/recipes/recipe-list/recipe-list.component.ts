import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('test recipe', 'test recipe description', 'https://images.app.goo.gl/SoD7MxmLG44feejG7')
  ];

  constructor() { }

  ngOnInit() {
  }

}
