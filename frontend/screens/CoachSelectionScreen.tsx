import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function CoachSelectionScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const coachingStyles = [
    {
      id: 'friendly',
      name: 'Friendly & Supportive',
      icon: 'happy',
      description: 'Encouraging and warm approach',
      color: colors.success,
    },
    {
      id: 'strict',
      name: 'Strict & Disciplined',
      icon: 'fitness',
      description: 'Tough love and accountability',
      color: colors.error,
    },
    {
      id: 'calm',
      name: 'Calm & Balanced',
      icon: 'leaf',
      description: 'Mindful and steady guidance',
      color: colors.info,
    },
    {
      id: 'motivational',
      name: 'Motivational & Energetic',
      icon: 'flame',
      description: 'High energy and inspiring',
      color: colors.warning,
    },
  ];

  const handleComplete = async () => {
    try {
      // Save coach preferences
      await AsyncStorage.setItem('coachGender', selectedGender || '');
      await AsyncStorage.setItem('coachStyle', selectedStyle || '');
      
      // Mark onboarding as completed
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      
      // Navigate to login screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error saving coach preferences:', error);
      // Still navigate even if save fails
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Login')}
        >
          <Ionicons name="log-in" size={20} color="#FFF" />
          <Text style={styles.skipButtonText}>Already a member?</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="people" size={48} color="#FFF" />
          <Text style={styles.headerTitle}>Choose Your Coach</Text>
          <Text style={styles.headerSubtitle}>Personalize your coaching experience</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Coach Gender</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Select the gender you're most comfortable working with
          </Text>

          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderCard,
                {
                  backgroundColor: selectedGender === 'male' ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedGender('male')}
            >
              <Ionicons
                name="man"
                size={64}
                color={selectedGender === 'male' ? '#FFF' : colors.primary}
              />
              <Text
                style={[
                  styles.genderText,
                  { color: selectedGender === 'male' ? '#FFF' : colors.text },
                ]}
              >
                Male Coach
              </Text>
              {selectedGender === 'male' && (
                <View style={styles.checkMark}>
                  <Ionicons name="checkmark-circle" size={32} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderCard,
                {
                  backgroundColor: selectedGender === 'female' ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedGender('female')}
            >
              <Ionicons
                name="woman"
                size={64}
                color={selectedGender === 'female' ? '#FFF' : colors.primary}
              />
              <Text
                style={[
                  styles.genderText,
                  { color: selectedGender === 'female' ? '#FFF' : colors.text },
                ]}
              >
                Female Coach
              </Text>
              {selectedGender === 'female' && (
                <View style={styles.checkMark}>
                  <Ionicons name="checkmark-circle" size={32} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Coaching Style</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            How would you like your coach to communicate with you?
          </Text>

          <View style={styles.stylesContainer}>
            {coachingStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  {
                    backgroundColor: selectedStyle === style.id ? colors.primary : colors.card,
                    borderColor: selectedStyle === style.id ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedStyle(style.id)}
              >
                <View
                  style={[
                    styles.styleIconContainer,
                    {
                      backgroundColor:
                        selectedStyle === style.id ? 'rgba(255,255,255,0.2)' : style.color + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={style.icon as any}
                    size={32}
                    color={selectedStyle === style.id ? '#FFF' : style.color}
                  />
                </View>

                <View style={styles.styleInfo}>
                  <Text
                    style={[
                      styles.styleName,
                      { color: selectedStyle === style.id ? '#FFF' : colors.text },
                    ]}
                  >
                    {style.name}
                  </Text>
                  <Text
                    style={[
                      styles.styleDescription,
                      {
                        color: selectedStyle === style.id ? 'rgba(255,255,255,0.85)' : colors.textSecondary,
                      },
                    ]}
                  >
                    {style.description}
                  </Text>
                </View>

                {selectedStyle === style.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedGender && selectedStyle && (
          <View style={styles.previewSection}>
            <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
              <LinearGradient
                colors={[colors.primary + '20', colors.card]}
                style={styles.previewGradient}
              >
                <Ionicons name="information-circle" size={32} color={colors.info} />
                <Text style={[styles.previewTitle, { color: colors.text }]}>Your Selection</Text>
                <Text style={[styles.previewText, { color: colors.textSecondary }]}>
                  {selectedGender === 'male' ? 'Male' : 'Female'} coach with a{' '}
                  {coachingStyles.find((s) => s.id === selectedStyle)?.name.toLowerCase()} approach
                </Text>
              </LinearGradient>
            </View>

            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: colors.primary }]}
              onPress={handleComplete}
            >
              <Text style={styles.continueButtonText}>Start My Journey</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  skipButtonText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginTop: Spacing.md,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  sectionDescription: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.lg,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  genderCard: {
    flex: 1,
    padding: Spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  genderText: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  checkMark: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
  stylesContainer: {
    gap: Spacing.md,
  },
  styleCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  styleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleInfo: {
    flex: 1,
  },
  styleName: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: FontSizes.sm,
  },
  previewSection: {
    gap: Spacing.lg,
  },
  previewCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  previewGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  previewText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
});
