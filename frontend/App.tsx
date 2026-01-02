import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent splash from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        console.log('App: Loading fonts...');
        
        // Pre-load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
        
        console.log('App: Fonts loaded');
      } catch (e) {
        console.warn('App: Error:', e);
      } finally {
        setAppIsReady(true);
        // Hide splash screen
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          console.log('App: Splash hidden');
        }, 100);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
