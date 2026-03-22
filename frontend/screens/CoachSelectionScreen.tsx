import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

export default function CoachSelectionScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Scheduling modal state
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());

  const coachingStyles = [
    {
      id: 'friendly',
      name: t.csStyleFriendly,
      icon: 'happy',
      description: t.csStyleFriendlyDesc,
      color: colors.success,
    },
    {
      id: 'strict',
      name: t.csStyleStrict,
      icon: 'fitness',
      description: t.csStyleStrictDesc,
      color: colors.error,
    },
    {
      id: 'calm',
      name: t.csStyleCalm,
      icon: 'leaf',
      description: t.csStyleCalmDesc,
      color: colors.info,
    },
    {
      id: 'motivational',
      name: t.csStyleMotivational,
      icon: 'flame',
      description: t.csStyleMotivationalDesc,
      color: colors.warning,
    },
  ];

  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;

  const formatTime = (date: Date) => {
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${((h % 12) || 12)}:${m} ${ampm}`;
  };

  const handleSaveCoachPrefs = async () => {
    try {
      await AsyncStorage.setItem('coachGender', selectedGender || '');
      await AsyncStorage.setItem('coachStyle', selectedStyle || '');
    } catch (_) {}
  };

  const handleStartJourney = async () => {
    await handleSaveCoachPrefs();
    setScheduleModalVisible(true);
  };

  const handleSubmitSchedule = () => {
    const dateStr = formatDate(selectedDate);
    const timeStr = formatTime(selectedTime);
    setScheduleModalVisible(false);
    // Navigate back to Home and show confirmation
    navigation.navigate('HomeMain');
    setTimeout(() => {
      Alert.alert(
        '✅ Live Consultation Confirmed',
        `You will get the call on ${dateStr} at ${timeStr}.`,
        [{ text: 'OK' }]
      );
    }, 300);
  };

  const minDate = new Date();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#FFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Ionicons name="people" size={48} color="#FFF" />
          <Text style={styles.headerTitle}>{t.csScreenTitle}</Text>
          <Text style={styles.headerSubtitle}>{t.csScreenSubtitle}</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.csCoachGenderLabel}</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            {t.csCoachGenderDesc}
          </Text>

          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderCard,
                {
                  backgroundColor: selectedGender === 'male' ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedGender('male')}
            >
              <Ionicons
                name="man"
                size={64}
                color={selectedGender === 'male' ? '#FFF' : colors.primary}
              />
              <Text
                style={[
                  styles.genderText,
                  { color: selectedGender === 'male' ? '#FFF' : colors.text },
                ]}
              >
                Sam
              </Text>
              {selectedGender === 'male' && (
                <View style={styles.checkMark}>
                  <Ionicons name="checkmark-circle" size={32} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderCard,
                {
                  backgroundColor: selectedGender === 'female' ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedGender('female')}
            >
              <Ionicons
                name="woman"
                size={64}
                color={selectedGender === 'female' ? '#FFF' : colors.primary}
              />
              <Text
                style={[
                  styles.genderText,
                  { color: selectedGender === 'female' ? '#FFF' : colors.text },
                ]}
              >
                Tashi
              </Text>
              {selectedGender === 'female' && (
                <View style={styles.checkMark}>
                  <Ionicons name="checkmark-circle" size={32} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.csCoachingStyleLabel}</Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            {t.csCoachingStyleDesc}
          </Text>

          <View style={styles.stylesContainer}>
            {coachingStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  {
                    backgroundColor: selectedStyle === style.id ? colors.primary : colors.card,
                    borderColor: selectedStyle === style.id ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedStyle(style.id)}
              >
                <View
                  style={[
                    styles.styleIconContainer,
                    {
                      backgroundColor:
                        selectedStyle === style.id ? 'rgba(255,255,255,0.2)' : style.color + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={style.icon as any}
                    size={32}
                    color={selectedStyle === style.id ? '#FFF' : style.color}
                  />
                </View>

                <View style={styles.styleInfo}>
                  <Text
                    style={[
                      styles.styleName,
                      { color: selectedStyle === style.id ? '#FFF' : colors.text },
                    ]}
                  >
                    {style.name}
                  </Text>
                  <Text
                    style={[
                      styles.styleDescription,
                      {
                        color: selectedStyle === style.id ? 'rgba(255,255,255,0.85)' : colors.textSecondary,
                      },
                    ]}
                  >
                    {style.description}
                  </Text>
                </View>

                {selectedStyle === style.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedGender && selectedStyle && (
          <View style={styles.previewSection}>
            {/* Your Selection Preview */}
            <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
              <LinearGradient
                colors={[colors.primary + '20', colors.card]}
                style={styles.previewGradient}
              >
                <Ionicons name="information-circle" size={32} color={colors.info} />
                <Text style={[styles.previewTitle, { color: colors.text }]}>{t.csYourSelectionLabel}</Text>
                <Text style={[styles.previewText, { color: colors.textSecondary }]}>
                  {t.csPreviewText(
                    selectedGender === 'male' ? t.csMaleCoach : t.csFemaleCoach,
                    coachingStyles.find((s) => s.id === selectedStyle)?.name ?? ''
                  )}
                </Text>
              </LinearGradient>
            </View>

            {/* Self Assessment Card (Optional) */}
            <View style={[styles.assessmentSection, { backgroundColor: colors.card }]}>
              <LinearGradient
                colors={[colors.secondary + '15', colors.card]}
                style={styles.assessmentGradient}
              >
                <View style={styles.assessmentHeader}>
                  <View style={[styles.assessmentIconBg, { backgroundColor: colors.secondary + '20' }]}>
                    <Ionicons name="clipboard" size={28} color={colors.secondary} />
                  </View>
                  <View style={styles.assessmentHeaderText}>
                    <Text style={[styles.assessmentTitle, { color: colors.text }]}>Self Assessment</Text>
                    <Text style={[styles.assessmentOptional, { color: colors.secondary }]}>Optional</Text>
                  </View>
                </View>
                <Text style={[styles.assessmentDesc, { color: colors.textSecondary }]}>
                  Complete a detailed questionnaire to help your coach personalise your experience.
                </Text>
                <View style={styles.assessmentActions}>
                  <TouchableOpacity
                    style={[styles.assessmentFillBtn, { backgroundColor: colors.secondary }]}
                    onPress={() => navigation.navigate('SelfAssessment')}
                  >
                    <Ionicons name="clipboard-outline" size={16} color="#FFF" />
                    <Text style={styles.assessmentFillBtnText}>Fill Assessment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.assessmentSkipBtn, { borderColor: colors.border }]}
                    onPress={() => {/* just skip, button does nothing */ }}
                  >
                    <Text style={[styles.assessmentSkipBtnText, { color: colors.textSecondary }]}>Skip</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            {/* Start My Journey Button */}
            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: colors.primary }]}
              onPress={handleStartJourney}
            >
              <Text style={styles.continueButtonText}>{t.csStartJourneyBtn}</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* Scheduling Modal */}
      <Modal
        visible={scheduleModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setScheduleModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <View style={styles.modalHandle} />

            <Text style={[styles.modalTitle, { color: colors.text }]}>Schedule Live Consultation</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              Choose your preferred date and time for the call
            </Text>

            {/* Date Picker Row */}
            <View style={styles.pickerRow}>
              <View style={[styles.pickerIconBg, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="calendar" size={22} color={colors.primary} />
              </View>
              <View style={styles.pickerInfo}>
                <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Date</Text>
                <Text style={[styles.pickerValue, { color: colors.text }]}>{formatDate(selectedDate)}</Text>
              </View>
              <TouchableOpacity
                style={[styles.changeBtn, { borderColor: colors.border }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.changeBtnText, { color: colors.primary }]}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Time Picker Row */}
            <View style={styles.pickerRow}>
              <View style={[styles.pickerIconBg, { backgroundColor: colors.secondary + '15' }]}>
                <Ionicons name="time" size={22} color={colors.secondary} />
              </View>
              <View style={styles.pickerInfo}>
                <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Time</Text>
                <Text style={[styles.pickerValue, { color: colors.text }]}>{formatTime(selectedTime)}</Text>
              </View>
              <TouchableOpacity
                style={[styles.changeBtn, { borderColor: colors.border }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={[styles.changeBtnText, { color: colors.primary }]}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Android Date Picker */}
            {showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                minimumDate={minDate}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (event.type !== 'dismissed' && date) setSelectedDate(date);
                }}
              />
            )}

            {/* Android Time Picker */}
            {showTimePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={(event, date) => {
                  setShowTimePicker(false);
                  if (event.type !== 'dismissed' && date) setSelectedTime(date);
                }}
              />
            )}

            {/* iOS Date Picker (inline) */}
            {showDatePicker && Platform.OS === 'ios' && (
              <View style={[styles.iosPickerContainer, { backgroundColor: colors.card }]}>
                <View style={styles.iosPickerHeader}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{ color: colors.text, fontWeight: '700' }}>Select Date</Text>
                  <TouchableOpacity onPress={() => { setSelectedDate(tempDate); setShowDatePicker(false); }}>
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  minimumDate={minDate}
                  onChange={(_, date) => { if (date) setTempDate(date); }}
                />
              </View>
            )}

            {/* iOS Time Picker (inline) */}
            {showTimePicker && Platform.OS === 'ios' && (
              <View style={[styles.iosPickerContainer, { backgroundColor: colors.card }]}>
                <View style={styles.iosPickerHeader}>
                  <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                    <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{ color: colors.text, fontWeight: '700' }}>Select Time</Text>
                  <TouchableOpacity onPress={() => { setSelectedTime(tempTime); setShowTimePicker(false); }}>
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={(_, date) => { if (date) setTempTime(date); }}
                />
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, { borderColor: colors.border }]}
                onPress={() => setScheduleModalVisible(false)}
              >
                <Text style={[styles.modalCancelText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSubmitBtn, { backgroundColor: colors.primary }]}
                onPress={handleSubmitSchedule}
              >
                <Ionicons name="checkmark-circle" size={18} color="#FFF" />
                <Text style={styles.modalSubmitText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginTop: Spacing.md,
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
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  sectionDescription: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.lg,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  genderCard: {
    flex: 1,
    padding: Spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  genderText: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  checkMark: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
  stylesContainer: {
    gap: Spacing.md,
  },
  styleCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  styleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleInfo: {
    flex: 1,
  },
  styleName: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: FontSizes.sm,
  },
  previewSection: {
    gap: Spacing.lg,
  },
  previewCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  previewGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  previewText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  assessmentSection: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  assessmentGradient: {
    padding: Spacing.lg,
  },
  assessmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  assessmentIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assessmentHeaderText: {
    flex: 1,
  },
  assessmentTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  assessmentOptional: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    marginTop: 2,
  },
  assessmentDesc: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  assessmentActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  assessmentFillBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  assessmentFillBtnText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  assessmentSkipBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assessmentSkipBtnText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  continueButton: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
  // Scheduling Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  pickerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerInfo: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pickerValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  changeBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  changeBtnText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  iosPickerContainer: {
    borderRadius: 16,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  modalCancelBtn: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  modalSubmitBtn: {
    flex: 2,
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  modalSubmitText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '800',
  },
});
