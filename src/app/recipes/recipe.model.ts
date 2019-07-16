import { Ingrediant } from '../shared/ingrediant.model';

export class Recipe {
    public recipeName: string;
    public description: string;
    public imagePath: string;
    public ingrediants: Ingrediant[]

    constructor(name: string, desc: string, imagePath: string, ingr: Ingrediant[]) {
        this.recipeName = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingrediants = ingr;
    }
}