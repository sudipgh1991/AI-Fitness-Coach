import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { user } = useAuth();

  // Mock data
  const todayStats = {
    steps: 8542,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    activeMinutes: 45,
    activeMinutesGoal: 60,
    distance: 6.2,
  };

  const weeklySteps = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [6500, 7800, 9200, 8100, 10200, 7600, 8542],
    }],
  };

  const weeklyCalories = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [1800, 2100, 1950, 2200, 1900, 2050, 1850],
    }],
  };

  const progressData = {
    labels: ['Steps', 'Calories', 'Active Time'],
    data: [
      todayStats.steps / todayStats.stepsGoal,
      todayStats.calories / todayStats.caloriesGoal,
      todayStats.activeMinutes / todayStats.activeMinutesGoal,
    ],
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: BorderRadius.lg,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const StatCard = ({ icon, title, value, unit, goal, color }: any) => (
    <View style={[styles.statCard, { backgroundColor: colors.card }]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>
        {value}
        <Text style={[styles.statUnit, { color: colors.textSecondary }]}> {unit}</Text>
      </Text>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      {goal && (
        <Text style={[styles.statGoal, { color: colors.textSecondary }]}>
          Goal: {goal} {unit}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: 'rgba(255,255,255,0.8)' }]}>
              Hello,
            </Text>
            <Text style={styles.userName}>
              {user?.name || 'User'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => {}}
          >
            <Ionicons name="notifications-outline" size={26} color="#FFF" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Today's Progress */}
        <Card title="Today's Progress">
          <ProgressChart
            data={progressData}
            width={screenWidth - Spacing.lg * 4}
            height={200}
            strokeWidth={12}
            radius={28}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chart}
          />
        </Card>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="footsteps"
            title="Steps"
            value={todayStats.steps.toLocaleString()}
            unit=""
            goal={todayStats.stepsGoal.toLocaleString()}
            color={colors.primary}
          />
          <StatCard
            icon="flame"
            title="Calories"
            value={todayStats.calories}
            unit="kcal"
            goal={todayStats.caloriesGoal}
            color={colors.secondary}
          />
          <StatCard
            icon="timer"
            title="Active Time"
            value={todayStats.activeMinutes}
            unit="min"
            goal={todayStats.activeMinutesGoal}
            color={colors.success}
          />
          <StatCard
            icon="navigate"
            title="Distance"
            value={todayStats.distance}
            unit="km"
            goal={null}
            color={colors.info}
          />
        </View>

        {/* Weekly Steps Chart */}
        <Card title="Weekly Steps">
          <LineChart
            data={weeklySteps}
            width={screenWidth - Spacing.lg * 4}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={false}
          />
        </Card>

        {/* Weekly Calories Chart */}
        <Card title="Weekly Calories">
          <BarChart
            data={weeklyCalories}
            width={screenWidth - Spacing.lg * 4}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
            withInnerLines={false}
            yAxisLabel=""
            yAxisSuffix=""
          />
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('WorkoutLog')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="barbell" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Log Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.secondary }]}
              onPress={() => navigation.navigate('MealLog')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="restaurant" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Log Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success }]}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="chatbubbles" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>AI Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.info }]}
              onPress={() => navigation.navigate('Goals')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="trophy" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>My Goals</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.sm,
    opacity: 0.7,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.sm,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statUnit: {
    fontSize: FontSizes.md,
  },
  statTitle: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  statGoal: {
    fontSize: FontSizes.xs,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  quickActionsSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  actionButton: {
    width: '47.5%',
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
    textAlign: 'center',
  },
});
