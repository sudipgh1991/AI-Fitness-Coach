import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = (width - 60) / 2; // 2 columns with padding

interface Transformation {
  id: string;
  beforeImage: any;
  afterImage: any;
  name: string;
  result: string;
  timeframe: string;
}

// Temporary placeholder - Replace with AI-generated images
const PLACEHOLDER_BEFORE = 'https://via.placeholder.com/400x600/E8E8E8/999999?text=Before';
const PLACEHOLDER_AFTER = 'https://via.placeholder.com/400x600/E8F5E9/4CAF50?text=After';
const PLACEHOLDER_FOUNDER = 'https://via.placeholder.com/240x240/4A90E2/FFFFFF?text=Founder';

// AI-Generated transformation images
// TODO: Generate images using prompts in AI_IMAGE_PROMPTS.md and place them in assets/transformations/
// Until then, using placeholder URLs
const transformations: Transformation[] = [
  {
    id: '1',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Sarah M.',
    result: 'Lost 15kg postpartum',
    timeframe: '4 months',
  },
  {
    id: '2',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Priya K.',
    result: 'PCOS reversal & 12kg loss',
    timeframe: '6 months',
  },
  {
    id: '3',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Anjali R.',
    result: 'Gained 5kg muscle (veg)',
    timeframe: '5 months',
  },
  {
    id: '4',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Meera S.',
    result: 'Lost 10kg as busy professional',
    timeframe: '3 months',
  },
  {
    id: '5',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Divya P.',
    result: 'Postpartum transformation',
    timeframe: '5 months',
  },
  {
    id: '6',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Kavya N.',
    result: 'PCOS managed & fit',
    timeframe: '4 months',
  },
  {
    id: '7',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Sneha D.',
    result: 'Lost 18kg (vegetarian)',
    timeframe: '7 months',
  },
  {
    id: '8',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Ritu M.',
    result: 'Busy mom transformation',
    timeframe: '4 months',
  },
  {
    id: '9',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Pooja L.',
    result: 'Gained muscle & strength',
    timeframe: '6 months',
  },
  {
    id: '10',
    beforeImage: require('../assets/transformations/before1.jpg'),
    afterImage: require('../assets/transformations/after1.jpg'),
    name: 'Nisha T.',
    result: 'Complete body recomp',
    timeframe: '5 months',
  },
];

const FounderStoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const handleStartTransformation = async () => {
    try {
      // Check if we're in onboarding flow by looking at navigation state
      const state = navigation.getState();
      const routeNames = state?.routeNames || [];
      const currentRoutes = state?.routes || [];
      
      // Check if Onboarding or SelfAssessment is in the navigation stack (indicates onboarding flow)
      const isOnboardingFlow = routeNames.includes('Onboarding') || 
                               routeNames.includes('SelfAssessment') ||
                               currentRoutes.some((route: any) => 
                                 route.name === 'Onboarding' || route.name === 'SelfAssessment'
                               );
      
      if (isOnboardingFlow) {
        // Complete onboarding and navigate to Main app
        await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
        navigation.replace('Login');
      } else {
        // Already in main app, navigate to Chat
        navigation.navigate('Chat');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: try to navigate to Chat
      navigation.navigate('Chat');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Founder Story Section */}
      <View style={styles.founderSection}>
        <View style={styles.founderImageContainer}>
          <Image
            source={require('../assets/transformations/founder.jpg')}
            style={styles.founderImage}
          />
        </View>
        
        <Text style={styles.founderName}>{t.founderCoachName}</Text>
        <Text style={styles.founderTitle}>{t.founderCoachTitle}</Text>
        
        <Text style={styles.founderStory}>
          {t.founderStoryText}
        </Text>
      </View>

      {/* Transformations Header */}
      <View style={styles.transformationsHeader}>
        <Text style={styles.sectionTitle}>{t.founderTransformationsTitle}</Text>
        <Text style={styles.sectionSubtitle}>{t.founderTransformationsSub}</Text>
      </View>

      {/* Transformations Grid */}
      <View style={styles.transformationsGrid}>
        {transformations.map((transformation) => (
          <View key={transformation.id} style={styles.transformationCard}>
            <View style={styles.imagesContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={transformation.beforeImage}
                  style={styles.transformationImage}
                  resizeMode="cover"
                />
                <View style={styles.labelBadge}>
                  <Text style={styles.labelText}>{t.founderBefore}</Text>
                </View>
              </View>
              
              <View style={styles.imageWrapper}>
                <Image
                  source={transformation.afterImage}
                  style={styles.transformationImage}
                  resizeMode="cover"
                />
                <View style={[styles.labelBadge, styles.labelBadgeAfter]}>
                  <Text style={styles.labelText}>{t.founderAfter}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.transformationDetails}>
              <Text style={styles.clientName}>{transformation.name}</Text>
              <Text style={styles.resultText}>{transformation.result}</Text>
              <Text style={styles.timeframeText}>{transformation.timeframe}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t.founderSpecialized}
        </Text>
      </View>

      {/* CTA Button */}
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={handleStartTransformation}
      >
        <Text style={styles.ctaButtonText}>{t.founderStartTransformationBtn}</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  founderSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
    backgroundColor: '#FAFAFA',
  },
  founderImageContainer: {
    marginBottom: 16,
  },
  founderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  founderName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  founderTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    fontWeight: '500',
  },
  founderStory: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'center',
    maxWidth: 600,
  },
  transformationsHeader: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  transformationsGrid: {
    paddingHorizontal: 20,
    gap: 20,
  },
  transformationCard: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
  },
  transformationImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#F5F5F5',
  },
  labelBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  labelBadgeAfter: {
    backgroundColor: '#4CAF50',
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  transformationDetails: {
    padding: 16,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 4,
    fontWeight: '500',
  },
  timeframeText: {
    fontSize: 13,
    color: '#666666',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F9F9F9',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ctaButton: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 24,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 40,
  },
});

export default FounderStoryScreen;
