import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingrediant[];
  private igChangeSub: Subscription;
  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingrediants = this.slService.getIngrediants();
    this.igChangeSub = this.slService.ingrediantAdded.subscribe((ingrediants: Ingrediant[]) => {
      this.ingrediants = ingrediants;
    })
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
