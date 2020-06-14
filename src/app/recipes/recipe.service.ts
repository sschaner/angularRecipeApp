import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Salmon",
  //     "Salmon recipe description.",
  //     "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg",
  //     [
  //       new Ingredient("Salmon Filet", 1),
  //       new Ingredient("Lemon", 1),
  //       new Ingredient("Tomato", 2)
  //     ]
  //   ),
  //   new Recipe(
  //     "Yummy Burger",
  //     "Burger recipe description.",
  //     "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  //     [
  //       new Ingredient("Ground meat", 1),
  //       new Ingredient("Lettuce", 1),
  //       new Ingredient("Tomato", 1),
  //       new Ingredient("Pickles", 4),
  //       new Ingredient("Cheddar Cheese", 1),
  //       new Ingredient("Mayonnaise", 1),
  //       new Ingredient("Ketchup", 1)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
