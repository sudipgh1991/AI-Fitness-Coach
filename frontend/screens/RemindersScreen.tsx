import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

type Reminder = {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  time?: string;
  frequency?: string;
};

export default function RemindersScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Water Intake',
      description: 'Stay hydrated throughout the day',
      icon: 'water',
      enabled: true,
      time: '09:00 AM',
      frequency: 'Every 2 hours',
    },
    {
      id: '2',
      title: 'Daily Steps Goal',
      description: 'Get moving and hit your step target',
      icon: 'walk',
      enabled: true,
      time: '08:00 AM',
      frequency: 'Daily',
    },
    {
      id: '3',
      title: 'Morning Workout',
      description: 'Start your day with exercise',
      icon: 'fitness',
      enabled: false,
      time: '06:30 AM',
      frequency: 'Mon, Wed, Fri',
    },
    {
      id: '4',
      title: 'Evening Workout',
      description: 'Evening training session',
      icon: 'barbell',
      enabled: true,
      time: '06:00 PM',
      frequency: 'Tue, Thu, Sat',
    },
    {
      id: '5',
      title: 'Meal Prep',
      description: 'Prepare healthy meals',
      icon: 'restaurant',
      enabled: false,
      time: '07:00 PM',
      frequency: 'Sunday',
    },
    {
      id: '6',
      title: 'Sleep Reminder',
      description: 'Time to wind down for better rest',
      icon: 'moon',
      enabled: true,
      time: '10:00 PM',
      frequency: 'Daily',
    },
    {
      id: '7',
      title: 'Weigh-in',
      description: 'Track your weekly progress',
      icon: 'scale',
      enabled: false,
      time: '07:00 AM',
      frequency: 'Monday',
    },
    {
      id: '8',
      title: 'Stretch Break',
      description: 'Take a moment to stretch',
      icon: 'body',
      enabled: true,
      time: '02:00 PM',
      frequency: 'Weekdays',
    },
  ]);

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  const getIconColor = (icon: string) => {
    const colorMap: { [key: string]: string } = {
      water: colors.info,
      walk: colors.success,
      fitness: colors.error,
      barbell: colors.warning,
      restaurant: colors.success,
      moon: '#9333EA',
      scale: colors.info,
      body: colors.secondary,
    };
    return colorMap[icon] || colors.primary;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Smart Reminders</Text>
            <Text style={styles.headerSubtitle}>Stay on track with your goals</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Ionicons name="notifications" size={32} color={colors.info} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Customize Your Reminders
            </Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Toggle reminders on/off. All reminders are optional and can be customized to your
              schedule.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.primary + '15', 'transparent']}
              style={styles.statGradient}
            >
              <Ionicons name="checkmark-circle" size={32} color={colors.success} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {reminders.filter((r) => r.enabled).length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active</Text>
            </LinearGradient>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.secondary + '15', 'transparent']}
              style={styles.statGradient}
            >
              <Ionicons name="alarm" size={32} color={colors.warning} />
              <Text style={[styles.statValue, { color: colors.text }]}>{reminders.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total</Text>
            </LinearGradient>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>All Reminders</Text>

        {reminders.map((reminder) => (
          <View key={reminder.id} style={[styles.reminderCard, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: reminder.enabled
                    ? getIconColor(reminder.icon) + '20'
                    : colors.border + '20',
                },
              ]}
            >
              <Ionicons
                name={reminder.icon as any}
                size={28}
                color={reminder.enabled ? getIconColor(reminder.icon) : colors.textSecondary}
              />
            </View>

            <View style={styles.reminderInfo}>
              <Text style={[styles.reminderTitle, { color: colors.text }]}>
                {reminder.title}
              </Text>
              <Text style={[styles.reminderDescription, { color: colors.textSecondary }]}>
                {reminder.description}
              </Text>
              {reminder.time && (
                <View style={styles.reminderDetails}>
                  <Ionicons name="time" size={14} color={colors.textSecondary} />
                  <Text style={[styles.reminderTime, { color: colors.textSecondary }]}>
                    {reminder.time}
                  </Text>
                  {reminder.frequency && (
                    <>
                      <Text style={[styles.separator, { color: colors.border }]}>•</Text>
                      <Text style={[styles.reminderFrequency, { color: colors.textSecondary }]}>
                        {reminder.frequency}
                      </Text>
                    </>
                  )}
                </View>
              )}
            </View>

            <Switch
              value={reminder.enabled}
              onValueChange={() => toggleReminder(reminder.id)}
              trackColor={{ false: colors.border, true: colors.primary + '60' }}
              thumbColor={reminder.enabled ? colors.primary : '#f4f3f4'}
              ios_backgroundColor={colors.border}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="add-circle" size={32} color={colors.primary} />
          <Text style={[styles.addButtonText, { color: colors.text }]}>
            Add Custom Reminder
          </Text>
        </TouchableOpacity>

        <View style={[styles.tipsCard, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.success + '10', 'transparent']}
            style={styles.tipsGradient}
          >
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={28} color={colors.warning} />
              <Text style={[styles.tipsTitle, { color: colors.text }]}>Tips for Success</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={[styles.tipBullet, { backgroundColor: colors.success }]} />
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                  Set reminders at times when you can actually act on them
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={[styles.tipBullet, { backgroundColor: colors.success }]} />
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                  Start with 2-3 key reminders, then add more as needed
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={[styles.tipBullet, { backgroundColor: colors.success }]} />
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                  Adjust frequency based on your lifestyle and schedule
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

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
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackButton: {
    marginRight: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
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
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
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
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  reminderCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: FontSizes.sm,
    marginBottom: 6,
  },
  reminderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reminderTime: {
    fontSize: FontSizes.xs,
  },
  separator: {
    fontSize: FontSizes.xs,
  },
  reminderFrequency: {
    fontSize: FontSizes.xs,
  },
  addButton: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  addButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  tipsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  tipsGradient: {
    padding: Spacing.lg,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tipsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
});
