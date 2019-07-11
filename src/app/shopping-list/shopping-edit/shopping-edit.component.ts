import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  @Output() ingrediantAdded = new EventEmitter<Ingrediant>();
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    this.shoppingService.addIngredinat(new Ingrediant(
      this.nameInputRef.nativeElement.value, 
      this.amountInputRef.nativeElement.value)
    );
  }

}
