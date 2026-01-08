import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '@/types/recipe';
import { RecipeStorageService } from '@/services/recipeStorage';
import { sampleRecipes } from '@/data/sampleRecipes';

/**
 * Recipe context state interface
 */
interface RecipeContextState {
  /** All recipes */
  recipes: Recipe[];
  /** Loading state */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Reload recipes from storage */
  reloadRecipes: () => Promise<void>;
  /** Save a recipe */
  saveRecipe: (recipe: Recipe) => Promise<void>;
  /** Delete a recipe */
  deleteRecipe: (id: string) => Promise<void>;
  /** Get a recipe by ID */
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextState | undefined>(undefined);

/**
 * Props for RecipeProvider component
 */
interface RecipeProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * Provider component for recipe context
 * @param props - The component props
 * @returns Recipe context provider
 */
export function RecipeProvider({ children }: RecipeProviderProps): JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads recipes from storage
   */
  const loadRecipes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const loadedRecipes = await RecipeStorageService.getAllRecipes();
      setRecipes(loadedRecipes);
    } catch (err) {
      setError('Failed to load recipes');
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reloads recipes from storage
   */
  const reloadRecipes = async (): Promise<void> => {
    await loadRecipes();
  };

  /**
   * Saves a recipe
   * @param recipe - The recipe to save
   */
  const saveRecipe = async (recipe: Recipe): Promise<void> => {
    try {
      setError(null);
      await RecipeStorageService.saveRecipe(recipe);
      await loadRecipes();
    } catch (err) {
      setError('Failed to save recipe');
      console.error('Error saving recipe:', err);
      throw err;
    }
  };

  /**
   * Deletes a recipe
   * @param id - The recipe ID to delete
   */
  const deleteRecipe = async (id: string): Promise<void> => {
    try {
      setError(null);
      const deleted = await RecipeStorageService.deleteRecipe(id);
      if (deleted) {
        await loadRecipes();
      }
    } catch (err) {
      setError('Failed to delete recipe');
      console.error('Error deleting recipe:', err);
      throw err;
    }
  };

  /**
   * Gets a recipe by ID
   * @param id - The recipe ID
   * @returns The recipe or undefined if not found
   */
  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find((recipe) => recipe.id === id);
  };

  // Initialize recipes on mount
  useEffect(() => {
    const initializeRecipes = async (): Promise<void> => {
      await RecipeStorageService.initializeWithSamples(sampleRecipes);
      await loadRecipes();
    };

    initializeRecipes();
  }, []);

  const value: RecipeContextState = {
    recipes,
    loading,
    error,
    reloadRecipes,
    saveRecipe,
    deleteRecipe,
    getRecipeById,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

/**
 * Hook to use recipe context
 * @returns Recipe context state
 * @throws Error if used outside RecipeProvider
 */
export function useRecipes(): RecipeContextState {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
