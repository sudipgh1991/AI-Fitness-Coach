import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Story {
  id: string;
  name: string;
  result: string;
  duration: string;
  quote: string;
  image: string;
  tag: string;
}

const STORIES: Story[] = [
  {
    id: '1',
    name: 'Priya S.',
    result: '−22 kg',
    duration: '5 months',
    quote: '"Lost 22 kg without feeling deprived — Fitzen made it truly effortless!"',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80',
    tag: 'Weight Loss',
  },
  {
    id: '2',
    name: 'Rahul K.',
    result: '+8 kg muscle',
    duration: '6 months',
    quote: '"From skinny to strong — the AI-powered workout plans are next level!"',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80',
    tag: 'Muscle Gain',
  },
  {
    id: '3',
    name: 'Anita R.',
    result: 'First 10K run',
    duration: '3 months',
    quote: '"The AI coach pushed me beyond what I ever thought was possible!"',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&q=80',
    tag: 'Endurance',
  },
  {
    id: '4',
    name: 'Vikram D.',
    result: '2 sizes smaller',
    duration: '4 months',
    quote: '"Finally a fitness app that feels personal and actually delivers results!"',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80',
    tag: 'Body Transformation',
  },
];

const TRUST_STATS = [
  { value: '50K+', label: 'Members' },
  { value: '4.9 ★', label: 'Rating' },
  { value: '#1', label: 'Fitness App' },
];

export default function OnboardingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<FlatList<Story>>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % STORIES.length;
        carouselRef.current?.scrollToOffset({ offset: SCREEN_WIDTH * next, animated: true });
        return next;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [startAutoScroll]);

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index >= 0 && index < STORIES.length) setActiveSlide(index);
    startAutoScroll();
  };

  const renderStoryCard = useCallback(({ item }: { item: Story }) => (
    <Image source={{ uri: item.image }} style={styles.bgImage} resizeMode="cover" />
  ), []);

  const currentStory = STORIES[activeSlide];

  return (
    <View style={styles.container}>
      {/* ── Full-screen background carousel ── */}
      <FlatList
        ref={carouselRef}
        data={STORIES}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Top gradient overlay ── */}
      <LinearGradient
        colors={['rgba(15,35,20,0.95)', 'rgba(20,45,28,0.78)', 'transparent']}
        style={styles.topOverlay}
        pointerEvents="none"
      />

      {/* ── Bottom gradient overlay ── */}
      <LinearGradient
        colors={['transparent', 'rgba(10,25,15,0.82)', 'rgba(10,25,15,0.97)']}
        style={styles.bottomOverlay}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* ── Top: Branding ── */}
        <View style={styles.topSection}>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Ionicons name="fitness" size={28} color="#FFF" />
            </View>
            <Text style={styles.brandName}>Fitzen</Text>
          </View>
          <Text style={styles.brandTagline}>Your AI-Powered Fitness Coach</Text>
          <View style={styles.featurePills}>
            {['🏋️ Workouts', '🥗 Nutrition AI', '📊 Tracking'].map((f) => (
              <View key={f} style={styles.featurePill}>
                <Text style={styles.featurePillText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Middle spacer ── */}
        <View style={styles.spacer} />

        {/* ── Story info ── */}
        <View style={styles.storyInfo}>
          <View style={styles.storyTagBadge}>
            <Text style={styles.storyTagText}>{currentStory.tag}</Text>
          </View>
          <Text style={styles.storyQuote} numberOfLines={2}>{currentStory.quote}</Text>
          <View style={styles.storyMeta}>
            <View>
              <Text style={styles.storyName}>{currentStory.name}</Text>
              <Text style={styles.storyDuration}>{currentStory.duration} journey</Text>
            </View>
            <View style={styles.storyResultBadge}>
              <Text style={styles.storyResultText}>{currentStory.result}</Text>
            </View>
          </View>
          {/* Dot indicators */}
          <View style={styles.dotRow}>
            {STORIES.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  if (autoScrollRef.current) clearInterval(autoScrollRef.current);
                  carouselRef.current?.scrollToOffset({ offset: SCREEN_WIDTH * i, animated: true });
                  setActiveSlide(i);
                  startAutoScroll();
                }}
                style={[
                  styles.dot,
                  {
                    width: i === activeSlide ? 22 : 8,
                    backgroundColor: i === activeSlide ? '#FFF' : 'rgba(255,255,255,0.4)',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── Trust Stats ── */}
        <View style={styles.statsRow}>
          {TRUST_STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              {i < TRUST_STATS.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* ── CTA ── */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('AuthSelection')}
            activeOpacity={0.87}
          >
            <LinearGradient
              colors={['#3a6942', '#4b8352', '#60a86a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.getStartedGradient}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
              <Ionicons name="arrow-forward-circle" size={22} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>
              Already have an account?{' '}
              <Text style={styles.loginLinkHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2314',
  },
  bgImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.42,
    zIndex: 1,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.58,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },

  // ── Top branding ──
  topSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  logoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  brandName: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1.5,
  },
  brandTagline: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  featurePills: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featurePill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  featurePillText: {
    color: '#FFF',
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },

  // ── Spacer ──
  spacer: { flex: 1 },

  // ── Story info ──
  storyInfo: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  storyTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4b8352',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  storyTagText: {
    color: '#FFF',
    fontSize: FontSizes.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  storyQuote: {
    color: 'rgba(255,255,255,0.90)',
    fontSize: FontSizes.sm,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  storyName: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  storyDuration: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: FontSizes.xs,
    fontWeight: '500',
    marginTop: 2,
  },
  storyResultBadge: {
    backgroundColor: 'rgba(75,131,82,0.88)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  storyResultText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '800',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },

  // ── Stats ──
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // ── CTA ──
  ctaSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  getStartedButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3a6942',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  getStartedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 17,
  },
  getStartedText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  loginLinkText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
  },
  loginLinkHighlight: {
    fontWeight: '800',
    color: '#7ec882',
  },
});
