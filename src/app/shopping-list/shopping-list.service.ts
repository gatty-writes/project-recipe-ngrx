import { Ingrediant } from '../shared/ingrediant.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    public ingrediantAdded = new Subject<Ingrediant[]>();
    public startedEditing = new Subject<number>();
    private ingrediants: Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomattoes', 10)
    ];

    getIngrediants() {
        return this.ingrediants.slice();
    }
    
    getIngrediant(index: number) {
        return this.ingrediants[index];
    }

    addIngredinat(ingrediant: Ingrediant) {
        this.ingrediants.push(ingrediant);
        this.ingrediantAdded.next(this.ingrediants.slice());
    }

    addIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants);
        this.ingrediantAdded.next(this.ingrediants.slice());
    }

    updateIngrediant(index: number, ingr: Ingrediant) {
        this.ingrediants[index] = ingr;
        this.ingrediantAdded.next(this.ingrediants.slice());
    }

    deleteIngrediant(index: number) {
        // delete this.ingrediants[index];
        this.ingrediants.splice(index, 1);
        this.ingrediantAdded.next(this.ingrediants.slice());
    }

}