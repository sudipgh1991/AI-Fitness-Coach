import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SocialScreen from '../screens/SocialScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import NutritionScreen from '../screens/NutritionScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import ProgressPhotosScreen from '../screens/ProgressPhotosScreen';
import GoalsScreen from '../screens/GoalsScreen';
import WorkoutPlansScreen from '../screens/WorkoutPlansScreen';
import RecipesScreen from '../screens/RecipesScreen';
import RemindersScreen from '../screens/RemindersScreen';
import BodyMeasurementsScreen from '../screens/BodyMeasurementsScreen';
import HabitsAnalysisScreen from '../screens/HabitsAnalysisScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import CoachSelectionScreen from '../screens/CoachSelectionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
      <Stack.Screen name="WorkoutPlans" component={WorkoutPlansScreen} />
      <Stack.Screen name="Nutrition" component={NutritionScreen} />
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="HabitsAnalysis" component={HabitsAnalysisScreen} />
    </Stack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="ProgressPhotos" component={ProgressPhotosScreen} />
      <Stack.Screen name="BodyMeasurements" component={BodyMeasurementsScreen} />
      <Stack.Screen name="Reminders" component={RemindersScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 60 + insets.bottom : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
