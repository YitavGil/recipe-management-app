import { Recipe } from '../models/Recipe';
import { v4 as uuidv4 } from 'uuid';

class RecipeService {
  private recipes: Recipe[] = [];

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: string): Recipe | null {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    return recipe || null;
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Recipe {
    const newRecipe = { ...recipe, id: uuidv4() };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  updateRecipe(id: string, recipeData: Partial<Recipe>): Recipe | null {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...recipeData };
      return this.recipes[index];
    }
    return null;
  }

  deleteRecipe(id: string): boolean {
    const initialLength = this.recipes.length;
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    return this.recipes.length !== initialLength;
  }
}

export const recipeService = new RecipeService();