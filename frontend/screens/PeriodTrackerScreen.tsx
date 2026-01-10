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
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

interface PeriodData {
  id: string;
  startDate: Date;
  cycleLength: number;
  notes?: string;
}

export default function PeriodTrackerScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [cycles, setCycles] = useState<PeriodData[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cycleLength, setCycleLength] = useState('28');
  const [notes, setNotes] = useState('');

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClosePicker = () => {
    setShowDatePicker(false);
  };

  const addCycle = () => {
    const length = parseInt(cycleLength);
    if (isNaN(length) || length < 20 || length > 45) {
      Alert.alert('Invalid Input', 'Please enter a cycle length between 20-45 days');
      return;
    }

    const newCycle: PeriodData = {
      id: Date.now().toString(),
      startDate: selectedDate,
      cycleLength: length,
      notes,
    };

    setCycles([newCycle, ...cycles]);
    setNotes('');
    Alert.alert('Success', 'Cycle data added successfully');
  };

  const deleteCycle = (id: string) => {
    Alert.alert(
      'Delete Cycle',
      'Are you sure you want to delete this cycle record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setCycles(cycles.filter(c => c.id !== id)),
        },
      ]
    );
  };

  const getNextCycleDate = () => {
    if (cycles.length === 0) return null;
    const lastCycle = cycles[0];
    const nextDate = new Date(lastCycle.startDate);
    nextDate.setDate(nextDate.getDate() + lastCycle.cycleLength);
    return nextDate;
  };

  const getPhaseInfo = () => {
    if (cycles.length === 0) return null;
    
    const lastCycle = cycles[0];
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - lastCycle.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceStart < 0) return { phase: 'Future', color: colors.textSecondary };
    if (daysSinceStart < 5) return { phase: 'Menstrual', color: colors.error, tip: 'Rest and recovery phase. Focus on gentle exercises.' };
    if (daysSinceStart < 14) return { phase: 'Follicular', color: colors.info, tip: 'High energy! Good time for intense workouts.' };
    if (daysSinceStart < 16) return { phase: 'Ovulation', color: colors.success, tip: 'Peak energy and strength. Push your limits!' };
    if (daysSinceStart < lastCycle.cycleLength) return { phase: 'Luteal', color: colors.warning, tip: 'Energy may decrease. Focus on moderate activities.' };
    
    return { phase: 'Late Cycle', color: colors.textSecondary };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const phaseInfo = getPhaseInfo();
  const nextCycle = getNextCycleDate();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Period Tracker</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Phase Card */}
        {phaseInfo && (
          <Card>
            <View style={styles.phaseCard}>
              <View style={[styles.phaseBadge, { backgroundColor: phaseInfo.color + '20' }]}>
                <Text style={[styles.phaseText, { color: phaseInfo.color }]}>
                  {phaseInfo.phase} Phase
                </Text>
              </View>
              {phaseInfo.tip && (
                <Text style={[styles.phaseTip, { color: colors.textSecondary }]}>
                  💡 {phaseInfo.tip}
                </Text>
              )}
              {nextCycle && (
                <Text style={[styles.nextCycle, { color: colors.textSecondary }]}>
                  Next cycle predicted: {formatDate(nextCycle)}
                </Text>
              )}
            </View>
          </Card>
        )}

        {/* Add New Cycle */}
        <Card title="Log New Cycle">
          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: colors.text }]}>Cycle Start Date</Text>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              <Text style={[styles.dateText, { color: colors.text }]}>
                {formatDate(selectedDate)}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <View>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
                {Platform.OS === 'ios' && (
                  <View style={styles.pickerButtons}>
                    <Button title="Done" onPress={handleClosePicker} fullWidth />
                  </View>
                )}
              </View>
            )}

            <Text style={[styles.label, { color: colors.text }]}>Cycle Length (days)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              value={cycleLength}
              onChangeText={setCycleLength}
              keyboardType="number-pad"
              placeholder="28"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={[styles.label, { color: colors.text }]}>Notes (optional)</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              placeholder="Any symptoms or observations..."
              placeholderTextColor={colors.textSecondary}
            />

            <Button title="Add Cycle Data" onPress={addCycle} fullWidth />
          </View>
        </Card>

        {/* Cycle History */}
        {cycles.length > 0 && (
          <Card title="Cycle History">
            {cycles.map((cycle) => (
              <View
                key={cycle.id}
                style={[styles.cycleItem, { borderBottomColor: colors.border }]}
              >
                <View style={styles.cycleInfo}>
                  <Text style={[styles.cycleDate, { color: colors.text }]}>
                    {formatDate(cycle.startDate)}
                  </Text>
                  <Text style={[styles.cycleLength, { color: colors.textSecondary }]}>
                    {cycle.cycleLength} days
                  </Text>
                  {cycle.notes && (
                    <Text style={[styles.cycleNotes, { color: colors.textSecondary }]} numberOfLines={2}>
                      {cycle.notes}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => deleteCycle(cycle.id)}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        )}

        {/* Info Card */}
        <Card>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={24} color={colors.info} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Track your menstrual cycle to optimize your workouts and nutrition based on your hormonal phases.
              Understanding your cycle helps you work with your body, not against it!
            </Text>
          </View>
        </Card>
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
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  phaseCard: {
    alignItems: 'center',
  },
  phaseBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  phaseText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  phaseTip: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  nextCycle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  inputSection: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  dateText: {
    fontSize: FontSizes.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  cycleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  cycleInfo: {
    flex: 1,
  },
  cycleDate: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  cycleLength: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  cycleNotes: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  infoCard: {
    flexDirection: 'row',
  pickerButtons: {
    marginTop: Spacing.sm,
  },
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
});
