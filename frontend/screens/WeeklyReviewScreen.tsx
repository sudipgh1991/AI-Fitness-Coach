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
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface WeeklyMetrics {
  steps: { average: number; goal: number; completion: number };
  water: { average: number; goal: number; completion: number };
  workouts: { completed: number; goal: number; completion: number };
  nutrition: { tracked: number; goal: number; completion: number };
  sleep: { average: number; goal: number; completion: number };
  habits: { maintained: number; total: number; completion: number };
}

export default function WeeklyReviewScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeklyMetrics: WeeklyMetrics = {
    steps: { average: 8406, goal: 10000, completion: 84 },
    water: { average: 7, goal: 8, completion: 88 },
    workouts: { completed: 5, goal: 5, completion: 100 },
    nutrition: { tracked: 6, goal: 7, completion: 86 },
    sleep: { average: 7.2, goal: 8, completion: 90 },
    habits: { maintained: 4, total: 5, completion: 80 },
  };

  const dailyCompletion = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [75, 85, 90, 80, 95, 70, 85],
    }],
  };

  const progressData = {
    labels: ['Steps', 'Water', 'Workouts', 'Nutrition', 'Sleep', 'Habits'],
    data: [
      weeklyMetrics.steps.completion / 100,
      weeklyMetrics.water.completion / 100,
      weeklyMetrics.workouts.completion / 100,
      weeklyMetrics.nutrition.completion / 100,
      weeklyMetrics.sleep.completion / 100,
      weeklyMetrics.habits.completion / 100,
    ],
  };

  const overallScore = Math.round(
    (weeklyMetrics.steps.completion +
      weeklyMetrics.water.completion +
      weeklyMetrics.workouts.completion +
      weeklyMetrics.nutrition.completion +
      weeklyMetrics.sleep.completion +
      weeklyMetrics.habits.completion) / 6
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 75) return colors.warning;
    return colors.error;
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', message: t.weeklyReviewGradeA };
    if (score >= 80) return { grade: 'B', message: t.weeklyReviewGradeB };
    if (score >= 70) return { grade: 'C', message: t.weeklyReviewGradeC };
    if (score >= 60) return { grade: 'D', message: t.weeklyReviewGradeD };
    return { grade: 'F', message: t.weeklyReviewGradeF };
  };

  const achievements = [
    {
      icon: 'flame',
      title: 'Workout Champion',
      description: 'Completed all 5 planned workouts this week',
      color: '#F59E0B',
    },
    {
      icon: 'water',
      title: 'Hydration Hero',
      description: 'Hit water goal 5 out of 7 days',
      color: '#3B82F6',
    },
    {
      icon: 'trending-up',
      title: 'Consistent Progress',
      description: '15% improvement from last week',
      color: '#10B981',
    },
  ];

  const areasForImprovement = [
    {
      icon: 'footsteps',
      title: 'Steps Goal',
      current: 8406,
      goal: 10000,
      improvement: 'Add 1,600 more steps daily',
      tips: ['Take stairs instead of elevator', 'Walk during phone calls', 'Evening walks after dinner'],
      color: colors.error,
    },
    {
      icon: 'moon',
      title: 'Sleep Quality',
      current: 7.2,
      goal: 8,
      improvement: 'Get 48 more minutes of sleep',
      tips: ['Set consistent bedtime', 'Avoid screens 1 hour before bed', 'Create relaxing bedtime routine'],
      color: colors.warning,
    },
  ];

  const aiSummary = `Based on your performance this week, you've shown exceptional dedication to your fitness journey! You crushed your workout goals with a 100% completion rate and maintained excellent hydration habits. Your overall consistency score of ${overallScore}% demonstrates strong commitment.

However, I've identified two key areas where small improvements could yield significant results:

1. **Daily Steps**: You're averaging 8,406 steps, which is 84% of your goal. Adding just 1,600 more steps (about a 15-minute walk) would help you consistently hit your target.

2. **Sleep Duration**: At 7.2 hours average, you're getting good sleep, but reaching your 8-hour goal would enhance recovery and energy levels.

Your pattern analysis shows you're most active during weekdays and tend to relax more on weekends. Consider balancing this by adding light activities on weekends to maintain momentum.`;

  const weeklyPattern = {
    strengths: [
      'Consistent morning workout routine (5/7 days)',
      'Excellent hydration during work hours',
      'Strong meal tracking discipline',
      'Good recovery between workout sessions',
    ],
    challenges: [
      'Weekend activity drops by 25%',
      'Late-night snacking on Fridays and Saturdays',
      'Inconsistent evening water intake',
      'Sleep schedule varies by 2+ hours on weekends',
    ],
  };

  const nextWeekRecommendations = [
    {
      priority: 'high',
      category: 'Activity',
      recommendation: 'Schedule weekend morning walks',
      impact: 'Will help maintain consistency and add 2,000+ steps',
    },
    {
      priority: 'high',
      category: 'Sleep',
      recommendation: 'Set fixed bedtime alarm for 10:30 PM',
      impact: 'Will improve sleep duration by 30-45 minutes',
    },
    {
      priority: 'medium',
      category: 'Nutrition',
      recommendation: 'Prep healthy snacks for weekend evenings',
      impact: 'Will reduce untracked late-night eating',
    },
    {
      priority: 'medium',
      category: 'Hydration',
      recommendation: 'Set evening water reminders (6 PM, 8 PM)',
      impact: 'Will help meet daily water goal consistently',
    },
  ];

  const metricNames: Record<string, string> = {
    steps: t.steps,
    water: t.water,
    workouts: t.workout,
    nutrition: t.goalsCatNutrition,
    sleep: t.sleep,
    habits: t.habits,
  };

  const scoreGrade = getScoreGrade(overallScore);

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
          <Text style={styles.headerTitle}>{t.weeklyReviewScreenTitle}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Overall Score */}
        <View style={[styles.scoreCard, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[getScoreColor(overallScore) + '20', 'transparent']}
            style={styles.scoreGradient}
          >
            <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
              {t.weeklyReviewScoreTitle}
            </Text>
            <View style={styles.scoreCircle}>
              <Text style={[styles.scoreValue, { color: getScoreColor(overallScore) }]}>
                {overallScore}
              </Text>
              <Text style={[styles.scorePercent, { color: colors.textSecondary }]}>%</Text>
            </View>
            <View style={[styles.gradeBox, { backgroundColor: getScoreColor(overallScore) + '20' }]}>
              <Text style={[styles.gradeText, { color: getScoreColor(overallScore) }]}>
                {t.weeklyReviewGradeLabel} {scoreGrade.grade}
              </Text>
              <Text style={[styles.gradeMessage, { color: getScoreColor(overallScore) }]}>
                {scoreGrade.message}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Progress Breakdown */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.weeklyReviewProgressBreakdownTitle}</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - Spacing.lg * 5}
            height={200}
            strokeWidth={10}
            radius={24}
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

          {/* Metrics Grid */}
          <View style={styles.metricsGrid}>
            {Object.entries(weeklyMetrics).map(([key, value]) => (
              <View key={key} style={styles.metricCard}>
                <Text style={[styles.metricName, { color: colors.textSecondary }]}>
                  {metricNames[key] || (key.charAt(0).toUpperCase() + key.slice(1))}
                </Text>
                <Text style={[styles.metricCompletion, { color: colors.text }]}>
                  {value.completion}%
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: getScoreColor(value.completion),
                        width: `${value.completion}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Completion */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.weeklyReviewDailyCompletionTitle}
          </Text>
          <BarChart
            data={dailyCompletion}
            width={screenWidth - Spacing.lg * 4}
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
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
        </View>

        {/* Achievements */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              {t.weeklyReviewAchievementsTitle}
            </Text>
          </View>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                <Ionicons name={achievement.icon as any} size={24} color={achievement.color} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, { color: colors.text }]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                  {achievement.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI Summary */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              {t.weeklyReviewAISummaryTitle}
            </Text>
          </View>
          <Text style={[styles.aiSummaryText, { color: colors.text }]}>
            {aiSummary}
          </Text>
        </View>

        {/* Areas for Improvement */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="bulb" size={24} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              {t.weeklyReviewAreasTitle}
            </Text>
          </View>
          {areasForImprovement.map((area, index) => (
            <View key={index} style={styles.improvementCard}>
              <View style={styles.improvementHeader}>
                <Ionicons name={area.icon as any} size={24} color={area.color} />
                <Text style={[styles.improvementTitle, { color: colors.text }]}>
                  {area.title}
                </Text>
              </View>
              <View style={styles.improvementStats}>
                <Text style={[styles.improvementCurrent, { color: colors.text }]}>
                  Current: {area.current}
                </Text>
                <Text style={[styles.improvementGoal, { color: colors.textSecondary }]}>
                  Goal: {area.goal}
                </Text>
              </View>
              <Text style={[styles.improvementAction, { color: area.color }]}>
                💡 {area.improvement}
              </Text>
              <View style={styles.tipsList}>
                {area.tips.map((tip, tipIndex) => (
                  <View key={tipIndex} style={styles.tipItem}>
                    <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                      {tip}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Pattern Analysis */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="analytics" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              {t.weeklyReviewPatternTitle}
            </Text>
          </View>
          
          <View style={styles.patternSection}>
            <Text style={[styles.patternTitle, { color: colors.success }]}>
              {t.weeklyReviewStrengthsTitle}
            </Text>
            {weeklyPattern.strengths.map((strength, index) => (
              <View key={index} style={styles.patternItem}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={[styles.patternText, { color: colors.text }]}>
                  {strength}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.patternSection, { marginTop: Spacing.md }]}>
            <Text style={[styles.patternTitle, { color: colors.warning }]}>
              {t.weeklyReviewChallengesTitle}
            </Text>
            {weeklyPattern.challenges.map((challenge, index) => (
              <View key={index} style={styles.patternItem}>
                <Ionicons name="alert-circle" size={18} color={colors.warning} />
                <Text style={[styles.patternText, { color: colors.text }]}>
                  {challenge}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next Week Recommendations */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="rocket" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              {t.weeklyReviewRecommendationsTitle}
            </Text>
          </View>
          {nextWeekRecommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        rec.priority === 'high' ? colors.error + '20' : colors.warning + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      { color: rec.priority === 'high' ? colors.error : colors.warning },
                    ]}
                  >
                    {rec.priority === 'high' ? t.weeklyReviewHighPriority : t.weeklyReviewMediumPriority}
                  </Text>
                </View>
                <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
                  {rec.category}
                </Text>
              </View>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                {rec.recommendation}
              </Text>
              <Text style={[styles.impactText, { color: colors.primary }]}>
                {t.weeklyReviewImpactLabel} {rec.impact}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Goals')}
        >
          <Ionicons name="checkmark-done" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>
            {t.weeklyReviewUpdateGoalsBtn}
          </Text>
        </TouchableOpacity>
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
  scoreCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreGradient: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#E5E5E5',
    marginVertical: Spacing.lg,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
  },
  scorePercent: {
    fontSize: FontSizes.lg,
    position: 'absolute',
    bottom: 30,
    right: 35,
  },
  gradeBox: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  gradeText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  gradeMessage: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginTop: Spacing.xs,
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
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.md,
    marginHorizontal: -Spacing.xs,
  },
  metricCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#F5F5F5',
  },
  metricName: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  metricCompletion: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  chart: {
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
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
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  achievementDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  aiSummaryText: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },
  improvementCard: {
    padding: Spacing.md,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  improvementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  improvementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  improvementStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  improvementCurrent: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  improvementGoal: {
    fontSize: FontSizes.sm,
  },
  improvementAction: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  tipsList: {
    gap: Spacing.xs,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  tipText: {
    flex: 1,
    fontSize: FontSizes.sm,
  },
  patternSection: {
    marginBottom: Spacing.sm,
  },
  patternTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  patternText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  recommendationCard: {
    padding: Spacing.md,
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  priorityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  recommendationText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  impactText: {
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
