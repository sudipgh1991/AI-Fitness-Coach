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
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

type CravingLog = {
  id: string;
  date: string;
  time: string;
  food: string;
  intensity: number; // 1-5
  trigger?: string;
};

type HabitLog = {
  id: string;
  habit: string;
  streak: number;
  lastCompleted: string;
  completionRate: number; // percentage
};

export default function HabitsAnalysisScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedView, setSelectedView] = useState<'cravings' | 'habits' | 'insights'>('cravings');

  const cravings: CravingLog[] = [
    { id: '1', date: '2024-01-29', time: '3:00 PM', food: 'Chocolate', intensity: 4, trigger: 'Stress' },
    { id: '2', date: '2024-01-29', time: '9:00 PM', food: 'Ice Cream', intensity: 3, trigger: 'Boredom' },
    { id: '3', date: '2024-01-28', time: '4:00 PM', food: 'Chips', intensity: 5, trigger: 'Hunger' },
    { id: '4', date: '2024-01-28', time: '10:00 PM', food: 'Pizza', intensity: 4, trigger: 'Social' },
    { id: '5', date: '2024-01-27', time: '2:00 PM', food: 'Cookies', intensity: 3, trigger: 'Stress' },
  ];

  const habits: HabitLog[] = [
    { id: '1', habit: 'Drink 8 glasses of water', streak: 12, lastCompleted: '2024-01-29', completionRate: 92 },
    { id: '2', habit: 'No late night snacking', streak: 5, lastCompleted: '2024-01-29', completionRate: 78 },
    { id: '3', habit: 'Meal prep on Sundays', streak: 3, lastCompleted: '2024-01-28', completionRate: 85 },
    { id: '4', habit: 'Track all meals', streak: 8, lastCompleted: '2024-01-29', completionRate: 88 },
  ];

  // Craving frequency by time of day
  const timeOfDayData = {
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    datasets: [
      {
        data: [2, 8, 5, 7], // Sample data
      },
    ],
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 2) return colors.success;
    if (intensity <= 3) return colors.warning;
    return colors.error;
  };

  const getTriggerIcon = (trigger?: string) => {
    switch (trigger) {
      case 'Stress':
        return 'alert-circle';
      case 'Boredom':
        return 'time';
      case 'Hunger':
        return 'restaurant';
      case 'Social':
        return 'people';
      default:
        return 'help-circle';
    }
  };

  const renderCravingsView = () => (
    <>
      <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
        <LinearGradient
          colors={[colors.primary + '15', 'transparent']}
          style={styles.statsGradient}
        >
          <Text style={[styles.statsTitle, { color: colors.text }]}>
            Craving Patterns
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>{cravings.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                This Week
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>3.8</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Avg Intensity
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>Stress</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Top Trigger
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Cravings by Time of Day
        </Text>
        <BarChart
          data={timeOfDayData}
          width={screenWidth - Spacing.lg * 2 - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: colors.card,
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.primary,
            labelColor: (opacity = 1) => colors.textSecondary,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.6,
          }}
          style={styles.chart}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Cravings</Text>

      {cravings.map((craving) => (
        <View key={craving.id} style={[styles.cravingCard, { backgroundColor: colors.card }]}>
          <View style={styles.cravingHeader}>
            <View style={styles.cravingInfo}>
              <Text style={[styles.cravingFood, { color: colors.text }]}>
                {craving.food}
              </Text>
              <View style={styles.cravingMeta}>
                <Ionicons name="calendar" size={14} color={colors.textSecondary} />
                <Text style={[styles.cravingDate, { color: colors.textSecondary }]}>
                  {new Date(craving.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={[styles.separator, { color: colors.border }]}>•</Text>
                <Ionicons name="time" size={14} color={colors.textSecondary} />
                <Text style={[styles.cravingTime, { color: colors.textSecondary }]}>
                  {craving.time}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.intensityBadge,
                { backgroundColor: getIntensityColor(craving.intensity) + '20' },
              ]}
            >
              <Text
                style={[
                  styles.intensityText,
                  { color: getIntensityColor(craving.intensity) },
                ]}
              >
                {craving.intensity}/5
              </Text>
            </View>
          </View>
          {craving.trigger && (
            <View style={styles.triggerContainer}>
              <Ionicons
                name={getTriggerIcon(craving.trigger) as any}
                size={16}
                color={colors.primary}
              />
              <Text style={[styles.triggerText, { color: colors.textSecondary }]}>
                Trigger: {craving.trigger}
              </Text>
            </View>
          )}
        </View>
      ))}
    </>
  );

  const renderHabitsView = () => (
    <>
      <View style={[styles.overallCard, { backgroundColor: colors.card }]}>
        <LinearGradient
          colors={[colors.success + '15', 'transparent']}
          style={styles.overallGradient}
        >
          <Ionicons name="trophy" size={48} color={colors.success} />
          <Text style={[styles.overallValue, { color: colors.text }]}>86%</Text>
          <Text style={[styles.overallLabel, { color: colors.textSecondary }]}>
            Overall Completion Rate
          </Text>
        </LinearGradient>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Habits</Text>

      {habits.map((habit) => (
        <View key={habit.id} style={[styles.habitCard, { backgroundColor: colors.card }]}>
          <View style={styles.habitHeader}>
            <View style={styles.habitInfo}>
              <Text style={[styles.habitName, { color: colors.text }]}>{habit.habit}</Text>
              <Text style={[styles.habitLastCompleted, { color: colors.textSecondary }]}>
                Last completed:{' '}
                {new Date(habit.lastCompleted).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={[styles.streakBadge, { backgroundColor: colors.warning + '20' }]}>
              <Ionicons name="flame" size={20} color={colors.warning} />
              <Text style={[styles.streakText, { color: colors.warning }]}>
                {habit.streak}
              </Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.success,
                    width: `${habit.completionRate}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {habit.completionRate}%
            </Text>
          </View>
        </View>
      ))}
    </>
  );

  const renderInsightsView = () => (
    <>
      <View style={[styles.insightCard, { backgroundColor: colors.card }]}>
        <LinearGradient
          colors={[colors.info + '15', 'transparent']}
          style={styles.insightGradient}
        >
          <View style={styles.insightHeader}>
            <Ionicons name="bulb" size={32} color={colors.warning} />
            <Text style={[styles.insightTitle, { color: colors.text }]}>
              Key Insights
            </Text>
          </View>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <View style={[styles.insightBullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.insightText, { color: colors.text }]}>
                You tend to crave sweets most in the afternoon (3-5 PM). Try having a healthy
                snack ready during this time.
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={[styles.insightBullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.insightText, { color: colors.text }]}>
                Stress is your #1 craving trigger. Consider stress management techniques like
                meditation or a short walk.
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={[styles.insightBullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.insightText, { color: colors.text }]}>
                Your water intake habit has a 12-day streak! Keep up the great work.
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={[styles.insightBullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.insightText, { color: colors.text }]}>
                Late night snacking is improving. You've avoided it 5 nights in a row.
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={[styles.tipsCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.tipsTitle, { color: colors.text }]}>
          Personalized Recommendations
        </Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <View style={[styles.tipIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: colors.text }]}>
                Prepare Afternoon Snacks
              </Text>
              <Text style={[styles.tipDescription, { color: colors.textSecondary }]}>
                Pre-portion healthy snacks like nuts, fruits, or yogurt for your high-craving
                times
              </Text>
            </View>
          </View>
          <View style={styles.tipItem}>
            <View style={[styles.tipIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="water" size={24} color={colors.info} />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: colors.text }]}>Stay Hydrated</Text>
              <Text style={[styles.tipDescription, { color: colors.textSecondary }]}>
                Sometimes thirst masquerades as hunger. Drink water before reaching for snacks
              </Text>
            </View>
          </View>
          <View style={styles.tipItem}>
            <View style={[styles.tipIcon, { backgroundColor: colors.warning + '20' }]}>
              <Ionicons name="fitness" size={24} color={colors.warning} />
            </View>
            <View style={styles.tipContent}>
              <Text style={[styles.tipTitle, { color: colors.text }]}>
                Movement Breaks
              </Text>
              <Text style={[styles.tipDescription, { color: colors.textSecondary }]}>
                A 5-minute walk can help reduce cravings and manage stress
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );

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
            <Text style={styles.headerTitle}>Habits & Cravings</Text>
            <Text style={styles.headerSubtitle}>Understand your patterns</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: selectedView === 'cravings' ? colors.primary : colors.card,
            },
          ]}
          onPress={() => setSelectedView('cravings')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedView === 'cravings' ? '#FFF' : colors.text },
            ]}
          >
            Cravings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: selectedView === 'habits' ? colors.primary : colors.card,
            },
          ]}
          onPress={() => setSelectedView('habits')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedView === 'habits' ? '#FFF' : colors.text },
            ]}
          >
            Habits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: selectedView === 'insights' ? colors.primary : colors.card,
            },
          ]}
          onPress={() => setSelectedView('insights')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedView === 'insights' ? '#FFF' : colors.text },
            ]}
          >
            Insights
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {selectedView === 'cravings' && renderCravingsView()}
        {selectedView === 'habits' && renderHabitsView()}
        {selectedView === 'insights' && renderInsightsView()}

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
  tabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  tab: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  statsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  statsGradient: {
    padding: Spacing.lg,
  },
  statsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.sm,
  },
  chartCard: {
    padding: Spacing.lg,
    borderRadius: 20,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  chartTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  cravingCard: {
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cravingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  cravingInfo: {
    flex: 1,
  },
  cravingFood: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginBottom: 4,
  },
  cravingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cravingDate: {
    fontSize: FontSizes.xs,
  },
  separator: {
    fontSize: FontSizes.xs,
  },
  cravingTime: {
    fontSize: FontSizes.xs,
  },
  intensityBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  intensityText: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
  },
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  triggerText: {
    fontSize: FontSizes.sm,
  },
  overallCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  overallGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  overallValue: {
    fontSize: 56,
    fontWeight: '800',
    marginVertical: Spacing.sm,
  },
  overallLabel: {
    fontSize: FontSizes.md,
  },
  habitCard: {
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginBottom: 4,
  },
  habitLastCompleted: {
    fontSize: FontSizes.xs,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  streakText: {
    fontSize: FontSizes.md,
    fontWeight: '800',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    minWidth: 40,
  },
  insightCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  insightGradient: {
    padding: Spacing.lg,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  insightTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  insightsList: {
    gap: Spacing.md,
  },
  insightItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  insightText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  tipsCard: {
    padding: Spacing.lg,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tipsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  tipsList: {
    gap: Spacing.lg,
  },
  tipItem: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
});
