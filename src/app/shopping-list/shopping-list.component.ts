import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Observable<{ ingrediants: Ingrediant[] }>;
  private igChangeSub: Subscription;
  constructor(private slService: ShoppingListService,
              private store: Store<{ shoppingList: {ingrediants: Ingrediant[]} }>) {
  }

  ngOnInit() {
    // this.ingrediants = this.slService.getIngrediants();
    // this.igChangeSub = this.slService.ingrediantAdded.subscribe((ingrediants: Ingrediant[]) => {
    //   this.ingrediants = ingrediants;
    // })
    this.ingrediants = this.store.select('shoppingList');
  }

  editShoppingItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

}
