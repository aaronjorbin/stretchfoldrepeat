/**
 * Represents a section of ingredients in a recipe
 */
export interface IngredientSection {
  /** Name of the ingredient section (e.g., "Dough", "Starter", "Toppings") */
  name: string;
  /** List of ingredients in this section */
  ingredients: string[];
}

/**
 * Represents a step in the recipe instructions
 */
export interface RecipeStep {
  /** Step number (1-indexed) */
  stepNumber: number;
  /** Instruction text for this step */
  instruction: string;
  /** Optional duration in minutes for this step */
  durationMinutes?: number;
}

/**
 * Represents a complete sourdough bread recipe
 */
export interface Recipe {
  /** Unique identifier for the recipe */
  id: string;
  /** Name of the recipe */
  name: string;
  /** Brief description of the recipe */
  description: string;
  /** Total time required in minutes */
  totalTimeMinutes: number;
  /** List of ingredient sections */
  ingredientSections: IngredientSection[];
  /** List of recipe steps */
  steps: RecipeStep[];
  /** Optional yield (e.g., "1 loaf", "2 baguettes") */
  yield?: string;
}
