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
import { ProgressChart, BarChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../components/Card';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function NutritionScreen({ navigation }: any) {
  const { colors } = useTheme();

  // Mock nutrition data
  const todayMacros = {
    protein: 120,
    proteinGoal: 150,
    carbs: 180,
    carbsGoal: 250,
    fat: 55,
    fatGoal: 70,
    calories: 1850,
    caloriesGoal: 2200,
  };

  const meals: Meal[] = [
    {
      id: '1',
      name: 'Oatmeal with Berries',
      type: 'breakfast',
      time: '08:30 AM',
      calories: 350,
      protein: 12,
      carbs: 58,
      fat: 8,
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      time: '01:00 PM',
      calories: 480,
      protein: 45,
      carbs: 35,
      fat: 18,
    },
    {
      id: '3',
      name: 'Protein Shake',
      type: 'snack',
      time: '04:30 PM',
      calories: 220,
      protein: 30,
      carbs: 15,
      fat: 4,
    },
    {
      id: '4',
      name: 'Salmon with Quinoa',
      type: 'dinner',
      time: '07:30 PM',
      calories: 580,
      protein: 42,
      carbs: 48,
      fat: 20,
    },
    {
      id: '5',
      name: 'Greek Yogurt',
      type: 'snack',
      time: '09:00 PM',
      calories: 120,
      protein: 15,
      carbs: 10,
      fat: 3,
    },
  ];

  // Calculate progress percentages
  const macroProgress = {
    labels: ['Protein', 'Carbs', 'Fat'],
    data: [
      todayMacros.protein / todayMacros.proteinGoal,
      todayMacros.carbs / todayMacros.carbsGoal,
      todayMacros.fat / todayMacros.fatGoal,
    ],
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return 'sunny';
      case 'lunch': return 'restaurant';
      case 'dinner': return 'moon';
      case 'snack': return 'cafe';
      default: return 'fast-food';
    }
  };

  const getMealColor = (type: string) => {
    switch (type) {
      case 'breakfast': return '#FFB800';
      case 'lunch': return '#4CAF50';
      case 'dinner': return '#9C27B0';
      case 'snack': return '#FF5722';
      default: return colors.primary;
    }
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  // Weekly nutrition data
  const weeklyCalories = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [2100, 1950, 2200, 1850, 2050, 2300, 1900],
        color: (opacity = 1) => colors.primary,
      },
    ],
    legend: ['Daily Calories'],
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
          <Text style={styles.headerTitle}>Nutrition</Text>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="add-circle" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Calorie Summary */}
        <View style={styles.calorieSection}>
          <Card>
            <View style={styles.calorieHeader}>
              <Text style={[styles.calorieLabel, { color: colors.textSecondary }]}>
                Calories Consumed
              </Text>
              <View style={styles.calorieValues}>
                <Text style={[styles.calorieConsumed, { color: colors.primary }]}>
                  {todayMacros.calories}
                </Text>
                <Text style={[styles.calorieGoal, { color: colors.textSecondary }]}>
                  / {todayMacros.caloriesGoal}
                </Text>
              </View>
              <View style={styles.calorieBar}>
                <View
                  style={[
                    styles.calorieProgress,
                    {
                      backgroundColor: colors.primary,
                      width: `${(todayMacros.calories / todayMacros.caloriesGoal) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.calorieRemaining, { color: colors.textSecondary }]}>
                {todayMacros.caloriesGoal - todayMacros.calories} cal remaining
              </Text>
            </View>
          </Card>
        </View>

        {/* Macros Progress */}
        <View style={styles.macrosSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Macros</Text>
          <View style={styles.macrosGrid}>
            {/* Protein */}
            <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
              <View style={[styles.macroIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="nutrition" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {todayMacros.protein}g
              </Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Protein</Text>
              <View style={styles.macroProgressBar}>
                <View
                  style={[
                    styles.macroProgressFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${(todayMacros.protein / todayMacros.proteinGoal) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.macroGoalText, { color: colors.textSecondary }]}>
                {todayMacros.proteinGoal}g goal
              </Text>
            </View>

            {/* Carbs */}
            <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
              <View style={[styles.macroIcon, { backgroundColor: colors.info + '20' }]}>
                <Ionicons name="leaf" size={24} color={colors.info} />
              </View>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {todayMacros.carbs}g
              </Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Carbs</Text>
              <View style={styles.macroProgressBar}>
                <View
                  style={[
                    styles.macroProgressFill,
                    {
                      backgroundColor: colors.info,
                      width: `${(todayMacros.carbs / todayMacros.carbsGoal) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.macroGoalText, { color: colors.textSecondary }]}>
                {todayMacros.carbsGoal}g goal
              </Text>
            </View>

            {/* Fat */}
            <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
              <View style={[styles.macroIcon, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="water" size={24} color={colors.warning} />
              </View>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {todayMacros.fat}g
              </Text>
              <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Fat</Text>
              <View style={styles.macroProgressBar}>
                <View
                  style={[
                    styles.macroProgressFill,
                    {
                      backgroundColor: colors.warning,
                      width: `${(todayMacros.fat / todayMacros.fatGoal) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.macroGoalText, { color: colors.textSecondary }]}>
                {todayMacros.fatGoal}g goal
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Overview</Text>
          <Card>
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
        </View>

        {/* Today's Meals */}
        <View style={styles.mealsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Meals</Text>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={[styles.mealCard, { backgroundColor: colors.card }]}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <View style={[styles.mealIconContainer, { backgroundColor: getMealColor(meal.type) + '20' }]}>
                <Ionicons name={getMealIcon(meal.type) as any} size={24} color={getMealColor(meal.type)} />
              </View>
              <View style={styles.mealDetails}>
                <Text style={[styles.mealName, { color: colors.text }]}>{meal.name}</Text>
                <Text style={[styles.mealTime, { color: colors.textSecondary }]}>
                  {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} • {meal.time}
                </Text>
                <View style={styles.mealMacros}>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>
                    {meal.calories} cal
                  </Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>
                    P: {meal.protein}g
                  </Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>
                    C: {meal.carbs}g
                  </Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.mealMacroText, { color: colors.textSecondary }]}>
                    F: {meal.fat}g
                  </Text>
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
  calorieSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  calorieHeader: {
    alignItems: 'center',
  },
  calorieLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  calorieValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.md,
  },
  calorieConsumed: {
    fontSize: 48,
    fontWeight: '800',
  },
  calorieGoal: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    marginLeft: 4,
  },
  calorieBar: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  calorieProgress: {
    height: '100%',
    borderRadius: 6,
  },
  calorieRemaining: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  macrosSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  macrosGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  macroCard: {
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
  macroIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  macroLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  macroProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  macroGoalText: {
    fontSize: 10,
    fontWeight: '500',
  },
  chartSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  mealsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  mealIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  mealMacros: {
    flexDirection: 'row',
    gap: 6,
  },
  mealMacroText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
});
