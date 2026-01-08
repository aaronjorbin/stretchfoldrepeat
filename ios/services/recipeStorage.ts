import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/types/recipe';

const RECIPES_STORAGE_KEY = '@stretchfoldrepeat:recipes';

/**
 * Service for managing recipe storage using AsyncStorage
 */
export class RecipeStorageService {
  /**
   * Retrieves all recipes from storage
   * @returns Promise resolving to array of recipes
   */
  static async getAllRecipes(): Promise<Recipe[]> {
    try {
      const recipesJson = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
      if (recipesJson === null) {
        return [];
      }
      return JSON.parse(recipesJson);
    } catch (error) {
      console.error('Error loading recipes:', error);
      return [];
    }
  }

  /**
   * Retrieves a single recipe by ID
   * @param id - The recipe ID
   * @returns Promise resolving to the recipe or null if not found
   */
  static async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const recipes = await this.getAllRecipes();
      return recipes.find((recipe) => recipe.id === id) || null;
    } catch (error) {
      console.error('Error loading recipe:', error);
      return null;
    }
  }

  /**
   * Saves a new recipe or updates an existing one
   * @param recipe - The recipe to save
   * @returns Promise resolving to the saved recipe
   */
  static async saveRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const recipes = await this.getAllRecipes();
      const existingIndex = recipes.findIndex((r) => r.id === recipe.id);

      if (existingIndex >= 0) {
        recipes[existingIndex] = recipe;
      } else {
        recipes.push(recipe);
      }

      await AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
      return recipe;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  /**
   * Deletes a recipe by ID
   * @param id - The recipe ID to delete
   * @returns Promise resolving to true if deleted, false if not found
   */
  static async deleteRecipe(id: string): Promise<boolean> {
    try {
      const recipes = await this.getAllRecipes();
      const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

      if (filteredRecipes.length === recipes.length) {
        return false;
      }

      await AsyncStorage.setItem(
        RECIPES_STORAGE_KEY,
        JSON.stringify(filteredRecipes)
      );
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }

  /**
   * Initializes storage with sample recipes if storage is empty
   * @param sampleRecipes - Array of sample recipes to initialize with
   * @returns Promise resolving when initialization is complete
   */
  static async initializeWithSamples(sampleRecipes: Recipe[]): Promise<void> {
    try {
      const existingRecipes = await this.getAllRecipes();
      if (existingRecipes.length === 0) {
        await AsyncStorage.setItem(
          RECIPES_STORAGE_KEY,
          JSON.stringify(sampleRecipes)
        );
      }
    } catch (error) {
      console.error('Error initializing recipes:', error);
    }
  }

  /**
   * Clears all recipes from storage
   * @returns Promise resolving when storage is cleared
   */
  static async clearAllRecipes(): Promise<void> {
    try {
      await AsyncStorage.removeItem(RECIPES_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recipes:', error);
      throw error;
    }
  }
}
