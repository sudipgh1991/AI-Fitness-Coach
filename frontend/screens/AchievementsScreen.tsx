import React from 'react';
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  target?: number;
  color: string;
}

export default function AchievementsScreen({ navigation }: any) {
  const { colors } = useTheme();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first workout',
      icon: 'footsteps',
      unlocked: true,
      unlockedDate: '2024-01-10',
      color: '#4CAF50',
    },
    {
      id: '2',
      title: '7 Day Streak',
      description: 'Workout 7 days in a row',
      icon: 'flame',
      unlocked: true,
      unlockedDate: '2024-01-12',
      color: '#FF9800',
    },
    {
      id: '3',
      title: 'Iron Warrior',
      description: 'Complete 50 strength workouts',
      icon: 'barbell',
      unlocked: false,
      progress: 32,
      target: 50,
      color: '#F44336',
    },
    {
      id: '4',
      title: 'Marathon Runner',
      description: 'Run 100km in total',
      icon: 'bicycle',
      unlocked: false,
      progress: 68,
      target: 100,
      color: '#2196F3',
    },
    {
      id: '5',
      title: 'Early Bird',
      description: 'Complete 20 morning workouts',
      icon: 'sunny',
      unlocked: true,
      unlockedDate: '2024-01-08',
      color: '#FFD700',
    },
    {
      id: '6',
      title: 'Calorie Crusher',
      description: 'Burn 10,000 calories',
      icon: 'flame-outline',
      unlocked: false,
      progress: 7240,
      target: 10000,
      color: '#E91E63',
    },
    {
      id: '7',
      title: 'Consistency King',
      description: 'Workout 30 days in a row',
      icon: 'trophy',
      unlocked: false,
      progress: 12,
      target: 30,
      color: '#9C27B0',
    },
    {
      id: '8',
      title: 'Step Master',
      description: 'Walk 1 million steps',
      icon: 'walk',
      unlocked: false,
      progress: 542000,
      target: 1000000,
      color: '#00BCD4',
    },
    {
      id: '9',
      title: 'Weight Loss Hero',
      description: 'Lose 10kg',
      icon: 'trending-down',
      unlocked: false,
      progress: 5,
      target: 10,
      color: '#8BC34A',
    },
    {
      id: '10',
      title: 'Hydration Master',
      description: 'Drink 8 glasses for 30 days',
      icon: 'water',
      unlocked: true,
      unlockedDate: '2024-01-14',
      color: '#03A9F4',
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = unlockedCount * 100;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          <Text style={styles.headerTitle}>Achievements</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Stats */}
        <View style={styles.headerStats}>
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{unlockedCount}/{achievements.length}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{Math.round((unlockedCount / achievements.length) * 100)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Unlocked Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Unlocked ({achievements.filter(a => a.unlocked).length})
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements
              .filter(a => a.unlocked)
              .map((achievement) => (
                <TouchableOpacity
                  key={achievement.id}
                  style={[styles.achievementCard, { backgroundColor: colors.card }]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                    <Ionicons name={achievement.icon as any} size={32} color="#FFF" />
                  </View>
                  <Text style={[styles.achievementTitle, { color: colors.text }]}>
                    {achievement.title}
                  </Text>
                  <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                    {achievement.description}
                  </Text>
                  <View style={styles.unlockedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    <Text style={[styles.unlockedText, { color: colors.success }]}>
                      {formatDate(achievement.unlockedDate!)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Locked Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Locked ({achievements.filter(a => !a.unlocked).length})
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements
              .filter(a => !a.unlocked)
              .map((achievement) => (
                <TouchableOpacity
                  key={achievement.id}
                  style={[styles.achievementCard, styles.lockedCard, { backgroundColor: colors.card }]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.achievementIcon, styles.lockedIcon, { backgroundColor: colors.textSecondary + '40' }]}>
                    <Ionicons name={achievement.icon as any} size={32} color={colors.textSecondary} />
                  </View>
                  <Text style={[styles.achievementTitle, { color: colors.textSecondary }]}>
                    {achievement.title}
                  </Text>
                  <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
                    {achievement.description}
                  </Text>
                  {achievement.progress && achievement.target && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              backgroundColor: achievement.color,
                              width: `${(achievement.progress / achievement.target) * 100}%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                        {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
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
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  achievementCard: {
    width: (screenWidth - Spacing.lg * 2 - Spacing.md) / 2,
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  unlockedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    marginTop: Spacing.sm,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});
