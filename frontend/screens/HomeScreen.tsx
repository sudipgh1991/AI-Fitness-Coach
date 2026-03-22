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
import { LineChart, BarChart } from 'react-native-chart-kit';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Sidebar } from '../components/Sidebar';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { t } = useLanguage();
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

  // ── Health Score ────────────────────────────────────────
  const dietScore    = Math.min((todayStats.calories / todayStats.caloriesGoal) * 40, 40);
  const workoutScore = Math.min((todayStats.workoutsCompleted / 3) * 30, 30);
  const waterScore   = Math.min((todayStats.water / todayStats.waterGoal) * 15, 15);
  const stepsScore   = Math.min((todayStats.steps / todayStats.stepsGoal) * 15, 15);
  const healthScore  = Math.round(dietScore + workoutScore + waterScore + stepsScore);

  const gaugeColor =
    healthScore >= 70 ? '#10B981' : healthScore >= 40 ? '#F59E0B' : '#EF4444';
  const gaugeLabel =
    healthScore >= 85 ? 'Excellent' : healthScore >= 70 ? 'Good' : healthScore >= 40 ? 'Fair' : 'Needs Work';

  const gaugeSvgW = screenWidth - Spacing.lg * 2 - Spacing.md * 2;

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
                {t.statGoal} {goal} {unit}
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
              <Ionicons name="menu" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                {t.greeting(user?.name || t.user)}
              </Text>
              <Text style={styles.motivationText}>
                {t.motivationText}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => navigation.navigate('CoachSelection')}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Health Score */}
        <View style={styles.healthScoreSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Score</Text>
          <View style={[styles.healthScoreCard, { backgroundColor: colors.card }]}>

            {/* Speedometer Gauge — SVG contains ONLY arc + needle, zero text */}
            {(() => {
              // VH stops just below the pivot so no SVG space is wasted below the arc
              const VW = 280, VH = 132;
              const CX = 140, CY = 116;
              const RO = 112, RI = 74;
              const NEEDLE_R = 100;
              const GAP_DEG = 4;
              const svgH = gaugeSvgW * (VH / VW);

              const pt = (r: number, deg: number) => ({
                x: CX + r * Math.cos((deg * Math.PI) / 180),
                y: CY + r * Math.sin((deg * Math.PI) / 180),
              });

              const seg = (ro: number, ri: number, startDeg: number, sweepDeg: number): string => {
                if (sweepDeg <= 0) return '';
                const e = startDeg + sweepDeg;
                const os = pt(ro, startDeg); const oe = pt(ro, e);
                const ie = pt(ri, e);        const is_ = pt(ri, startDeg);
                const lg = sweepDeg > 180 ? 1 : 0;
                return [
                  `M ${os.x.toFixed(2)} ${os.y.toFixed(2)}`,
                  `A ${ro} ${ro} 0 ${lg} 1 ${oe.x.toFixed(2)} ${oe.y.toFixed(2)}`,
                  `L ${ie.x.toFixed(2)} ${ie.y.toFixed(2)}`,
                  `A ${ri} ${ri} 0 ${lg} 0 ${is_.x.toFixed(2)} ${is_.y.toFixed(2)} Z`,
                ].join(' ');
              };

              const segments = [
                { pct: 0,  color: '#EF4444' },
                { pct: 20, color: '#F97316' },
                { pct: 40, color: '#EAB308' },
                { pct: 60, color: '#84CC16' },
                { pct: 80, color: '#22C55E' },
              ];

              const nd = 180 + (healthScore / 100) * 180;
              const nTip   = pt(NEEDLE_R, nd);
              const nWingL = pt(8, nd + 90);
              const nWingR = pt(8, nd - 90);
              const needlePath = [
                `M ${nTip.x.toFixed(2)} ${nTip.y.toFixed(2)}`,
                `L ${nWingL.x.toFixed(2)} ${nWingL.y.toFixed(2)}`,
                `L ${nWingR.x.toFixed(2)} ${nWingR.y.toFixed(2)} Z`,
              ].join(' ');

              return (
                <Svg width={gaugeSvgW} height={svgH} viewBox={`0 0 ${VW} ${VH}`} style={{ alignSelf: 'center' }}>
                  {segments.map(({ pct, color }) => (
                    <Path key={pct} d={seg(RO, RI, 180 + (pct / 100) * 180 + GAP_DEG / 2, 36 - GAP_DEG)} fill={color} />
                  ))}
                  {/* Inner fill — clipped at VH so card bg shows below */}
                  <Circle cx={CX} cy={CY} r={RI - 1} fill={colors.card} />
                  {/* Needle */}
                  <Path d={needlePath} fill="#1C1C2E" />
                  {/* Pivot */}
                  <Circle cx={CX} cy={CY} r={14} fill="#1C1C2E" />
                  <Circle cx={CX} cy={CY} r={6}  fill="white" />
                  {/* End labels */}
                  <SvgText x={14}  y={CY + 10} textAnchor="middle" fontSize={11} fill={colors.textSecondary}>0</SvgText>
                  <SvgText x={266} y={CY + 10} textAnchor="middle" fontSize={11} fill={colors.textSecondary}>100</SvgText>
                </Svg>
              );
            })()}

            {/*
              Score lives in a native React Native View that comes AFTER the SVG.
              React Native stacks later siblings above earlier ones, so this is
              always rendered above the SVG layer — overlap is structurally impossible.
            */}
            <View style={styles.gaugeScoreRow}>
              <Text style={[styles.gaugeScoreNumber, { color: gaugeColor }]}>{healthScore}</Text>
              <View style={[styles.gaugeLabelBadge, { backgroundColor: gaugeColor + '22' }]}>
                <Text style={[styles.gaugeLabelText, { color: gaugeColor }]}>{gaugeLabel}</Text>
              </View>
            </View>

            {/* Horizontal progress ring breakdown */}
            <View style={[styles.gaugeDivider, { backgroundColor: colors.border }]} />
            <View style={styles.breakdownGrid}>
              {([
                { label: 'Diet',    score: dietScore,    max: 40, color: '#3B82F6', icon: 'restaurant-outline' },
                { label: 'Workout', score: workoutScore, max: 30, color: '#8B5CF6', icon: 'barbell-outline' },
                { label: 'Water',   score: waterScore,   max: 15, color: '#06B6D4', icon: 'water-outline' },
                { label: 'Steps',   score: stepsScore,   max: 15, color: '#10B981', icon: 'walk-outline' },
              ] as const).map(({ label, score, max, color, icon }) => {
                const R = 26;
                const CIRC = 2 * Math.PI * R;
                const pct = Math.min(score / max, 1);
                const filled = CIRC * pct;
                const empty = CIRC - filled;
                return (
                  <View key={label} style={styles.breakdownCell}>
                    <View style={styles.breakdownRingWrap}>
                      <Svg width={64} height={64}>
                        <Circle cx={32} cy={32} r={R} stroke={color + '28'} strokeWidth={6} fill="transparent" />
                        {pct > 0 && (
                          <Circle
                            cx={32} cy={32} r={R}
                            stroke={color} strokeWidth={6} fill="transparent"
                            strokeDasharray={[filled, empty]}
                            strokeLinecap="round"
                            rotation={-90} originX={32} originY={32}
                          />
                        )}
                      </Svg>
                      <View style={styles.breakdownRingInner}>
                        <Ionicons name={icon as any} size={15} color={color} />
                        <Text style={[styles.breakdownRingScore, { color }]}>{Math.round(score)}</Text>
                      </View>
                    </View>
                    <Text style={[styles.breakdownCellLabel, { color: colors.text }]}>{label}</Text>
                    <Text style={[styles.breakdownRingMax, { color: colors.textSecondary }]}>of {max}</Text>
                  </View>
                );
              })}
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
                      <Text style={styles.premiumPillText}>{t.limitedOffer}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.premiumTitle}>{t.upgradeToPremiumTitle}</Text>
                  <Text style={styles.premiumSubtitle}>
                    {t.premiumSubtitle}
                  </Text>

                  <View style={styles.premiumFeatures}>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>{t.unlimitedAICoach}</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>{t.advancedAnalytics}</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>{t.customMealWorkout}</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                      <Text style={styles.featureText}>{t.prioritySupport}</Text>
                    </View>
                  </View>

                  <View style={styles.premiumPricing}>
                    <Text style={styles.priceText}>$9.99</Text>
                    <Text style={styles.priceSubtext}>{t.perMonth}</Text>
                  </View>

                  <View style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>{t.upgradeNow}</Text>
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

        {/* Quick Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <StatCard
              icon="footsteps"
              title={t.steps}
              value={todayStats.steps.toLocaleString()}
              unit=""
              goal={todayStats.stepsGoal.toLocaleString()}
              color={colors.primary}
            />
            <StatCard
              icon="flame"
              title={t.calories}
              value={todayStats.calories}
              unit="kcal"
              goal={todayStats.caloriesGoal}
              color={colors.secondary}
            />
            <StatCard
              icon="water"
              title={t.glasses}
              value={`${todayStats.water}/${todayStats.waterGoal}`}
              unit="glasses"
              goal={null}
              color={colors.info}
            />
            <StatCard
              icon="moon"
              title={t.sleep}
              value={todayStats.sleep}
              unit="h"
              goal={todayStats.sleepGoal}
              color={colors.success}
            />
          </View>
        </View>

        {/* Weekly Steps Chart */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.weeklySteps}</Text>
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
                <Text style={[styles.chartStatText, { color: colors.text }]}>{t.avg}: 8,563</Text>
              </View>
              <View style={styles.chartStat}>
                <Ionicons name="footsteps" size={16} color={colors.primary} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>{t.total}: 59,942</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Calories Chart */}
        <View style={styles.chartSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.weeklyCalories}</Text>
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
                <Text style={[styles.chartStatText, { color: colors.text }]}>{t.avg}: 1,979</Text>
              </View>
              <View style={styles.chartStat}>
                <Ionicons name="flame" size={16} color={colors.secondary} />
                <Text style={[styles.chartStatText, { color: colors.text }]}>{t.total}: 13,850</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Coach Features */}
        <View style={styles.aiCoachSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.aiCoachFeatures}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AIInsights')}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>{t.viewAll}</Text>
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
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>{t.water}</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>{t.trackIntake}</Text>
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
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>{t.steps}</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>{t.dailyActivity}</Text>
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
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>{t.weeklyReview}</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>{t.seeProgress}</Text>
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
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>{t.dashboard}</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>{t.allMetrics}</Text>
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
              <Text style={[styles.aiCoachCardTitle, { color: colors.text }]}>{t.aiInsights}</Text>
              <Text style={[styles.aiCoachCardSubtitle, { color: colors.textSecondary }]}>{t.smartTips}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.quickActions}</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('WorkoutPlans')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionButtonInner, { backgroundColor: colors.primary }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="barbell" size={28} color="#FFF" />
                </View>
                <Text style={styles.actionText}>{t.workoutPlans}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Recipes')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionButtonInner, { backgroundColor: colors.secondary }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="restaurant" size={28} color="#FFF" />
                </View>
                <Text style={styles.actionText}>{t.recipes}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Goals')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionButtonInner, { backgroundColor: colors.success }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="trophy" size={28} color="#FFF" />
                </View>
                <Text style={styles.actionText}>{t.myGoals}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('FounderStory')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionButtonInner, { backgroundColor: '#F59E0B' }]}>
                <View style={styles.iconCircle}>
                  <Ionicons name="star" size={28} color="#FFF" />
                </View>
                <Text style={styles.actionText}>{t.successStories}</Text>
              </View>
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
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 2,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    textAlign: 'center',
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
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
  healthScoreSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  healthScoreCard: {
    borderRadius: 24,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  gaugeDivider: {
    height: 1,
    marginHorizontal: Spacing.sm,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    opacity: 0.4,
  },
  gaugeScoreRow: {
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: Spacing.xs,
    gap: 4,
  },
  gaugeScoreNumber: {
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 54,
    letterSpacing: -2,
  },
  gaugeLabelBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 20,
  },
  gaugeLabelText: {
    fontSize: FontSizes.sm,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  breakdownGrid: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs,
  },
  breakdownCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  breakdownRingWrap: {
    position: 'relative',
    width: 64,
    height: 64,
  },
  breakdownRingInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  breakdownRingScore: {
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 14,
  },
  breakdownRingMax: {
    fontSize: 9,
    fontWeight: '600',
  },
  breakdownCellLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
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
    marginHorizontal: -Spacing.xs,
  },
  actionButton: {
    width: '50%',
    paddingHorizontal: Spacing.xs,
    paddingBottom: Spacing.md,
  },
  actionButtonInner: {
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
