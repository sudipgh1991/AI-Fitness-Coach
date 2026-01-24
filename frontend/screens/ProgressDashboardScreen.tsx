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
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function ProgressDashboardScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | '3months'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'steps' | 'water' | 'weight' | 'workouts'>('steps');

  // Weekly Data
  const weeklySteps = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [6500, 7800, 9200, 8100, 10200, 7600, 8542] }],
  };

  const weeklyWater = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [7, 8, 6, 9, 7, 5, 6] }],
  };

  const weeklyWeight = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [75.5, 75.3, 75.2, 75.0, 74.9, 75.1, 74.8] }],
  };

  const weeklyWorkouts = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [1, 1, 0, 1, 1, 1, 0] }],
  };

  // Monthly Data
  const monthlySteps = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [7800, 8900, 9200, 8500] }],
  };

  const monthlyWater = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [6.5, 7.2, 7.8, 7.1] }],
  };

  const monthlyWeight = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [76.5, 76.0, 75.5, 74.8] }],
  };

  const monthlyWorkouts = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [4, 5, 5, 5] }],
  };

  // 3-Month Data
  const threeMonthsSteps = {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{ data: [7200, 8100, 8600] }],
  };

  const threeMonthsWater = {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{ data: [5.8, 6.5, 7.1] }],
  };

  const threeMonthsWeight = {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{ data: [78.2, 76.8, 74.8] }],
  };

  const threeMonthsWorkouts = {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{ data: [12, 16, 19] }],
  };

  const getChartData = () => {
    if (selectedPeriod === 'week') {
      switch (selectedMetric) {
        case 'steps': return weeklySteps;
        case 'water': return weeklyWater;
        case 'weight': return weeklyWeight;
        case 'workouts': return weeklyWorkouts;
      }
    } else if (selectedPeriod === 'month') {
      switch (selectedMetric) {
        case 'steps': return monthlySteps;
        case 'water': return monthlyWater;
        case 'weight': return monthlyWeight;
        case 'workouts': return monthlyWorkouts;
      }
    } else {
      switch (selectedMetric) {
        case 'steps': return threeMonthsSteps;
        case 'water': return threeMonthsWater;
        case 'weight': return threeMonthsWeight;
        case 'workouts': return threeMonthsWorkouts;
      }
    }
  };

  const getMetricInfo = () => {
    const current = getChartData().datasets[0].data;
    const currentValue = current[current.length - 1];
    const previousValue = current[current.length - 2];
    const change = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
    const isPositive = currentValue > previousValue;

    const metricInfo: any = {
      steps: {
        icon: 'footsteps',
        name: 'Steps',
        current: `${currentValue.toLocaleString()}`,
        unit: 'steps',
        goal: '10,000',
        color: colors.primary,
      },
      water: {
        icon: 'water',
        name: 'Water',
        current: `${currentValue}`,
        unit: 'glasses',
        goal: '8',
        color: '#3B82F6',
      },
      weight: {
        icon: 'scale',
        name: 'Weight',
        current: `${currentValue}`,
        unit: 'kg',
        goal: '73',
        color: '#10B981',
      },
      workouts: {
        icon: 'fitness',
        name: 'Workouts',
        current: `${currentValue}`,
        unit: 'sessions',
        goal: selectedPeriod === 'week' ? '5' : selectedPeriod === 'month' ? '20' : '60',
        color: '#F59E0B',
      },
    };

    return {
      ...metricInfo[selectedMetric],
      change,
      isPositive: selectedMetric === 'weight' ? !isPositive : isPositive,
    };
  };

  const overallProgress = {
    steps: 84,
    water: 88,
    nutrition: 86,
    workouts: 100,
    sleep: 90,
    habits: 80,
  };

  const milestones = [
    {
      title: '10,000 Steps Achieved',
      description: 'Hit 10K steps 5 times this week',
      date: 'Jan 15, 2024',
      icon: 'footsteps',
      color: colors.primary,
      completed: true,
    },
    {
      title: 'Weight Milestone',
      description: 'Lost 2kg this month',
      date: 'Jan 12, 2024',
      icon: 'trending-down',
      color: colors.success,
      completed: true,
    },
    {
      title: 'Hydration Streak',
      description: '7-day water goal streak',
      date: 'Jan 10, 2024',
      icon: 'water',
      color: '#3B82F6',
      completed: true,
    },
    {
      title: 'Workout Warrior',
      description: 'Complete 20 workouts this month',
      date: 'Target: Jan 31',
      icon: 'trophy',
      color: '#F59E0B',
      completed: false,
    },
  ];

  const comparisonData = {
    thisWeek: {
      steps: 8406,
      water: 7,
      workouts: 5,
      calories: 1890,
      sleep: 7.2,
    },
    lastWeek: {
      steps: 7200,
      water: 6,
      workouts: 4,
      calories: 2100,
      sleep: 6.8,
    },
  };

  const getComparison = (current: number, previous: number, higherIsBetter: boolean = true) => {
    const diff = current - previous;
    const percentChange = ((diff / previous) * 100).toFixed(1);
    const isImprovement = higherIsBetter ? diff > 0 : diff < 0;
    
    return {
      diff: Math.abs(diff),
      percentChange: Math.abs(parseFloat(percentChange)),
      isImprovement,
    };
  };

  const metricInfo = getMetricInfo();

  const progressChartData = {
    labels: Object.keys(overallProgress),
    data: Object.values(overallProgress).map(v => v / 100),
  };

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
          <Text style={styles.headerTitle}>Progress Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Quick Stats */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overall Progress</Text>
          <ProgressChart
            data={progressChartData}
            width={screenWidth - Spacing.lg * 4}
            height={220}
            strokeWidth={12}
            radius={28}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              color: (opacity = 1, index) => {
                const progressColors = [
                  colors.primary,
                  '#3B82F6',
                  '#10B981',
                  '#F59E0B',
                  '#8B5CF6',
                  '#EC4899',
                ];
                return progressColors[index || 0];
              },
              labelColor: (opacity = 1) => colors.textSecondary,
            }}
            hideLegend={false}
          />

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {Object.entries(overallProgress).map(([key, value]) => (
              <View key={key} style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.text }]}>{value}%</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Metric Selector */}
        <View style={styles.metricSelector}>
          {(['steps', 'water', 'weight', 'workouts'] as const).map((metric) => {
            const info = {
              steps: { icon: 'footsteps', color: colors.primary },
              water: { icon: 'water', color: '#3B82F6' },
              weight: { icon: 'scale', color: '#10B981' },
              workouts: { icon: 'fitness', color: '#F59E0B' },
            }[metric];

            return (
              <TouchableOpacity
                key={metric}
                style={[
                  styles.metricButton,
                  {
                    backgroundColor: selectedMetric === metric ? info.color : colors.card,
                  },
                ]}
                onPress={() => setSelectedMetric(metric)}
              >
                <Ionicons
                  name={info.icon as any}
                  size={20}
                  color={selectedMetric === metric ? '#FFF' : colors.text}
                />
                <Text
                  style={[
                    styles.metricButtonText,
                    { color: selectedMetric === metric ? '#FFF' : colors.text },
                  ]}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Current Metric Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={[styles.metricHeader, { backgroundColor: metricInfo.color + '20' }]}>
            <View style={styles.metricHeaderLeft}>
              <Ionicons name={metricInfo.icon as any} size={32} color={metricInfo.color} />
              <View style={styles.metricHeaderText}>
                <Text style={[styles.metricName, { color: colors.text }]}>
                  {metricInfo.name}
                </Text>
                <Text style={[styles.metricCurrent, { color: colors.text }]}>
                  {metricInfo.current} {metricInfo.unit}
                </Text>
              </View>
            </View>
            <View style={styles.metricChange}>
              <Ionicons
                name={metricInfo.isPositive ? 'trending-up' : 'trending-down'}
                size={20}
                color={metricInfo.isPositive ? colors.success : colors.error}
              />
              <Text
                style={[
                  styles.changeText,
                  { color: metricInfo.isPositive ? colors.success : colors.error },
                ]}
              >
                {metricInfo.change}%
              </Text>
            </View>
          </View>

          <View style={styles.goalRow}>
            <Text style={[styles.goalText, { color: colors.textSecondary }]}>
              Goal: {metricInfo.goal} {metricInfo.unit}
            </Text>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['week', 'month', '3months'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                {
                  backgroundColor: selectedPeriod === period ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? '#FFF' : colors.text },
                ]}
              >
                {period === '3months' ? '3 Months' : period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trend Chart */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Trend Analysis
          </Text>
          <LineChart
            data={getChartData()}
            width={screenWidth - Spacing.lg * 4}
            height={220}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: selectedMetric === 'weight' ? 1 : 0,
              color: (opacity = 1) => metricInfo.color,
              labelColor: (opacity = 1) => colors.textSecondary,
              style: {
                borderRadius: BorderRadius.md,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: metricInfo.color,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* This Week vs Last Week Comparison */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="git-compare" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              This Week vs Last Week
            </Text>
          </View>

          {Object.entries(comparisonData.thisWeek).map(([key, value]) => {
            const lastWeekValue = comparisonData.lastWeek[key as keyof typeof comparisonData.lastWeek];
            const comparison = getComparison(value, lastWeekValue, key !== 'calories');

            return (
              <View key={key} style={styles.comparisonRow}>
                <View style={styles.comparisonLeft}>
                  <Text style={[styles.comparisonLabel, { color: colors.text }]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                  <Text style={[styles.comparisonValues, { color: colors.textSecondary }]}>
                    {value} vs {lastWeekValue}
                  </Text>
                </View>
                <View style={[
                  styles.comparisonBadge,
                  {
                    backgroundColor: comparison.isImprovement
                      ? colors.success + '20'
                      : colors.error + '20',
                  },
                ]}>
                  <Ionicons
                    name={comparison.isImprovement ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={comparison.isImprovement ? colors.success : colors.error}
                  />
                  <Text
                    style={[
                      styles.comparisonChange,
                      { color: comparison.isImprovement ? colors.success : colors.error },
                    ]}
                  >
                    {comparison.percentChange}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Milestones */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              Milestones
            </Text>
          </View>
          {milestones.map((milestone, index) => (
            <View key={index} style={[styles.milestoneItem, { opacity: milestone.completed ? 1 : 0.6 }]}>
              <View style={[styles.milestoneIcon, { backgroundColor: milestone.color + '20' }]}>
                <Ionicons name={milestone.icon as any} size={24} color={milestone.color} />
              </View>
              <View style={styles.milestoneContent}>
                <View style={styles.milestoneHeader}>
                  <Text style={[styles.milestoneTitle, { color: colors.text }]}>
                    {milestone.title}
                  </Text>
                  {milestone.completed && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  )}
                </View>
                <Text style={[styles.milestoneDescription, { color: colors.textSecondary }]}>
                  {milestone.description}
                </Text>
                <Text style={[styles.milestoneDate, { color: colors.textSecondary }]}>
                  {milestone.date}
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
              onPress={() => navigation.navigate('WeeklyReview')}
            >
              <Ionicons name="analytics" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.primary }]}>
                Weekly Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.secondary + '10' }]}
              onPress={() => navigation.navigate('Goals')}
            >
              <Ionicons name="flag" size={24} color={colors.secondary} />
              <Text style={[styles.actionText, { color: colors.secondary }]}>
                Update Goals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success + '10' }]}
              onPress={() => navigation.navigate('ProgressPhotos')}
            >
              <Ionicons name="images" size={24} color={colors.success} />
              <Text style={[styles.actionText, { color: colors.success }]}>
                Progress Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.warning + '10' }]}
              onPress={() => navigation.navigate('HabitsAnalysis')}
            >
              <Ionicons name="repeat" size={24} color={colors.warning} />
              <Text style={[styles.actionText, { color: colors.warning }]}>
                Habits
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
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.sm,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  metricSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  metricButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  metricButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  metricHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  metricHeaderText: {
    gap: Spacing.xs,
  },
  metricName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  metricCurrent: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  changeText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  goalRow: {
    paddingHorizontal: Spacing.md,
  },
  goalText: {
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  periodButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  periodText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  chart: {
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  comparisonLeft: {
    flex: 1,
  },
  comparisonLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs / 2,
  },
  comparisonValues: {
    fontSize: FontSizes.sm,
  },
  comparisonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  comparisonChange: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  milestoneTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  milestoneDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.xs / 2,
  },
  milestoneDate: {
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  actionText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
});
