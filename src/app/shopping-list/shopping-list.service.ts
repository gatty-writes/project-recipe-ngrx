import { Ingrediant } from '../shared/ingrediant.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    public ingrediantAdded = new EventEmitter<Ingrediant[]>();
    public startedEditing = new Subject<number>();
    private ingrediants: Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomattoes', 10)
    ];

    getIngrediants() {
        return this.ingrediants.slice();
    }

    addIngredinat(ingrediant: Ingrediant) {
        this.ingrediants.push(ingrediant);
        this.ingrediantAdded.emit(this.ingrediants.slice());
    }

    addIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants);
        this.ingrediantAdded.emit(this.ingrediants.slice());
    }

}