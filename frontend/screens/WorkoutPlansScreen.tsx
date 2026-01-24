import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
  Slider,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

type WorkoutPlan = {
  id: string;
  name: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  focus: string;
  daysPerWeek: number;
  exercises: Array<{
    name: string;
    sets: string;
    reps: string;
    rest: string;
    hasVideo: boolean;
    videoUrl: string;
    description?: string;
  }>;
};

export default function WorkoutPlansScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [showExercises, setShowExercises] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ name: string; url: string; description?: string } | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef<Video>(null);

  const workoutPlans: WorkoutPlan[] = [
    {
      id: '1',
      name: 'Full Body Strength',
      duration: '8 weeks',
      level: 'Beginner',
      focus: 'Build overall strength',
      daysPerWeek: 3,
      exercises: [
        { 
          name: 'Squats', 
          sets: '3', 
          reps: '12', 
          rest: '60s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Keep feet shoulder-width apart, lower hips back and down, chest up'
        },
        { 
          name: 'Push-ups', 
          sets: '3', 
          reps: '10', 
          rest: '45s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Hands under shoulders, body straight, lower chest to ground'
        },
        { 
          name: 'Bent Over Rows', 
          sets: '3', 
          reps: '12', 
          rest: '60s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Hinge at hips, pull weight to ribcage, squeeze shoulder blades'
        },
        { 
          name: 'Plank', 
          sets: '3', 
          reps: '30s', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          description: 'Forearms on ground, body straight from head to heels'
        },
        { 
          name: 'Lunges', 
          sets: '3', 
          reps: '10 each', 
          rest: '45s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          description: 'Step forward, lower back knee, front knee over ankle'
        },
      ],
    },
    {
      id: '2',
      name: 'Fat Loss Circuit',
      duration: '6 weeks',
      level: 'Intermediate',
      focus: 'Burn fat and improve conditioning',
      daysPerWeek: 4,
      exercises: [
        { 
          name: 'Burpees', 
          sets: '4', 
          reps: '15', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          description: 'Squat, hands down, jump back to plank, push-up, jump feet forward, jump up'
        },
        { 
          name: 'Mountain Climbers', 
          sets: '4', 
          reps: '20', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          description: 'Plank position, alternate bringing knees to chest quickly'
        },
        { 
          name: 'Jump Squats', 
          sets: '4', 
          reps: '15', 
          rest: '45s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          description: 'Squat down, explode up jumping, land softly'
        },
        { 
          name: 'High Knees', 
          sets: '4', 
          reps: '30s', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          description: 'Run in place bringing knees up to hip level rapidly'
        },
        { 
          name: 'Plank Jacks', 
          sets: '4', 
          reps: '20', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          description: 'Plank position, jump feet out and in like jumping jacks'
        },
      ],
    },
    {
      id: '3',
      name: 'Muscle Building Split',
      duration: '12 weeks',
      level: 'Advanced',
      focus: 'Maximum muscle growth',
      daysPerWeek: 5,
      exercises: [
        { 
          name: 'Bench Press', 
          sets: '4', 
          reps: '8-10', 
          rest: '90s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
          description: 'Lower bar to chest, press up, keep elbows at 45 degrees'
        },
        { 
          name: 'Incline Dumbbell Press', 
          sets: '4', 
          reps: '10-12', 
          rest: '60s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
          description: 'Bench at 30-45 degrees, press dumbbells up and together'
        },
        { 
          name: 'Cable Flyes', 
          sets: '3', 
          reps: '12-15', 
          rest: '45s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
          description: 'Slight bend in elbows, bring cables together in arc motion'
        },
        { 
          name: 'Tricep Dips', 
          sets: '3', 
          reps: '10-12', 
          rest: '60s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          description: 'Lower body by bending elbows, push back up, keep core tight'
        },
        { 
          name: 'Overhead Tricep Extension', 
          sets: '3', 
          reps: '12-15', 
          rest: '45s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          description: 'Extend arms overhead, lower weight behind head, extend back up'
        },
      ],
    },
    {
      id: '4',
      name: 'Home HIIT Workout',
      duration: '4 weeks',
      level: 'Beginner',
      focus: 'High intensity at home',
      daysPerWeek: 3,
      exercises: [
        { 
          name: 'Jumping Jacks', 
          sets: '3', 
          reps: '30s', 
          rest: '20s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          description: 'Jump feet out while raising arms overhead, return to start'
        },
        { 
          name: 'Bodyweight Squats', 
          sets: '3', 
          reps: '20', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          description: 'Feet shoulder-width, lower hips, keep chest up'
        },
        { 
          name: 'Push-ups', 
          sets: '3', 
          reps: '10', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          description: 'Hands under shoulders, lower body as one unit'
        },
        { 
          name: 'Bicycle Crunches', 
          sets: '3', 
          reps: '20', 
          rest: '20s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          description: 'Alternating elbow to opposite knee in cycling motion'
        },
        { 
          name: 'Plank', 
          sets: '3', 
          reps: '30s', 
          rest: '30s', 
          hasVideo: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          description: 'Hold straight body position on forearms and toes'
        },
      ],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return colors.success;
      case 'Intermediate':
        return colors.warning;
      case 'Advanced':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const renderPlanCard = (plan: WorkoutPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[styles.planCard, { backgroundColor: colors.card }]}
      onPress={() => {
        setSelectedPlan(plan);
        setShowExercises(true);
      }}
    >
      <LinearGradient
        colors={[colors.primary + '15', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.planGradient}
      >
        <View style={styles.planHeader}>
          <View style={styles.planInfo}>
            <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
            <Text style={[styles.planFocus, { color: colors.textSecondary }]}>{plan.focus}</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(plan.level) + '20' }]}>
            <Text style={[styles.levelText, { color: getLevelColor(plan.level) }]}>
              {plan.level}
            </Text>
          </View>
        </View>

        <View style={styles.planStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={18} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.text }]}>{plan.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={18} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.text }]}>
              {plan.daysPerWeek} days/week
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="barbell" size={18} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.text }]}>
              {plan.exercises.length} exercises
            </Text>
          </View>
        </View>

        <View style={[styles.viewButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.viewButtonText}>View Exercises</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderExerciseList = () => {
    if (!selectedPlan) return null;

    return (
      <View style={styles.exerciseListContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setShowExercises(false);
            setSelectedPlan(null);
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back to Plans</Text>
        </TouchableOpacity>

        <View style={[styles.selectedPlanHeader, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.selectedPlanGradient}
          >
            <Text style={styles.selectedPlanName}>{selectedPlan.name}</Text>
            <Text style={styles.selectedPlanDescription}>{selectedPlan.focus}</Text>
            <View style={styles.selectedPlanBadges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{selectedPlan.level}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{selectedPlan.duration}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{selectedPlan.daysPerWeek}x/week</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={[styles.exercisesTitle, { color: colors.text }]}>Exercises</Text>

        {selectedPlan.exercises.map((exercise, index) => (
          <View key={index} style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
            <View style={styles.exerciseHeader}>
              <View style={[styles.exerciseNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.exerciseNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={[styles.exerciseName, { color: colors.text }]}>
                  {exercise.name}
                </Text>
                <View style={styles.exerciseDetails}>
                  <Text style={[styles.exerciseDetail, { color: colors.textSecondary }]}>
                    {exercise.sets} sets × {exercise.reps}
                  </Text>
                  <Text style={[styles.exerciseSeparator, { color: colors.border }]}>•</Text>
                  <Text style={[styles.exerciseDetail, { color: colors.textSecondary }]}>
                    Rest: {exercise.rest}
                  </Text>
                </View>
              </View>
              {exercise.hasVideo && (
                <TouchableOpacity
                  style={[styles.videoButton, { backgroundColor: colors.primary + '20' }]}
                  onPress={() => {
                    setSelectedVideo({
                      name: exercise.name,
                      url: exercise.videoUrl,
                      description: exercise.description,
                    });
                    setShowVideoModal(true);
                    setIsVideoLoading(true);
                  }}
                >
                  <Ionicons name="play-circle" size={32} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity style={[styles.startWorkoutButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="fitness" size={24} color="#FFF" />
          <Text style={styles.startWorkoutText}>Start Workout</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </View>
    );
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (videoStatus?.isLoaded && videoStatus.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const handleReplay = async () => {
    if (videoRef.current) {
      await videoRef.current.replayAsync();
    }
  };

  const handleSlowMotion = async () => {
    if (videoRef.current && videoStatus?.isLoaded) {
      const currentRate = videoStatus.rate || 1.0;
      const newRate = currentRate === 1.0 ? 0.5 : currentRate === 0.5 ? 0.25 : 1.0;
      await videoRef.current.setRateAsync(newRate, true);
    }
  };

  const handleSeek = async (value: number) => {
    if (videoRef.current && videoStatus?.isLoaded) {
      await videoRef.current.setPositionAsync(value);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderVideoModal = () => (
    <Modal
      visible={showVideoModal}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={() => {
        setShowVideoModal(false);
        setSelectedVideo(null);
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
      }}
    >
      <View style={[styles.videoModalContainer, { backgroundColor: '#000' }]}>
        <View style={styles.videoHeader}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowVideoModal(false);
              setSelectedVideo(null);
              if (videoRef.current) {
                videoRef.current.pauseAsync();
              }
            }}
          >
            <Ionicons name="close" size={32} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.videoHeaderContent}>
            <Text style={styles.videoTitle}>{selectedVideo?.name}</Text>
            {selectedVideo?.description && (
              <Text style={styles.videoDescription}>{selectedVideo.description}</Text>
            )}
          </View>
        </View>

        <View style={styles.videoContainer}>
          {isVideoLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading video...</Text>
            </View>
          )}
          {selectedVideo && (
            <Video
              ref={videoRef}
              source={{ uri: selectedVideo.url }}
              style={styles.video}
              useNativeControls={false}
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => {
                if (!isSeeking) {
                  setVideoStatus(status);
                }
                if (status.isLoaded) {
                  setIsVideoLoading(false);
                }
              }}
              onLoad={() => setIsVideoLoading(false)}
            />
          )}
        </View>

        {videoStatus?.isLoaded && (
          <View style={[styles.seekbarContainer, { backgroundColor: colors.card + '99' }]}>
            <Text style={styles.timeText}>
              {formatTime(videoStatus.positionMillis || 0)}
            </Text>
            <Slider
              style={styles.seekbar}
              minimumValue={0}
              maximumValue={videoStatus.durationMillis || 0}
              value={videoStatus.positionMillis || 0}
              onSlidingStart={() => setIsSeeking(true)}
              onSlidingComplete={(value) => {
                handleSeek(value);
                setIsSeeking(false);
              }}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbTintColor={colors.primary}
            />
            <Text style={styles.timeText}>
              {formatTime(videoStatus.durationMillis || 0)}
            </Text>
          </View>
        )}

        <View style={[styles.videoControls, { backgroundColor: colors.card + 'E6' }]}>
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: colors.primary }]}
              onPress={handleReplay}
            >
              <Ionicons name="reload" size={24} color="#FFF" />
              <Text style={styles.controlButtonText}>Replay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.playButton, { backgroundColor: colors.primary }]}
              onPress={handlePlayPause}
            >
              <Ionicons
                name={videoStatus?.isLoaded && videoStatus.isPlaying ? 'pause' : 'play'}
                size={32}
                color="#FFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: colors.secondary }]}
              onPress={handleSlowMotion}
            >
              <Ionicons name="speedometer" size={24} color="#FFF" />
              <Text style={styles.controlButtonText}>
                {videoStatus?.isLoaded && videoStatus.rate === 0.5
                  ? '0.5x'
                  : videoStatus?.isLoaded && videoStatus.rate === 0.25
                  ? '0.25x'
                  : '1.0x'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsContainer}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={[styles.tipsText, { color: colors.text }]}>
              Watch carefully for proper form. Use slow motion to study technique.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );

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
            <Text style={styles.headerTitle}>Workout Plans</Text>
            <Text style={styles.headerSubtitle}>Personalized for your goals</Text>
          </View>
        </View>
      </LinearGradient>

      {renderVideoModal()}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {!showExercises ? (
          <>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <Ionicons name="information-circle" size={32} color={colors.info} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>
                  Choose Your Plan
                </Text>
                <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                  Each plan includes video guidance for proper form and technique
                </Text>
              </View>
            </View>

            {workoutPlans.map((plan) => renderPlanCard(plan))}
          </>
        ) : (
          renderExerciseList()
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
  content: {
    flex: 1,
    padding: Spacing.lg,
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
    fontSize: FontSizes.sm,
  },
  planCard: {
    borderRadius: 20,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  planGradient: {
    padding: Spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: 4,
  },
  planFocus: {
    fontSize: FontSizes.sm,
  },
  levelBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  levelText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  planStats: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  exerciseListContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  backText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  selectedPlanHeader: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  selectedPlanGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  selectedPlanName: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  selectedPlanDescription: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  selectedPlanBadges: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  exercisesTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseNumberText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '800',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  exerciseDetail: {
    fontSize: FontSizes.sm,
  },
  exerciseSeparator: {
    fontSize: FontSizes.sm,
  },
  videoButton: {
    padding: Spacing.xs,
    borderRadius: 12,
  },
  startWorkoutButton: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  startWorkoutText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  videoModalContainer: {
    flex: 1,
  },
  videoHeader: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  closeButton: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  videoHeaderContent: {
    flex: 1,
  },
  videoTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: Spacing.xs,
  },
  videoDescription: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  seekbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  seekbar: {
    flex: 1,
    height: 40,
  },
  timeText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
    minWidth: 40,
  },
  video: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    color: '#FFF',
    fontSize: FontSizes.md,
  },
  videoControls: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  controlButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  playButton: {
    paddingVertical: Spacing.lg,
  },
  controlButtonText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tipsText: {
    flex: 1,
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
});
