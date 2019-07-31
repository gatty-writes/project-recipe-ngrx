import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';

import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


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
  constructor(private shoppingService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

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
      // this.shoppingService.updateIngrediant(this.editedItemIndex, new Ingrediant(value.name, value.amount));
      this.store.dispatch(
        new ShoppingListActions.UpdateIngrediant({
          index: this.editedItemIndex,
          ingrediant: new Ingrediant(value.name, value.amount)
        })
      );
    } else {
      // this.shoppingService.addIngredinat(new Ingrediant(value.name, value.amount));
      // using the store to add the values now
      this.store.dispatch(new ShoppingListActions.AddIngrediant(new Ingrediant(value.name, value.amount)));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
  }

  onDelete() {
    // this.shoppingService.deleteIngrediant(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngrediant(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

}
