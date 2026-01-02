import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function OnboardingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [onboardingType, setOnboardingType] = useState<'call' | 'form' | null>(null);
  
  console.log('OnboardingScreen rendered - step:', step);
  
  // Form data
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
    activityLevel: '',
    fitnessGoal: '',
    medicalConditions: '',
    dietaryPreferences: '',
  });

  const handleComplete = async () => {
    try {
      // Save onboarding data
      await AsyncStorage.setItem('onboardingData', JSON.stringify({
        type: onboardingType,
        formData: onboardingType === 'form' ? formData : null,
        completedAt: new Date().toISOString(),
      }));
      
      // Navigate to coach selection
      navigation.replace('CoachSelection');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      // Still navigate even if save fails
      navigation.replace('CoachSelection');
    }
  };

  const renderWelcomeStep = () => {
    console.log('Rendering welcome step');
    return (
      <View style={styles.stepContainer}>
        <Ionicons name="fitness" size={80} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Welcome to Fitzen!</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Let's personalize your fitness journey
        </Text>
        
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={[styles.skipText, { color: colors.primary }]}>
            Already a member? Sign in
          </Text>
        </TouchableOpacity>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.card }]}
            onPress={() => {
              setOnboardingType('call');
              setStep(2);
            }}
          >
            <LinearGradient
              colors={[colors.primary + '10', colors.card]}
              style={styles.optionGradient}
            >
              <Ionicons name="call" size={48} color={colors.primary} />
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Live Consultation
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Schedule a call with our expert coaches for personalized guidance
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.card }]}
            onPress={() => {
              navigation.replace('SelfAssessment');
            }}
          >
            <LinearGradient
              colors={[colors.secondary + '10', colors.card]}
              style={styles.optionGradient}
            >
              <Ionicons name="clipboard" size={48} color={colors.secondary} />
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Self-Assessment
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Complete a detailed questionnaire at your own pace
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCallBooking = () => (
    <View style={styles.stepContainer}>
      <Ionicons name="call" size={64} color={colors.primary} />
      <Text style={[styles.title, { color: colors.text }]}>Schedule Your Call</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Choose a convenient time for your consultation
      </Text>

      <View style={styles.formContainer}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Ionicons name="time" size={24} color={colors.info} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Duration</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>30-45 minutes</Text>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Ionicons name="person" size={24} color={colors.success} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>What to Expect</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Discuss your fitness goals, health history, and get personalized recommendations
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // In real app, show calendar booking
            handleComplete();
          }}
        >
          <Text style={styles.buttonText}>Book Consultation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={() => setStep(1)}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFormAssessment = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Tell Us About Yourself</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Help us create your perfect fitness plan
      </Text>

      <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Age</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter your age"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Gender</Text>
          <View style={styles.genderButtons}>
            {['Male', 'Female', 'Other'].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor: formData.gender === gender ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setFormData({ ...formData, gender })}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    { color: formData.gender === gender ? '#FFF' : colors.text },
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Height (cm)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter your height"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Current Weight (kg)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter your current weight"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.currentWeight}
            onChangeText={(text) => setFormData({ ...formData, currentWeight: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Target Weight (kg)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter your target weight"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.targetWeight}
            onChangeText={(text) => setFormData({ ...formData, targetWeight: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Activity Level</Text>
          <View style={styles.optionsList}>
            {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: formData.activityLevel === level ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setFormData({ ...formData, activityLevel: level })}
              >
                <Text
                  style={[
                    styles.optionItemText,
                    { color: formData.activityLevel === level ? '#FFF' : colors.text },
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Fitness Goal</Text>
          <View style={styles.optionsList}>
            {['Weight Loss', 'Muscle Gain', 'Maintenance', 'Improved Fitness'].map((goal) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: formData.fitnessGoal === goal ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setFormData({ ...formData, fitnessGoal: goal })}
              >
                <Text
                  style={[
                    styles.optionItemText,
                    { color: formData.fitnessGoal === goal ? '#FFF' : colors.text },
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Medical Conditions (Optional)</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Any medical conditions we should know about?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            value={formData.medicalConditions}
            onChangeText={(text) => setFormData({ ...formData, medicalConditions: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Dietary Preferences (Optional)</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Vegetarian, vegan, allergies, etc."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            value={formData.dietaryPreferences}
            onChangeText={(text) => setFormData({ ...formData, dietaryPreferences: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={handleComplete}
        >
          <Text style={styles.buttonText}>Complete Assessment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={() => setStep(1)}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Go Back</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Get Started</Text>
          <Text style={styles.headerSubtitle}>Step {step} of 2</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {step === 1 && renderWelcomeStep()}
        {step === 2 && onboardingType === 'call' && renderCallBooking()}
        {step === 2 && onboardingType === 'form' && renderFormAssessment()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  stepContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  optionsContainer: {
    width: '100%',
    gap: Spacing.lg,
  },
  optionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  optionGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  optionDescription: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: FontSizes.sm,
  },
  formScroll: {
    width: '100%',
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  input: {
    padding: Spacing.md,
    borderRadius: 12,
    fontSize: FontSizes.md,
  },
  textArea: {
    padding: Spacing.md,
    borderRadius: 12,
    fontSize: FontSizes.md,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  genderButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionItem: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionItemText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButton: {
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '800',
  },
  secondaryButton: {
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  skipButton: {
    marginVertical: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
