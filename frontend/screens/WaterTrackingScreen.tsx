import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface WaterLog {
  date: string;
  amount: number;
  goal: number;
}

export default function WaterTrackingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [todayWater, setTodayWater] = useState(6);
  const [waterGoal] = useState(8);
  const [selectedAmount, setSelectedAmount] = useState(250); // ml

  const weeklyData: WaterLog[] = [
    { date: 'Mon', amount: 7, goal: 8 },
    { date: 'Tue', amount: 8, goal: 8 },
    { date: 'Wed', amount: 6, goal: 8 },
    { date: 'Thu', amount: 9, goal: 8 },
    { date: 'Fri', amount: 7, goal: 8 },
    { date: 'Sat', amount: 5, goal: 8 },
    { date: 'Sun', amount: 6, goal: 8 },
  ];

  const quickAddOptions = [250, 500, 750, 1000]; // ml

  const addWater = (glasses: number) => {
    if (todayWater < waterGoal) {
      setTodayWater(prev => Math.min(prev + glasses, waterGoal + 5));
    }
  };

  const removeWater = () => {
    if (todayWater > 0) {
      setTodayWater(prev => Math.max(prev - 0.5, 0));
    }
  };

  const percentage = (todayWater / waterGoal) * 100;
  const isOnTrack = todayWater >= waterGoal * 0.75;
  const isCompleted = todayWater >= waterGoal;

  const weeklyChart = {
    labels: weeklyData.map(d => d.date),
    datasets: [{
      data: weeklyData.map(d => d.amount),
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  const getStatusColor = () => {
    if (isCompleted) return colors.success;
    if (isOnTrack) return colors.warning;
    return colors.error;
  };

  const getStatusMessage = () => {
    if (isCompleted) return '🎉 Goal achieved!';
    if (isOnTrack) return '💪 Almost there!';
    if (todayWater >= waterGoal * 0.5) return '⚡ Halfway done!';
    return '💧 Keep going!';
  };

  const aiInsights = [
    {
      icon: 'trending-up',
      title: 'Great Progress!',
      description: 'You\'ve hit your goal 5 out of 7 days this week',
      color: colors.success,
    },
    {
      icon: 'time',
      title: 'Best Time Pattern',
      description: 'You drink most water between 10 AM - 2 PM',
      color: colors.primary,
    },
    {
      icon: 'warning',
      title: 'Reminder Needed',
      description: 'Consider setting reminders for evening hydration',
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
          <Text style={styles.headerTitle}>Water Tracking</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Today's Progress */}
        <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Hydration</Text>
          
          {/* Water Glass Visualization */}
          <View style={styles.waterGlassContainer}>
            <View style={styles.glassWrapper}>
              {/* Water Glass SVG-like representation */}
              <View style={[styles.glass, { borderColor: colors.primary }]}>
                <Animated.View 
                  style={[
                    styles.waterFill, 
                    { 
                      backgroundColor: colors.primary + '40',
                      height: `${Math.min(percentage, 100)}%`,
                    }
                  ]}
                />
                <View style={styles.waterWaves} />
              </View>
              <Text style={[styles.percentageText, { color: colors.text }]}>
                {Math.round(percentage)}%
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="water" size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {todayWater}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Glasses
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statBox}>
              <Ionicons name="flag" size={24} color={colors.secondary} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {waterGoal}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Goal
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statBox}>
              <Ionicons name="trending-up" size={24} color={getStatusColor()} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {Math.max(0, waterGoal - todayWater)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                To Go
              </Text>
            </View>
          </View>

          {/* Status Message */}
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusMessage()}
            </Text>
          </View>

          {/* Quick Add Buttons */}
          <View style={styles.quickAddContainer}>
            <Text style={[styles.quickAddTitle, { color: colors.text }]}>Quick Add</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.quickAddButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => addWater(0.5)}
              >
                <Ionicons name="water" size={20} color={colors.primary} />
                <Text style={[styles.quickAddText, { color: colors.primary }]}>½ Glass</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.quickAddButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => addWater(1)}
              >
                <Ionicons name="water" size={24} color={colors.primary} />
                <Text style={[styles.quickAddText, { color: colors.primary }]}>1 Glass</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.quickAddButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => addWater(2)}
              >
                <Ionicons name="water" size={28} color={colors.primary} />
                <Text style={[styles.quickAddText, { color: colors.primary }]}>2 Glasses</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Weekly Trend */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Trend</Text>
            <Text style={[styles.averageText, { color: colors.textSecondary }]}>
              Avg: {(weeklyData.reduce((sum, d) => sum + d.amount, 0) / weeklyData.length).toFixed(1)} glasses/day
            </Text>
          </View>
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
          <View style={styles.goalLine}>
            <View style={[styles.dashedLine, { borderColor: colors.success }]} />
            <Text style={[styles.goalLineText, { color: colors.success }]}>Goal: 8 glasses</Text>
          </View>
        </View>

        {/* AI Insights */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              AI Insights
            </Text>
          </View>
          {aiInsights.map((insight, index) => (
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

        {/* Reminders */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              Hydration Reminders
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.reminderButton, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}
            onPress={() => navigation.navigate('Reminders')}
          >
            <Ionicons name="alarm" size={20} color={colors.primary} />
            <Text style={[styles.reminderText, { color: colors.primary }]}>
              Set Reminders
            </Text>
          </TouchableOpacity>
          <Text style={[styles.reminderHint, { color: colors.textSecondary }]}>
            Get notified to drink water throughout the day
          </Text>
        </View>

        {/* Tips */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>💡 Hydration Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Start your day with a glass of water
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Drink water before each meal
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Keep a water bottle within reach
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={[styles.tipText, { color: colors.text }]}>
                Drink more during/after exercise
              </Text>
            </View>
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
  waterGlassContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  glassWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  glass: {
    width: 120,
    height: 180,
    borderWidth: 3,
    borderRadius: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  waterFill: {
    width: '100%',
    borderRadius: 10,
  },
  waterWaves: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
  },
  divider: {
    width: 1,
    height: 40,
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
  quickAddContainer: {
    marginTop: Spacing.md,
  },
  quickAddTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  quickAddButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  quickAddText: {
    fontSize: FontSizes.sm,
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
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  reminderText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  reminderHint: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: FontSizes.md,
  },
});
