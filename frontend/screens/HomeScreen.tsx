import React, { useState } from 'react';
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
import { Sidebar } from '../components/Sidebar';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Mock data - Enhanced fitness tracking
  const todayStats = {
    steps: 8542,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    caloriesBurned: 420,
    activeMinutes: 45,
    activeMinutesGoal: 60,
    distance: 6.2,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8,
    weight: 75,
    workoutsCompleted: 2,
    streak: 12,
  };

  // Health status color logic: Red (needs improvement), Yellow (acceptable), Green (on track)
  const getHealthStatus = (type: string, value: number, goal?: number) => {
    switch (type) {
      case 'steps':
        if (value < 8000) return { color: '#EF4444', status: 'needs-improvement', icon: 'alert-circle' };
        if (value >= 8000 && value < 10000) return { color: '#F59E0B', status: 'acceptable', icon: 'warning' };
        return { color: '#10B981', status: 'on-track', icon: 'checkmark-circle' };
      
      case 'caloriesBurned':
        if (value < 300) return { color: '#EF4444', status: 'needs-improvement', icon: 'alert-circle' };
        if (value >= 300 && value < 400) return { color: '#F59E0B', status: 'acceptable', icon: 'warning' };
        return { color: '#10B981', status: 'on-track', icon: 'checkmark-circle' };
      
      case 'water':
        const waterPercent = goal ? (value / goal) * 100 : 0;
        if (waterPercent < 60) return { color: '#EF4444', status: 'needs-improvement', icon: 'alert-circle' };
        if (waterPercent >= 60 && waterPercent < 80) return { color: '#F59E0B', status: 'acceptable', icon: 'warning' };
        return { color: '#10B981', status: 'on-track', icon: 'checkmark-circle' };
      
      case 'sleep':
        if (value < 6) return { color: '#EF4444', status: 'needs-improvement', icon: 'alert-circle' };
        if (value >= 6 && value < 7) return { color: '#F59E0B', status: 'acceptable', icon: 'warning' };
        return { color: '#10B981', status: 'on-track', icon: 'checkmark-circle' };
      
      case 'workouts':
        if (value < 1) return { color: '#EF4444', status: 'needs-improvement', icon: 'alert-circle' };
        if (value === 1) return { color: '#F59E0B', status: 'acceptable', icon: 'warning' };
        return { color: '#10B981', status: 'on-track', icon: 'checkmark-circle' };
      
      default:
        return { color: colors.primary, status: 'neutral', icon: 'information-circle' };
    }
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
    colors: [colors.primary, colors.secondary, colors.success],
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: BorderRadius.lg,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '3',
      stroke: colors.primary,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      strokeWidth: 1,
      stroke: colors.border,
      strokeOpacity: 0.3,
    },
  };

  const StatCard = ({ icon, title, value, unit, goal, color }: any) => {
    const progress = goal ? (parseFloat(value.toString().replace(/,/g, '')) / parseFloat(goal.toString().replace(/,/g, ''))) : 0;
    const percentage = goal ? Math.round(progress * 100) : 0;
    
    return (
      <View style={[styles.statCard, { backgroundColor: colors.card }]}>
        <LinearGradient
          colors={[color + '08', colors.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statCardGradient}
        >
          <View style={styles.statCardHeader}>
            <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
              <Ionicons name={icon} size={28} color={color} />
            </View>
            {goal && (
              <View style={[styles.statBadge, { backgroundColor: color + '15' }]}>
                <Text style={[styles.statBadgeText, { color: color }]}>{percentage}%</Text>
              </View>
            )}
          </View>
          <Text style={[styles.statCardTitle, { color: colors.textSecondary }]}>{title}</Text>
          <View style={styles.statValueContainer}>
            <Text style={[styles.statCardValue, { color: colors.text }]}>
              {value}
            </Text>
            {unit && (
              <Text style={[styles.statCardUnit, { color: colors.textSecondary }]}> {unit}</Text>
            )}
          </View>
          {goal && (
            <View style={styles.progressSection}>
              <View style={[styles.progressBarBackground, { backgroundColor: color + '15' }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { backgroundColor: color, width: `${Math.min(progress * 100, 100)}%` },
                  ]}
                />
              </View>
              <Text style={[styles.statCardGoal, { color: colors.textSecondary }]}>
                Goal: {goal} {unit}
              </Text>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Streak */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setSidebarVisible(true)}
            >
              <Ionicons name="menu" size={28} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Hello, {user?.name || 'User'}! 👋
              </Text>
              <Text style={styles.motivationText}>
                Let's crush your goals today!
              </Text>
            </View>
            <View style={styles.streakContainer}>
              <Ionicons name="flame" size={24} color="#FFD700" />
              <Text style={styles.streakText}>{todayStats.streak}</Text>
              <Text style={styles.streakLabel}>day streak</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Today's Goals - Ring Progress */}
        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Goals</Text>
          <View style={[styles.modernChartCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.primary + '08', colors.card]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.goalsGradient}
            >
              <ProgressChart
                data={progressData}
                width={screenWidth - Spacing.lg * 2 - 32}
                height={220}
                strokeWidth={20}
                radius={38}
                chartConfig={{
                  backgroundColor: colors.card,
                  backgroundGradientFrom: colors.card,
                  backgroundGradientTo: colors.card,
                  color: (opacity = 1, index?: number) => {
                    const chartColors = [colors.primary, colors.secondary, colors.success];
                    return index !== undefined ? chartColors[index] : colors.primary;
                  },
                  labelColor: (opacity = 1) => colors.text,
                }}
                hideLegend={true}
                style={{ marginVertical: Spacing.sm }}
              />
            </LinearGradient>
            <View style={styles.progressLegend}>
              <View style={styles.legendItem}>
                <View style={styles.legendIconContainer}>
                  <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                  <Ionicons name="footsteps" size={16} color={colors.primary} style={styles.legendIcon} />
                </View>
                <View style={styles.legendTextContainer}>
                  <Text style={[styles.legendTitle, { color: colors.textSecondary }]}>Steps</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]} numberOfLines={1}>
                    {todayStats.steps.toLocaleString()} / {todayStats.stepsGoal.toLocaleString()}
                  </Text>
                  <Text style={[styles.legendPercent, { color: colors.primary }]}>
                    {Math.round((todayStats.steps / todayStats.stepsGoal) * 100)}%
                  </Text>
                </View>
              </View>
              <View style={styles.legendItem}>
                <View style={styles.legendIconContainer}>
                  <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
                  <Ionicons name="flame" size={16} color={colors.secondary} style={styles.legendIcon} />
                </View>
                <View style={styles.legendTextContainer}>
                  <Text style={[styles.legendTitle, { color: colors.textSecondary }]}>Calories</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]} numberOfLines={1}>
                    {todayStats.calories} / {todayStats.caloriesGoal}
                  </Text>
                  <Text style={[styles.legendPercent, { color: colors.secondary }]}>
                    {Math.round((todayStats.calories / todayStats.caloriesGoal) * 100)}%
                  </Text>
                </View>
              </View>
              <View style={styles.legendItem}>
                <View style={styles.legendIconContainer}>
                  <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                  <Ionicons name="timer" size={16} color={colors.success} style={styles.legendIcon} />
                </View>
                <View style={styles.legendTextContainer}>
                  <Text style={[styles.legendTitle, { color: colors.textSecondary }]}>Active Time</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]} numberOfLines={1}>
                    {todayStats.activeMinutes} / {todayStats.activeMinutesGoal}
                  </Text>
                  <Text style={[styles.legendPercent, { color: colors.success }]}>
                    {Math.round((todayStats.activeMinutes / todayStats.activeMinutesGoal) * 100)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Premium Upgrade Card */}
        {!user?.isPremium && (
          <View style={styles.premiumSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA500', '#FF8C00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.premiumCard}
              >
                <View style={styles.premiumContent}>
                  <View style={styles.premiumHeader}>
                    <View style={styles.premiumIconCircle}>
                      <Ionicons name="star" size={32} color="#FFF" />
                    </View>
                    <View style={styles.premiumPill}>
                      <Text style={styles.premiumPillText}>LIMITED OFFER</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                  <Text style={styles.premiumSubtitle}>
                    Unlock all features and get personalized coaching
                  </Text>

                  <View style={styles.premiumFeatures}>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>Unlimited AI Coach Sessions</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>Advanced Analytics & Insights</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>Custom Meal & Workout Plans</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>Priority Support</Text>
                    </View>
                  </View>

                  <View style={styles.premiumPricing}>
                    <Text style={styles.priceText}>$9.99</Text>
                    <Text style={styles.priceSubtext}>/month</Text>
                  </View>

                  <View style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FF8C00" />
                  </View>
                </View>

                {/* Decorative Elements */}
                <View style={styles.decorativeCircle1} />
                <View style={styles.decorativeCircle2} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Daily Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryGrid}>
            <TouchableOpacity style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <View style={[
                styles.summaryIcon, 
                { backgroundColor: getHealthStatus('steps', todayStats.steps).color + '20' }
              ]}>
                <Ionicons 
                  name="footsteps-outline" 
                  size={24} 
                  color={getHealthStatus('steps', todayStats.steps).color} 
                />
              </View>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getHealthStatus('steps', todayStats.steps).icon} 
                  size={12} 
                  color={getHealthStatus('steps', todayStats.steps).color} 
                />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {todayStats.steps.toLocaleString()}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                STEPS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <View style={[
                styles.summaryIcon, 
                { backgroundColor: getHealthStatus('caloriesBurned', todayStats.caloriesBurned).color + '20' }
              ]}>
                <Ionicons 
                  name="flame-outline" 
                  size={24} 
                  color={getHealthStatus('caloriesBurned', todayStats.caloriesBurned).color} 
                />
              </View>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getHealthStatus('caloriesBurned', todayStats.caloriesBurned).icon} 
                  size={12} 
                  color={getHealthStatus('caloriesBurned', todayStats.caloriesBurned).color} 
                />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {todayStats.caloriesBurned}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                CAL BURNED
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <View style={[
                styles.summaryIcon, 
                { backgroundColor: getHealthStatus('water', todayStats.water, todayStats.waterGoal).color + '20' }
              ]}>
                <Ionicons 
                  name="water-outline" 
                  size={24} 
                  color={getHealthStatus('water', todayStats.water, todayStats.waterGoal).color} 
                />
              </View>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getHealthStatus('water', todayStats.water, todayStats.waterGoal).icon} 
                  size={12} 
                  color={getHealthStatus('water', todayStats.water, todayStats.waterGoal).color} 
                />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {todayStats.water}/{todayStats.waterGoal}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                GLASSES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <View style={[
                styles.summaryIcon, 
                { backgroundColor: getHealthStatus('sleep', todayStats.sleep).color + '20' }
              ]}>
                <Ionicons 
                  name="moon-outline" 
                  size={24} 
                  color={getHealthStatus('sleep', todayStats.sleep).color} 
                />
              </View>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getHealthStatus('sleep', todayStats.sleep).icon} 
                  size={12} 
                  color={getHealthStatus('sleep', todayStats.sleep).color} 
                />
              </View>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {todayStats.sleep}h
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                SLEEP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsSection}>
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
        </View>

        {/* Weekly Steps Chart */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Steps</Text>
          <View style={[styles.modernChartCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.primary + '10', colors.card]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.chartGradient}
            >
              <LineChart
                data={weeklySteps}
                width={screenWidth - Spacing.lg * 2 - 32}
                height={240}
                chartConfig={{
                  ...chartConfig,
                  fillShadowGradientFrom: colors.primary,
                  fillShadowGradientFromOpacity: 0.8,
                  fillShadowGradientTo: colors.primary,
                  fillShadowGradientToOpacity: 0.1,
                }}
                bezier
                style={{ borderRadius: BorderRadius.md }}
                withInnerLines={true}
                withOuterLines={false}
                withShadow={false}
                withDots={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                segments={4}
              />
            </LinearGradient>
            <View style={styles.chartFooter}>
              <View style={styles.chartStat}>
                <Ionicons name="trending-up" size={16} color={colors.success} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>Avg: 8,563</Text>
              </View>
              <View style={styles.chartStat}>
                <Ionicons name="footsteps" size={16} color={colors.primary} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>Total: 59,942</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Calories Chart */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Calories</Text>
          <View style={[styles.modernChartCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={[colors.secondary + '10', colors.card]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.chartGradient}
            >
              <BarChart
                data={weeklyCalories}
                width={screenWidth - Spacing.lg * 2 - 32}
                height={240}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => colors.secondary,
                  barPercentage: 0.7,
                }}
                style={{ borderRadius: BorderRadius.md }}
                showValuesOnTopOfBars={false}
                withInnerLines={true}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
                segments={4}
              />
            </LinearGradient>
            <View style={styles.chartFooter}>
              <View style={styles.chartStat}>
                <Ionicons name="trending-up" size={16} color={colors.success} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>Avg: 1,979</Text>
              </View>
              <View style={styles.chartStat}>
                <Ionicons name="flame" size={16} color={colors.secondary} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>Total: 13,850</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Coach Features */}
        <View style={styles.aiCoachSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🤖 AI Coach Features</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AIInsights')}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.aiCoachScroll}>
            <TouchableOpacity
              style={[styles.aiCoachCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('WaterTracking')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#4FC3F7', '#29B6F6']}
                style={styles.aiCoachIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="water" size={24} color="#FFF" />
              </LinearGradient>
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>Water</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>Track intake</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.aiCoachCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('StepsTracking')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#66BB6A', '#4CAF50']}
                style={styles.aiCoachIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="walk" size={24} color="#FFF" />
              </LinearGradient>
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>Steps</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>Daily activity</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.aiCoachCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('WeeklyReview')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#AB47BC', '#9C27B0']}
                style={styles.aiCoachIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="calendar" size={24} color="#FFF" />
              </LinearGradient>
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>Weekly Review</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>See progress</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.aiCoachCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('ProgressDashboard')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#FF7043', '#FF5722']}
                style={styles.aiCoachIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="stats-chart" size={24} color="#FFF" />
              </LinearGradient>
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>Dashboard</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>All metrics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.aiCoachCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('AIInsights')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#FFA726', '#FF9800']}
                style={styles.aiCoachIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="bulb" size={24} color="#FFF" />
              </LinearGradient>
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>AI Insights</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>Smart tips</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('WorkoutPlans')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="barbell" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Workout Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.secondary }]}
              onPress={() => navigation.navigate('Recipes')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="restaurant" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success }]}
              onPress={() => navigation.navigate('Goals')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="trophy" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>My Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.info }]}
              onPress={() => navigation.navigate('HabitsAnalysis')}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="analytics" size={28} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Habits</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        navigation={navigation}
      />
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
    paddingBottom: Spacing.xl,
  },
  menuButton: {
    marginRight: Spacing.md,
  },
  greetingContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  greeting: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  motivationText: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
    minWidth: 80,
    maxWidth: 120,
  },
  streakText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 2,
  },
  streakLabel: {
    fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  summarySection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  summaryCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
  goalsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  goalsGradient: {
    padding: Spacing.md,
    paddingBottom: Spacing.sm,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  progressLegend: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  legendIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 28,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  legendIcon: {
    position: 'absolute',
    left: 16,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  legendTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    minWidth: 70,
  },
  legendValue: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    flex: 1,
  },
  legendPercent: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    minWidth: 45,
    textAlign: 'right',
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (screenWidth - Spacing.lg * 2 - Spacing.md) / 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    minHeight: 170,
  },
  statCardGradient: {
    padding: Spacing.lg,
    flex: 1,
    justifyContent: 'space-between',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '800',
  },
  statCardTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  statCardValue: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  statCardUnit: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: Spacing.xs,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statCardGoal: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  chartSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  modernChartCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  chartGradient: {
    padding: Spacing.md,
    paddingBottom: 0,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  chartStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chartStatText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  quickActionsSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
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
  // Premium Card Styles
  premiumSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  premiumCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  premiumContent: {
    padding: Spacing.xl,
    position: 'relative',
    zIndex: 1,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  premiumIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumPill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  premiumPillText: {
    color: '#FFF',
    fontSize: FontSizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  premiumTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: Spacing.xs,
  },
  premiumSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  premiumFeatures: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.md,
    color: '#FFF',
    fontWeight: '600',
  },
  premiumPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.lg,
  },
  priceText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFF',
  },
  priceSubtext: {
    fontSize: FontSizes.lg,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginLeft: 4,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: Spacing.md + 2,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  upgradeButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    color: '#FF8C00',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -30,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -20,
    left: -20,
  },
  // AI Coach Section Styles
  aiCoachSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  viewAllText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  aiCoachScroll: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  aiCoachCard: {
    width: 100,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiCoachIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  aiCoachCardTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
  },
  aiCoachCardSubtitle: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
});
