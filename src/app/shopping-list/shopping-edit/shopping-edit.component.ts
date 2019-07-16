import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('f', {static: true}) slForm: NgForm;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingrediant;
  subsription = new Subscription();
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subsription = this.shoppingService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngrediant(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if(this.editMode) {
      this.shoppingService.updateIngrediant(this.editedItemIndex, new Ingrediant(value.name, value.amount));
    } else {
      this.shoppingService.addIngredinat(new Ingrediant(value.name, value.amount));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngrediant(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

}
