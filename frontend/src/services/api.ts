import axios from 'axios';
import { Recipe } from '../types/types';

const API_URL = 'http://localhost:3000';

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

export const createRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
  const response = await axios.post(`${API_URL}/recipes`, recipe);
  return response.data;
};

export const updateRecipe = async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
  const response = await axios.put(`${API_URL}/recipes/${id}`, recipe);
  return response.data;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/recipes/${id}`);
};