import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes } from '../constants/theme';

export default function CreateAccountScreen({ navigation }: any) {
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date(2000, 0, 1));
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10)
      newErrors.phone = 'Valid 10-digit phone number is required';
    if (!gender) newErrors.gender = 'Please select your gender';
    if (!dob) newErrors.dob = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;
    navigation.navigate('VerifyOTP', {
      phoneNumber: phone,
      signupData: { name, phone, email, gender, dob: dob?.toISOString() },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Account</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={[styles.formSection, { backgroundColor: colors.background }]}>
          <View style={styles.formHeader}>
            <Text style={[styles.formTitle, { color: colors.text }]}>Start your journey</Text>
            <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
              Join thousands transforming their lives with Fitzen
            </Text>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Full Name *</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: errors.name ? '#EF4444' : colors.border }]}>
              <Ionicons name="person-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.inputField, { color: colors.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={(v) => { setName(v); if (errors.name) setErrors((e) => ({ ...e, name: '' })); }}
              />
            </View>
            {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Phone Number *</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: errors.phone ? '#EF4444' : colors.border }]}>
              <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.inputField, { color: colors.text }]}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(v) => { setPhone(v); if (errors.phone) setErrors((e) => ({ ...e, phone: '' })); }}
              />
            </View>
            {!!errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Email (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Email{' '}
              <Text style={[styles.optionalTag, { color: colors.textSecondary }]}>(Optional)</Text>
            </Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.inputField, { color: colors.text }]}
                placeholder="Enter your email address"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Gender *</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderOption,
                    {
                      backgroundColor: gender === g ? colors.primary : colors.card,
                      borderColor: errors.gender && !gender ? '#EF4444' : gender === g ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => { setGender(g); if (errors.gender) setErrors((e) => ({ ...e, gender: '' })); }}
                >
                  <Text style={{ color: gender === g ? '#FFF' : colors.text, fontWeight: '600', fontSize: FontSizes.sm }}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {!!errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Date of Birth *</Text>
            <TouchableOpacity
              style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: errors.dob ? '#EF4444' : colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <Text style={{ color: dob ? colors.text : colors.textSecondary, fontSize: FontSizes.md, flex: 1, paddingVertical: Platform.OS === 'ios' ? 16 : 14 }}>
                {dob ? formatDate(dob) : 'Select your date of birth'}
              </Text>
            </TouchableOpacity>
            {!!errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
          </View>

          {/* Android Date Picker */}
          {showDatePicker && Platform.OS === 'android' && (
            <DateTimePicker
              value={dob || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type !== 'dismissed' && selectedDate) {
                  setDob(selectedDate);
                  if (errors.dob) setErrors((e) => ({ ...e, dob: '' }));
                }
              }}
            />
          )}

          {/* iOS Date Picker Modal */}
          {Platform.OS === 'ios' && (
            <Modal visible={showDatePicker} transparent animationType="slide">
              <View style={styles.datePickerOverlay}>
                <View style={[styles.datePickerModal, { backgroundColor: colors.card }]}>
                  <View style={styles.datePickerHeader}>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text style={[styles.datePickerCancel, { color: colors.textSecondary }]}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={[styles.datePickerTitle, { color: colors.text }]}>Date of Birth</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setDob(tempDate);
                        if (errors.dob) setErrors((e) => ({ ...e, dob: '' }));
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={[styles.datePickerDone, { color: colors.primary }]}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={dob || tempDate}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onChange={(_, selectedDate) => {
                      if (selectedDate) setTempDate(selectedDate);
                    }}
                  />
                </View>
              </View>
            </Modal>
          )}

          {/* Create Account Button */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} activeOpacity={0.87}>
            <LinearGradient
              colors={['#3a6942', '#4b8352', '#60a86a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signupGradient}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
              <Ionicons name="arrow-forward-circle" size={22} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLinkText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
              <Text style={[styles.loginLinkHighlight, { color: colors.primary }]}>Sign In</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: Spacing.xxl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },

  // ── Form ──
  formSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  formHeader: {
    marginBottom: Spacing.lg,
  },
  formTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginBottom: Spacing.xs + 2,
  },
  optionalTag: {
    fontWeight: '400',
    fontSize: FontSizes.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: FontSizes.md,
    paddingVertical: Platform.OS === 'android' ? 14 : 16,
  },
  genderRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: FontSizes.xs,
    marginTop: 5,
    fontWeight: '600',
  },
  signupButton: {
    marginTop: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3a6942',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  signupGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 17,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  loginLinkText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  loginLinkHighlight: {
    fontWeight: '800',
  },

  // ── Date Picker ──
  datePickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  datePickerModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Spacing.xl,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  datePickerTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  datePickerCancel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  datePickerDone: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
