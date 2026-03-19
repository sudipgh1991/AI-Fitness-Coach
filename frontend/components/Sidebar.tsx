import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ visible, onClose, navigation }) => {
  const { colors, theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();

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
            onClose();
          },
        },
      ]
    );
  };

  const handleNavigation = (screen: string) => {
    onClose();
    navigation.navigate(screen);
  };

  const MenuItem = ({ icon, title, onPress, isPremium = false }: any) => (
    <TouchableOpacity
      style={[styles.menuItem, isPremium && styles.premiumMenuItem]}
      onPress={onPress}
    >
      {isPremium ? (
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumIconContainer}
        >
          <Ionicons name={icon} size={24} color="#FFF" />
        </LinearGradient>
      ) : (
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
      )}
      <Text style={[styles.menuText, { color: isPremium ? '#FFD700' : colors.text }]}>
        {title}
      </Text>
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Ionicons name="star" size={14} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: colors.background }]}>
          <SafeAreaView style={styles.sidebarContent} edges={['top', 'bottom']}>
            {/* Header */}
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <View style={styles.profileSection}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user?.name || 'User'}</Text>
                  {user?.isPremium && (
                    <View style={styles.premiumTag}>
                      <Ionicons name="star" size={10} color="#FFD700" />
                    </View>
                  )}
                </View>
              </View>
            </LinearGradient>

            {/* Menu Items */}
            <ScrollView 
              style={styles.menuContainer}
              showsVerticalScrollIndicator={false}
            >
              <MenuItem
                icon="home"
                title={t.home}
                onPress={() => handleNavigation('Home')}
              />
              <MenuItem
                icon="chatbubbles"
                title={t.aiCoachChat}
                onPress={() => handleNavigation('Chat')}
              />
              <MenuItem
                icon="person"
                title={t.profile}
                onPress={() => handleNavigation('Profile')}
              />
              <MenuItem
                icon="settings"
                title={t.settings}
                onPress={() => handleNavigation('Profile')}
              />

              {/* Theme Selector */}
              <View style={styles.divider} />
              <View style={styles.themeSection}>
                <View style={styles.themeOptions}>
                  <TouchableOpacity
                    style={[
                      styles.themeOption,
                      { backgroundColor: colors.card },
                      theme === 'light' && [styles.themeOptionActive, { borderColor: colors.primary }],
                    ]}
                    onPress={() => setTheme('light')}
                  >
                    <Ionicons
                      name="sunny"
                      size={18}
                      color={theme === 'light' ? colors.primary : colors.textSecondary}
                    />

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.themeOption,
                      { backgroundColor: colors.card },
                      theme === 'dark' && [styles.themeOptionActive, { borderColor: colors.primary }],
                    ]}
                    onPress={() => setTheme('dark')}
                  >
                    <Ionicons
                      name="moon"
                      size={18}
                      color={theme === 'dark' ? colors.primary : colors.textSecondary}
                    />

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.themeOption,
                      { backgroundColor: colors.card },
                      theme === 'system' && [styles.themeOptionActive, { borderColor: colors.primary }],
                    ]}
                    onPress={() => setTheme('system')}
                  >
                    <Ionicons
                      name="phone-portrait"
                      size={18}
                      color={theme === 'system' ? colors.primary : colors.textSecondary}
                    />

                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Language Selector */}
              <View style={styles.divider} />
              <View style={styles.languageSection}>
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                  {t.language}
                </Text>
                <View style={styles.languageOptions}>
                  {languageOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.languageOption,
                        { backgroundColor: colors.card },
                        language === opt.value && [
                          styles.languageOptionActive,
                          { borderColor: colors.primary, backgroundColor: colors.primary + '15' },
                        ],
                      ]}
                      onPress={() => setLanguage(opt.value)}
                    >
                      <Text
                        style={[
                          styles.languageOptionText,
                          {
                            color:
                              language === opt.value ? colors.primary : colors.textSecondary,
                            fontWeight: language === opt.value ? '700' : '500',
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {opt.nativeLabel}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {!user?.isPremium && (
                <>
                  <View style={styles.divider} />
                  <MenuItem
                    icon="star"
                    title={t.upgradeToPremium}
                    onPress={() => {
                      onClose();
                      navigation.navigate('Payment');
                    }}
                    isPremium
                  />
                </>
              )}
            </ScrollView>

            {/* Logout Button */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.card }]}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={24} color={colors.error} />
                <Text style={[styles.logoutText, { color: colors.error }]}>
                  {t.logout}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarContent: {
    flex: 1,
  },
  header: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#FFF',
  },
  premiumTag: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,215,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  premiumMenuItem: {
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    marginHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md + 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  themeSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  languageSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  languageOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 40,
  },
  languageOptionActive: {
    borderWidth: 2,
  },
  languageOptionText: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 40,
  },
  themeOptionActive: {
    borderWidth: 2,
  },
});
