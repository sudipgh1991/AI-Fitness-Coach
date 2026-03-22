import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const GOAL_OPTIONS = [
  {
    key: 'weight_loss',
    label: 'Weight Loss',
    sub: 'Burn fat & shed extra kilos',
    icon: 'flame-outline' as const,
    color: '#EF4444',
  },
  {
    key: 'body_recomposition',
    label: 'Body Recomposition',
    sub: 'Build muscle, reduce fat',
    icon: 'barbell-outline' as const,
    color: '#3B82F6',
  },
  {
    key: 'habit_build',
    label: 'Habit Build',
    sub: 'Create lasting daily routines',
    icon: 'checkmark-circle-outline' as const,
    color: '#10B981',
  },
  {
    key: 'lifestyle_modifications',
    label: 'Lifestyle Modifications',
    sub: 'Improve overall wellbeing',
    icon: 'leaf-outline' as const,
    color: '#8B5CF6',
  },
];

function calcAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

export default function EditProfileScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [gender, setGender] = useState<string>(user?.gender || '');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [height, setHeight] = useState(user?.height ? String(user.height) : '');
  const [weight, setWeight] = useState(user?.currentWeight ? String(user.currentWeight) : '');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [goal, setGoal] = useState<string>(user?.fitnessGoal || '');

  const age = dob ? calcAge(dob) : (user?.age ?? null);

  // Mock premium end date — replace with real data when backend provides it
  const premiumEndDate: Date | null = user?.isPremium ? new Date('2026-06-30') : null;
  const daysLeft = premiumEndDate
    ? Math.max(0, Math.ceil((premiumEndDate.getTime() - Date.now()) / 86400000))
    : 0;

  const handleSave = () => {
    Alert.alert('Profile Updated', 'Your profile has been saved successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const fieldLabel = (text: string) => (
    <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>{text}</Text>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      {/* Top bar */}
      <View style={[styles.topBar, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: colors.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.iconBtn}>
          <Text style={[styles.saveBtnText, { color: colors.primary }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Premium Banner */}
        {user?.isPremium && premiumEndDate && (
          <View style={styles.premiumBanner}>
            <Ionicons name="trophy" size={22} color="#F59E0B" />
            <View style={{ flex: 1, marginLeft: Spacing.sm }}>
              <Text style={styles.premiumTitle}>Premium Member</Text>
              <Text style={styles.premiumSub}>Expires {formatDate(premiumEndDate)}</Text>
            </View>
            <View style={styles.expiryBadge}>
              <Text style={styles.expiryText}>{daysLeft} days left</Text>
            </View>
          </View>
        )}

        {/* 1. Name */}
        {fieldLabel('Name')}
        <TextInput
          value={name}
          onChangeText={setName}
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.textSecondary}
          placeholder="Your full name"
        />

        {/* 2. Gender */}
        {fieldLabel('Gender')}
        <View style={styles.pillRow}>
          {(['male', 'female', 'other'] as const).map(g => {
            const isActive = gender === g;
            return (
              <TouchableOpacity
                key={g}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.pillText, { color: isActive ? '#FFF' : colors.text }]}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 3. Date of Birth */}
        {fieldLabel('Date of Birth')}
        <TouchableOpacity
          style={[styles.input, styles.rowInput, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={{ color: dob ? colors.text : colors.textSecondary, fontSize: FontSizes.md }}>
            {dob ? formatDate(dob) : 'DD / MM / YYYY'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob ?? new Date(1990, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={(_, selected) => {
              if (Platform.OS !== 'ios') setShowDatePicker(false);
              if (selected) setDob(selected);
            }}
          />
        )}
        {Platform.OS === 'ios' && showDatePicker && (
          <TouchableOpacity
            onPress={() => setShowDatePicker(false)}
            style={[styles.iosDoneBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={{ color: '#FFF', fontWeight: '700', fontSize: FontSizes.md }}>Done</Text>
          </TouchableOpacity>
        )}

        {/* 4. Age (auto-calculated) */}
        {fieldLabel('Age')}
        <View
          style={[
            styles.input,
            styles.rowInput,
            { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.7 },
          ]}
        >
          <Text style={{ color: age != null ? colors.text : colors.textSecondary, fontSize: FontSizes.md }}>
            {age != null ? `${age} years` : 'Auto-calculated from Date of Birth'}
          </Text>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
        </View>

        {/* 5. Height */}
        {fieldLabel('Height (cm)')}
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.textSecondary}
          placeholder="e.g. 170"
        />

        {/* 6. Weight */}
        {fieldLabel('Weight (kg)')}
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholderTextColor={colors.textSecondary}
          placeholder="e.g. 65"
        />

        {/* 7. Medical Condition */}
        {fieldLabel('Medical Condition')}
        <TextInput
          value={medicalCondition}
          onChangeText={setMedicalCondition}
          style={[
            styles.input,
            styles.multilineInput,
            { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
          ]}
          placeholderTextColor={colors.textSecondary}
          placeholder="Any medical conditions, allergies, or health notes..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* 8. Goal */}
        {fieldLabel('Goal')}
        <View style={styles.goalGrid}>
          {GOAL_OPTIONS.map(g => {
            const isActive = goal === g.key;
            return (
              <TouchableOpacity
                key={g.key}
                activeOpacity={0.8}
                style={[
                  styles.goalCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isActive ? g.color : colors.border,
                    borderWidth: isActive ? 2 : 1,
                  },
                ]}
                onPress={() => setGoal(g.key)}
              >
                {/* Icon circle */}
                <View
                  style={[
                    styles.goalIconCircle,
                    { backgroundColor: isActive ? g.color : g.color + '18' },
                  ]}
                >
                  <Ionicons
                    name={g.icon}
                    size={22}
                    color={isActive ? '#FFF' : g.color}
                  />
                </View>

                {/* Text */}
                <Text
                  style={[
                    styles.goalCardTitle,
                    { color: isActive ? g.color : colors.text },
                  ]}
                >
                  {g.label}
                </Text>
                <Text
                  style={[styles.goalCardSub, { color: colors.textSecondary }]}
                >
                  {g.sub}
                </Text>

                {/* Checkmark badge */}
                {isActive && (
                  <View style={[styles.goalCheck, { backgroundColor: g.color }]}>
                    <Ionicons name="checkmark" size={10} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 48,
    height: 36,
    justifyContent: 'center',
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  saveBtnText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    textAlign: 'right',
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  premiumTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#92400E',
  },
  premiumSub: {
    fontSize: FontSizes.sm,
    color: '#B45309',
    marginTop: 2,
  },
  expiryBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  expiryText: {
    fontSize: FontSizes.xs,
    fontWeight: '800',
    color: '#FFF',
  },
  fieldLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSizes.md,
    height: 50,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  multilineInput: {
    height: 100,
    paddingTop: Spacing.sm,
  },
  iosDoneBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  pillText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  goalCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    paddingBottom: Spacing.md + 4,
    position: 'relative',
    overflow: 'hidden',
  },
  goalIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  goalCardTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
    marginBottom: 3,
  },
  goalCardSub: {
    fontSize: FontSizes.xs,
    lineHeight: 16,
  },
  goalCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
