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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function OnboardingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();

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
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.alreadyMemberBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-in-outline" size={18} color="#FFF" />
          <Text style={styles.alreadyMemberText}>Already a member?</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="fitness" size={52} color="#FFF" />
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Start your fitness journey today</Text>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Full Name *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: errors.name ? '#EF4444' : colors.border,
              },
            ]}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={(v) => { setName(v); if (errors.name) setErrors((e) => ({ ...e, name: '' })); }}
          />
          {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Phone Number *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: errors.phone ? '#EF4444' : colors.border,
              },
            ]}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(v) => { setPhone(v); if (errors.phone) setErrors((e) => ({ ...e, phone: '' })); }}
          />
          {!!errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Email (Optional)</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Enter your email address"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
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
            style={[
              styles.input,
              styles.dobInput,
              {
                backgroundColor: colors.card,
                borderColor: errors.dob ? '#EF4444' : colors.border,
              },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
            <Text style={{ color: dob ? colors.text : colors.textSecondary, fontSize: FontSizes.md, marginLeft: Spacing.sm }}>
              {dob ? formatDate(dob) : 'Select your date of birth'}
            </Text>
          </TouchableOpacity>
          {!!errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        </View>

        {/* Date Picker - Android inline dialog or iOS modal */}
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

        {/* Signup Button */}
        <TouchableOpacity
          style={[styles.signupButton, { backgroundColor: colors.primary }]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  alreadyMemberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    marginBottom: Spacing.md,
  },
  alreadyMemberText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  headerContent: {
    alignItems: 'center',
    paddingBottom: Spacing.md,
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
    fontWeight: '500',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  inputGroup: {
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
    borderWidth: 1.5,
  },
  dobInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderOption: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: FontSizes.xs,
    marginTop: 4,
    fontWeight: '600',
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: 16,
    marginTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  datePickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  datePickerModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Spacing.xl,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
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
