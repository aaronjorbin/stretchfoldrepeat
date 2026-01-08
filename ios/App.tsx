import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { RecipeProvider, useRecipes } from '@/contexts/RecipeContext';
import { RecipeList } from '@/components/RecipeList';
import { RecipeDetail } from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';
import '@/global.css';

function ScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 items-center justify-center bg-background-0">
      {children}
    </View>
  );
}

function BakeScreen() {
  return (
    <ScreenContainer>
      <Text className="text-typography-900 text-xl">Bake</Text>
    </ScreenContainer>
  );
}

const RecipeStack = createNativeStackNavigator();

function RecipesStackNavigator() {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeList"
        component={RecipesListScreen}
        options={{ title: 'Recipes' }}
      />
      <RecipeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
    </RecipeStack.Navigator>
  );
}

function RecipesListScreen({ navigation }: any) {
  const { recipes, loading, error } = useRecipes();

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text className="text-error-500 text-lg">{error}</Text>
      </ScreenContainer>
    );
  }

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.id });
  };

  return (
    <View className="flex-1 bg-background-0">
      <RecipeList recipes={recipes} onRecipePress={handleRecipePress} />
    </View>
  );
}

function RecipeDetailScreen({ route }: any) {
  const { recipeId } = route.params;
  const { getRecipeById } = useRecipes();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <ScreenContainer>
        <Text className="text-error-500 text-lg">Recipe not found</Text>
      </ScreenContainer>
    );
  }

  return <RecipeDetail recipe={recipe} />;
}

function SettingsScreen() {
  return (
    <ScreenContainer>
      <Text className="text-typography-900 text-xl">Settings</Text>
    </ScreenContainer>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <RecipeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Bake" component={BakeScreen} />
            <Tab.Screen name="Recipes" component={RecipesStackNavigator} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </RecipeProvider>
    </GluestackUIProvider>
  );
}
