import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Recipe, IngredientSection, RecipeStep } from '@/types/recipe';

/**
 * Props for the RecipeDetail component
 */
interface RecipeDetailProps {
  /** The recipe to display */
  recipe: Recipe;
}

/**
 * Component that displays detailed recipe information
 * @param props - The component props
 * @returns A detailed view of a recipe with ingredients and steps
 */
export function RecipeDetail({ recipe }: RecipeDetailProps): JSX.Element {
  /**
   * Formats duration in minutes to human-readable format
   * @param minutes - Duration in minutes
   * @returns Formatted duration string
   */
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
  };

  /**
   * Renders a section of ingredients
   * @param section - The ingredient section to render
   * @param index - The section index
   * @returns An ingredient section component
   */
  const renderIngredientSection = (section: IngredientSection, index: number): JSX.Element => (
    <View key={`section-${index}`} className="mb-6">
      <Text className="text-typography-900 dark:text-typography-50 text-lg font-bold mb-3">
        {section.name}
      </Text>
      {section.ingredients.map((ingredient, idx) => (
        <View key={`ingredient-${index}-${idx}`} className="flex-row items-start mb-2">
          <Text className="text-typography-700 dark:text-typography-300 mr-2">•</Text>
          <Text className="text-typography-700 dark:text-typography-300 flex-1">
            {ingredient}
          </Text>
        </View>
      ))}
    </View>
  );

  /**
   * Renders a recipe step
   * @param step - The recipe step to render
   * @returns A recipe step component
   */
  const renderStep = (step: RecipeStep): JSX.Element => (
    <View key={`step-${step.stepNumber}`} className="mb-4">
      <View className="flex-row items-start">
        <View className="bg-primary-500 rounded-full w-8 h-8 items-center justify-center mr-3">
          <Text className="text-white font-bold">{step.stepNumber}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-typography-800 dark:text-typography-200 mb-1">
            {step.instruction}
          </Text>
          {step.durationMinutes && (
            <Text className="text-typography-600 dark:text-typography-400 text-xs">
              ⏱️ {formatDuration(step.durationMinutes)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-background-0">
      {/* Header */}
      <View className="p-6 bg-background-50 dark:bg-background-900">
        <Text className="text-typography-900 dark:text-typography-50 text-2xl font-bold mb-2">
          {recipe.name}
        </Text>
        <Text className="text-typography-700 dark:text-typography-300 mb-4">
          {recipe.description}
        </Text>

        {/* Recipe meta info */}
        <View className="flex-row flex-wrap gap-4">
          <View className="flex-row items-center">
            <Text className="text-typography-600 dark:text-typography-400 text-sm">
              ⏱️ Total: {formatDuration(recipe.totalTimeMinutes)}
            </Text>
          </View>

          {recipe.yield && (
            <View className="flex-row items-center">
              <Text className="text-typography-600 dark:text-typography-400 text-sm">
                🍞 Yields: {recipe.yield}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Ingredients */}
      <View className="p-6">
        <Text className="text-typography-900 dark:text-typography-50 text-xl font-bold mb-4">
          Ingredients
        </Text>
        {recipe.ingredientSections.map((section, index) =>
          renderIngredientSection(section, index)
        )}
      </View>

      {/* Steps */}
      <View className="p-6 pt-0">
        <Text className="text-typography-900 dark:text-typography-50 text-xl font-bold mb-4">
          Instructions
        </Text>
        {recipe.steps.map((step) => renderStep(step))}
      </View>
    </ScrollView>
  );
}
