import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecipeStorageService } from '../recipeStorage';
import { Recipe } from '@/types/recipe';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockRecipe: Recipe = {
  id: 'test-1',
  name: 'Test Recipe',
  description: 'A test recipe',
  totalTimeMinutes: 60,
  ingredientSections: [
    {
      name: 'Ingredients',
      ingredients: ['Flour', 'Water', 'Salt'],
    },
  ],
  steps: [
    {
      stepNumber: 1,
      instruction: 'Mix ingredients',
      durationMinutes: 10,
    },
  ],
  yield: '1 loaf',
};

describe('RecipeStorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRecipes', () => {
    /**
     * Test that getAllRecipes returns an empty array when storage is empty
     */
    it('should return empty array when storage is empty', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const recipes = await RecipeStorageService.getAllRecipes();

      expect(recipes).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@stretchfoldrepeat:recipes');
    });

    /**
     * Test that getAllRecipes returns parsed recipes from storage
     */
    it('should return parsed recipes from storage', async () => {
      const storedRecipes = [mockRecipe];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedRecipes));

      const recipes = await RecipeStorageService.getAllRecipes();

      expect(recipes).toEqual(storedRecipes);
    });

    /**
     * Test that getAllRecipes handles errors gracefully
     */
    it('should return empty array on error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const recipes = await RecipeStorageService.getAllRecipes();

      expect(recipes).toEqual([]);
    });
  });

  describe('getRecipeById', () => {
    /**
     * Test that getRecipeById returns the correct recipe
     */
    it('should return recipe by id', async () => {
      const storedRecipes = [mockRecipe];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedRecipes));

      const recipe = await RecipeStorageService.getRecipeById('test-1');

      expect(recipe).toEqual(mockRecipe);
    });

    /**
     * Test that getRecipeById returns null when recipe not found
     */
    it('should return null when recipe not found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockRecipe]));

      const recipe = await RecipeStorageService.getRecipeById('non-existent');

      expect(recipe).toBeNull();
    });
  });

  describe('saveRecipe', () => {
    /**
     * Test that saveRecipe adds a new recipe
     */
    it('should add new recipe to storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      await RecipeStorageService.saveRecipe(mockRecipe);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@stretchfoldrepeat:recipes',
        JSON.stringify([mockRecipe])
      );
    });

    /**
     * Test that saveRecipe updates an existing recipe
     */
    it('should update existing recipe in storage', async () => {
      const existingRecipe = { ...mockRecipe, name: 'Old Name' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([existingRecipe]));

      const updatedRecipe = { ...mockRecipe, name: 'New Name' };
      await RecipeStorageService.saveRecipe(updatedRecipe);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@stretchfoldrepeat:recipes',
        JSON.stringify([updatedRecipe])
      );
    });

    /**
     * Test that saveRecipe throws error on storage failure
     */
    it('should throw error on storage failure', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await expect(RecipeStorageService.saveRecipe(mockRecipe)).rejects.toThrow();
    });
  });

  describe('deleteRecipe', () => {
    /**
     * Test that deleteRecipe removes recipe from storage
     */
    it('should remove recipe from storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockRecipe]));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await RecipeStorageService.deleteRecipe('test-1');

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@stretchfoldrepeat:recipes',
        JSON.stringify([])
      );
    });

    /**
     * Test that deleteRecipe returns false when recipe not found
     */
    it('should return false when recipe not found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockRecipe]));

      const result = await RecipeStorageService.deleteRecipe('non-existent');

      expect(result).toBe(false);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('initializeWithSamples', () => {
    /**
     * Test that initializeWithSamples adds samples when storage is empty
     */
    it('should initialize with sample recipes when storage is empty', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      await RecipeStorageService.initializeWithSamples([mockRecipe]);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@stretchfoldrepeat:recipes',
        JSON.stringify([mockRecipe])
      );
    });

    /**
     * Test that initializeWithSamples does not override existing recipes
     */
    it('should not override existing recipes', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockRecipe]));

      await RecipeStorageService.initializeWithSamples([mockRecipe]);

      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('clearAllRecipes', () => {
    /**
     * Test that clearAllRecipes removes all recipes from storage
     */
    it('should remove all recipes from storage', async () => {
      await RecipeStorageService.clearAllRecipes();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@stretchfoldrepeat:recipes');
    });

    /**
     * Test that clearAllRecipes throws error on failure
     */
    it('should throw error on storage failure', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      await expect(RecipeStorageService.clearAllRecipes()).rejects.toThrow();
    });
  });
});
