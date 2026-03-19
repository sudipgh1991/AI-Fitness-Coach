import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function ProfileScreen({ navigation }: any) {
  const { colors, theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      t.logoutConfirmTitle,
      t.logoutConfirmMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.logout,
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      t.resetOnboardingTitle,
      t.resetOnboardingMessage,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.resetButton,
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              await AsyncStorage.removeItem('hasCompletedOnboarding');
              await AsyncStorage.removeItem('onboardingData');
              await AsyncStorage.removeItem('coachGender');
              await AsyncStorage.removeItem('coachStyle');
              await AsyncStorage.removeItem('selfAssessmentData');
            } catch (error) {
              console.error('Error resetting onboarding:', error);
              Alert.alert('Error', t.resetOnboardingError);
            }
          },
        },
      ]
    );
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true }: any) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  const StatBox = ({ label, value, unit }: any) => (
    <View style={[styles.statBox, { backgroundColor: colors.card }]}>
      <View style={styles.statValueContainer}>
        <Text style={[styles.statValue, { color: colors.text }]} numberOfLines={1}>
          {value}
        </Text>
        {unit ? (
          <Text style={[styles.statUnit, { color: colors.textSecondary }]} numberOfLines={1}>
            {unit}
          </Text>
        ) : null}
      </View>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={['top']}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || user?.phone}</Text>
          
          {user?.isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.premiumText}>{t.premiumMember}</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatBox label={t.statWeight} value="75" unit={t.statUnitKg} />
          <StatBox label={t.statHeight} value="175" unit={t.statUnitCm} />
          <StatBox label={t.statAge} value="28" unit={t.statUnitYrs} />
          <StatBox label={t.statBMI} value="24.5" unit="" />
        </View>

        {/* Fitness Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionFitness}</Text>
        <MenuItem
          icon="barbell-outline"
          title={t.workoutHistory}
          subtitle={t.workoutHistorySub}
          onPress={() => navigation.navigate('Home', { screen: 'WorkoutHistory' })}
        />
        <MenuItem
          icon="body-outline"
          title={t.bodyMeasurements}
          subtitle={t.bodyMeasurementsSub}
          onPress={() => navigation.navigate('BodyMeasurements')}
        />
        <MenuItem
          icon="images-outline"
          title={t.progressPhotos}
          subtitle={t.progressPhotosSub}
          onPress={() => navigation.navigate('ProgressPhotos')}
        />
        <MenuItem
          icon="trophy-outline"
          title={t.achievements}
          subtitle={t.achievementsSub}
          onPress={() => navigation.navigate('Achievements')}
        />

        {/* Nutrition Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionNutrition}</Text>
        <MenuItem
          icon="nutrition-outline"
          title={t.mealHistory}
          subtitle={t.mealHistorySub}
          onPress={() => navigation.navigate('Home', { screen: 'Nutrition' })}
        />
        <MenuItem
          icon="restaurant-outline"
          title={t.recipes}
          subtitle={t.recipesMenuSub}
          onPress={() => navigation.navigate('Home', { screen: 'Recipes' })}
        />
        <MenuItem
          icon="analytics-outline"
          title={t.habitsAndCravings}
          subtitle={t.habitsAndCravingsSub}
          onPress={() => navigation.navigate('Home', { screen: 'HabitsAnalysis' })}
        />

        {/* Health & Wellness Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionHealthWellness}</Text>
        <MenuItem
          icon="calendar-outline"
          title={t.periodTracker}
          subtitle={t.periodTrackerSub}
          onPress={() => navigation.navigate('PeriodTracker')}
        />

        {/* Rewards Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionRewards}</Text>
        <MenuItem
          icon="gift-outline"
          title={t.referAndEarn}
          subtitle={t.referAndEarnSub}
          onPress={() => navigation.navigate('Referral')}
        />

        {/* Settings Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionSettings}</Text>
        <MenuItem
          icon="notifications-outline"
          title={t.reminders}
          subtitle={t.remindersSub}
          onPress={() => navigation.navigate('Reminders')}
        />

        {/* Theme Settings */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionAppearance}</Text>
        <Card>
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: theme === 'light' ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Ionicons
                name="sunny"
                size={24}
                color={theme === 'light' ? '#FFF' : colors.text}
              />
              <Text style={[
                styles.themeText,
                { color: theme === 'light' ? '#FFF' : colors.text },
              ]}>
                {t.themeLight}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: theme === 'dark' ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Ionicons
                name="moon"
                size={24}
                color={theme === 'dark' ? '#FFF' : colors.text}
              />
              <Text style={[
                styles.themeText,
                { color: theme === 'dark' ? '#FFF' : colors.text },
              ]}>
                {t.themeDark}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: theme === 'system' ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <Ionicons
                name="phone-portrait"
                size={24}
                color={theme === 'system' ? '#FFF' : colors.text}
              />
              <Text style={[
                styles.themeText,
                { color: theme === 'system' ? '#FFF' : colors.text },
              ]}>
                {t.themeSystem}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionSettings}</Text>
        <Card>
          <MenuItem
            icon="person"
            title={t.editProfile}
            subtitle={t.editProfileSub}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="trophy"
            title={t.goalsMenu}
            subtitle={t.goalsMenuSub}
            onPress={() => navigation.navigate('Goals')}
          />
          <MenuItem
            icon="notifications"
            title={t.notifications}
            subtitle={t.notificationsSub}
            onPress={() => navigation.navigate('Notifications')}
          />
          <MenuItem
            icon="shield-checkmark"
            title={t.privacySecurity}
            subtitle={t.privacySecuritySub}
            onPress={() => navigation.navigate('Privacy')}
          />
        </Card>

        {/* Support */}
        <Card title={t.profileSectionSupport}>
          <MenuItem
            icon="help-circle"
            title={t.helpCenter}
            subtitle={t.helpCenterSub}
            onPress={() => {}}
          />
          <MenuItem
            icon="chatbubbles"
            title={t.contactSupport}
            subtitle={t.contactSupportSub}
            onPress={() => {}}
          />
          <MenuItem
            icon="document-text"
            title={t.termsAndConditions}
            subtitle={t.termsAndConditionsSub}
            onPress={() => {}}
          />
          <MenuItem
            icon="shield"
            title={t.privacyPolicy}
            subtitle={t.privacyPolicySub}
            onPress={() => {}}
          />
        </Card>

        {/* About */}
        <Card title={t.profileSectionAbout}>
          <MenuItem
            icon="information-circle"
            title={t.appVersion}
            subtitle="1.0.0"
            onPress={() => {}}
            showArrow={false}
          />
          <MenuItem
            icon="star"
            title={t.rateUs}
            subtitle={t.rateUsSub}
            onPress={() => {}}
          />
        </Card>

        {/* Debug Section - Development Only */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.profileSectionDeveloper}</Text>
        <Card>
          <MenuItem
            icon="refresh"
            title={t.resetOnboarding}
            subtitle={t.resetOnboardingSub}
            onPress={handleResetOnboarding}
          />
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title={t.logout}
            onPress={handleLogout}
            variant="outline"
            fullWidth
          />
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xxl * 1.5,
    fontWeight: '700',
    color: '#FFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.8)',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  premiumText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
    flexWrap: 'nowrap',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    flexShrink: 0,
  },
  statUnit: {
    fontSize: FontSizes.sm,
    marginLeft: 2,
    flexShrink: 0,
  },
  statLabel: {
    fontSize: FontSizes.xs,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  themeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: FontSizes.xs,
  },
  premiumCard: {
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  premiumDescription: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  logoutContainer: {
    padding: Spacing.lg,
  },
});
