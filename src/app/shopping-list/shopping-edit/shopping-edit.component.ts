import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() ingrediantAdded = new EventEmitter<Ingrediant>();
  editMode: boolean = false;
  editedItemIndex: number;
  subsription = new Subscription();
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subsription = this.shoppingService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
      });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    this.shoppingService.addIngredinat(new Ingrediant(value.name, value.amount)
    );
  }

  ngOnDestroy() {

  }

}
