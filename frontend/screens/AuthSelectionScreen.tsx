import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes } from '../constants/theme';

export default function AuthSelectionScreen({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Branding */}
        <View style={styles.brandSection}>
          <LinearGradient
            colors={['#1a3828', '#2d5a3d', '#4b8352']}
            style={styles.logoCircle}
          >
            <Ionicons name="fitness" size={42} color="#FFF" />
          </LinearGradient>
          <Text style={[styles.brandName, { color: colors.text }]}>Fitzen</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Your AI-Powered Fitness Coach
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={[styles.heading, { color: colors.text }]}>Let's get you started</Text>
          <Text style={[styles.subheading, { color: colors.textSecondary }]}>
            Create a free account or sign in to continue your transformation journey.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsSection}>
          {/* Create Account */}
          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            activeOpacity={0.87}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <LinearGradient
              colors={['#3a6942', '#4b8352', '#60a86a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Ionicons name="person-add-outline" size={22} color="#FFF" />
              <Text style={styles.primaryButtonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Sign In */}
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.primary, backgroundColor: colors.card }]}
            activeOpacity={0.87}
            onPress={() => navigation.navigate('Login')}
          >
            <Ionicons name="log-in-outline" size={22} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Footer note */}
        <Text style={[styles.footerNote, { color: colors.textSecondary }]}>
          By continuing you agree to our{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Terms</Text>
          {' '}&amp;{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    padding: Spacing.md,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    paddingBottom: Spacing.xxl,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 4,
  },
  tagline: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  headingSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    paddingHorizontal: Spacing.sm,
  },
  heading: {
    fontSize: FontSizes.xxl ?? 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subheading: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonsSection: {
    gap: 0,
  },
  primaryButtonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3a6942',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: Spacing.lg,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 17,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 17,
    borderRadius: 16,
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    marginTop: Spacing.xl,
    lineHeight: 20,
  },
});
