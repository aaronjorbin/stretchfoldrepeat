import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Recipe } from '@/types/recipe';

/**
 * Props for the RecipeList component
 */
interface RecipeListProps {
  /** Array of recipes to display */
  recipes: Recipe[];
  /** Callback when a recipe is selected */
  onRecipePress: (recipe: Recipe) => void;
}

/**
 * Component that displays a list of recipe cards
 * @param props - The component props
 * @returns A scrollable list of recipe cards
 */
export function RecipeList({ recipes, onRecipePress }: RecipeListProps): JSX.Element {
  /**
   * Formats duration in minutes to human-readable format
   * @param minutes - Duration in minutes
   * @returns Formatted duration string
   */
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  /**
   * Renders a single recipe card
   * @param recipe - The recipe to render
   * @returns A recipe card component
   */
  const renderRecipeCard = ({ item: recipe }: { item: Recipe }): JSX.Element => (
    <TouchableOpacity
      onPress={() => onRecipePress(recipe)}
      className="bg-background-50 dark:bg-background-900 rounded-lg p-4 mb-4 mx-4"
    >
      <Text className="text-typography-900 dark:text-typography-50 text-xl font-bold mb-2">
        {recipe.name}
      </Text>

      <Text className="text-typography-700 dark:text-typography-300 text-sm mb-3">
        {recipe.description}
      </Text>

      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Text className="text-typography-600 dark:text-typography-400 text-xs">
            ⏱️ {formatDuration(recipe.totalTimeMinutes)}
          </Text>
        </View>

        {recipe.yield && (
          <View className="flex-row items-center">
            <Text className="text-typography-600 dark:text-typography-400 text-xs">
              🍞 {recipe.yield}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipeCard}
      keyExtractor={(recipe) => recipe.id}
      className="flex-1"
      contentContainerClassName="py-4"
    />
  );
}
