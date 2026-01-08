import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
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

function RecipiesScreen() {
  return (
    <ScreenContainer>
      <Text className="text-typography-900 text-xl">Recipies</Text>
    </ScreenContainer>
  );
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
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Bake" component={BakeScreen} />
          <Tab.Screen name="Recipies" component={RecipiesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
