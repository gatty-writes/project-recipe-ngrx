import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingListService } from './shopping-list.service';
import { Ingrediant } from '../shared/ingrediant.model';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'; 
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'; 

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Observable<{ ingrediants: Ingrediant[] }>;
  private igChangeSub: Subscription;
  constructor(private slService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    // this.ingrediants = this.slService.getIngrediants();
    // this.igChangeSub = this.slService.ingrediantAdded.subscribe((ingrediants: Ingrediant[]) => {
    //   this.ingrediants = ingrediants;
    // })
    this.ingrediants = this.store.select('shoppingList');
  }

  editShoppingItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

}
