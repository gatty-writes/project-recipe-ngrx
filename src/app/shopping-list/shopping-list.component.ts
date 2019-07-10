import { Component, OnInit } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingrediants: Ingrediant[] = [
    new Ingrediant('Apples', 5),
    new Ingrediant('Tomattoes', 10)
  ];
  constructor() { }

  ngOnInit() {
  }

  onIngrediantAdd(ingrediant: Ingrediant) {
    this.ingrediants.push(ingrediant);
  }
}
