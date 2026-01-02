import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

type Measurement = {
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
};

export default function BodyMeasurementsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'bodyFat' | 'measurements'>('weight');
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);

  const [measurements, setMeasurements] = useState<Measurement[]>([
    { date: '2024-01-01', weight: 85.5, bodyFat: 22, chest: 102, waist: 90, hips: 98, arms: 38, thighs: 60 },
    { date: '2024-01-08', weight: 84.8, bodyFat: 21.5, chest: 101, waist: 89, hips: 97, arms: 38, thighs: 59 },
    { date: '2024-01-15', weight: 84.2, bodyFat: 21, chest: 100.5, waist: 88, hips: 96.5, arms: 37.5, thighs: 58.5 },
    { date: '2024-01-22', weight: 83.5, bodyFat: 20.5, chest: 100, waist: 87, hips: 96, arms: 37, thighs: 58 },
    { date: '2024-01-29', weight: 83.0, bodyFat: 20, chest: 99.5, waist: 86, hips: 95.5, arms: 37, thighs: 57.5 },
  ]);

  const latestMeasurement = measurements[measurements.length - 1];
  const firstMeasurement = measurements[0];

  const weightData = {
    labels: measurements.map((m) => new Date(m.date).getDate().toString()),
    datasets: [
      {
        data: measurements.map((m) => m.weight),
        color: (opacity = 1) => colors.primary,
        strokeWidth: 3,
      },
    ],
  };

  const bodyFatData = {
    labels: measurements.map((m) => new Date(m.date).getDate().toString()),
    datasets: [
      {
        data: measurements.map((m) => m.bodyFat || 0),
        color: (opacity = 1) => colors.warning,
        strokeWidth: 3,
      },
    ],
  };

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
    };
  };

  const renderMetricCard = (
    title: string,
    current: number,
    previous: number,
    unit: string,
    icon: string
  ) => {
    const change = calculateChange(current, previous);
    const isImprovement = title.includes('Body Fat') || title.includes('Waist') ? !change.isPositive : change.isPositive;

    return (
      <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
        <LinearGradient
          colors={[colors.primary + '10', 'transparent']}
          style={styles.metricGradient}
        >
          <View style={styles.metricHeader}>
            <View style={[styles.metricIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name={icon as any} size={24} color={colors.primary} />
            </View>
            <Text style={[styles.metricTitle, { color: colors.text }]}>{title}</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {current} {unit}
          </Text>
          <View style={styles.metricChange}>
            <Ionicons
              name={isImprovement ? 'trending-down' : 'trending-up'}
              size={16}
              color={isImprovement ? colors.success : colors.error}
            />
            <Text
              style={[
                styles.metricChangeText,
                { color: isImprovement ? colors.success : colors.error },
              ]}
            >
              {change.value} {unit}
            </Text>
            <Text style={[styles.metricChangeSince, { color: colors.textSecondary }]}>
              since start
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Body Measurements</Text>
            <Text style={styles.headerSubtitle}>Track your body composition</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddMeasurement(true)}
          >
            <Ionicons name="add-circle" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: selectedMetric === 'weight' ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setSelectedMetric('weight')}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedMetric === 'weight' ? '#FFF' : colors.text },
              ]}
            >
              Weight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: selectedMetric === 'bodyFat' ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setSelectedMetric('bodyFat')}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedMetric === 'bodyFat' ? '#FFF' : colors.text },
              ]}
            >
              Body Fat %
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: selectedMetric === 'measurements' ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setSelectedMetric('measurements')}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedMetric === 'measurements' ? '#FFF' : colors.text },
              ]}
            >
              Measurements
            </Text>
          </TouchableOpacity>
        </View>

        {selectedMetric === 'weight' && (
          <>
            <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>Weight Trend</Text>
              <LineChart
                data={weightData}
                width={screenWidth - Spacing.lg * 2 - 32}
                height={220}
                chartConfig={{
                  backgroundColor: colors.card,
                  backgroundGradientFrom: colors.card,
                  backgroundGradientTo: colors.card,
                  decimalPlaces: 1,
                  color: (opacity = 1) => colors.primary,
                  labelColor: (opacity = 1) => colors.textSecondary,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: colors.primary,
                  },
                }}
                bezier
                style={styles.chart}
              />
              <View style={styles.chartFooter}>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Starting
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.text }]}>
                    {firstMeasurement.weight} kg
                  </Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Current
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.text }]}>
                    {latestMeasurement.weight} kg
                  </Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Change
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.success }]}>
                    -{(firstMeasurement.weight - latestMeasurement.weight).toFixed(1)} kg
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.metricsGrid}>
              {renderMetricCard('Current Weight', latestMeasurement.weight, firstMeasurement.weight, 'kg', 'scale')}
            </View>
          </>
        )}

        {selectedMetric === 'bodyFat' && (
          <>
            <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>Body Fat % Trend</Text>
              <LineChart
                data={bodyFatData}
                width={screenWidth - Spacing.lg * 2 - 32}
                height={220}
                chartConfig={{
                  backgroundColor: colors.card,
                  backgroundGradientFrom: colors.card,
                  backgroundGradientTo: colors.card,
                  decimalPlaces: 1,
                  color: (opacity = 1) => colors.warning,
                  labelColor: (opacity = 1) => colors.textSecondary,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: colors.warning,
                  },
                }}
                bezier
                style={styles.chart}
              />
              <View style={styles.chartFooter}>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Starting
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.text }]}>
                    {firstMeasurement.bodyFat}%
                  </Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Current
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.text }]}>
                    {latestMeasurement.bodyFat}%
                  </Text>
                </View>
                <View style={styles.chartStat}>
                  <Text style={[styles.chartStatLabel, { color: colors.textSecondary }]}>
                    Change
                  </Text>
                  <Text style={[styles.chartStatValue, { color: colors.success }]}>
                    -{((firstMeasurement.bodyFat || 0) - (latestMeasurement.bodyFat || 0)).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <Ionicons name="information-circle" size={24} color={colors.info} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>Body Fat Ranges</Text>
                <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                  Essential: 10-13% (men), 10-13% (women){'\n'}
                  Athletes: 14-20% (men), 14-20% (women){'\n'}
                  Fitness: 21-24% (men), 21-24% (women){'\n'}
                  Average: 25-31% (men), 25-31% (women)
                </Text>
              </View>
            </View>
          </>
        )}

        {selectedMetric === 'measurements' && (
          <View style={styles.measurementsGrid}>
            {renderMetricCard('Chest', latestMeasurement.chest || 0, firstMeasurement.chest || 0, 'cm', 'body')}
            {renderMetricCard('Waist', latestMeasurement.waist || 0, firstMeasurement.waist || 0, 'cm', 'resize')}
            {renderMetricCard('Hips', latestMeasurement.hips || 0, firstMeasurement.hips || 0, 'cm', 'ellipse')}
            {renderMetricCard('Arms', latestMeasurement.arms || 0, firstMeasurement.arms || 0, 'cm', 'fitness')}
            {renderMetricCard('Thighs', latestMeasurement.thighs || 0, firstMeasurement.thighs || 0, 'cm', 'barbell')}
          </View>
        )}

        <View style={[styles.historyCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.historyTitle, { color: colors.text }]}>Measurement History</Text>
          {measurements.slice().reverse().map((measurement, index) => (
            <View
              key={measurement.date}
              style={[
                styles.historyItem,
                { borderBottomColor: colors.border, borderBottomWidth: index < measurements.length - 1 ? 1 : 0 },
              ]}
            >
              <View style={styles.historyDate}>
                <Ionicons name="calendar" size={16} color={colors.primary} />
                <Text style={[styles.historyDateText, { color: colors.text }]}>
                  {new Date(measurement.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.historyValues}>
                <Text style={[styles.historyValue, { color: colors.textSecondary }]}>
                  {measurement.weight}kg
                </Text>
                {measurement.bodyFat && (
                  <>
                    <Text style={[styles.historySeparator, { color: colors.border }]}>•</Text>
                    <Text style={[styles.historyValue, { color: colors.textSecondary }]}>
                      {measurement.bodyFat}% BF
                    </Text>
                  </>
                )}
              </View>
            </View>
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
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackButton: {
    marginRight: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  addButton: {
    marginLeft: Spacing.md,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  chartCard: {
    padding: Spacing.lg,
    borderRadius: 20,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  chartTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  chartStat: {
    alignItems: 'center',
  },
  chartStatLabel: {
    fontSize: FontSizes.xs,
    marginBottom: 4,
  },
  chartStatValue: {
    fontSize: FontSizes.md,
    fontWeight: '800',
  },
  metricsGrid: {
    gap: Spacing.md,
  },
  measurementsGrid: {
    gap: Spacing.md,
  },
  metricCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricGradient: {
    padding: Spacing.lg,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metricChangeText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  metricChangeSince: {
    fontSize: FontSizes.xs,
  },
  infoCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: FontSizes.xs,
    lineHeight: 18,
  },
  historyCard: {
    padding: Spacing.lg,
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  historyDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  historyDateText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  historyValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  historyValue: {
    fontSize: FontSizes.sm,
  },
  historySeparator: {
    fontSize: FontSizes.sm,
  },
});
