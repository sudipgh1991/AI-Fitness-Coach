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

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'workout' | 'nutrition' | 'habit' | 'performance';
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  deadline?: string;
  isCompleted: boolean;
}

export default function GoalsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weight' | 'workout' | 'nutrition' | 'habit' | 'performance'>('all');

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Lose Weight',
      description: 'Reach target weight',
      category: 'weight',
      current: 75,
      target: 70,
      unit: 'kg',
      icon: 'trending-down',
      color: '#10B981',
      deadline: '2026-03-31',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Workout Streak',
      description: 'Exercise every day',
      category: 'workout',
      current: 12,
      target: 30,
      unit: 'days',
      icon: 'flame',
      color: '#F59E0B',
      deadline: '2026-02-01',
      isCompleted: false,
    },
    {
      id: '3',
      title: 'Daily Protein',
      description: 'Hit protein goal daily',
      category: 'nutrition',
      current: 150,
      target: 150,
      unit: 'g',
      icon: 'nutrition',
      color: '#DC2626',
      isCompleted: true,
    },
    {
      id: '4',
      title: 'Water Intake',
      description: 'Drink 8 glasses daily',
      category: 'habit',
      current: 6,
      target: 8,
      unit: 'glasses',
      icon: 'water',
      color: '#3B82F6',
      isCompleted: false,
    },
    {
      id: '5',
      title: '10K Steps',
      description: 'Walk 10,000 steps daily',
      category: 'performance',
      current: 8542,
      target: 10000,
      unit: 'steps',
      icon: 'footsteps',
      color: '#8B5CF6',
      isCompleted: false,
    },
    {
      id: '6',
      title: 'Run 5K',
      description: 'Complete 5K under 30 min',
      category: 'performance',
      current: 32,
      target: 30,
      unit: 'min',
      icon: 'bicycle',
      color: '#EC4899',
      deadline: '2026-02-15',
      isCompleted: false,
    },
    {
      id: '7',
      title: 'Sleep Quality',
      description: 'Get 8 hours sleep',
      category: 'habit',
      current: 7.5,
      target: 8,
      unit: 'hours',
      icon: 'moon',
      color: '#6366F1',
      isCompleted: false,
    },
    {
      id: '8',
      title: 'Build Muscle',
      description: 'Gain 5kg muscle mass',
      category: 'weight',
      current: 2,
      target: 5,
      unit: 'kg',
      icon: 'barbell',
      color: '#EF4444',
      deadline: '2026-06-30',
      isCompleted: false,
    },
  ];

  const categories = [
    { key: 'all' as const, label: 'All', icon: 'apps' },
    { key: 'weight' as const, label: 'Weight', icon: 'scale' },
    { key: 'workout' as const, label: 'Workout', icon: 'barbell' },
    { key: 'nutrition' as const, label: 'Nutrition', icon: 'restaurant' },
    { key: 'habit' as const, label: 'Habit', icon: 'calendar' },
    { key: 'performance' as const, label: 'Performance', icon: 'trophy' },
  ];

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(g => g.category === selectedCategory);

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.isCompleted).length;
  const activeGoals = totalGoals - completedGoals;
  const overallProgress = Math.round((completedGoals / totalGoals) * 100);

  const formatDeadline = (dateStr?: string) => {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
          <Text style={styles.headerTitle}>My Goals</Text>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="add-circle" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressStats}>
            <View style={styles.progressStatItem}>
              <Text style={styles.progressStatValue}>{totalGoals}</Text>
              <Text style={styles.progressStatLabel}>Total</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStatItem}>
              <Text style={styles.progressStatValue}>{activeGoals}</Text>
              <Text style={styles.progressStatLabel}>Active</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStatItem}>
              <Text style={styles.progressStatValue}>{completedGoals}</Text>
              <Text style={styles.progressStatLabel}>Completed</Text>
            </View>
          </View>
          <View style={styles.overallProgressBar}>
            <View style={styles.overallProgressBarBackground}>
              <View
                style={[
                  styles.overallProgressBarFill,
                  { width: `${overallProgress}%` },
                ]}
              />
            </View>
            <Text style={styles.overallProgressText}>{overallProgress}% Complete</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.key ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons
                name={category.icon as any}
                size={18}
                color={selectedCategory === category.key ? '#FFF' : colors.text}
              />
              <Text
                style={[
                  styles.categoryText,
                  { 
                    color: selectedCategory === category.key ? '#FFF' : colors.text,
                  },
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Goals List */}
        <View style={styles.goalsSection}>
          {filteredGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const progressClamped = Math.min(progress, 100);
            
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, { backgroundColor: colors.card }]}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={[goal.color + '08', colors.card]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.goalCardGradient}
                >
                  {/* Header */}
                  <View style={styles.goalHeader}>
                    <View style={styles.goalHeaderLeft}>
                      <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                        <Ionicons name={goal.icon as any} size={24} color={goal.color} />
                      </View>
                      <View style={styles.goalTitleContainer}>
                        <Text style={[styles.goalTitle, { color: colors.text }]}>
                          {goal.title}
                        </Text>
                        <Text style={[styles.goalDescription, { color: colors.textSecondary }]}>
                          {goal.description}
                        </Text>
                      </View>
                    </View>
                    {goal.isCompleted ? (
                      <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
                        <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                      </View>
                    ) : (
                      <Text style={[styles.progressPercent, { color: goal.color }]}>
                        {Math.round(progressClamped)}%
                      </Text>
                    )}
                  </View>

                  {/* Progress */}
                  <View style={styles.goalProgress}>
                    <View style={styles.goalValues}>
                      <Text style={[styles.goalCurrent, { color: colors.text }]}>
                        {goal.current} {goal.unit}
                      </Text>
                      <Text style={[styles.goalTarget, { color: colors.textSecondary }]}>
                        / {goal.target} {goal.unit}
                      </Text>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: goal.color + '20' }]}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            backgroundColor: goal.color,
                            width: `${progressClamped}%`,
                          },
                        ]}
                      />
                    </View>
                    {goal.deadline && (
                      <View style={styles.deadlineContainer}>
                        <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                        <Text style={[styles.deadlineText, { color: colors.textSecondary }]}>
                          {formatDeadline(goal.deadline)}
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredGoals.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              No goals in this category
            </Text>
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: '#FFF',
  },
  progressSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressStatItem: {
    alignItems: 'center',
  },
  progressStatValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  progressStatLabel: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  overallProgressBar: {
    alignItems: 'center',
  },
  overallProgressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  overallProgressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  overallProgressText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.95)',
  },
  categoryScroll: {
    marginBottom: Spacing.lg,
  },
  categoryContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  goalsSection: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  goalCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  goalCardGradient: {
    padding: Spacing.lg,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  goalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTitleContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  completedBadge: {
    borderRadius: 20,
    padding: 4,
  },
  progressPercent: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
  },
  goalProgress: {
    gap: Spacing.xs,
  },
  goalValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  goalCurrent: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  goalTarget: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadlineText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
    gap: Spacing.md,
  },
  emptyStateText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
