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
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function SelfAssessmentScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  
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

    if (!formData.name.trim()) newErrors.name = t.saNameLabel;
    if (!formData.contactNumber.trim()) newErrors.contactNumber = t.saContactLabel;
    if (!formData.email.trim()) newErrors.email = t.saEmailLabel;
    if (!formData.gender) newErrors.gender = t.saGenderLabel;
    if (!formData.age.trim()) newErrors.age = t.saAgeLabel;
    if (!formData.weight.trim()) newErrors.weight = t.saWeightLabel;
    if (!formData.height.trim()) newErrors.height = t.saHeightLabel;
    if (formData.hasMedicalConditions && !formData.medicalConditionsDetails.trim()) {
      newErrors.medicalConditionsDetails = t.saMedicalDetailsLabel;
    }
    if (formData.takingMedications && !formData.medicationsDetails.trim()) {
      newErrors.medicationsDetails = t.saMedDetailsLabel;
    }
    if (!formData.followedDietPlans) newErrors.followedDietPlans = t.error;
    if (!formData.dietType) newErrors.dietType = t.error;
    if (!formData.fitnessGoal.trim()) newErrors.fitnessGoal = t.saCurrentGoalQ;
    if (!formData.biggestFear) newErrors.biggestFear = t.error;
    if (formData.biggestFear === t.saFearOpt5 && !formData.biggestFearOther.trim()) {
      newErrors.biggestFearOther = t.saFearSpecify;
    }
    if (!formData.activityLevel) newErrors.activityLevel = t.error;
    if (!formData.typicalMeals.trim()) newErrors.typicalMeals = t.saTypicalMealsQ;
    if (!formData.workoutPreference) newErrors.workoutPreference = t.error;

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

      // Navigate back to coach selection
      navigation.goBack();
    } catch (error) {
      console.error('Error saving assessment data:', error);
      alert(t.error);
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
  ) => {
    const isSelected = (option: string) => formData[field as keyof typeof formData] === option;
    
    return (
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        <View style={styles.radioGroup}>
          {options.map((option) => {
            const selected = isSelected(option);
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: selected ? colors.primary : (errors[field] ? colors.error : colors.border),
                    borderWidth: selected ? 2 : 1,
                  },
                ]}
                onPress={() => {
                  setFormData({ ...formData, [field]: option });
                  if (errors[field]) setErrors({ ...errors, [field]: '' });
                }}
                activeOpacity={0.7}
              >
                <View style={styles.radioContent}>
                  <View style={[
                    styles.radioCircle,
                    { borderColor: selected ? colors.primary : colors.border }
                  ]}>
                    {selected && (
                      <View style={[styles.radioCircleInner, { backgroundColor: colors.primary }]} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.radioText,
                      {
                        color: selected ? colors.primary : colors.text,
                        fontWeight: selected ? '600' : '500',
                      },
                    ]}
                  >
                    {option}
                  </Text>
                  {selected && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={styles.checkmark} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {errors[field] && <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>}
      </View>
    );
  };

  const renderYesNoSwitch = (
    label: string,
    value: boolean,
    field: string,
    required: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <View style={styles.switchContainer}>
        <Text style={[styles.label, styles.switchLabel, { color: colors.text }]}>
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
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.saScreenTitle}</Text>
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
            {t.saIntroText}
          </Text>
        </View>

        {/* Basic Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saBasicInfoSection}</Text>
        
        {renderInput(t.saNameLabel, formData.name, 'name', t.saNamePlaceholder, { required: true })}
        {renderInput(t.saContactLabel, formData.contactNumber, 'contactNumber', t.saContactPlaceholder, { required: true, keyboardType: 'phone-pad' })}
        {renderInput(t.saEmailLabel, formData.email, 'email', t.saEmailPlaceholder, { required: true, keyboardType: 'email-address' })}
        
        {renderRadioGroup(t.saGenderLabel, [t.saGenderMale, t.saGenderFemale, t.saGenderOther], 'gender', true)}
        
        {renderInput(t.saAgeLabel, formData.age, 'age', t.saAgePlaceholder, { required: true, keyboardType: 'numeric' })}
        {renderInput(t.saWeightLabel, formData.weight, 'weight', t.saWeightPlaceholder, { required: true, keyboardType: 'numeric' })}
        {renderInput(t.saHeightLabel, formData.height, 'height', t.saHeightPlaceholder, { required: true, keyboardType: 'numeric' })}

        {/* Medical Information */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saMedicalInfoSection}</Text>
        
        {renderYesNoSwitch(t.saMedicalConditionsQ, formData.hasMedicalConditions, 'hasMedicalConditions', true)}
        
        {formData.hasMedicalConditions && (
          renderInput(t.saMedicalDetailsLabel, formData.medicalConditionsDetails, 'medicalConditionsDetails', t.saMedicalPlaceholder, { required: true, multiline: true, numberOfLines: 3 })
        )}

        {renderYesNoSwitch(t.saMedicationsQ, formData.takingMedications, 'takingMedications', true)}
        
        {formData.takingMedications && (
          renderInput(t.saMedDetailsLabel, formData.medicationsDetails, 'medicationsDetails', t.saMedPlaceholder, { required: true, multiline: true, numberOfLines: 3 })
        )}

        {/* Diet History */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saDietSection}</Text>
        
        {renderRadioGroup(t.saDietBeforeQ, [t.saDietOption1, t.saDietOption2, t.saDietOption3], 'followedDietPlans', true)}
        
        {(formData.followedDietPlans === t.saDietOption2 || formData.followedDietPlans === t.saDietOption3) && (
          renderInput(t.saDietTypesQ, formData.dietPlansDetails, 'dietPlansDetails', t.saDietTypesPlaceholder, { multiline: true, numberOfLines: 2 })
        )}

        {renderRadioGroup(
          t.saDietTypeQ,
          [t.saDietTypeVegetarian, t.saDietTypeNonVeg, t.saDietTypeVegan, t.saDietTypePesc, t.saDietTypeFlex, t.saDietTypeNoPref],
          'dietType',
          true
        )}

        {renderInput(t.saFoodAllergiesQ, formData.foodAllergies, 'foodAllergies', t.saFoodAllergiesPlaceholder, { required: true, multiline: true, numberOfLines: 2 })}

        {/* Fitness Goals */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saFitnessGoalsSection}</Text>
        
        {renderInput(t.saCurrentGoalQ, formData.fitnessGoal, 'fitnessGoal', t.saCurrentGoalPlaceholder, { required: true, multiline: true, numberOfLines: 2 })}

        {renderRadioGroup(
          t.saBiggestFearQ,
          [t.saFearOpt1, t.saFearOpt2, t.saFearOpt3, t.saFearOpt4, t.saFearOpt5],
          'biggestFear',
          true
        )}

        {formData.biggestFear === t.saFearOpt5 && (
          renderInput(t.saFearSpecify, formData.biggestFearOther, 'biggestFearOther', t.saFearSpecifyPlaceholder, { required: true })
        )}

        {/* Activity & Lifestyle */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saActivitySection}</Text>
        
        {renderRadioGroup(
          t.saActivityLevelQ,
          [t.saActivitySedentary, t.saActivityLightlyActive, t.saActivityModerately, t.saActivityVeryActive, t.saActivityExtremelyActive],
          'activityLevel',
          true
        )}

        {renderInput(t.saTypicalMealsQ, formData.typicalMeals, 'typicalMeals', t.saTypicalMealsPlaceholder, { required: true, multiline: true, numberOfLines: 5 })}

        {renderRadioGroup(t.saWorkoutPrefQ, [t.saWorkoutPrefGym, t.saWorkoutPrefHome, t.saWorkoutPrefBoth], 'workoutPreference', true)}

        {/* Optional Notes */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.saAdditionalInfoSection}</Text>
        
        {renderInput(t.saAdditionalNotesQ, formData.additionalNotes, 'additionalNotes', t.saAdditionalNotesPlaceholder, { multiline: true, numberOfLines: 4 })}

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>{t.saSubmitBtn}</Text>
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
    gap: Spacing.xs,
  },
  radioButton: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  checkmark: {
    marginLeft: 'auto',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  switchLabel: {
    flex: 1,
    flexShrink: 1,
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
