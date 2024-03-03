import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExerciseProvider } from './components/ExerciseContext';
import AddExerciseScreen from './screens/AddExerciseScreen';
import WorkoutListScreen from './screens/WorkoutListScreen';
import SettingsScreen from './screens/SettingsScreen';
import { StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {

  
   // Load fonts
   const [loaded] = useFonts({
    LatoRegular: require('./assets/fonts/Lato-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ExerciseProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
        <Tab.Navigator
          initialRouteName="AddExercise"
          screenOptions={{
            activeTintColor: '#5cc3ff',
            inactiveTintColor: '#9a9a9a',
          }}
        >
          <Tab.Screen
            name="AddExercise"
            component={AddExerciseScreen}
            options={{
              tabBarLabel: 'Add Exercise',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="running" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="WorkoutList"
            component={WorkoutListScreen}
            options={{
              tabBarLabel: 'Workout List',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="list" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="cogs" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ExerciseProvider>
  );
}