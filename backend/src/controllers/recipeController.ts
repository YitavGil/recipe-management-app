import { Request, Response } from 'express';
import { recipeService } from '../services/recipeService';
import { z } from 'zod';

const recipeSchema = z.object({
  title: z.string().min(1),
  ingredients: z.array(z.string().min(1)),
  steps: z.array(z.string().min(1)),
});

export const getAllRecipes = (req: Request, res: Response) => {
  const recipes = recipeService.getAllRecipes();
  res.json(recipes);
};

export const getRecipeById = (req: Request, res: Response) => {
  const recipe = recipeService.getRecipeById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

export const createRecipe = (req: Request, res: Response) => {
  try {
    const validatedData = recipeSchema.parse(req.body);
    const newRecipe = recipeService.createRecipe(validatedData);
    res.status(201).json(newRecipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid input', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateRecipe = (req: Request, res: Response) => {
  try {
    const validatedData = recipeSchema.partial().parse(req.body);
    const updatedRecipe = recipeService.updateRecipe(req.params.id, validatedData);
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid input', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteRecipe = (req: Request, res: Response) => {
  const deleted = recipeService.deleteRecipe(req.params.id);
  if (deleted) {
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};