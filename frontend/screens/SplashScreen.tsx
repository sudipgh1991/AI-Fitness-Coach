import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const ringScale      = useRef(new Animated.Value(0.3)).current;
  const ringOpacity    = useRef(new Animated.Value(0.7)).current;
  const logoScale      = useRef(new Animated.Value(0)).current;
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const textOpacity    = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(24)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const bottomOpacity  = useRef(new Animated.Value(0)).current;
  const screenOpacity  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Rings expand outward
      Animated.parallel([
        Animated.spring(ringScale, {
          toValue: 1,
          tension: 45,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 0.14,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Logo pops in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      // App name slides up
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Tagline + bottom fade in together
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bottomOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Fade out and hand off to app
    const exitTimer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2600);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#3a6b41" />

      {/* Decorative rings */}
      <Animated.View
        style={[
          styles.ring,
          styles.ringOuter,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
      />
      <Animated.View
        style={[
          styles.ring,
          styles.ringInner,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
      />

      {/* Logo icon */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Ionicons name="fitness" size={62} color="#FFFFFF" />
      </Animated.View>

      {/* App name */}
      <Animated.Text
        style={[
          styles.appName,
          { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
        ]}
      >
        Fitzen
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your AI Fitness Coach
      </Animated.Text>

      {/* Bottom branding */}
      <Animated.View style={[styles.bottomBranding, { opacity: bottomOpacity }]}>
        <View style={styles.divider} />
        <Text style={styles.poweredBy}>Powered by AI</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b8352',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  ringOuter: {
    width: width * 0.88,
    height: width * 0.88,
  },
  ringInner: {
    width: width * 0.62,
    height: width * 0.62,
  },
  logoContainer: {
    width: 116,
    height: 116,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 46,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.82)',
    letterSpacing: 0.6,
    fontWeight: '400',
  },
  bottomBranding: {
    position: 'absolute',
    bottom: 54,
    alignItems: 'center',
  },
  divider: {
    width: 36,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: 10,
  },
  poweredBy: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
});
