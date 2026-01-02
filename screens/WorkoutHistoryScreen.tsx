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
import { Card } from '../components/Card';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface Workout {
  id: string;
  title: string;
  date: string;
  duration: number; // in minutes
  calories: number;
  exercises: number;
  type: 'strength' | 'cardio' | 'yoga' | 'hiit';
}

export default function WorkoutHistoryScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'strength' | 'cardio' | 'yoga' | 'hiit'>('all');

  // Mock workout history data
  const workouts: Workout[] = [
    {
      id: '1',
      title: 'Upper Body Strength',
      date: '2024-01-15',
      duration: 45,
      calories: 320,
      exercises: 8,
      type: 'strength',
    },
    {
      id: '2',
      title: 'Morning Run',
      date: '2024-01-14',
      duration: 30,
      calories: 280,
      exercises: 1,
      type: 'cardio',
    },
    {
      id: '3',
      title: 'HIIT Blast',
      date: '2024-01-13',
      duration: 25,
      calories: 350,
      exercises: 10,
      type: 'hiit',
    },
    {
      id: '4',
      title: 'Evening Yoga',
      date: '2024-01-12',
      duration: 40,
      calories: 150,
      exercises: 12,
      type: 'yoga',
    },
    {
      id: '5',
      title: 'Leg Day',
      date: '2024-01-11',
      duration: 50,
      calories: 380,
      exercises: 9,
      type: 'strength',
    },
  ];

  const filters: Array<'all' | 'strength' | 'cardio' | 'yoga' | 'hiit'> = ['all', 'strength', 'cardio', 'yoga', 'hiit'];

  const filteredWorkouts = selectedFilter === 'all' 
    ? workouts 
    : workouts.filter(w => w.type === selectedFilter);

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case 'strength': return 'barbell';
      case 'cardio': return 'bicycle';
      case 'yoga': return 'body';
      case 'hiit': return 'flash';
      default: return 'fitness';
    }
  };

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case 'strength': return colors.primary;
      case 'cardio': return colors.info;
      case 'yoga': return colors.success;
      case 'hiit': return colors.secondary;
      default: return colors.primary;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Calculate total stats
  const totalStats = workouts.reduce(
    (acc, workout) => ({
      duration: acc.duration + workout.duration,
      calories: acc.calories + workout.calories,
      workouts: acc.workouts + 1,
    }),
    { duration: 0, calories: 0, workouts: 0 }
  );

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
          <Text style={styles.headerTitle}>Workout History</Text>
          <View style={{ width: 28 }} />
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{totalStats.workouts}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Workouts</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Ionicons name="time" size={24} color={colors.info} />
            <Text style={[styles.statValue, { color: colors.text }]}>{totalStats.duration}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Minutes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card }]}>
            <Ionicons name="flame" size={24} color={colors.secondary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{totalStats.calories}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Calories</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                { 
                  backgroundColor: selectedFilter === filter ? colors.primary : colors.card,
                  borderColor: selectedFilter === filter ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { 
                    color: selectedFilter === filter ? '#FFF' : colors.text,
                    fontWeight: selectedFilter === filter ? '700' : '600',
                  },
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Workout List */}
        <View style={styles.workoutList}>
          {filteredWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={[styles.workoutCard, { backgroundColor: colors.card }]}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <View style={[styles.workoutIconContainer, { backgroundColor: getWorkoutColor(workout.type) + '20' }]}>
                <Ionicons name={getWorkoutIcon(workout.type) as any} size={28} color={getWorkoutColor(workout.type)} />
              </View>
              <View style={styles.workoutDetails}>
                <Text style={[styles.workoutTitle, { color: colors.text }]}>{workout.title}</Text>
                <Text style={[styles.workoutDate, { color: colors.textSecondary }]}>{formatDate(workout.date)}</Text>
                <View style={styles.workoutStats}>
                  <View style={styles.workoutStat}>
                    <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.workoutStatText, { color: colors.textSecondary }]}>
                      {workout.duration} min
                    </Text>
                  </View>
                  <View style={styles.workoutStat}>
                    <Ionicons name="flame-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.workoutStatText, { color: colors.textSecondary }]}>
                      {workout.calories} cal
                    </Text>
                  </View>
                  <View style={styles.workoutStat}>
                    <Ionicons name="list-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.workoutStatText, { color: colors.textSecondary }]}>
                      {workout.exercises} exercises
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
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
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: '#FFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  filterContainer: {
    marginBottom: Spacing.lg,
  },
  filterContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 2,
  },
  filterText: {
    fontSize: FontSizes.sm,
  },
  workoutList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: Spacing.md,
  },
  workoutIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutDetails: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutStatText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
});
