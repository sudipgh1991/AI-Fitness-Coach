import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function SelfAssessmentScreen({ navigation }: any) {
  const { colors } = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    gender: '',
    age: '',
    weight: '',
    height: '',
    hasMedicalConditions: false,
    medicalConditionsDetails: '',
    takingMedications: false,
    medicationsDetails: '',
    followedDietPlans: '',
    dietPlansDetails: '',
    dietType: '',
    foodAllergies: '',
    fitnessGoal: '',
    biggestFear: '',
    biggestFearOther: '',
    activityLevel: '',
    typicalMeals: '',
    workoutPreference: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    if (!formData.height.trim()) newErrors.height = 'Height is required';
    if (formData.hasMedicalConditions && !formData.medicalConditionsDetails.trim()) {
      newErrors.medicalConditionsDetails = 'Please provide details';
    }
    if (formData.takingMedications && !formData.medicationsDetails.trim()) {
      newErrors.medicationsDetails = 'Please provide details';
    }
    if (!formData.followedDietPlans) newErrors.followedDietPlans = 'This field is required';
    if (!formData.dietType) newErrors.dietType = 'Diet type is required';
    if (!formData.fitnessGoal.trim()) newErrors.fitnessGoal = 'Fitness goal is required';
    if (!formData.biggestFear) newErrors.biggestFear = 'This field is required';
    if (formData.biggestFear === 'Other' && !formData.biggestFearOther.trim()) {
      newErrors.biggestFearOther = 'Please specify';
    }
    if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';
    if (!formData.typicalMeals.trim()) newErrors.typicalMeals = 'Please list your typical meals';
    if (!formData.workoutPreference) newErrors.workoutPreference = 'Workout preference is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Save assessment data
      await AsyncStorage.setItem('selfAssessmentData', JSON.stringify({
        ...formData,
        completedAt: new Date().toISOString(),
      }));
      
      // Also save to onboarding data
      await AsyncStorage.setItem('onboardingData', JSON.stringify({
        type: 'form',
        formData,
        completedAt: new Date().toISOString(),
      }));

      // Navigate to coach selection
      navigation.replace('CoachSelection');
    } catch (error) {
      console.error('Error saving assessment data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  const renderInput = (
    label: string,
    value: string,
    field: string,
    placeholder: string,
    options: {
      required?: boolean;
      multiline?: boolean;
      keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
      numberOfLines?: number;
    } = {}
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
        {options.required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text, borderColor: errors[field] ? colors.error : colors.border },
          options.multiline && styles.textArea,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={(text) => {
          setFormData({ ...formData, [field]: text });
          if (errors[field]) setErrors({ ...errors, [field]: '' });
        }}
        multiline={options.multiline}
        numberOfLines={options.numberOfLines}
        keyboardType={options.keyboardType || 'default'}
      />
      {errors[field] && <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>}
    </View>
  );

  const renderRadioGroup = (
    label: string,
    options: string[],
    field: string,
    required: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={styles.radioGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.radioButton,
              {
                backgroundColor: formData[field as keyof typeof formData] === option ? colors.primary : colors.card,
                borderColor: errors[field] ? colors.error : colors.border,
              },
            ]}
            onPress={() => {
              setFormData({ ...formData, [field]: option });
              if (errors[field]) setErrors({ ...errors, [field]: '' });
            }}
          >
            <Text
              style={[
                styles.radioText,
                {
                  color: formData[field as keyof typeof formData] === option ? '#FFFFFF' : colors.text,
                },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors[field] && <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>}
    </View>
  );

  const renderYesNoSwitch = (
    label: string,
    value: boolean,
    field: string,
    required: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <Switch
          value={value}
          onValueChange={(newValue) => setFormData({ ...formData, [field]: newValue })}
          trackColor={{ false: colors.border, true: colors.primary + '80' }}
          thumbColor={value ? colors.primary : colors.textSecondary}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.replace('Onboarding')}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Self-Assessment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.introCard, { backgroundColor: colors.card }]}>
          <Ionicons name="information-circle" size={24} color={colors.info} />
          <Text style={[styles.introText, { color: colors.textSecondary }]}>
            Please fill out this comprehensive questionnaire to help us create your personalized fitness and nutrition plan.
          </Text>
        </View>

        {/* Basic Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Basic Information</Text>
        
        {renderInput('Name', formData.name, 'name', 'Enter your full name', { required: true })}
        {renderInput('Contact Number', formData.contactNumber, 'contactNumber', 'Enter your contact number', { required: true, keyboardType: 'phone-pad' })}
        {renderInput('Email ID', formData.email, 'email', 'Enter your email', { required: true, keyboardType: 'email-address' })}
        
        {renderRadioGroup('Gender', ['Male', 'Female', 'Other'], 'gender', true)}
        
        {renderInput('Age', formData.age, 'age', 'Enter your age', { required: true, keyboardType: 'numeric' })}
        {renderInput('Weight (kg)', formData.weight, 'weight', 'Enter your weight', { required: true, keyboardType: 'numeric' })}
        {renderInput('Height (cm)', formData.height, 'height', 'Enter your height', { required: true, keyboardType: 'numeric' })}

        {/* Medical Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medical Information</Text>
        
        {renderYesNoSwitch('Do you have any medical conditions?', formData.hasMedicalConditions, 'hasMedicalConditions', true)}
        
        {formData.hasMedicalConditions && (
          renderInput('Please provide details', formData.medicalConditionsDetails, 'medicalConditionsDetails', 'List your medical conditions', { required: true, multiline: true, numberOfLines: 3 })
        )}

        {renderYesNoSwitch('Are you currently taking any medications or supplements?', formData.takingMedications, 'takingMedications', true)}
        
        {formData.takingMedications && (
          renderInput('Please provide details', formData.medicationsDetails, 'medicationsDetails', 'List your medications/supplements', { required: true, multiline: true, numberOfLines: 3 })
        )}

        {/* Diet History */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Diet History</Text>
        
        {renderRadioGroup('Have you followed any diet plans before?', ['No, this is my first time', 'Yes, a few', 'Yes, many'], 'followedDietPlans', true)}
        
        {(formData.followedDietPlans === 'Yes, a few' || formData.followedDietPlans === 'Yes, many') && (
          renderInput('What kind of diets have you tried?', formData.dietPlansDetails, 'dietPlansDetails', 'E.g., Keto, Paleo, Vegan, etc.', { multiline: true, numberOfLines: 2 })
        )}

        {renderRadioGroup(
          'Which type of diet do you follow?',
          ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Pescatarian', 'Flexitarian', 'No Preference'],
          'dietType',
          true
        )}

        {renderInput('Do you have any known food allergies or intolerances?', formData.foodAllergies, 'foodAllergies', 'E.g., Lactose, Gluten, Nuts, etc. (or write "None")', { required: true, multiline: true, numberOfLines: 2 })}

        {/* Fitness Goals */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Fitness Goals</Text>
        
        {renderInput('What is your current health or fitness goal?', formData.fitnessGoal, 'fitnessGoal', 'E.g., Weight loss, Muscle gain, General fitness', { required: true, multiline: true, numberOfLines: 2 })}

        {renderRadioGroup(
          'What is your biggest fear or struggle in your fitness/diet journey?',
          ['I lose motivation', 'I don\'t stick to routines', 'I get confused with what to eat', 'I struggle with emotional eating', 'Other'],
          'biggestFear',
          true
        )}

        {formData.biggestFear === 'Other' && (
          renderInput('Please specify', formData.biggestFearOther, 'biggestFearOther', 'Describe your struggle', { required: true })
        )}

        {/* Activity & Lifestyle */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Activity & Lifestyle</Text>
        
        {renderRadioGroup(
          'What is your Daily Activity Level?',
          ['Sedentary (little or no exercise)', 'Lightly Active (1-3 days/week)', 'Moderately Active (3-5 days/week)', 'Very Active (6-7 days/week)', 'Extremely Active (intense exercise daily)'],
          'activityLevel',
          true
        )}

        {renderInput('Please list your typical daily meals', formData.typicalMeals, 'typicalMeals', 'Breakfast, lunch, snacks, dinner, etc.', { required: true, multiline: true, numberOfLines: 5 })}

        {renderRadioGroup('Do you prefer Gym or Home Workouts?', ['Gym Workout', 'Home Workout', 'Both'], 'workoutPreference', true)}

        {/* Optional Notes */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Additional Information</Text>
        
        {renderInput('Anything else you\'d like me to know?', formData.additionalNotes, 'additionalNotes', 'Optional: Share any additional information', { multiline: true, numberOfLines: 4 })}

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Complete Assessment</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  introCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  introText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  required: {
    color: '#DC2626',
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  radioGroup: {
    gap: Spacing.sm,
  },
  radioButton: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  radioText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
});
