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
import { LineChart, ProgressChart, BarChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface StepsData {
  date: string;
  steps: number;
  distance: number; // km
  calories: number;
  activeMinutes: number;
}

export default function StepsTrackingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [todaySteps, setTodaySteps] = useState(8542);
  const [stepsGoal] = useState(10000);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const weeklyData: StepsData[] = [
    { date: 'Mon', steps: 6500, distance: 4.8, calories: 280, activeMinutes: 35 },
    { date: 'Tue', steps: 7800, distance: 5.7, calories: 340, activeMinutes: 42 },
    { date: 'Wed', steps: 9200, distance: 6.8, calories: 400, activeMinutes: 52 },
    { date: 'Thu', steps: 8100, distance: 6.0, calories: 350, activeMinutes: 45 },
    { date: 'Fri', steps: 10200, distance: 7.5, calories: 445, activeMinutes: 58 },
    { date: 'Sat', steps: 7600, distance: 5.6, calories: 330, activeMinutes: 40 },
    { date: 'Sun', steps: 8542, distance: 6.3, calories: 370, activeMinutes: 47 },
  ];

  const monthlyAverages = {
    week1: 7800,
    week2: 8900,
    week3: 9200,
    week4: 8500,
  };

  const todayDistance = 6.3;
  const todayCalories = 370;
  const todayActiveMinutes = 47;
  const percentage = (todaySteps / stepsGoal) * 100;
  const weeklyAverage = Math.round(weeklyData.reduce((sum, d) => sum + d.steps, 0) / weeklyData.length);

  const getProgressColor = (percent: number) => {
    if (percent >= 100) return colors.success;
    if (percent >= 75) return colors.warning;
    return colors.error;
  };

  const getStatusMessage = () => {
    if (percentage >= 100) return '🎉 Goal crushed!';
    if (percentage >= 75) return '💪 Almost there!';
    if (percentage >= 50) return '⚡ Halfway done!';
    return '🚶 Keep moving!';
  };

  const weeklyChart = {
    labels: weeklyData.map(d => d.date),
    datasets: [{
      data: weeklyData.map(d => d.steps),
      color: (opacity = 1) => colors.primary,
      strokeWidth: 3,
    }],
  };

  const monthlyChart = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      data: [
        monthlyAverages.week1,
        monthlyAverages.week2,
        monthlyAverages.week3,
        monthlyAverages.week4,
      ],
    }],
  };

  const progressData = {
    labels: ['Steps', 'Active\nTime', 'Calories'],
    data: [
      todaySteps / stepsGoal,
      todayActiveMinutes / 60,
      todayCalories / 500,
    ],
  };

  const achievements = [
    {
      icon: 'flame',
      title: '7-Day Streak',
      description: 'Hit your goal 5 days this week',
      color: '#F59E0B',
      unlocked: true,
    },
    {
      icon: 'trophy',
      title: 'Weekend Warrior',
      description: 'Reach 10,000 steps on Saturday',
      color: '#10B981',
      unlocked: true,
    },
    {
      icon: 'star',
      title: 'Early Bird',
      description: 'Complete 5,000 steps before noon',
      color: '#3B82F6',
      unlocked: false,
    },
  ];

  const insights = [
    {
      icon: 'trending-up',
      title: 'Improving Consistency',
      description: 'Your average steps increased by 15% this week compared to last week',
      color: colors.success,
    },
    {
      icon: 'time',
      title: 'Best Activity Time',
      description: 'You\'re most active between 9 AM - 11 AM. Schedule workouts then for best results',
      color: colors.primary,
    },
    {
      icon: 'calendar',
      title: 'Weekend Opportunity',
      description: 'Your weekend activity is 20% lower. Try a morning walk or hike!',
      color: colors.warning,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Steps Tracking</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Today's Progress */}
        <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Activity</Text>
          
          {/* Circular Progress */}
          <View style={styles.circularProgressContainer}>
            <View style={styles.chartWrapper}>
              <ProgressChart
                data={progressData}
                width={screenWidth * 0.5}
                height={180}
                strokeWidth={12}
                radius={26}
                chartConfig={{
                  backgroundColor: colors.card,
                  backgroundGradientFrom: colors.card,
                  backgroundGradientTo: colors.card,
                  color: (opacity = 1, index) => {
                    const progressColors = [colors.primary, colors.secondary, colors.success];
                    return progressColors[index || 0];
                  },
                  labelColor: (opacity = 1) => colors.textSecondary,
                }}
                hideLegend={true}
              />
            </View>

            {/* Center Stats - Now on Right Side */}
            <View style={styles.centerStats}>
              <Text style={[styles.mainSteps, { color: colors.text }]}>
                {todaySteps.toLocaleString()}
              </Text>
              <Text style={[styles.stepsLabel, { color: colors.textSecondary }]}>
                / {stepsGoal.toLocaleString()} steps
              </Text>
              <Text style={[styles.percentageText, { color: getProgressColor(percentage) }]}>
                {Math.round(percentage)}%
              </Text>
            </View>
          </View>

          {/* Progress Legend */}
          <View style={styles.progressLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Steps</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Active Time</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Calories</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: getProgressColor(percentage) + '20' }]}>
            <Text style={[styles.statusText, { color: getProgressColor(percentage) }]}>
              {getStatusMessage()}
            </Text>
          </View>

          {/* Additional Metrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Ionicons name="navigate" size={24} color={colors.primary} />
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {todayDistance} km
              </Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Distance
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="flame" size={24} color={colors.error} />
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {todayCalories}
              </Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Calories
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="time" size={24} color={colors.success} />
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {todayActiveMinutes} min
              </Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                Active
              </Text>
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              { backgroundColor: selectedPeriod === 'week' ? colors.primary : colors.card },
            ]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text
              style={[
                styles.periodText,
                { color: selectedPeriod === 'week' ? '#FFF' : colors.text },
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              { backgroundColor: selectedPeriod === 'month' ? colors.primary : colors.card },
            ]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text
              style={[
                styles.periodText,
                { color: selectedPeriod === 'month' ? '#FFF' : colors.text },
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedPeriod === 'week' ? 'This Week' : 'Monthly Overview'}
            </Text>
            <Text style={[styles.averageText, { color: colors.textSecondary }]}>
              Avg: {weeklyAverage.toLocaleString()} steps
            </Text>
          </View>
          
          {selectedPeriod === 'week' ? (
            <LineChart
              data={weeklyChart}
              width={screenWidth - Spacing.lg * 4}
              height={220}
              chartConfig={{
                backgroundColor: colors.card,
                backgroundGradientFrom: colors.card,
                backgroundGradientTo: colors.card,
                decimalPlaces: 0,
                color: (opacity = 1) => colors.primary,
                labelColor: (opacity = 1) => colors.textSecondary,
                style: {
                  borderRadius: BorderRadius.md,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: colors.primary,
                },
              }}
              bezier
              style={styles.chart}
            />
          ) : (
            <BarChart
              data={monthlyChart}
              width={screenWidth - Spacing.lg * 4}
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
                  borderRadius: BorderRadius.md,
                },
              }}
              style={styles.chart}
            />
          )}

          {/* Goal Reference Line */}
          <View style={styles.goalLine}>
            <View style={[styles.dashedLine, { borderColor: colors.success }]} />
            <Text style={[styles.goalLineText, { color: colors.success }]}>
              Goal: {stepsGoal.toLocaleString()} steps
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              Achievements
            </Text>
          </View>
          {achievements.map((achievement, index) => (
            <View
              key={index}
              style={[
                styles.achievementItem,
                { opacity: achievement.unlocked ? 1 : 0.5 },
              ]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                <Ionicons name={achievement.icon as any} size={24} color={achievement.color} />
              </View>
              <View style={styles.achievementContent}>
                <View style={styles.achievementHeader}>
                  <Text style={[styles.achievementTitle, { color: colors.text }]}>
                    {achievement.title}
                  </Text>
                  {achievement.unlocked && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  )}
                </View>
                <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                  {achievement.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI Insights */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              AI Insights
            </Text>
          </View>
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                <Ionicons name={insight.icon as any} size={20} color={insight.color} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>
                  {insight.title}
                </Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  {insight.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary + '10' }]}
              onPress={() => navigation.navigate('WorkoutPlans')}
            >
              <Ionicons name="fitness" size={28} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.primary }]}>
                Start Workout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.secondary + '10' }]}
              onPress={() => navigation.navigate('Goals')}
            >
              <Ionicons name="flag" size={28} color={colors.secondary} />
              <Text style={[styles.actionText, { color: colors.secondary }]}>
                Adjust Goal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#FFF',
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  progressCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  circularProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  chartWrapper: {
    flex: 1,
  },
  progressCircle: {
    alignItems: 'center',
  },
  centerStats: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Spacing.md,
  },
  progressLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.lg,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  mainSteps: {
    fontSize: 24,
    fontWeight: '700',
  },
  stepsLabel: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },
  percentageText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  statusBadge: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  statusText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginVertical: Spacing.xs,
  },
  metricLabel: {
    fontSize: FontSizes.sm,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  periodButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  periodText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  averageText: {
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
  },
  chart: {
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
  },
  goalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  goalLineText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  insightDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  actionText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
