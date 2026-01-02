import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import LoginScreen from '../screens/LoginScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';

// Onboarding Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import CoachSelectionScreen from '../screens/CoachSelectionScreen';
import SelfAssessmentScreen from '../screens/SelfAssessmentScreen';

// Main Navigator
import MainNavigator from './MainNavigator';

// Additional Screens
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  useEffect(() => {
    // Check onboarding status on app launch and when auth changes
    const checkOnboarding = async () => {
      setIsCheckingOnboarding(true);
      try {
        const completed = await AsyncStorage.getItem('hasCompletedOnboarding');
        console.log('Onboarding status:', completed);
        console.log('Is authenticated:', isAuthenticated);
        setHasCompletedOnboarding(completed === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasCompletedOnboarding(false);
      } finally {
        setIsCheckingOnboarding(false);
      }
    };

    checkOnboarding();
  }, [isAuthenticated]); // Re-check when auth changes

  console.log('AppNavigator render - Loading:', isLoading, 'Checking:', isCheckingOnboarding, 'Onboarding:', hasCompletedOnboarding, 'Auth:', isAuthenticated);

  if (isLoading || isCheckingOnboarding || hasCompletedOnboarding === null) {
    console.log('AppNavigator: Showing loading screen');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  // Determine which screen set to show
  const getNavigationKey = () => {
    if (!hasCompletedOnboarding) return 'onboarding';
    if (!isAuthenticated) return 'auth';
    return 'main';
  };

  const navigationKey = getNavigationKey();
  console.log('Navigation key:', navigationKey);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        key={navigationKey} 
        screenOptions={{ headerShown: false }}
        initialRouteName={!hasCompletedOnboarding ? "Onboarding" : !isAuthenticated ? "Login" : "Main"}
      >
        {!hasCompletedOnboarding ? (
          // Show onboarding first (before login)
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="SelfAssessment" component={SelfAssessmentScreen} />
            <Stack.Screen name="CoachSelection" component={CoachSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          </>
        ) : !isAuthenticated ? (
          // User completed onboarding, show login
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          </>
        ) : (
          // User is authenticated, show main app
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{ headerShown: true, title: 'Payment' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
