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
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface Insight {
  id: string;
  type: 'pattern' | 'suggestion' | 'warning' | 'achievement';
  category: string;
  title: string;
  description: string;
  details: string;
  actionable: boolean;
  action?: {
    label: string;
    screen: string;
  };
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

export default function AIInsightsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'activity' | 'nutrition' | 'sleep' | 'habits'>('all');

  const insights: Insight[] = [
    {
      id: '1',
      type: 'pattern',
      category: 'activity',
      title: 'Weekend Activity Drop Detected',
      description: 'Your activity levels drop by 35% on weekends compared to weekdays.',
      details: 'Analysis of the past 4 weeks shows a consistent pattern:\n\n• Weekday average: 9,200 steps\n• Weekend average: 6,000 steps\n• Largest drop: Saturdays\n\nThis pattern suggests you may benefit from scheduling weekend activities or workouts to maintain consistency throughout the week.',
      actionable: true,
      action: {
        label: 'Schedule Weekend Activity',
        screen: 'WorkoutPlans',
      },
      priority: 'high',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'suggestion',
      category: 'nutrition',
      title: 'Optimize Meal Timing',
      description: 'Your energy levels peak 2 hours after breakfast. Consider scheduling workouts then.',
      details: 'Based on your meal logs and activity data:\n\n• Best performance: 10 AM - 12 PM\n• Post-breakfast energy surge\n• Consistent across 3 weeks\n\nRescheduling your workout to this window could improve performance by 15-20%.',
      actionable: true,
      action: {
        label: 'Adjust Workout Schedule',
        screen: 'WorkoutPlans',
      },
      priority: 'medium',
      timestamp: '3 hours ago',
    },
    {
      id: '3',
      type: 'achievement',
      category: 'habits',
      title: 'Consistency Milestone Reached',
      description: 'You\'ve maintained your morning workout routine for 30 consecutive days!',
      details: 'Congratulations! You\'ve successfully built a strong habit:\n\n• 30-day streak\n• 100% morning workout completion\n• Average start time: 7:15 AM\n\nResearch shows habits formed after 30 days have a 95% chance of becoming permanent. Keep up the excellent work!',
      actionable: false,
      priority: 'low',
      timestamp: '5 hours ago',
    },
    {
      id: '4',
      type: 'warning',
      category: 'sleep',
      title: 'Sleep Pattern Irregularity',
      description: 'Your sleep schedule varies by 3+ hours on weekends, affecting recovery.',
      details: 'Sleep analysis shows:\n\n• Weekday bedtime: 10:30 PM\n• Weekend bedtime: 1:30 AM\n• Recovery impact: -15%\n\nIrregular sleep patterns can reduce workout performance and slow progress. Consider maintaining a consistent sleep schedule, even on weekends.',
      actionable: true,
      action: {
        label: 'Set Sleep Reminders',
        screen: 'Reminders',
      },
      priority: 'high',
      timestamp: '1 day ago',
    },
    {
      id: '5',
      type: 'pattern',
      category: 'nutrition',
      title: 'Post-Workout Nutrition Gap',
      description: 'You often skip post-workout meals, which may affect muscle recovery.',
      details: 'Nutrition timing analysis:\n\n• 60% of workouts: no meal within 2 hours\n• Optimal window missed: 45 minutes post-workout\n• Potential recovery impact: 20-25%\n\nConsuming protein and carbs within 30-60 minutes after exercise can significantly improve recovery and muscle growth.',
      actionable: true,
      action: {
        label: 'View Post-Workout Recipes',
        screen: 'Recipes',
      },
      priority: 'medium',
      timestamp: '1 day ago',
    },
    {
      id: '6',
      type: 'suggestion',
      category: 'activity',
      title: 'Increase Walking Intensity',
      description: 'Your step count is great, but increasing walking pace could burn 30% more calories.',
      details: 'Activity intensity analysis:\n\n• Current pace: ~3.5 km/h\n• Recommended: ~5.5 km/h\n• Additional calorie burn: ~150 cal/day\n• Time investment: same\n\nTry incorporating brisk walking intervals or power walking sessions to maximize the benefits of your daily steps.',
      actionable: true,
      action: {
        label: 'Start Walking Challenge',
        screen: 'Goals',
      },
      priority: 'low',
      timestamp: '2 days ago',
    },
    {
      id: '7',
      type: 'pattern',
      category: 'habits',
      title: 'Stress-Triggered Snacking Pattern',
      description: 'You tend to log unplanned snacks on high-stress days, typically around 3 PM.',
      details: 'Behavioral pattern detected:\n\n• Trigger: Work stress (70% correlation)\n• Time: 3:00 PM - 4:00 PM\n• Frequency: 4-5 times per week\n• Common choices: Sweets, chips\n\nConsider preparing healthy snacks beforehand or using stress management techniques during this time window.',
      actionable: true,
      action: {
        label: 'View Healthy Snack Ideas',
        screen: 'Recipes',
      },
      priority: 'medium',
      timestamp: '2 days ago',
    },
    {
      id: '8',
      type: 'achievement',
      category: 'activity',
      title: 'Cardio Endurance Improved',
      description: 'Your average heart rate during workouts has decreased by 8 BPM over the past month.',
      details: 'Cardiovascular improvement metrics:\n\n• Starting average HR: 152 BPM\n• Current average HR: 144 BPM\n• Improvement: 5.3%\n• Resting HR: also down 3 BPM\n\nThis indicates improved cardiovascular fitness and endurance. Your heart is working more efficiently!',
      actionable: false,
      priority: 'low',
      timestamp: '3 days ago',
    },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: 'apps', color: colors.primary },
    { id: 'activity', label: 'Activity', icon: 'footsteps', color: '#3B82F6' },
    { id: 'nutrition', label: 'Nutrition', icon: 'restaurant', color: '#10B981' },
    { id: 'sleep', label: 'Sleep', icon: 'moon', color: '#8B5CF6' },
    { id: 'habits', label: 'Habits', icon: 'repeat', color: '#F59E0B' },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern':
        return 'analytics';
      case 'suggestion':
        return 'bulb';
      case 'warning':
        return 'warning';
      case 'achievement':
        return 'trophy';
      default:
        return 'information-circle';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'pattern':
        return colors.primary;
      case 'suggestion':
        return '#10B981';
      case 'warning':
        return colors.error;
      case 'achievement':
        return '#F59E0B';
      default:
        return colors.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const filteredInsights = insights.filter(
    insight => selectedCategory === 'all' || insight.category === selectedCategory
  );

  const insightStats = {
    total: insights.length,
    patterns: insights.filter(i => i.type === 'pattern').length,
    suggestions: insights.filter(i => i.type === 'suggestion').length,
    warnings: insights.filter(i => i.type === 'warning').length,
    achievements: insights.filter(i => i.type === 'achievement').length,
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
          <Text style={styles.headerTitle}>AI Insights</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stats Overview */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              Insights Summary
            </Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {insightStats.patterns}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Patterns
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {insightStats.suggestions}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Suggestions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.error }]}>
                {insightStats.warnings}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Warnings
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#F59E0B' }]}>
                {insightStats.achievements}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Achievements
              </Text>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.id ? category.color : colors.card,
                  borderColor: selectedCategory === category.id ? category.color : colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category.id as any)}
            >
              <Ionicons
                name={category.icon as any}
                size={20}
                color={selectedCategory === category.id ? '#FFF' : colors.text}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category.id ? '#FFF' : colors.text },
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Insights List */}
        <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
          {filteredInsights.length} {filteredInsights.length === 1 ? 'Insight' : 'Insights'} Found
        </Text>

        {filteredInsights.map((insight) => (
          <View key={insight.id} style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightIcon, { backgroundColor: getInsightColor(insight.type) + '20' }]}>
                <Ionicons
                  name={getInsightIcon(insight.type) as any}
                  size={24}
                  color={getInsightColor(insight.type)}
                />
              </View>
              <View style={styles.insightHeaderText}>
                <View style={styles.insightTitleRow}>
                  <Text style={[styles.insightTitle, { color: colors.text }]}>
                    {insight.title}
                  </Text>
                  <View
                    style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(insight.priority) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        { color: getPriorityColor(insight.priority) },
                      ]}
                    >
                      {insight.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  {insight.description}
                </Text>
              </View>
            </View>

            <View style={[styles.insightDetails, { backgroundColor: colors.background }]}>
              <Text style={[styles.detailsText, { color: colors.text }]}>
                {insight.details}
              </Text>
            </View>

            <View style={styles.insightFooter}>
              <View style={styles.insightMeta}>
                <Ionicons name="time" size={14} color={colors.textSecondary} />
                <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
                  {insight.timestamp}
                </Text>
                <View style={[styles.categoryTag, { backgroundColor: colors.background }]}>
                  <Text style={[styles.categoryTagText, { color: colors.textSecondary }]}>
                    {insight.category}
                  </Text>
                </View>
              </View>
              {insight.actionable && insight.action && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: getInsightColor(insight.type) }]}
                  onPress={() => navigation.navigate(insight.action!.screen)}
                >
                  <Text style={styles.actionButtonText}>{insight.action.label}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Empty State */}
        {filteredInsights.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="search" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Insights Found
            </Text>
            <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
              Try selecting a different category or keep tracking your activities to generate more insights.
            </Text>
          </View>
        )}

        {/* How It Works */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="help-circle" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: Spacing.sm }]}>
              How AI Insights Work
            </Text>
          </View>
          <View style={styles.howItWorksList}>
            <View style={styles.howItWorksItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={[styles.howItWorksText, { color: colors.text }]}>
                <Text style={{ fontWeight: '700' }}>Data Collection:</Text> We analyze your activity, nutrition, sleep, and habit data continuously.
              </Text>
            </View>
            <View style={styles.howItWorksItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={[styles.howItWorksText, { color: colors.text }]}>
                <Text style={{ fontWeight: '700' }}>Pattern Detection:</Text> AI identifies trends, correlations, and patterns in your behavior.
              </Text>
            </View>
            <View style={styles.howItWorksItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={[styles.howItWorksText, { color: colors.text }]}>
                <Text style={{ fontWeight: '700' }}>Personalized Recommendations:</Text> Generate actionable suggestions tailored to your goals.
              </Text>
            </View>
            <View style={styles.howItWorksItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={[styles.howItWorksText, { color: colors.text }]}>
                <Text style={{ fontWeight: '700' }}>Continuous Learning:</Text> Insights improve as we learn more about your unique patterns.
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
  },
  categoryScroll: {
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  resultsText: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  insightHeaderText: {
    flex: 1,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  insightTitle: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginRight: Spacing.sm,
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
  insightDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  insightDetails: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  detailsText: {
    fontSize: FontSizes.sm,
    lineHeight: 22,
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  timestamp: {
    fontSize: FontSizes.sm,
  },
  categoryTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  emptyState: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  howItWorksList: {
    gap: Spacing.md,
  },
  howItWorksItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  howItWorksText: {
    flex: 1,
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
});
