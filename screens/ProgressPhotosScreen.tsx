import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

interface ProgressPhoto {
  id: string;
  date: string;
  weight: number;
  note?: string;
  imageUrl?: string; // In real app, would have actual images
}

export default function ProgressPhotosScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedView, setSelectedView] = useState<'grid' | 'timeline'>('grid');

  const photos: ProgressPhoto[] = [
    {
      id: '1',
      date: '2024-01-01',
      weight: 80,
      note: 'Starting my fitness journey!',
    },
    {
      id: '2',
      date: '2024-01-08',
      weight: 78.5,
      note: 'First week done - feeling great!',
    },
    {
      id: '3',
      date: '2024-01-15',
      weight: 77,
      note: 'Two weeks in - visible changes!',
    },
    {
      id: '4',
      date: '2024-01-22',
      weight: 75.5,
      note: 'Muscles starting to show',
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysDifference = (date1: string, date2: string) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalWeightLoss = photos.length > 0 ? photos[0].weight - photos[photos.length - 1].weight : 0;
  const totalDays = photos.length > 1 ? getDaysDifference(photos[0].date, photos[photos.length - 1].date) : 0;

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
          <Text style={styles.headerTitle}>Progress Photos</Text>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="add-circle" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Summary */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
            <Text style={[styles.summaryValue, { color: colors.text }]}>{totalDays}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Days</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
            <Ionicons name="trending-down" size={24} color={colors.success} />
            <Text style={[styles.summaryValue, { color: colors.text }]}>{totalWeightLoss.toFixed(1)}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>kg Lost</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
            <Ionicons name="images" size={24} color={colors.info} />
            <Text style={[styles.summaryValue, { color: colors.text }]}>{photos.length}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Photos</Text>
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor: selectedView === 'grid' ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setSelectedView('grid')}
          >
            <Ionicons
              name="grid"
              size={20}
              color={selectedView === 'grid' ? '#FFF' : colors.text}
            />
            <Text
              style={[
                styles.toggleText,
                { color: selectedView === 'grid' ? '#FFF' : colors.text },
              ]}
            >
              Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor: selectedView === 'timeline' ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setSelectedView('timeline')}
          >
            <Ionicons
              name="list"
              size={20}
              color={selectedView === 'timeline' ? '#FFF' : colors.text}
            />
            <Text
              style={[
                styles.toggleText,
                { color: selectedView === 'timeline' ? '#FFF' : colors.text },
              ]}
            >
              Timeline
            </Text>
          </TouchableOpacity>
        </View>

        {/* Photos Grid */}
        {selectedView === 'grid' ? (
          <View style={styles.photosGrid}>
            {photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                style={[styles.photoCard, { backgroundColor: colors.card }]}
                activeOpacity={0.7}
              >
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="image" size={48} color={colors.textSecondary} />
                  <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                    Add Photo
                  </Text>
                </View>
                <View style={styles.photoInfo}>
                  <Text style={[styles.photoDate, { color: colors.text }]}>
                    {formatDate(photo.date)}
                  </Text>
                  <Text style={[styles.photoWeight, { color: colors.textSecondary }]}>
                    {photo.weight} kg
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {/* Add New Photo Card */}
            <TouchableOpacity
              style={[styles.photoCard, styles.addPhotoCard, { backgroundColor: colors.card, borderColor: colors.primary }]}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle" size={48} color={colors.primary} />
              <Text style={[styles.addPhotoText, { color: colors.primary }]}>
                Add New Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Timeline View
          <View style={styles.timeline}>
            {photos.map((photo, index) => (
              <View key={photo.id} style={styles.timelineItem}>
                <View style={styles.timelineDot}>
                  <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                  {index < photos.length - 1 && (
                    <View style={[styles.line, { backgroundColor: colors.border }]} />
                  )}
                </View>
                <TouchableOpacity
                  style={[styles.timelineCard, { backgroundColor: colors.card }]}
                  activeOpacity={0.7}
                >
                  <View style={styles.timelineHeader}>
                    <Text style={[styles.timelineDate, { color: colors.text }]}>
                      {formatDate(photo.date)}
                    </Text>
                    <View style={styles.timelineWeight}>
                      <Ionicons name="scale-outline" size={16} color={colors.textSecondary} />
                      <Text style={[styles.timelineWeightText, { color: colors.textSecondary }]}>
                        {photo.weight} kg
                      </Text>
                    </View>
                  </View>
                  <View style={styles.timelinePhotoPlaceholder}>
                    <Ionicons name="image" size={64} color={colors.textSecondary} />
                  </View>
                  {photo.note && (
                    <Text style={[styles.timelineNote, { color: colors.textSecondary }]}>
                      {photo.note}
                    </Text>
                  )}
                  {index > 0 && (
                    <View style={styles.timelineProgress}>
                      <Ionicons name="trending-down" size={16} color={colors.success} />
                      <Text style={[styles.progressChange, { color: colors.success }]}>
                        -{(photos[index - 1].weight - photo.weight).toFixed(1)} kg
                      </Text>
                      <Text style={[styles.progressDays, { color: colors.textSecondary }]}>
                        in {getDaysDifference(photos[index - 1].date, photo.date)} days
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
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
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: '#FFF',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
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
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  viewToggle: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    borderWidth: 2,
    gap: Spacing.xs,
  },
  toggleText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  photoCard: {
    width: (screenWidth - Spacing.lg * 2 - Spacing.md) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photoPlaceholder: {
    aspectRatio: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  placeholderText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  photoInfo: {
    padding: Spacing.sm,
  },
  photoDate: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginBottom: 2,
  },
  photoWeight: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  addPhotoCard: {
    aspectRatio: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  timeline: {
    paddingHorizontal: Spacing.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  timelineDot: {
    width: 40,
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  timelineDate: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  timelineWeight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timelineWeightText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  timelinePhotoPlaceholder: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  timelineNote: {
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  timelineProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  progressChange: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  progressDays: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
  },
});
