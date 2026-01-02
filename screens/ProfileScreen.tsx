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
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function ProfileScreen({ navigation }: any) {
  const { colors, theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigation will automatically switch to Login screen
            // via AuthContext changing isAuthenticated to false
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
      <Text style={[styles.statValue, { color: colors.text }]}>
        {value}
        <Text style={[styles.statUnit, { color: colors.textSecondary }]}> {unit}</Text>
      </Text>
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
              <Text style={styles.premiumText}>Premium Member</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatBox label="Weight" value="75" unit="kg" />
          <StatBox label="Height" value="175" unit="cm" />
          <StatBox label="Age" value="28" unit="yrs" />
          <StatBox label="BMI" value="24.5" unit="" />
        </View>

        {/* Fitness Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Fitness</Text>
        <MenuItem
          icon="barbell-outline"
          title="Workout History"
          subtitle="View your past workouts"
          onPress={() => navigation.navigate('Home', { screen: 'WorkoutHistory' })}
        />
        <MenuItem
          icon="body-outline"
          title="Body Measurements"
          subtitle="Track your progress"
          onPress={() => {}}
        />
        <MenuItem
          icon="images-outline"
          title="Progress Photos"
          subtitle="Before and after photos"
          onPress={() => navigation.navigate('ProgressPhotos')}
        />
        <MenuItem
          icon="trophy-outline"
          title="Achievements"
          subtitle="Badges and milestones"
          onPress={() => navigation.navigate('Achievements')}
        />

        {/* Nutrition Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nutrition</Text>
        <MenuItem
          icon="nutrition-outline"
          title="Meal History"
          subtitle="View your nutrition log"
          onPress={() => navigation.navigate('Home', { screen: 'Nutrition' })}
        />
        <MenuItem
          icon="scale-outline"
          title="Weight Tracker"
          subtitle="Monitor weight changes"
          onPress={() => {}}
        />
        <MenuItem
          icon="water-outline"
          title="Water Intake"
          subtitle="Track hydration"
          onPress={() => {}}
        />

        {/* Theme Settings */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
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
                Light
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
                Dark
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
                System
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        <Card>
          <MenuItem
            icon="person"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="trophy"
            title="Goals"
            subtitle="Manage your fitness goals"
            onPress={() => navigation.navigate('Goals')}
          />
          <MenuItem
            icon="notifications"
            title="Notifications"
            subtitle="Push notifications & reminders"
            onPress={() => navigation.navigate('Notifications')}
          />
          <MenuItem
            icon="shield-checkmark"
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
            onPress={() => navigation.navigate('Privacy')}
          />
        </Card>

        {/* Subscription */}
        {!user?.isPremium && (
          <Card>
            <View style={styles.premiumCard}>
              <Ionicons name="star" size={48} color="#FFD700" />
              <Text style={[styles.premiumTitle, { color: colors.text }]}>
                Upgrade to Premium
              </Text>
              <Text style={[styles.premiumDescription, { color: colors.textSecondary }]}>
                Get unlimited access to personalized plans, advanced analytics, and more!
              </Text>
              <Button
                title="Upgrade Now"
                onPress={() => navigation.navigate('Payment')}
                variant="primary"
                fullWidth
              />
            </View>
          </Card>
        )}

        {/* Support */}
        <Card title="Support">
          <MenuItem
            icon="help-circle"
            title="Help Center"
            subtitle="Get help with any issues"
            onPress={() => {}}
          />
          <MenuItem
            icon="chatbubbles"
            title="Contact Support"
            subtitle="We're here to help"
            onPress={() => {}}
          />
          <MenuItem
            icon="document-text"
            title="Terms & Conditions"
            subtitle="Read our terms"
            onPress={() => {}}
          />
          <MenuItem
            icon="shield"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {}}
          />
        </Card>

        {/* About */}
        <Card title="About">
          <MenuItem
            icon="information-circle"
            title="App Version"
            subtitle="1.0.0"
            onPress={() => {}}
            showArrow={false}
          />
          <MenuItem
            icon="star"
            title="Rate Us"
            subtitle="Share your feedback"
            onPress={() => {}}
          />
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
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
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statUnit: {
    fontSize: FontSizes.sm,
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
