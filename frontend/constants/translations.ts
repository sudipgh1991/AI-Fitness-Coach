export type Language = 'en' | 'bn' | 'hi';

export const LANGUAGE_OPTIONS: { value: Language; label: string; nativeLabel: string }[] = [
  { value: 'en', label: 'English', nativeLabel: 'English' },
  { value: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { value: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
];

export interface AppTranslations {
  languageName: string;
  /** Prefix added to all API messages so the AI responds in the correct language */
  languageInstruction: string;

  // Common
  user: string;
  cancel: string;
  language: string;
  success: string;

  // Auth / Logout
  logout: string;
  logoutConfirmTitle: string;
  logoutConfirmMessage: string;

  // Sidebar Menu
  home: string;
  aiCoachChat: string;
  profile: string;
  settings: string;
  upgradeToPremium: string;

  // Home Screen – Header
  greeting: (name: string) => string;
  motivationText: string;
  dayStreak: string;

  // Home Screen – Today's Goals ring
  todaysGoals: string;
  steps: string;
  calories: string;
  activeTime: string;

  // Home Screen – Stat & Summary cards
  statGoal: string;
  calBurned: string;
  glasses: string;
  sleep: string;
  stepsLabel: string;
  distance: string;

  // Home Screen – Charts
  weeklySteps: string;
  weeklyCalories: string;
  avg: string;
  total: string;

  // Home Screen – AI Coach Features section
  aiCoachFeatures: string;
  viewAll: string;
  water: string;
  trackIntake: string;
  dailyActivity: string;
  weeklyReview: string;
  seeProgress: string;
  dashboard: string;
  allMetrics: string;
  aiInsights: string;
  smartTips: string;

  // Home Screen – Quick Actions
  quickActions: string;
  workoutPlans: string;
  recipes: string;
  myGoals: string;
  habits: string;
  successStories: string;

  // Home Screen – Premium Card
  limitedOffer: string;
  upgradeToPremiumTitle: string;
  premiumSubtitle: string;
  unlimitedAICoach: string;
  advancedAnalytics: string;
  customMealWorkout: string;
  prioritySupport: string;
  perMonth: string;
  upgradeNow: string;

  // Chat Screen – Header
  aiFitnessCoach: string;
  online: string;

  // Chat Screen – Quick Actions
  foodMenu: string;
  workout: string;
  progress: string;

  // Chat Screen – Input & analysis
  typeFoodOrAsk: string;
  analyzingFood: string;

  // Chat Screen – Food Menu Modal
  selectFoodItems: string;
  itemsSelected: (n: number) => string;
  clearAll: string;
  calculate: (n: number) => string;

  // Chat Screen – Nutrition card
  logToNutritionDiary: string;
  foodLoggedSuccess: string;

  // Chat Screen – Image options
  uploadFoodImage: string;
  chooseHowToAdd: string;
  takePhoto: string;
  chooseFromGallery: string;

  // Chat Screen – Initial assistant message
  chatInitialMessage: string;

  // Chat Screen – food analysis responses
  foodAnalyzedImage: string;
  foodAnalyzedPhoto: string;
  foodAnalyzedText: string;
  greatChoice: string;
  combinedNutrition: (n: number) => string;

  // Chat Screen – quick-action preset messages
  workoutPlanRequest: string;
  progressTrackingRequest: string;

  // Profile Screen – section titles
  profileSectionFitness: string;
  profileSectionNutrition: string;
  profileSectionHealthWellness: string;
  profileSectionRewards: string;
  profileSectionSettings: string;
  profileSectionAppearance: string;
  profileSectionSupport: string;
  profileSectionAbout: string;
  profileSectionDeveloper: string;

  // Profile Screen – stat labels
  statWeight: string;
  statHeight: string;
  statAge: string;
  statBMI: string;
  statUnitKg: string;
  statUnitCm: string;
  statUnitYrs: string;

  // Profile Screen – premium badge
  premiumMember: string;

  // Profile Screen – Fitness menu
  workoutHistory: string;
  workoutHistorySub: string;
  bodyMeasurements: string;
  bodyMeasurementsSub: string;
  progressPhotos: string;
  progressPhotosSub: string;
  achievements: string;
  achievementsSub: string;

  // Profile Screen – Nutrition menu
  mealHistory: string;
  mealHistorySub: string;
  recipesMenuSub: string;
  habitsAndCravings: string;
  habitsAndCravingsSub: string;

  // Profile Screen – Health & Wellness menu
  periodTracker: string;
  periodTrackerSub: string;

  // Profile Screen – Rewards menu
  referAndEarn: string;
  referAndEarnSub: string;

  // Profile Screen – Settings menu
  reminders: string;
  remindersSub: string;

  // Profile Screen – Appearance
  themeLight: string;
  themeDark: string;
  themeSystem: string;

  // Profile Screen – Settings card
  editProfile: string;
  editProfileSub: string;
  goalsMenu: string;
  goalsMenuSub: string;
  notifications: string;
  notificationsSub: string;
  privacySecurity: string;
  privacySecuritySub: string;

  // Profile Screen – Support card
  helpCenter: string;
  helpCenterSub: string;
  contactSupport: string;
  contactSupportSub: string;
  termsAndConditions: string;
  termsAndConditionsSub: string;
  privacyPolicy: string;
  privacyPolicySub: string;

  // Profile Screen – About card
  appVersion: string;
  rateUs: string;
  rateUsSub: string;

  // Profile Screen – Developer
  resetOnboarding: string;
  resetOnboardingSub: string;
  resetOnboardingTitle: string;
  resetOnboardingMessage: string;
  resetButton: string;
  resetOnboardingError: string;

  // ── Common / Shared ────────────────────────────────────────
  today: string;
  yesterday: string;
  all: string;
  or: string;
  done: string;
  deleteLabel: string;
  error: string;
  completedLabel: string;
  activeLabel: string;
  notesLabel: string;
  daysUnit: string;
  hoursUnit: string;
  glassesUnit: string;
  stepsUnit: string;
  goalSuffix: string;

  // ── Login Screen ───────────────────────────────────────────
  loginSubtitle: string;
  phoneNumberLabel: string;
  enterPhoneNumber: string;
  sendOTP: string;
  continueWithGoogle: string;
  termsText: string;
  validPhoneError: string;

  // ── Verify OTP ─────────────────────────────────────────────
  verifyOTPTitle: string;
  otpInstruction: string;
  resendOTPTimer: (n: number) => string;
  resendOTPBtn: string;
  otpResent: string;
  enterCompleteOTP: string;

  // ── Workout History ────────────────────────────────────────
  workoutsCountLabel: string;
  minutesCountLabel: string;
  filterStrength: string;
  filterCardio: string;
  filterYoga: string;
  filterHIIT: string;

  // ── Achievements ───────────────────────────────────────────
  achievementUnlocked: string;
  achievementLocked: string;
  achievementPoints: string;
  achievementComplete: string;

  // ── Nutrition ──────────────────────────────────────────────
  nutritionScreenTitle: string;
  caloriesConsumed: string;
  calRemaining: string;
  macros: string;
  protein: string;
  carbs: string;
  fat: string;
  weeklyOverview: string;
  todaysMeals: string;
  mealBreakfast: string;
  mealLunch: string;
  mealDinner: string;
  mealSnack: string;

  // ── Goals ──────────────────────────────────────────────────
  goalsScreenTitle: string;
  goalsCatWeight: string;
  goalsCatWorkout: string;
  goalsCatNutrition: string;
  goalsCatHabit: string;
  goalsCatPerformance: string;
  goalsStatTotal: string;
  goalsStatActive: string;
  goalsStatCompleted: string;
  goalsNoGoals: string;
  goalsPercentComplete: string;
  goalsNoDeadline: string;
  goalsOverdue: string;
  goalsTomorrow: string;
  goalsDaysLeft: (n: number) => string;

  // ── Recipes ────────────────────────────────────────────────
  recipesSubtitle: string;
  recipesSearch: string;
  recipesFilterHighProtein: string;
  recipesFilterLowCarb: string;
  recipesFilterVegetarian: string;
  recipesFilterQuickEasy: string;
  recipesDiffEasy: string;
  recipesDiffMedium: string;
  recipesDiffHard: string;
  recipesPrep: string;
  recipesCook: string;
  recipesServings: string;
  recipesBackToList: string;
  recipesNutritionPerServing: string;
  recipesIngredients: string;
  recipesInstructions: string;
  recipesAddToMealPlan: string;

  // ── Reminders Screen ───────────────────────────────────────
  remindersScreenTitle: string;
  remindersScreenSubtitle: string;
  remindersCustomize: string;
  remindersInfo: string;
  remindersActiveLabel: string;
  remindersTotalLabel: string;
  remindersAll: string;
  remindersWaterIntakeTitle: string;
  remindersWaterIntakeSub: string;
  remindersDailyStepsTitle: string;
  remindersDailyStepsSub: string;
  remindersMorningWorkoutTitle: string;
  remindersMorningWorkoutSub: string;
  remindersEveningWorkoutTitle: string;
  remindersEveningWorkoutSub: string;
  remindersMealPrepTitle: string;
  remindersMealPrepSub: string;
  remindersSleepReminderTitle: string;
  remindersSleepReminderSub: string;
  remindersWeighInTitle: string;
  remindersWeighInSub: string;
  remindersStretchBreakTitle: string;
  remindersStretchBreakSub: string;
  remindersAddCustom: string;
  remindersTipsTitle: string;
  remindersTip1: string;
  remindersTip2: string;
  remindersTip3: string;

  // ── Body Measurements ──────────────────────────────────────
  bmScreenTitle: string;
  bmScreenSubtitle: string;
  bmTabWeight: string;
  bmTabBodyFat: string;
  bmTabMeasurements: string;
  bmWeightTrend: string;
  bmBodyFatTrend: string;
  bmStarting: string;
  bmCurrent: string;
  bmChange: string;
  bmChest: string;
  bmWaist: string;
  bmHips: string;
  bmArms: string;
  bmThighs: string;
  bmMeasurementHistory: string;
  bmBodyFatRanges: string;
  bmBodyFatLabel: string;

  // ── Habits Analysis ────────────────────────────────────────
  habitsScreenTitle: string;
  habitsScreenSubtitle: string;
  habitsTabCravings: string;
  habitsTabHabits: string;
  habitsTabInsights: string;
  habitsCravingPatterns: string;
  habitsThisWeek: string;
  habitsAvgIntensity: string;
  habitsTopTrigger: string;
  habitsCravingsByTime: string;
  habitsMorning: string;
  habitsAfternoon: string;
  habitsEvening: string;
  habitsNight: string;
  habitsRecentCravings: string;
  habitsOverallCompletion: string;
  habitsYourHabits: string;
  habitsLastCompleted: string;
  habitsTriggerLabel: string;
  habitsKeyInsights: string;
  habitsRecommendations: string;

  // ── Period Tracker ─────────────────────────────────────────
  ptLogNewCycle: string;
  ptCycleStartDate: string;
  ptCycleLength: string;
  ptNotesOptional: string;
  ptNotesPlaceholder: string;
  ptAddCycleData: string;
  ptCycleHistory: string;
  ptDeleteCycleTitle: string;
  ptDeleteCycleMessage: string;
  ptAddCycleSuccess: string;
  ptInvalidInput: string;
  ptInvalidLength: string;
  ptNextCyclePredicted: string;
  ptPhaseMenstrual: string;
  ptPhaseFollicular: string;
  ptPhaseOvulation: string;
  ptPhaseLuteal: string;
  ptPhaseFuture: string;
  ptPhaseLate: string;
  ptTipMenstrual: string;
  ptTipFollicular: string;
  ptTipOvulation: string;
  ptTipLuteal: string;
  ptInfoText: string;
  ptPhaseLabel: string;
  ptDoneButton: string;
  ptDeleteButton: string;

  // ── Referral ───────────────────────────────────────────────
  referralAvailablePoints: string;
  referralEarned: string;
  referralCash: string;
  referralCountLabel: string;
  referralYourCode: string;
  referralCopy: string;
  referralShare: string;
  referralHowItWorks: string;
  referralRedeemPoints: string;
  referralYourReferrals: string;
  referralTermsText: string;
  referralCopied: string;
  referralCopiedMsg: string;
  referralPendingStatus: string;
  referralJoinedStatus: string;
  referralPremiumStatus: string;
  referralRedeem: string;
  referralMorePtsNeeded: (n: number) => string;
  referralDiscount: string;
  referralDiscountInfo: string;
  referralStep1Title: string;
  referralStep2Title: string;
  referralStep3Title: string;
  referralStep4Title: string;
  referralScreenTitle: string;
  referralStep1Desc: string;
  referralStep2Desc: string;
  referralStep3Desc: string;
  referralStep4Desc: string;
  referralJoinedLabel: (d: string) => string;
  referralRedeemTitle: string;
  referralSuccessTitle: string;
  referralSuccessMsg: (label: string) => string;
  referralNotEnoughTitle: string;

  // ── Water Tracking ─────────────────────────────────────────
  waterScreenTitle: string;
  waterTodaysHydration: string;
  waterGlassesLabel: string;
  waterGoalLabel: string;
  waterToGoLabel: string;
  waterGoalAchieved: string;
  waterAlmostThere: string;
  waterHalfwayDone: string;
  waterKeepGoing: string;
  waterQuickAdd: string;
  waterHalfGlass: string;
  waterOneGlass: string;
  waterTwoGlasses: string;
  waterWeeklyTrend: string;
  waterAvgLabel: string;
  waterGlassesPerDay: string;
  waterGoalDisplay: string;
  waterAIInsightsTitle: string;
  waterHydrationReminders: string;
  waterSetReminders: string;
  waterRemindersHint: string;
  waterTipsTitle: string;
  waterTip1: string;
  waterTip2: string;
  waterTip3: string;
  waterTip4: string;

  // ── Steps Tracking ─────────────────────────────────────────
  stepsScreenTitle: string;
  stepsTodaysActivity: string;
  stepsActiveTimeLabel: string;
  stepsDistanceLabel: string;
  stepsActiveLabel: string;
  stepsWeekLabel: string;
  stepsMonthLabel: string;
  stepsThisWeekTitle: string;
  stepsMonthlyTitle: string;
  stepsAvgLabel: string;
  stepsAchievementsTitle: string;
  stepsAIInsightsTitle: string;
  stepsQuickActionsTitle: string;
  stepsStartWorkout: string;
  stepsAdjustGoal: string;
  stepsGoalCrushed: string;
  stepsAlmostThere: string;
  stepsHalfwayDone: string;
  stepsKeepMoving: string;
  stepsGoalDisplay: (n: number) => string;
  stepsLegendSteps: string;
  stepsLegendActiveTime: string;
  stepsLegendCalories: string;

  // ── Weekly Review ──────────────────────────────────────────
  weeklyReviewScreenTitle: string;
  weeklyReviewScoreTitle: string;
  weeklyReviewGradeLabel: string;
  weeklyReviewProgressBreakdownTitle: string;
  weeklyReviewDailyCompletionTitle: string;
  weeklyReviewAchievementsTitle: string;
  weeklyReviewAISummaryTitle: string;
  weeklyReviewAreasTitle: string;
  weeklyReviewPatternTitle: string;
  weeklyReviewStrengthsTitle: string;
  weeklyReviewChallengesTitle: string;
  weeklyReviewRecommendationsTitle: string;
  weeklyReviewUpdateGoalsBtn: string;
  weeklyReviewHighPriority: string;
  weeklyReviewMediumPriority: string;
  weeklyReviewCurrentLabel: string;
  weeklyReviewGoalLabel: string;
  weeklyReviewGradeA: string;
  weeklyReviewGradeB: string;
  weeklyReviewGradeC: string;
  weeklyReviewGradeD: string;
  weeklyReviewGradeF: string;
  weeklyReviewImpactLabel: string;

  // ── Progress Dashboard ─────────────────────────────────────
  pdScreenTitle: string;
  pdOverallProgressTitle: string;
  pd3MonthsLabel: string;
  pdTrendAnalysisTitle: string;
  pdThisWeekVsLast: string;
  pdMilestonesTitle: string;
  pdWeeklyReviewBtn: string;
  pdUpdateGoalsBtn: string;
  pdProgressPhotosBtn: string;
  pdHabitsBtn: string;
  pdQuickActionsTitle: string;
  pdGoalLabel: string;
  pdWeekLabel: string;
  pdMonthLabel: string;

  // ── AI Insights Screen ─────────────────────────────────────
  aiInsightsScreenTitle: string;
  aiInsightsSummaryTitle: string;
  aiInsightsPatternsLabel: string;
  aiInsightsSuggestionsLabel: string;
  aiInsightsWarningsLabel: string;
  aiInsightsAchievementsLabel: string;
  aiInsightsAllLabel: string;
  aiInsightsActivityLabel: string;
  aiInsightsNutritionLabel: string;
  aiInsightsSleepLabel: string;
  aiInsightsHabitsLabel: string;
  aiInsightsNoInsightsTitle: string;
  aiInsightsNoInsightsHintText: string;
  aiInsightsHowItWorksTitle: string;
  aiInsightsFoundCount: (n: number) => string;

  // ── Founder Story ──────────────────────────────────────────
  founderCoachName: string;
  founderCoachTitle: string;
  founderStoryText: string;
  founderTransformationsTitle: string;
  founderTransformationsSub: string;
  founderBefore: string;
  founderAfter: string;
  founderSpecialized: string;
  founderStartTransformationBtn: string;

  // ── Progress Photos ────────────────────────────────────────
  ppScreenTitle: string;
  ppDaysLabel: string;
  ppKgLostLabel: string;
  ppPhotosLabel: string;
  ppGridView: string;
  ppTimelineView: string;
  ppAddPhotoBtn: string;
  ppAddNewPhotoTitle: string;
  ppInDaysLabel: (n: number) => string;
  wpNotesTitle: string;
  wpAdditionalResourcesTitle: string;

  // ── Self Assessment ────────────────────────────────────────
  saScreenTitle: string;
  saIntroText: string;
  saBasicInfoSection: string;
  saNameLabel: string;
  saNamePlaceholder: string;
  saContactLabel: string;
  saContactPlaceholder: string;
  saEmailLabel: string;
  saEmailPlaceholder: string;
  saGenderLabel: string;
  saGenderMale: string;
  saGenderFemale: string;
  saGenderOther: string;
  saAgeLabel: string;
  saAgePlaceholder: string;
  saWeightLabel: string;
  saWeightPlaceholder: string;
  saHeightLabel: string;
  saHeightPlaceholder: string;
  saMedicalInfoSection: string;
  saMedicalConditionsQ: string;
  saMedicalDetailsLabel: string;
  saMedicalPlaceholder: string;
  saMedicationsQ: string;
  saMedDetailsLabel: string;
  saMedPlaceholder: string;
  saDietSection: string;
  saDietBeforeQ: string;
  saDietOption1: string;
  saDietOption2: string;
  saDietOption3: string;
  saDietTypesQ: string;
  saDietTypesPlaceholder: string;
  saDietTypeQ: string;
  saDietTypeVegetarian: string;
  saDietTypeNonVeg: string;
  saDietTypeVegan: string;
  saDietTypePesc: string;
  saDietTypeFlex: string;
  saDietTypeNoPref: string;
  saFoodAllergiesQ: string;
  saFoodAllergiesPlaceholder: string;
  saFitnessGoalsSection: string;
  saCurrentGoalQ: string;
  saCurrentGoalPlaceholder: string;
  saBiggestFearQ: string;
  saFearOpt1: string;
  saFearOpt2: string;
  saFearOpt3: string;
  saFearOpt4: string;
  saFearOpt5: string;
  saFearSpecify: string;
  saFearSpecifyPlaceholder: string;
  saActivitySection: string;
  saActivityLevelQ: string;
  saActivitySedentary: string;
  saActivityLightlyActive: string;
  saActivityModerately: string;
  saActivityVeryActive: string;
  saActivityExtremelyActive: string;
  saTypicalMealsQ: string;
  saTypicalMealsPlaceholder: string;
  saWorkoutPrefQ: string;
  saWorkoutPrefGym: string;
  saWorkoutPrefHome: string;
  saWorkoutPrefBoth: string;
  saAdditionalInfoSection: string;
  saAdditionalNotesQ: string;
  saAdditionalNotesPlaceholder: string;
  saSubmitBtn: string;

  // ── Onboarding ─────────────────────────────────────────────
  onboardingWelcomeTitle: string;
  onboardingSubtitleText: string;
  onboardingAlreadyMemberText: string;
  onboardingSeeStoriesBtn: string;
  onboardingLiveConsultationOpt: string;
  onboardingLiveConsultationDesc: string;
  onboardingSelfAssessmentOpt: string;
  onboardingSelfAssessmentDesc: string;
  onboardingScheduleCallTitle: string;
  onboardingScheduleCallSub: string;
  onboardingBookConsultationBtn: string;
  onboardingTellAboutTitle: string;
  onboardingTellAboutSub: string;

  // ── Coach Selection ────────────────────────────────────────
  csScreenTitle: string;
  csScreenSubtitle: string;
  csAlreadyMemberText: string;
  csCoachGenderLabel: string;
  csCoachGenderDesc: string;
  csCoachingStyleLabel: string;
  csCoachingStyleDesc: string;
  csYourSelectionLabel: string;
  csStartJourneyBtn: string;

  // ── Payment ────────────────────────────────────────────────
  payPremiumFeaturesTitle: string;
  payChoosePlanTitle: string;
  payMonthlyPlan: string;
  payYearlyPlan: string;
  payPopularBadge: string;
  payMethodLabel: string;
  payUPI: string;
  payCard: string;
  payNetBanking: string;
  payOrderSummaryTitle: string;
  payTaxLabel: string;
  payTotalLabel: string;
  payFeature1: string;
  payFeature2: string;
  payFeature3: string;
  payFeature4: string;
  payFeature5: string;
  payFeature6: string;
  paySaveAmount: (n: number) => string;
  payEnterUPITitle: string;
  payUPIHint: string;
  payCardDetailsTitle: string;
  payCardNumberLabel: string;
  payExpiryLabel: string;
  payCVVLabel: string;
  payCardholderLabel: string;
  paySelectBankTitle: string;
  paySelectMethodError: string;
  payEnterUPIError: string;
  payFillCardError: string;
  paySelectBankError: string;
  paySuccessTitle: string;
  paySuccessMessage: string;
  payMonthDuration: string;
  payYearDuration: string;
  payNowBtn: (amount: number) => string;

  // ── Common / Shared new ────────────────────────────────────
  goBack: string;

  // ── Splash Screen ──────────────────────────────────────────
  splashTagline: string;
  splashPoweredBy: string;

  // ── Social Screen ──────────────────────────────────────────
  socialCommunity: string;
  socialComments: string;
  socialWriteComment: string;
  socialNoComments: string;
  socialMinutesAgo: (n: number) => string;
  socialHoursAgo: (n: number) => string;
  socialDaysAgo: (n: number) => string;

  // ── Onboarding new ─────────────────────────────────────────
  onboardingGetStarted: string;
  onboardingStepOf: (step: number, total: number) => string;
  onboardingDuration: string;
  onboardingDurationValue: string;
  onboardingWhatToExpect: string;
  onboardingCallExpect: string;

  // ── Coach Selection new ────────────────────────────────────
  csStyleFriendly: string;
  csStyleStrict: string;
  csStyleCalm: string;
  csStyleMotivational: string;
  csStyleFriendlyDesc: string;
  csStyleStrictDesc: string;
  csStyleCalmDesc: string;
  csStyleMotivationalDesc: string;
  csPreviewText: (genderLabel: string, styleName: string) => string;
  csMaleCoach: string;
  csFemaleCoach: string;
}

const en: AppTranslations = {
  languageName: 'English',
  languageInstruction: '',

  user: 'User',
  cancel: 'Cancel',
  language: 'Language',
  success: 'Success',

  logout: 'Logout',
  logoutConfirmTitle: 'Logout',
  logoutConfirmMessage: 'Are you sure you want to logout?',

  home: 'Home',
  aiCoachChat: 'AI Coach Chat',
  profile: 'Profile',
  settings: 'Settings',
  upgradeToPremium: 'Upgrade to Premium',

  greeting: (name) => `Hello, ${name}! 👋`,
  motivationText: "Let's crush your goals today!",
  dayStreak: 'day streak',

  todaysGoals: "Today's Goals",
  steps: 'Steps',
  calories: 'Calories',
  activeTime: 'Active Time',

  statGoal: 'Goal:',
  calBurned: 'CAL BURNED',
  glasses: 'GLASSES',
  sleep: 'SLEEP',
  stepsLabel: 'STEPS',
  distance: 'Distance',

  weeklySteps: 'Weekly Steps',
  weeklyCalories: 'Weekly Calories',
  avg: 'Avg',
  total: 'Total',

  aiCoachFeatures: '🤖 AI Coach Features',
  viewAll: 'View All',
  water: 'Water',
  trackIntake: 'Track intake',
  dailyActivity: 'Daily activity',
  weeklyReview: 'Weekly Review',
  seeProgress: 'See progress',
  dashboard: 'Dashboard',
  allMetrics: 'All metrics',
  aiInsights: 'AI Insights',
  smartTips: 'Smart tips',

  quickActions: 'Quick Actions',
  workoutPlans: 'Workout Plans',
  recipes: 'Recipes',
  myGoals: 'My Goals',
  habits: 'Habits',
  successStories: 'Success Stories',

  limitedOffer: 'LIMITED OFFER',
  upgradeToPremiumTitle: 'Upgrade to Premium',
  premiumSubtitle: 'Unlock all features and get personalized coaching',
  unlimitedAICoach: 'Unlimited AI Coach Sessions',
  advancedAnalytics: 'Advanced Analytics & Insights',
  customMealWorkout: 'Custom Meal & Workout Plans',
  prioritySupport: 'Priority Support',
  perMonth: '/month',
  upgradeNow: 'Upgrade Now',

  aiFitnessCoach: 'AI Fitness Coach',
  online: '● Online',

  foodMenu: 'Food Menu',
  workout: 'Workout',
  progress: 'Progress',

  typeFoodOrAsk: 'Type food name or ask anything...',
  analyzingFood: 'Analyzing food image...',

  selectFoodItems: 'Select Food Items',
  itemsSelected: (n) => `${n} item${n > 1 ? 's' : ''} selected`,
  clearAll: 'Clear All',
  calculate: (n) => `Calculate (${n})`,

  logToNutritionDiary: 'Log to Nutrition Diary',
  foodLoggedSuccess: 'Food logged to your nutrition diary!',

  uploadFoodImage: 'Upload Food Image',
  chooseHowToAdd: 'Choose how to add your food image',
  takePhoto: 'Take Photo',
  chooseFromGallery: 'Choose from Gallery',

  chatInitialMessage:
    "Hello! 👋 I'm your AI fitness coach. I'm here to help you achieve your health and fitness goals!\n\nI can assist you with:\n- Creating personalized workout plans\n- Suggesting healthy meal plans\n- Tracking your progress\n- Answering fitness questions\n- Providing motivation and tips\n\nHow can I help you today?",

  foodAnalyzedImage: "Great! I've analyzed your food image. Here's what I found:",
  foodAnalyzedPhoto: "Perfect! I've analyzed your food photo. Here's the nutritional breakdown:",
  foodAnalyzedText: "Perfect! I've analyzed your food intake:",
  greatChoice: "Great choice! Here's the nutritional information:",
  combinedNutrition: (n) => `Perfect! Here\'s the combined nutritional information for your ${n} items:`,

  workoutPlanRequest: 'Create a workout plan for me',
  progressTrackingRequest: 'How can I track my progress?',

  profileSectionFitness: 'Fitness',
  profileSectionNutrition: 'Nutrition',
  profileSectionHealthWellness: 'Health & Wellness',
  profileSectionRewards: 'Rewards',
  profileSectionSettings: 'Settings',
  profileSectionAppearance: 'Appearance',
  profileSectionSupport: 'Support',
  profileSectionAbout: 'About',
  profileSectionDeveloper: 'Developer Options',

  statWeight: 'Weight',
  statHeight: 'Height',
  statAge: 'Age',
  statBMI: 'BMI',
  statUnitKg: 'kg',
  statUnitCm: 'cm',
  statUnitYrs: 'yrs',

  premiumMember: 'Premium Member',

  workoutHistory: 'Workout History',
  workoutHistorySub: 'View your past workouts',
  bodyMeasurements: 'Body Measurements',
  bodyMeasurementsSub: 'Track your body composition',
  progressPhotos: 'Progress Photos',
  progressPhotosSub: 'Before and after photos',
  achievements: 'Achievements',
  achievementsSub: 'Badges and milestones',

  mealHistory: 'Meal History',
  mealHistorySub: 'View your nutrition log',
  recipesMenuSub: 'Healthy meal ideas',
  habitsAndCravings: 'Habits & Cravings',
  habitsAndCravingsSub: 'Analyze eating patterns',

  periodTracker: 'Period Tracker',
  periodTrackerSub: 'Track your menstrual cycle',

  referAndEarn: 'Refer & Earn',
  referAndEarnSub: 'Share your code and get rewards',

  reminders: 'Reminders',
  remindersSub: 'Manage your notifications',

  themeLight: 'Light',
  themeDark: 'Dark',
  themeSystem: 'System',

  editProfile: 'Edit Profile',
  editProfileSub: 'Update your personal information',
  goalsMenu: 'Goals',
  goalsMenuSub: 'Manage your fitness goals',
  notifications: 'Notifications',
  notificationsSub: 'Push notifications & reminders',
  privacySecurity: 'Privacy & Security',
  privacySecuritySub: 'Manage your privacy settings',

  helpCenter: 'Help Center',
  helpCenterSub: 'Get help with any issues',
  contactSupport: 'Contact Support',
  contactSupportSub: "We're here to help",
  termsAndConditions: 'Terms & Conditions',
  termsAndConditionsSub: 'Read our terms',
  privacyPolicy: 'Privacy Policy',
  privacyPolicySub: 'How we protect your data',

  appVersion: 'App Version',
  rateUs: 'Rate Us',
  rateUsSub: 'Share your feedback',

  resetOnboarding: 'Reset Onboarding',
  resetOnboardingSub: 'View onboarding screens again',
  resetOnboardingTitle: 'Reset Onboarding',
  resetOnboardingMessage: 'This will clear onboarding data and restart the app flow. You will be taken back to the onboarding screens.',
  resetButton: 'Reset',
  resetOnboardingError: 'Failed to reset onboarding',

  // Common
  today: 'Today',
  yesterday: 'Yesterday',
  all: 'All',
  or: 'OR',
  done: 'Done',
  deleteLabel: 'Delete',
  error: 'Error',
  completedLabel: 'Completed',
  activeLabel: 'Active',
  notesLabel: 'Notes',
  daysUnit: 'days',
  hoursUnit: 'hours',
  glassesUnit: 'glasses',
  stepsUnit: 'steps',
  goalSuffix: 'goal',

  // Login
  loginSubtitle: 'Your Personal Fitness Assistant',
  phoneNumberLabel: 'Phone Number',
  enterPhoneNumber: 'Enter your phone number',
  sendOTP: 'Send OTP',
  continueWithGoogle: 'Continue with Google',
  termsText: 'By continuing, you agree to our Terms of Service and Privacy Policy',
  validPhoneError: 'Please enter a valid phone number',

  // Verify OTP
  verifyOTPTitle: 'Verify OTP',
  otpInstruction: 'Enter the 6-digit code sent to',
  resendOTPTimer: (n) => `Resend OTP in ${n}s`,
  resendOTPBtn: 'Resend OTP',
  otpResent: 'OTP has been resent to your phone',
  enterCompleteOTP: 'Please enter the complete OTP',

  // Workout History
  workoutsCountLabel: 'Workouts',
  minutesCountLabel: 'Minutes',
  filterStrength: 'Strength',
  filterCardio: 'Cardio',
  filterYoga: 'Yoga',
  filterHIIT: 'HIIT',

  // Achievements
  achievementUnlocked: 'Unlocked',
  achievementLocked: 'Locked',
  achievementPoints: 'Points',
  achievementComplete: 'Complete',

  // Nutrition
  nutritionScreenTitle: 'Nutrition',
  caloriesConsumed: 'Calories Consumed',
  calRemaining: 'cal remaining',
  macros: 'Macros',
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
  weeklyOverview: 'Weekly Overview',
  todaysMeals: "Today's Meals",
  mealBreakfast: 'Breakfast',
  mealLunch: 'Lunch',
  mealDinner: 'Dinner',
  mealSnack: 'Snack',

  // Goals
  goalsScreenTitle: 'My Goals',
  goalsCatWeight: 'Weight',
  goalsCatWorkout: 'Workout',
  goalsCatNutrition: 'Nutrition',
  goalsCatHabit: 'Habit',
  goalsCatPerformance: 'Performance',
  goalsStatTotal: 'Total',
  goalsStatActive: 'Active',
  goalsStatCompleted: 'Completed',
  goalsNoGoals: 'No goals in this category',
  goalsPercentComplete: '% Complete',
  goalsNoDeadline: 'No deadline',
  goalsOverdue: 'Overdue',
  goalsTomorrow: 'Tomorrow',
  goalsDaysLeft: (n) => `${n} days left`,

  // Recipes
  recipesSubtitle: 'Healthy & delicious meals',
  recipesSearch: 'Search recipes...',
  recipesFilterHighProtein: 'High Protein',
  recipesFilterLowCarb: 'Low Carb',
  recipesFilterVegetarian: 'Vegetarian',
  recipesFilterQuickEasy: 'Quick & Easy',
  recipesDiffEasy: 'Easy',
  recipesDiffMedium: 'Medium',
  recipesDiffHard: 'Hard',
  recipesPrep: 'Prep:',
  recipesCook: 'Cook:',
  recipesServings: 'servings',
  recipesBackToList: 'Back to Recipes',
  recipesNutritionPerServing: 'Nutrition Per Serving',
  recipesIngredients: 'Ingredients',
  recipesInstructions: 'Instructions',
  recipesAddToMealPlan: 'Add to Meal Plan',

  // Reminders
  remindersScreenTitle: 'Smart Reminders',
  remindersScreenSubtitle: 'Stay on track with your goals',
  remindersCustomize: 'Customize Your Reminders',
  remindersInfo: 'Toggle reminders on/off. All reminders are optional and can be customized to your schedule.',
  remindersActiveLabel: 'Active',
  remindersTotalLabel: 'Total',
  remindersAll: 'All Reminders',
  remindersWaterIntakeTitle: 'Water Intake',
  remindersWaterIntakeSub: 'Stay hydrated throughout the day',
  remindersDailyStepsTitle: 'Daily Steps Goal',
  remindersDailyStepsSub: 'Get moving and hit your step target',
  remindersMorningWorkoutTitle: 'Morning Workout',
  remindersMorningWorkoutSub: 'Start your day with exercise',
  remindersEveningWorkoutTitle: 'Evening Workout',
  remindersEveningWorkoutSub: 'Evening training session',
  remindersMealPrepTitle: 'Meal Prep',
  remindersMealPrepSub: 'Prepare healthy meals',
  remindersSleepReminderTitle: 'Sleep Reminder',
  remindersSleepReminderSub: 'Time to wind down for better rest',
  remindersWeighInTitle: 'Weigh-in',
  remindersWeighInSub: 'Track your weekly progress',
  remindersStretchBreakTitle: 'Stretch Break',
  remindersStretchBreakSub: 'Take a moment to stretch',
  remindersAddCustom: 'Add Custom Reminder',
  remindersTipsTitle: 'Tips for Success',
  remindersTip1: 'Set reminders at times when you can actually act on them',
  remindersTip2: 'Start with 2-3 key reminders, then add more as needed',
  remindersTip3: 'Adjust frequency based on your lifestyle and schedule',

  // Body Measurements
  bmScreenTitle: 'Body Measurements',
  bmScreenSubtitle: 'Track your body composition',
  bmTabWeight: 'Weight',
  bmTabBodyFat: 'Body Fat %',
  bmTabMeasurements: 'Measurements',
  bmWeightTrend: 'Weight Trend',
  bmBodyFatTrend: 'Body Fat % Trend',
  bmStarting: 'Starting',
  bmCurrent: 'Current',
  bmChange: 'Change',
  bmChest: 'Chest',
  bmWaist: 'Waist',
  bmHips: 'Hips',
  bmArms: 'Arms',
  bmThighs: 'Thighs',
  bmMeasurementHistory: 'Measurement History',
  bmBodyFatRanges: 'Body Fat Ranges',
  bmBodyFatLabel: '% BF',

  // Habits Analysis
  habitsScreenTitle: 'Habits & Cravings',
  habitsScreenSubtitle: 'Understand your patterns',
  habitsTabCravings: 'Cravings',
  habitsTabHabits: 'Habits',
  habitsTabInsights: 'Insights',
  habitsCravingPatterns: 'Craving Patterns',
  habitsThisWeek: 'This Week',
  habitsAvgIntensity: 'Avg Intensity',
  habitsTopTrigger: 'Top Trigger',
  habitsCravingsByTime: 'Cravings by Time of Day',
  habitsMorning: 'Morning',
  habitsAfternoon: 'Afternoon',
  habitsEvening: 'Evening',
  habitsNight: 'Night',
  habitsRecentCravings: 'Recent Cravings',
  habitsOverallCompletion: 'Overall Completion Rate',
  habitsYourHabits: 'Your Habits',
  habitsLastCompleted: 'Last completed:',
  habitsTriggerLabel: 'Trigger:',
  habitsKeyInsights: 'Key Insights',
  habitsRecommendations: 'Personalized Recommendations',

  // Period Tracker
  ptLogNewCycle: 'Log New Cycle',
  ptCycleStartDate: 'Cycle Start Date',
  ptCycleLength: 'Cycle Length (days)',
  ptNotesOptional: 'Notes (optional)',
  ptNotesPlaceholder: 'Any symptoms or observations...',
  ptAddCycleData: 'Add Cycle Data',
  ptCycleHistory: 'Cycle History',
  ptDeleteCycleTitle: 'Delete Cycle',
  ptDeleteCycleMessage: 'Are you sure you want to delete this cycle record?',
  ptAddCycleSuccess: 'Cycle data added successfully',
  ptInvalidInput: 'Invalid Input',
  ptInvalidLength: 'Please enter a cycle length between 20-45 days',
  ptNextCyclePredicted: 'Next cycle predicted:',
  ptPhaseMenstrual: 'Menstrual',
  ptPhaseFollicular: 'Follicular',
  ptPhaseOvulation: 'Ovulation',
  ptPhaseLuteal: 'Luteal',
  ptPhaseFuture: 'Future',
  ptPhaseLate: 'Late Cycle',
  ptTipMenstrual: 'Rest and recovery phase. Focus on gentle exercises.',
  ptTipFollicular: 'High energy! Good time for intense workouts.',
  ptTipOvulation: 'Peak energy and strength. Push your limits!',
  ptTipLuteal: 'Energy may decrease. Focus on moderate activities.',
  ptInfoText: 'Track your menstrual cycle to optimize your workouts and nutrition based on your hormonal phases. Understanding your cycle helps you work with your body, not against it!',
  ptPhaseLabel: 'Phase',
  ptDoneButton: 'Done',
  ptDeleteButton: 'Delete',

  // Referral
  referralAvailablePoints: 'Available Points',
  referralEarned: 'Earned',
  referralCash: 'Cash',
  referralCountLabel: 'Referrals',
  referralYourCode: 'Your Referral Code',
  referralCopy: 'Copy',
  referralShare: 'Share',
  referralHowItWorks: 'How It Works',
  referralRedeemPoints: 'Redeem Your Points',
  referralYourReferrals: 'Your Referrals',
  referralTermsText: 'Rewards are credited within 24 hours. Maximum 50 referrals per month. Terms & conditions apply.',
  referralCopied: 'Copied!',
  referralCopiedMsg: 'Referral code copied to clipboard',
  referralPendingStatus: 'Pending',
  referralJoinedStatus: 'Joined',
  referralPremiumStatus: 'Premium',
  referralRedeem: 'Redeem',
  referralMorePtsNeeded: (n) => `${n} more pts`,
  referralDiscount: 'New Users Get 20% OFF',
  referralDiscountInfo: 'First month discount when they use your code',
  referralStep1Title: 'Share Your Code',
  referralStep2Title: 'Friend Signs Up',
  referralStep3Title: 'They Go Premium',
  referralStep4Title: 'Redeem Rewards',
  referralScreenTitle: 'Refer & Earn',
  referralStep1Desc: 'Share your code - friends get 20% OFF first month',
  referralStep2Desc: 'They join with your code - You earn 50 points + $5',
  referralStep3Desc: 'When they upgrade - You earn 100 points + $5 more',
  referralStep4Desc: 'Use points for discounts or free months',
  referralJoinedLabel: (d) => `Joined ${d}`,
  referralRedeemTitle: 'Redeem Reward',
  referralSuccessTitle: 'Success!',
  referralSuccessMsg: (label) => `You've redeemed ${label}! Check your account for the discount.`,
  referralNotEnoughTitle: 'Not Enough Points',

  // Water Tracking
  waterScreenTitle: 'Water Tracking',
  waterTodaysHydration: "Today's Hydration",
  waterGlassesLabel: 'Glasses',
  waterGoalLabel: 'Goal',
  waterToGoLabel: 'To Go',
  waterGoalAchieved: '🎉 Goal achieved!',
  waterAlmostThere: '💪 Almost there!',
  waterHalfwayDone: '👍 Halfway done!',
  waterKeepGoing: '🚀 Keep going!',
  waterQuickAdd: 'Quick Add',
  waterHalfGlass: '½ Glass',
  waterOneGlass: '1 Glass',
  waterTwoGlasses: '2 Glasses',
  waterWeeklyTrend: 'Weekly Trend',
  waterAvgLabel: 'Avg:',
  waterGlassesPerDay: 'glasses/day',
  waterGoalDisplay: 'Goal: 8 glasses',
  waterAIInsightsTitle: 'AI Insights',
  waterHydrationReminders: 'Hydration Reminders',
  waterSetReminders: 'Set Reminders',
  waterRemindersHint: 'Get notified to drink water throughout the day',
  waterTipsTitle: '💡 Hydration Tips',
  waterTip1: 'Start your day with a glass of water',
  waterTip2: 'Drink water before each meal',
  waterTip3: 'Keep a water bottle within reach',
  waterTip4: 'Drink more during/after exercise',

  // Steps Tracking
  stepsScreenTitle: 'Steps Tracking',
  stepsTodaysActivity: "Today's Activity",
  stepsActiveTimeLabel: 'Active Time',
  stepsDistanceLabel: 'Distance',
  stepsActiveLabel: 'Active',
  stepsWeekLabel: 'Week',
  stepsMonthLabel: 'Month',
  stepsThisWeekTitle: 'This Week',
  stepsMonthlyTitle: 'Monthly Overview',
  stepsAvgLabel: 'Avg:',
  stepsAchievementsTitle: 'Achievements',
  stepsAIInsightsTitle: 'AI Insights',
  stepsQuickActionsTitle: 'Quick Actions',
  stepsStartWorkout: 'Start Workout',
  stepsAdjustGoal: 'Adjust Goal',
  stepsGoalCrushed: '🎉 Goal crushed!',
  stepsAlmostThere: '💪 Almost there!',
  stepsHalfwayDone: '⚡ Halfway done!',
  stepsKeepMoving: '🚶 Keep moving!',
  stepsGoalDisplay: (n) => `Goal: ${n.toLocaleString()} steps`,
  stepsLegendSteps: 'Steps',
  stepsLegendActiveTime: 'Active Time',
  stepsLegendCalories: 'Calories',

  // Weekly Review
  weeklyReviewScreenTitle: 'Weekly Review',
  weeklyReviewScoreTitle: 'Weekly Performance Score',
  weeklyReviewGradeLabel: 'Grade:',
  weeklyReviewProgressBreakdownTitle: 'Progress Breakdown',
  weeklyReviewDailyCompletionTitle: 'Daily Goal Completion',
  weeklyReviewAchievementsTitle: "This Week's Achievements",
  weeklyReviewAISummaryTitle: 'AI Coach Summary',
  weeklyReviewAreasTitle: 'Areas for Improvement',
  weeklyReviewPatternTitle: 'Pattern Analysis',
  weeklyReviewStrengthsTitle: '✓ Strengths',
  weeklyReviewChallengesTitle: '⚠ Challenges',
  weeklyReviewRecommendationsTitle: 'Recommendations for Next Week',
  weeklyReviewUpdateGoalsBtn: 'Update My Goals for Next Week',
  weeklyReviewHighPriority: 'HIGH',
  weeklyReviewMediumPriority: 'MEDIUM',
  weeklyReviewCurrentLabel: 'Current:',
  weeklyReviewGoalLabel: 'Goal:',
  weeklyReviewGradeA: 'Outstanding!',
  weeklyReviewGradeB: 'Great Job!',
  weeklyReviewGradeC: 'Good Effort!',
  weeklyReviewGradeD: 'Keep Pushing!',
  weeklyReviewGradeF: "Let's Improve!",
  weeklyReviewImpactLabel: 'Impact:',

  // Progress Dashboard
  pdScreenTitle: 'Progress Dashboard',
  pdOverallProgressTitle: 'Overall Progress',
  pd3MonthsLabel: '3 Months',
  pdTrendAnalysisTitle: 'Trend Analysis',
  pdThisWeekVsLast: 'This Week vs Last Week',
  pdMilestonesTitle: 'Milestones',
  pdWeeklyReviewBtn: 'Weekly Review',
  pdUpdateGoalsBtn: 'Update Goals',
  pdProgressPhotosBtn: 'Progress Photos',
  pdHabitsBtn: 'Habits',
  pdQuickActionsTitle: 'Quick Actions',
  pdGoalLabel: 'Goal:',
  pdWeekLabel: 'Week',
  pdMonthLabel: 'Month',

  // AI Insights
  aiInsightsScreenTitle: 'AI Insights',
  aiInsightsSummaryTitle: 'Insights Summary',
  aiInsightsPatternsLabel: 'Patterns',
  aiInsightsSuggestionsLabel: 'Suggestions',
  aiInsightsWarningsLabel: 'Warnings',
  aiInsightsAchievementsLabel: 'Achievements',
  aiInsightsAllLabel: 'All',
  aiInsightsActivityLabel: 'Activity',
  aiInsightsNutritionLabel: 'Nutrition',
  aiInsightsSleepLabel: 'Sleep',
  aiInsightsHabitsLabel: 'Habits',
  aiInsightsNoInsightsTitle: 'No Insights Found',
  aiInsightsNoInsightsHintText: 'Try selecting a different category or keep tracking your activities to generate more insights.',
  aiInsightsHowItWorksTitle: 'How AI Insights Work',
  aiInsightsFoundCount: (n) => `${n} ${n === 1 ? 'Insight' : 'Insights'} Found`,

  // Founder Story
  founderCoachName: 'Your Coach Name',
  founderCoachTitle: 'Certified Fitness & Nutrition Coach',
  founderStoryText: "After my own transformation journey and helping 500+ women achieve their fitness goals, I created this app to make personalized coaching accessible to every woman.\n\nWhether you're a new mom, managing PCOS, building muscle, or juggling a busy career—you deserve a plan that works with your life, not against it.",
  founderTransformationsTitle: 'Top 10 Transformations',
  founderTransformationsSub: 'Real clients. Real results.',
  founderBefore: 'BEFORE',
  founderAfter: 'AFTER',
  founderSpecialized: 'Specialized results for postpartum recovery, PCOS management, muscle building, busy professionals, and vegetarian lifestyles',
  founderStartTransformationBtn: 'Start Your Transformation',

  // Progress Photos
  ppScreenTitle: 'Progress Photos',
  ppDaysLabel: 'Days',
  ppKgLostLabel: 'kg Lost',
  ppPhotosLabel: 'Photos',
  ppGridView: 'Grid',
  ppTimelineView: 'Timeline',
  ppAddPhotoBtn: 'Add Photo',
  ppAddNewPhotoTitle: 'Add New Photo',
  ppInDaysLabel: (n) => `in ${n} days`,
  wpNotesTitle: 'Notes',
  wpAdditionalResourcesTitle: 'Additional Resources',

  // Self Assessment
  saScreenTitle: 'Self-Assessment',
  saIntroText: 'Please fill out this comprehensive questionnaire to help us create your personalized fitness and nutrition plan.',
  saBasicInfoSection: 'Basic Information',
  saNameLabel: 'Name *',
  saNamePlaceholder: 'Enter your full name',
  saContactLabel: 'Contact Number *',
  saContactPlaceholder: 'Enter your contact number',
  saEmailLabel: 'Email ID *',
  saEmailPlaceholder: 'Enter your email',
  saGenderLabel: 'Gender *',
  saGenderMale: 'Male',
  saGenderFemale: 'Female',
  saGenderOther: 'Other',
  saAgeLabel: 'Age *',
  saAgePlaceholder: 'Enter your age',
  saWeightLabel: 'Weight (kg) *',
  saWeightPlaceholder: 'Enter your weight',
  saHeightLabel: 'Height (cm) *',
  saHeightPlaceholder: 'Enter your height',
  saMedicalInfoSection: 'Medical Information',
  saMedicalConditionsQ: 'Do you have any medical conditions?',
  saMedicalDetailsLabel: 'Please provide details *',
  saMedicalPlaceholder: 'List your medical conditions',
  saMedicationsQ: 'Are you currently taking any medications or supplements?',
  saMedDetailsLabel: 'Please provide details *',
  saMedPlaceholder: 'List your medications/supplements',
  saDietSection: 'Diet History',
  saDietBeforeQ: 'Have you followed any diet plans before?',
  saDietOption1: 'No, this is my first time',
  saDietOption2: 'Yes, a few',
  saDietOption3: 'Yes, many',
  saDietTypesQ: 'What kind of diets have you tried?',
  saDietTypesPlaceholder: 'E.g., Keto, Paleo, Vegan, etc.',
  saDietTypeQ: 'Which type of diet do you follow?',
  saDietTypeVegetarian: 'Vegetarian',
  saDietTypeNonVeg: 'Non-Vegetarian',
  saDietTypeVegan: 'Vegan',
  saDietTypePesc: 'Pescatarian',
  saDietTypeFlex: 'Flexitarian',
  saDietTypeNoPref: 'No Preference',
  saFoodAllergiesQ: 'Do you have any known food allergies or intolerances?',
  saFoodAllergiesPlaceholder: 'E.g., Lactose, Gluten, Nuts, etc. (or write "None")',
  saFitnessGoalsSection: 'Fitness Goals',
  saCurrentGoalQ: 'What is your current health or fitness goal?',
  saCurrentGoalPlaceholder: 'E.g., Weight loss, Muscle gain, General fitness',
  saBiggestFearQ: 'What is your biggest fear or struggle in your fitness/diet journey?',
  saFearOpt1: 'I lose motivation',
  saFearOpt2: "I don't stick to routines",
  saFearOpt3: 'I get confused with what to eat',
  saFearOpt4: 'I struggle with emotional eating',
  saFearOpt5: 'Other',
  saFearSpecify: 'Please specify',
  saFearSpecifyPlaceholder: 'Describe your struggle',
  saActivitySection: 'Activity & Lifestyle',
  saActivityLevelQ: 'What is your Daily Activity Level?',
  saActivitySedentary: 'Sedentary (little or no exercise)',
  saActivityLightlyActive: 'Lightly Active (1-3 days/week)',
  saActivityModerately: 'Moderately Active (3-5 days/week)',
  saActivityVeryActive: 'Very Active (6-7 days/week)',
  saActivityExtremelyActive: 'Extremely Active (intense exercise daily)',
  saTypicalMealsQ: 'Please list your typical daily meals',
  saTypicalMealsPlaceholder: 'Breakfast, lunch, snacks, dinner, etc.',
  saWorkoutPrefQ: 'Do you prefer Gym or Home Workouts?',
  saWorkoutPrefGym: 'Gym Workout',
  saWorkoutPrefHome: 'Home Workout',
  saWorkoutPrefBoth: 'Both',
  saAdditionalInfoSection: 'Additional Information',
  saAdditionalNotesQ: "Anything else you'd like me to know?",
  saAdditionalNotesPlaceholder: 'Optional: Share any additional information',
  saSubmitBtn: 'Complete Assessment',

  // Onboarding
  onboardingWelcomeTitle: 'Welcome to Fitzen!',
  onboardingSubtitleText: "Let's personalize your fitness journey",
  onboardingAlreadyMemberText: 'Already a member? Sign in',
  onboardingSeeStoriesBtn: 'See Success Stories & Transformations',
  onboardingLiveConsultationOpt: 'Live Consultation',
  onboardingLiveConsultationDesc: 'Schedule a 1-on-1 call with your coach',
  onboardingSelfAssessmentOpt: 'Self-Assessment',
  onboardingSelfAssessmentDesc: 'Complete a detailed questionnaire',
  onboardingScheduleCallTitle: 'Schedule Your Call',
  onboardingScheduleCallSub: 'Choose a convenient time for your consultation',
  onboardingBookConsultationBtn: 'Book Consultation',
  onboardingTellAboutTitle: 'Tell Us About Yourself',
  onboardingTellAboutSub: 'Help us create your perfect fitness plan',

  // Coach Selection
  csScreenTitle: 'Choose Your Coach',
  csScreenSubtitle: 'Personalize your coaching experience',
  csAlreadyMemberText: 'Already a member?',
  csCoachGenderLabel: 'Coach Gender',
  csCoachGenderDesc: "Select the gender you're most comfortable working with",
  csCoachingStyleLabel: 'Coaching Style',
  csCoachingStyleDesc: 'How would you like your coach to communicate with you?',
  csYourSelectionLabel: 'Your Selection',
  csStartJourneyBtn: 'Start My Journey',

  // Payment
  payPremiumFeaturesTitle: 'Premium Features',
  payChoosePlanTitle: 'Choose Your Plan',
  payMonthlyPlan: 'Monthly',
  payYearlyPlan: 'Yearly',
  payPopularBadge: 'POPULAR',
  payMethodLabel: 'Payment Method',
  payUPI: 'UPI',
  payCard: 'Card',
  payNetBanking: 'Net Banking',
  payOrderSummaryTitle: 'Order Summary',
  payTaxLabel: 'Tax (18%)',
  payTotalLabel: 'Total',
  payFeature1: 'Personalized AI workout plans',
  payFeature2: 'Custom meal planning',
  payFeature3: 'Advanced analytics & insights',
  payFeature4: 'Priority chat support',
  payFeature5: 'Ad-free experience',
  payFeature6: 'Unlimited workout tracking',
  paySaveAmount: (n) => `Save ₹${n}`,
  payEnterUPITitle: 'Enter UPI ID',
  payUPIHint: 'You will receive a payment request on your UPI app',
  payCardDetailsTitle: 'Card Details',
  payCardNumberLabel: 'Card Number',
  payExpiryLabel: 'Expiry',
  payCVVLabel: 'CVV',
  payCardholderLabel: 'Cardholder Name',
  paySelectBankTitle: 'Select Bank',
  paySelectMethodError: 'Please select a payment method',
  payEnterUPIError: 'Please enter your UPI ID',
  payFillCardError: 'Please fill in all card details',
  paySelectBankError: 'Please select your bank',
  paySuccessTitle: 'Payment Successful! 🎉',
  paySuccessMessage: 'Your premium membership has been activated.',
  payMonthDuration: 'month',
  payYearDuration: 'year',
  payNowBtn: (amount) => `Pay ₹${amount}`,

  // Common new
  goBack: 'Go Back',

  // Splash
  splashTagline: 'Your AI Fitness Coach',
  splashPoweredBy: 'Powered by AI',

  // Social
  socialCommunity: 'Community',
  socialComments: 'Comments',
  socialWriteComment: 'Write a comment...',
  socialNoComments: 'No comments yet. Be the first to comment!',
  socialMinutesAgo: (n) => `${n}m ago`,
  socialHoursAgo: (n) => `${n}h ago`,
  socialDaysAgo: (n) => `${n}d ago`,

  // Onboarding new
  onboardingGetStarted: 'Get Started',
  onboardingStepOf: (step, total) => `Step ${step} of ${total}`,
  onboardingDuration: 'Duration',
  onboardingDurationValue: '30-45 minutes',
  onboardingWhatToExpect: 'What to Expect',
  onboardingCallExpect: 'Discuss your fitness goals, health history, and get personalized recommendations',

  // Coach Selection new
  csStyleFriendly: 'Friendly & Supportive',
  csStyleStrict: 'Strict & Disciplined',
  csStyleCalm: 'Calm & Balanced',
  csStyleMotivational: 'Motivational & Energetic',
  csStyleFriendlyDesc: 'Encouraging and warm approach',
  csStyleStrictDesc: 'Tough love and accountability',
  csStyleCalmDesc: 'Mindful and steady guidance',
  csStyleMotivationalDesc: 'High energy and inspiring',
  csPreviewText: (genderLabel, styleName) => `${genderLabel} coach with a ${styleName.toLowerCase()} approach`,
  csMaleCoach: 'Male',
  csFemaleCoach: 'Female',
};

const bn: AppTranslations = {
  languageName: 'বাংলা',
  languageInstruction: 'Please respond in Bengali (বাংলা) language only. ',

  user: 'ব্যবহারকারী',
  cancel: 'বাতিল',
  language: 'ভাষা',
  success: 'সফল',

  logout: 'লগআউট',
  logoutConfirmTitle: 'লগআউট',
  logoutConfirmMessage: 'আপনি কি সত্যিই লগআউট করতে চান?',

  home: 'হোম',
  aiCoachChat: 'AI কোচ চ্যাট',
  profile: 'প্রোফাইল',
  settings: 'সেটিংস',
  upgradeToPremium: 'প্রিমিয়ামে আপগ্রেড করুন',

  greeting: (name) => `নমস্কার, ${name}! 👋`,
  motivationText: 'আজ আপনার লক্ষ্য অর্জন করুন!',
  dayStreak: 'দিনের ধারা',

  todaysGoals: 'আজকের লক্ষ্যমাত্রা',
  steps: 'পদক্ষেপ',
  calories: 'ক্যালোরি',
  activeTime: 'সক্রিয় সময়',

  statGoal: 'লক্ষ্য:',
  calBurned: 'ক্যালোরি পোড়া',
  glasses: 'গ্লাস',
  sleep: 'ঘুম',
  stepsLabel: 'পদক্ষেপ',
  distance: 'দূরত্ব',

  weeklySteps: 'সাপ্তাহিক পদক্ষেপ',
  weeklyCalories: 'সাপ্তাহিক ক্যালোরি',
  avg: 'গড়',
  total: 'মোট',

  aiCoachFeatures: '🤖 AI কোচ ফিচার',
  viewAll: 'সব দেখুন',
  water: 'পানি',
  trackIntake: 'গ্রহণ ট্র্যাক করুন',
  dailyActivity: 'দৈনিক কার্যকলাপ',
  weeklyReview: 'সাপ্তাহিক পর্যালোচনা',
  seeProgress: 'অগ্রগতি দেখুন',
  dashboard: 'ড্যাশবোর্ড',
  allMetrics: 'সব মেট্রিক্স',
  aiInsights: 'AI অন্তর্দৃষ্টি',
  smartTips: 'স্মার্ট টিপস',

  quickActions: 'দ্রুত কার্যক্রম',
  workoutPlans: 'ব্যায়ামের পরিকল্পনা',
  recipes: 'রেসিপি',
  myGoals: 'আমার লক্ষ্য',
  habits: 'অভ্যাস',
  successStories: 'সাফল্যের গল্প',

  limitedOffer: 'সীমিত অফার',
  upgradeToPremiumTitle: 'প্রিমিয়ামে আপগ্রেড করুন',
  premiumSubtitle: 'সমস্ত ফিচার আনলক করুন এবং ব্যক্তিগতকৃত কোচিং পান',
  unlimitedAICoach: 'অসীমিত AI কোচ সেশন',
  advancedAnalytics: 'উন্নত বিশ্লেষণ ও অন্তর্দৃষ্টি',
  customMealWorkout: 'কাস্টম খাবার ও ব্যায়ামের পরিকল্পনা',
  prioritySupport: 'অগ্রাধিকার সমর্থন',
  perMonth: '/মাস',
  upgradeNow: 'এখনই আপগ্রেড করুন',

  aiFitnessCoach: 'AI ফিটনেস কোচ',
  online: '● অনলাইন',

  foodMenu: 'খাবার মেনু',
  workout: 'ব্যায়াম',
  progress: 'অগ্রগতি',

  typeFoodOrAsk: 'খাবারের নাম টাইপ করুন বা কিছু জিজ্ঞেস করুন...',
  analyzingFood: 'খাবারের ছবি বিশ্লেষণ করা হচ্ছে...',

  selectFoodItems: 'খাবার নির্বাচন করুন',
  itemsSelected: (n) => `${n}টি আইটেম নির্বাচিত`,
  clearAll: 'সব মুছুন',
  calculate: (n) => `হিসাব করুন (${n})`,

  logToNutritionDiary: 'পুষ্টি ডায়েরিতে লগ করুন',
  foodLoggedSuccess: 'খাবার পুষ্টি ডায়েরিতে লগ করা হয়েছে!',

  uploadFoodImage: 'খাবারের ছবি আপলোড করুন',
  chooseHowToAdd: 'কীভাবে খাবারের ছবি যোগ করবেন তা বেছে নিন',
  takePhoto: 'ছবি তুলুন',
  chooseFromGallery: 'গ্যালারি থেকে বেছে নিন',

  chatInitialMessage:
    'নমস্কার! 👋 আমি আপনার AI ফিটনেস কোচ। আমি আপনাকে আপনার স্বাস্থ্য ও ফিটনেস লক্ষ্য অর্জনে সাহায্য করতে এখানে আছি!\n\nআমি সাহায্য করতে পারি:\n- ব্যক্তিগতকৃত ব্যায়ামের পরিকল্পনা তৈরিতে\n- স্বাস্থ্যকর খাবারের পরিকল্পনা প্রস্তাব করতে\n- আপনার অগ্রগতি ট্র্যাক করতে\n- ফিটনেস প্রশ্নের উত্তর দিতে\n- অনুপ্রেরণা ও টিপস প্রদান করতে\n\nআজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',

  foodAnalyzedImage: 'চমৎকার! আপনার খাবারের ছবি বিশ্লেষণ করা হয়েছে। এখানে যা পাওয়া গেছে:',
  foodAnalyzedPhoto: 'পারফেক্ট! আপনার খাবারের ফটো বিশ্লেষণ করা হয়েছে। পুষ্টির বিবরণ:',
  foodAnalyzedText: 'পারফেক্ট! আপনার খাদ্য গ্রহণ বিশ্লেষণ করা হয়েছে:',
  greatChoice: 'চমৎকার পছন্দ! এখানে পুষ্টির তথ্য:',
  combinedNutrition: (n) => `পারফেক্ট! আপনার ${n}টি আইটেমের সম্মিলিত পুষ্টির তথ্য:`,

  workoutPlanRequest: 'আমার জন্য একটি ব্যায়ামের পরিকল্পনা তৈরি করুন',
  progressTrackingRequest: 'আমি কীভাবে আমার অগ্রগতি ট্র্যাক করতে পারি?',

  profileSectionFitness: 'ফিটনেস',
  profileSectionNutrition: 'পুষ্টি',
  profileSectionHealthWellness: 'স্বাস্থ্য ও সুস্থতা',
  profileSectionRewards: 'পুরস্কার',
  profileSectionSettings: 'সেটিংস',
  profileSectionAppearance: 'চেহারা',
  profileSectionSupport: 'সহায়তা',
  profileSectionAbout: 'সম্পর্কে',
  profileSectionDeveloper: 'ডেভেলপার বিকল্প',

  statWeight: 'ওজন',
  statHeight: 'উচ্চতা',
  statAge: 'বয়স',
  statBMI: 'BMI',
  statUnitKg: 'কেজি',
  statUnitCm: 'সেমি',
  statUnitYrs: 'বছর',

  premiumMember: 'প্রিমিয়াম সদস্য',

  workoutHistory: 'ব্যায়ামের ইতিহাস',
  workoutHistorySub: 'আপনার গত ব্যায়াম দেখুন',
  bodyMeasurements: 'শরীরের পরিমাপ',
  bodyMeasurementsSub: 'আপনার শরীরের গঠন ট্র্যাক করুন',
  progressPhotos: 'অগ্রগতির ছবি',
  progressPhotosSub: 'আগে ও পরের ছবি',
  achievements: 'অর্জন',
  achievementsSub: 'ব্যাজ ও মাইলস্টোন',

  mealHistory: 'খাবারের ইতিহাস',
  mealHistorySub: 'আপনার পুষ্টি লগ দেখুন',
  recipesMenuSub: 'স্বাস্থ্যকর খাবারের ধারণা',
  habitsAndCravings: 'অভ্যাস ও খাদ্যতৃষ্ণা',
  habitsAndCravingsSub: 'খাদ্যাভ্যাস বিশ্লেষণ করুন',

  periodTracker: 'পিরিয়ড ট্র্যাকার',
  periodTrackerSub: 'আপনার মাসিক চক্র ট্র্যাক করুন',

  referAndEarn: 'রেফার করুন ও উপার্জন করুন',
  referAndEarnSub: 'আপনার কোড শেয়ার করুন এবং পুরস্কার পান',

  reminders: 'রিমাইন্ডার',
  remindersSub: 'আপনার বিজ্ঞপ্তি পরিচালনা করুন',

  themeLight: 'হালকা',
  themeDark: 'গাঢ়',
  themeSystem: 'সিস্টেম',

  editProfile: 'প্রোফাইল সম্পাদনা করুন',
  editProfileSub: 'আপনার ব্যক্তিগত তথ্য আপডেট করুন',
  goalsMenu: 'লক্ষ্য',
  goalsMenuSub: 'আপনার ফিটনেস লক্ষ্য পরিচালনা করুন',
  notifications: 'বিজ্ঞপ্তি',
  notificationsSub: 'পুশ বিজ্ঞপ্তি ও রিমাইন্ডার',
  privacySecurity: 'গোপনীয়তা ও নিরাপত্তা',
  privacySecuritySub: 'আপনার গোপনীয়তা সেটিংস পরিচালনা করুন',

  helpCenter: 'সহায়তা কেন্দ্র',
  helpCenterSub: 'যেকোনো সমস্যায় সাহায্য পান',
  contactSupport: 'সহায়তায় যোগাযোগ করুন',
  contactSupportSub: 'আমরা সাহায্য করতে এখানে আছি',
  termsAndConditions: 'শর্তাবলী',
  termsAndConditionsSub: 'আমাদের শর্তাবলী পড়ুন',
  privacyPolicy: 'গোপনীয়তা নীতি',
  privacyPolicySub: 'আমরা কীভাবে আপনার ডেটা সুরক্ষিত রাখি',

  appVersion: 'অ্যাপ সংস্করণ',
  rateUs: 'আমাদের রেট করুন',
  rateUsSub: 'আপনার মতামত শেয়ার করুন',

  resetOnboarding: 'অনবোর্ডিং রিসেট করুন',
  resetOnboardingSub: 'অনবোর্ডিং স্ক্রিন আবার দেখুন',
  resetOnboardingTitle: 'অনবোর্ডিং রিসেট করুন',
  resetOnboardingMessage: 'এটি অনবোর্ডিং ডেটা মুছে ফেলবে এবং অ্যাপ প্রবাহ পুনরায় শুরু করবে।',
  resetButton: 'রিসেট',
  resetOnboardingError: 'অনবোর্ডিং রিসেট করতে ব্যর্থ হয়েছে',

  // Common
  today: 'আজ',
  yesterday: 'গতকাল',
  all: 'সব',
  or: 'অথবা',
  done: 'সম্পন্ন',
  deleteLabel: 'মুছুন',
  error: 'ত্রুটি',
  completedLabel: 'সম্পন্ন',
  activeLabel: 'সক্রিয়',
  notesLabel: 'নোট',
  daysUnit: 'দিন',
  hoursUnit: 'ঘণ্টা',
  glassesUnit: 'গ্লাস',
  stepsUnit: 'পদক্ষেপ',
  goalSuffix: 'লক্ষ্য',

  // Login
  loginSubtitle: 'আপনার ব্যক্তিগত ফিটনেস সহকারী',
  phoneNumberLabel: 'ফোন নম্বর',
  enterPhoneNumber: 'আপনার ফোন নম্বর লিখুন',
  sendOTP: 'OTP পাঠান',
  continueWithGoogle: 'Google দিয়ে চালিয়ে যান',
  termsText: 'চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের পরিষেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হন',
  validPhoneError: 'অনুগ্রহ করে একটি বৈধ ফোন নম্বর লিখুন',

  // Verify OTP
  verifyOTPTitle: 'OTP যাচাই করুন',
  otpInstruction: 'এখানে পাঠানো ৬-সংখ্যার কোড লিখুন',
  resendOTPTimer: (n) => `${n} সেকেন্ডে OTP পুনরায় পাঠান`,
  resendOTPBtn: 'OTP পুনরায় পাঠান',
  otpResent: 'OTP আপনার ফোনে পুনরায় পাঠানো হয়েছে',
  enterCompleteOTP: 'সম্পূর্ণ OTP লিখুন',

  // Workout History
  workoutsCountLabel: 'ব্যায়াম',
  minutesCountLabel: 'মিনিট',
  filterStrength: 'শক্তি',
  filterCardio: 'কার্ডিও',
  filterYoga: 'যোগব্যায়াম',
  filterHIIT: 'HIIT',

  // Achievements
  achievementUnlocked: 'আনলক হয়েছে',
  achievementLocked: 'লক',
  achievementPoints: 'পয়েন্ট',
  achievementComplete: 'সম্পূর্ণ',

  // Nutrition
  nutritionScreenTitle: 'পুষ্টি',
  caloriesConsumed: 'ক্যালোরি গ্রহণ',
  calRemaining: 'ক্যালোরি বাকি',
  macros: 'ম্যাক্রো',
  protein: 'প্রোটিন',
  carbs: 'কার্বস',
  fat: 'ফ্যাট',
  weeklyOverview: 'সাপ্তাহিক সারসংক্ষেপ',
  todaysMeals: 'আজকের খাবার',
  mealBreakfast: 'সকালের খাবার',
  mealLunch: 'দুপুরের খাবার',
  mealDinner: 'রাতের খাবার',
  mealSnack: 'স্ন্যাক',

  // Goals
  goalsScreenTitle: 'আমার লক্ষ্য',
  goalsCatWeight: 'ওজন',
  goalsCatWorkout: 'ব্যায়াম',
  goalsCatNutrition: 'পুষ্টি',
  goalsCatHabit: 'অভ্যাস',
  goalsCatPerformance: 'পারফরম্যান্স',
  goalsStatTotal: 'মোট',
  goalsStatActive: 'সক্রিয়',
  goalsStatCompleted: 'সম্পন্ন',
  goalsNoGoals: 'এই বিভাগে কোনো লক্ষ্য নেই',
  goalsPercentComplete: '% সম্পন্ন',
  goalsNoDeadline: 'কোনো সময়সীমা নেই',
  goalsOverdue: 'মেয়াদ শেষ',
  goalsTomorrow: 'আগামীকাল',
  goalsDaysLeft: (n) => `${n} দিন বাকি`,

  // Recipes
  recipesSubtitle: 'স্বাস্থ্যকর ও সুস্বাদু খাবার',
  recipesSearch: 'রেসিপি খুঁজুন...',
  recipesFilterHighProtein: 'উচ্চ প্রোটিন',
  recipesFilterLowCarb: 'কম কার্ব',
  recipesFilterVegetarian: 'নিরামিষ',
  recipesFilterQuickEasy: 'দ্রুত ও সহজ',
  recipesDiffEasy: 'সহজ',
  recipesDiffMedium: 'মাঝারি',
  recipesDiffHard: 'কঠিন',
  recipesPrep: 'প্রস্তুতি:',
  recipesCook: 'রান্না:',
  recipesServings: 'পরিবেশন',
  recipesBackToList: 'রেসিপিতে ফিরুন',
  recipesNutritionPerServing: 'প্রতি পরিবেশনে পুষ্টি',
  recipesIngredients: 'উপকরণ',
  recipesInstructions: 'নির্দেশাবলী',
  recipesAddToMealPlan: 'মিল প্ল্যানে যোগ করুন',

  // Reminders
  remindersScreenTitle: 'স্মার্ট রিমাইন্ডার',
  remindersScreenSubtitle: 'আপনার লক্ষ্যে সঠিক পথে থাকুন',
  remindersCustomize: 'আপনার রিমাইন্ডার কাস্টমাইজ করুন',
  remindersInfo: 'রিমাইন্ডার চালু/বন্ধ করুন। সমস্ত রিমাইন্ডার ঐচ্ছিক এবং আপনার সময়সূচি অনুযায়ী কাস্টমাইজ করা যায়।',
  remindersActiveLabel: 'সক্রিয়',
  remindersTotalLabel: 'মোট',
  remindersAll: 'সব রিমাইন্ডার',
  remindersWaterIntakeTitle: 'পানি গ্রহণ',
  remindersWaterIntakeSub: 'সারাদিন হাইড্রেটেড থাকুন',
  remindersDailyStepsTitle: 'দৈনিক পদক্ষেপ লক্ষ্য',
  remindersDailyStepsSub: 'এগিয়ে যান এবং আপনার পদক্ষেপ লক্ষ্য অর্জন করুন',
  remindersMorningWorkoutTitle: 'সকালের ব্যায়াম',
  remindersMorningWorkoutSub: 'ব্যায়াম দিয়ে আপনার দিন শুরু করুন',
  remindersEveningWorkoutTitle: 'সন্ধ্যার ব্যায়াম',
  remindersEveningWorkoutSub: 'সন্ধ্যার প্রশিক্ষণ সেশন',
  remindersMealPrepTitle: 'খাবার প্রস্তুতি',
  remindersMealPrepSub: 'স্বাস্থ্যকর খাবার প্রস্তুত করুন',
  remindersSleepReminderTitle: 'ঘুমের রিমাইন্ডার',
  remindersSleepReminderSub: 'ভালো বিশ্রামের জন্য শিথিল হওয়ার সময়',
  remindersWeighInTitle: 'ওজন পরিমাপ',
  remindersWeighInSub: 'আপনার সাপ্তাহিক অগ্রগতি ট্র্যাক করুন',
  remindersStretchBreakTitle: 'স্ট্রেচ বিরতি',
  remindersStretchBreakSub: 'একটু স্ট্রেচ করার সময় নিন',
  remindersAddCustom: 'কাস্টম রিমাইন্ডার যোগ করুন',
  remindersTipsTitle: 'সাফল্যের টিপস',
  remindersTip1: 'এমন সময়ে রিমাইন্ডার সেট করুন যখন আপনি সত্যিই সেগুলো মেনে চলতে পারবেন',
  remindersTip2: '২-৩টি মূল রিমাইন্ডার দিয়ে শুরু করুন, তারপর প্রয়োজনে আরো যোগ করুন',
  remindersTip3: 'আপনার জীবনধারা এবং সময়সূচি অনুযায়ী ফ্রিকোয়েন্সি সামঞ্জস্য করুন',

  // Body Measurements
  bmScreenTitle: 'শরীরের পরিমাপ',
  bmScreenSubtitle: 'আপনার শারীরিক গঠন ট্র্যাক করুন',
  bmTabWeight: 'ওজন',
  bmTabBodyFat: 'শরীরের চর্বি %',
  bmTabMeasurements: 'পরিমাপ',
  bmWeightTrend: 'ওজনের ধারা',
  bmBodyFatTrend: 'শরীরের চর্বি % ধারা',
  bmStarting: 'প্রারম্ভিক',
  bmCurrent: 'বর্তমান',
  bmChange: 'পরিবর্তন',
  bmChest: 'বুক',
  bmWaist: 'কোমর',
  bmHips: 'নিতম্ব',
  bmArms: 'বাহু',
  bmThighs: 'উরু',
  bmMeasurementHistory: 'পরিমাপের ইতিহাস',
  bmBodyFatRanges: 'শরীরের চর্বির পরিসর',
  bmBodyFatLabel: '% BF',

  // Habits Analysis
  habitsScreenTitle: 'অভ্যাস ও খাদ্যতৃষ্ণা',
  habitsScreenSubtitle: 'আপনার অভ্যাস বুঝুন',
  habitsTabCravings: 'খাদ্যতৃষ্ণা',
  habitsTabHabits: 'অভ্যাস',
  habitsTabInsights: 'অন্তর্দৃষ্টি',
  habitsCravingPatterns: 'খাদ্যতৃষ্ণার ধারা',
  habitsThisWeek: 'এই সপ্তাহ',
  habitsAvgIntensity: 'গড় তীব্রতা',
  habitsTopTrigger: 'শীর্ষ ট্রিগার',
  habitsCravingsByTime: 'দিনের সময় অনুযায়ী খাদ্যতৃষ্ণা',
  habitsMorning: 'সকাল',
  habitsAfternoon: 'বিকেল',
  habitsEvening: 'সন্ধ্যা',
  habitsNight: 'রাত',
  habitsRecentCravings: 'সাম্প্রতিক খাদ্যতৃষ্ণা',
  habitsOverallCompletion: 'সামগ্রিক সম্পন্নতার হার',
  habitsYourHabits: 'আপনার অভ্যাস',
  habitsLastCompleted: 'শেষ সম্পন্ন:',
  habitsTriggerLabel: 'ট্রিগার:',
  habitsKeyInsights: 'মূল অন্তর্দৃষ্টি',
  habitsRecommendations: 'ব্যক্তিগতকৃত সুপারিশ',

  // Period Tracker
  ptLogNewCycle: 'নতুন চক্র লগ করুন',
  ptCycleStartDate: 'চক্রের শুরুর তারিখ',
  ptCycleLength: 'চক্রের দৈর্ঘ্য (দিন)',
  ptNotesOptional: 'নোট (ঐচ্ছিক)',
  ptNotesPlaceholder: 'কোনো লক্ষণ বা পর্যবেক্ষণ...',
  ptAddCycleData: 'চক্রের তথ্য যোগ করুন',
  ptCycleHistory: 'চক্রের ইতিহাস',
  ptDeleteCycleTitle: 'চক্র মুছুন',
  ptDeleteCycleMessage: 'আপনি কি সত্যিই এই চক্রের রেকর্ড মুছতে চান?',
  ptAddCycleSuccess: 'চক্রের তথ্য সফলভাবে যোগ করা হয়েছে',
  ptInvalidInput: 'অবৈধ ইনপুট',
  ptInvalidLength: 'অনুগ্রহ করে ২০-৪৫ দিনের মধ্যে একটি চক্রের দৈর্ঘ্য লিখুন',
  ptNextCyclePredicted: 'পরবর্তী চক্র পূর্বাভাস:',
  ptPhaseMenstrual: 'মাসিক',
  ptPhaseFollicular: 'ফলিকুলার',
  ptPhaseOvulation: 'ডিম্বস্ফোটন',
  ptPhaseLuteal: 'লুটিয়াল',
  ptPhaseFuture: 'ভবিষ্যৎ',
  ptPhaseLate: 'দেরি চক্র',
  ptTipMenstrual: 'বিশ্রাম ও পুনরুদ্ধার পর্যায়। হালকা ব্যায়ামে মনোনিবেশ করুন।',
  ptTipFollicular: 'উচ্চ শক্তি! তীব্র ব্যায়ামের জন্য ভালো সময়।',
  ptTipOvulation: 'সর্বোচ্চ শক্তি ও সামর্থ্য। আপনার সীমা অতিক্রম করুন!',
  ptTipLuteal: 'শক্তি কমতে পারে। মাঝারি কার্যকলাপে মনোনিবেশ করুন।',
  ptInfoText: 'আপনার হরমোনের পর্যায়ের উপর ভিত্তি করে ব্যায়াম ও পুষ্টি অপ্টিমাইজ করতে আপনার মাসিক চক্র ট্র্যাক করুন। আপনার চক্র বোঝা আপনাকে শরীরের বিরুদ্ধে নয়, শরীরের সাথে কাজ করতে সাহায্য করে!',
  ptPhaseLabel: 'পর্যায়',
  ptDoneButton: 'সম্পন্ন',
  ptDeleteButton: 'মুছুন',

  // Referral
  referralAvailablePoints: 'উপলব্ধ পয়েন্ট',
  referralEarned: 'অর্জিত',
  referralCash: 'নগদ',
  referralCountLabel: 'রেফারেল',
  referralYourCode: 'আপনার রেফারেল কোড',
  referralCopy: 'কপি করুন',
  referralShare: 'শেয়ার করুন',
  referralHowItWorks: 'এটি কীভাবে কাজ করে',
  referralRedeemPoints: 'আপনার পয়েন্ট রিডিম করুন',
  referralYourReferrals: 'আপনার রেফারেল',
  referralTermsText: 'পুরস্কার ২৪ ঘণ্টার মধ্যে ক্রেডিট করা হয়। প্রতি মাসে সর্বোচ্চ ৫০ রেফারেল। শর্তাবলী প্রযোজ্য।',
  referralCopied: 'কপি হয়েছে!',
  referralCopiedMsg: 'রেফারেল কোড ক্লিপবোর্ডে কপি হয়েছে',
  referralPendingStatus: 'অপেক্ষমান',
  referralJoinedStatus: 'যোগ দিয়েছেন',
  referralPremiumStatus: 'প্রিমিয়াম',
  referralRedeem: 'রিডিম করুন',
  referralMorePtsNeeded: (n) => `আরো ${n} pts`,
  referralDiscount: 'নতুন ব্যবহারকারীরা ২০% ছাড় পাবেন',
  referralDiscountInfo: 'আপনার কোড ব্যবহার করলে প্রথম মাসে ছাড়',
  referralStep1Title: 'আপনার কোড শেয়ার করুন',
  referralStep2Title: 'বন্ধু সাইন আপ করেন',
  referralStep3Title: 'তারা প্রিমিয়াম নেন',
  referralStep4Title: 'পুরস্কার রিডিম করুন',
  referralScreenTitle: 'রেফার ও আয় করুন',
  referralStep1Desc: 'আপনার কোড শেয়ার করুন - বন্ধুরা প্রথম মাসে ২০% ছাড় পাবেন',
  referralStep2Desc: 'তারা আপনার কোডে যোগ দিলে আপনি ৫০ পয়েন্ট + $৫ পাবেন',
  referralStep3Desc: 'তারা আপগ্রেড করলে আপনি আরো ১০০ পয়েন্ট + $৫ পাবেন',
  referralStep4Desc: 'ডিসকাউন্ট বা বিনামূল্যে মাসের জন্য পয়েন্ট ব্যবহার করুন',
  referralJoinedLabel: (d) => `${d} তারিখে যোগ দিয়েছেন`,
  referralRedeemTitle: 'পুরস্কার রিডিম করুন',
  referralSuccessTitle: 'সফল!',
  referralSuccessMsg: (label) => `আপনি ${label} রিডিম করেছেন! ডিসকাউন্টের জন্য আপনার অ্যাকাউন্ট চেক করুন।`,
  referralNotEnoughTitle: 'পর্যাপ্ত পয়েন্ট নেই',

  // Water Tracking
  waterScreenTitle: 'পানি ট্র্যাকিং',
  waterTodaysHydration: 'আজকের হাইড্রেশন',
  waterGlassesLabel: 'গ্লাস',
  waterGoalLabel: 'লক্ষ্য',
  waterToGoLabel: 'বাকি',
  waterGoalAchieved: '🎉 লক্ষ্য অর্জিত!',
  waterAlmostThere: '💪 প্রায় শেষ!',
  waterHalfwayDone: '👍 অর্ধেক সম্পন্ন!',
  waterKeepGoing: '🚀 এগিয়ে যান!',
  waterQuickAdd: 'দ্রুত যোগ করুন',
  waterHalfGlass: '½ গ্লাস',
  waterOneGlass: '১ গ্লাস',
  waterTwoGlasses: '২ গ্লাস',
  waterWeeklyTrend: 'সাপ্তাহিক ধারা',
  waterAvgLabel: 'গড়:',
  waterGlassesPerDay: 'গ্লাস/দিন',
  waterGoalDisplay: 'লক্ষ্য: ৮ গ্লাস',
  waterAIInsightsTitle: 'AI অন্তর্দৃষ্টি',
  waterHydrationReminders: 'হাইড্রেশন রিমাইন্ডার',
  waterSetReminders: 'রিমাইন্ডার সেট করুন',
  waterRemindersHint: 'সারাদিন পানি পান করতে নোটিফিকেশন পান',
  waterTipsTitle: '💡 হাইড্রেশন টিপস',
  waterTip1: 'একগ্লাস পানি দিয়ে দিন শুরু করুন',
  waterTip2: 'প্রতিটি খাবারের আগে পানি পান করুন',
  waterTip3: 'পানির বোতল কাছে রাখুন',
  waterTip4: 'ব্যায়ামের সময়/পরে বেশি পানি পান করুন',

  // Steps Tracking
  stepsScreenTitle: 'পদক্ষেপ ট্র্যাকিং',
  stepsTodaysActivity: 'আজকের কার্যকলাপ',
  stepsActiveTimeLabel: 'সক্রিয় সময়',
  stepsDistanceLabel: 'দূরত্ব',
  stepsActiveLabel: 'সক্রিয়',
  stepsWeekLabel: 'সপ্তাহ',
  stepsMonthLabel: 'মাস',
  stepsThisWeekTitle: 'এই সপ্তাহ',
  stepsMonthlyTitle: 'মাসিক সারসংক্ষেপ',
  stepsAvgLabel: 'গড়:',
  stepsAchievementsTitle: 'অর্জন',
  stepsAIInsightsTitle: 'AI অন্তর্দৃষ্টি',
  stepsQuickActionsTitle: 'দ্রুত কার্যক্রম',
  stepsStartWorkout: 'ব্যায়াম শুরু করুন',
  stepsAdjustGoal: 'লক্ষ্য সামঞ্জস্য করুন',
  stepsGoalCrushed: '🎉 লক্ষ্য অর্জিত!',
  stepsAlmostThere: '💪 প্রায় হয়ে গেছে!',
  stepsHalfwayDone: '⚡ অর্ধেক সম্পন্ন!',
  stepsKeepMoving: '🚶 চলতে থাকুন!',
  stepsGoalDisplay: (n) => `লক্ষ্য: ${n.toLocaleString()} পদক্ষেপ`,
  stepsLegendSteps: 'পদক্ষেপ',
  stepsLegendActiveTime: 'সক্রিয় সময়',
  stepsLegendCalories: 'ক্যালোরি',

  // Weekly Review
  weeklyReviewScreenTitle: 'সাপ্তাহিক পর্যালোচনা',
  weeklyReviewScoreTitle: 'সাপ্তাহিক পারফরম্যান্স স্কোর',
  weeklyReviewGradeLabel: 'গ্রেড:',
  weeklyReviewProgressBreakdownTitle: 'অগ্রগতির বিশ্লেষণ',
  weeklyReviewDailyCompletionTitle: 'দৈনিক লক্ষ্য সম্পন্নতা',
  weeklyReviewAchievementsTitle: 'এই সপ্তাহের অর্জন',
  weeklyReviewAISummaryTitle: 'AI কোচ সারসংক্ষেপ',
  weeklyReviewAreasTitle: 'উন্নতির ক্ষেত্র',
  weeklyReviewPatternTitle: 'প্যাটার্ন বিশ্লেষণ',
  weeklyReviewStrengthsTitle: '✓ শক্তিসমূহ',
  weeklyReviewChallengesTitle: '⚠ চ্যালেঞ্জসমূহ',
  weeklyReviewRecommendationsTitle: 'আগামী সপ্তাহের জন্য সুপারিশ',
  weeklyReviewUpdateGoalsBtn: 'আগামী সপ্তাহের জন্য আমার লক্ষ্য আপডেট করুন',
  weeklyReviewHighPriority: 'উচ্চ',
  weeklyReviewMediumPriority: 'মাঝারি',
  weeklyReviewCurrentLabel: 'বর্তমান:',
  weeklyReviewGoalLabel: 'লক্ষ্য:',
  weeklyReviewGradeA: 'অসাধারণ!',
  weeklyReviewGradeB: 'চমৎকার!',
  weeklyReviewGradeC: 'ভালো চেষ্টা!',
  weeklyReviewGradeD: 'এগিয়ে যান!',
  weeklyReviewGradeF: 'সুধার করতে হেঁ!',
  weeklyReviewImpactLabel: 'প্রভাব:',

  // Progress Dashboard
  pdScreenTitle: 'অগ্রগতি ড্যাশবোর্ড',
  pdOverallProgressTitle: 'সামগ্রিক অগ্রগতি',
  pd3MonthsLabel: '৩ মাস',
  pdTrendAnalysisTitle: 'ধারা বিশ্লেষণ',
  pdThisWeekVsLast: 'এই সপ্তাহ বনাম গত সপ্তাহ',
  pdMilestonesTitle: 'মাইলফলক',
  pdWeeklyReviewBtn: 'সাপ্তাহিক পর্যালোচনা',
  pdUpdateGoalsBtn: 'লক্ষ্য আপডেট করুন',
  pdProgressPhotosBtn: 'অগ্রগতির ছবি',
  pdHabitsBtn: 'অভ্যাস',
  pdQuickActionsTitle: 'দ্রুত অ্যাকশন',
  pdGoalLabel: 'লক্ষ্য:',
  pdWeekLabel: 'সপ্তাহ',
  pdMonthLabel: 'মাস',

  // AI Insights
  aiInsightsScreenTitle: 'AI অন্তর্দৃষ্টি',
  aiInsightsSummaryTitle: 'অন্তর্দৃষ্টি সারসংক্ষেপ',
  aiInsightsPatternsLabel: 'প্যাটার্ন',
  aiInsightsSuggestionsLabel: 'পরামর্শ',
  aiInsightsWarningsLabel: 'সতর্কতা',
  aiInsightsAchievementsLabel: 'অর্জন',
  aiInsightsAllLabel: 'সব',
  aiInsightsActivityLabel: 'কার্যকলাপ',
  aiInsightsNutritionLabel: 'পুষ্টি',
  aiInsightsSleepLabel: 'ঘুম',
  aiInsightsHabitsLabel: 'অভ্যাস',
  aiInsightsNoInsightsTitle: 'কোনো অন্তর্দৃষ্টি পাওয়া যায়নি',
  aiInsightsNoInsightsHintText: 'ভিন্ন বিভাগ নির্বাচন করুন বা আরো অন্তর্দৃষ্টি তৈরি করতে কার্যকলাপ ট্র্যাক করতে থাকুন।',
  aiInsightsHowItWorksTitle: 'AI অন্তর্দৃষ্টি কীভাবে কাজ করে',
  aiInsightsFoundCount: (n) => `${n} অন্তর্দৃষ্টি পাওয়া গেছে`,

  // Founder Story
  founderCoachName: 'আপনার কোচের নাম',
  founderCoachTitle: 'সার্টিফাইড ফিটনেস ও পুষ্টি কোচ',
  founderStoryText: "নিজের পরিবর্তনের যাত্রা ও 500+ নারীর ফিটনেস লক্ষ্য অর্জনে সাহায্য করার পরে, আমি প্রতিটি নারীর জন্য ব্যক্তিগত কোচিং সহজলভ্য করতে এই অ্যাপ তৈরি করেছি।\n\nআপনি নবমা মা, PCOS পরিচালনা, মাংসপেশী তৈরি, বা ব্যস্ত ক্যারিয়ারর মধ্যে যাই হোন না কেন—আপনি এমন একটি পরিকল্পনার যোগ্য, যা আপনার জীবনের সাথে কাজ করে, বিরুদ্ধে নয়।",
  founderTransformationsTitle: 'শীর্ষ ১০ রূপান্তর',
  founderTransformationsSub: 'বাস্তব ক্লায়েন্ট। বাস্তব ফলাফল।',
  founderBefore: 'আগে',
  founderAfter: 'পরে',
  founderSpecialized: 'প্রসবোত্তর পুনরুদ্ধার, পিসিওএস ব্যবস্থাপনা, পেশী নির্মাণ, ব্যস্ত পেশাদার এবং নিরামিষ জীবনধারার জন্য বিশেষায়িত ফলাফল',
  founderStartTransformationBtn: 'আপনার রূপান্তর শুরু করুন',

  // Progress Photos
  ppScreenTitle: 'অগ্রগতির ছবি',
  ppDaysLabel: 'দিন',
  ppKgLostLabel: 'কেজি কম',
  ppPhotosLabel: 'ছবি',
  ppGridView: 'গ্রিড',
  ppTimelineView: 'টাইমলাইন',
  ppAddPhotoBtn: 'ছবি যোগ করুন',
  ppAddNewPhotoTitle: 'নতুন ছবি যোগ করুন',
  ppInDaysLabel: (n) => `${n} দিনে`,
  wpNotesTitle: 'নোট',
  wpAdditionalResourcesTitle: 'অতিরিক্ত রিসোর্স',

  // Self Assessment
  saScreenTitle: 'স্ব-মূল্যায়ন',
  saIntroText: 'আপনার ব্যক্তিগতকৃত ফিটনেস ও পুষ্টি পরিকল্পনা তৈরিতে সাহায্য করতে এই ব্যাপক প্রশ্নাবলী পূরণ করুন।',
  saBasicInfoSection: 'মৌলিক তথ্য',
  saNameLabel: 'নাম *',
  saNamePlaceholder: 'আপনার পুরো নাম লিখুন',
  saContactLabel: 'যোগাযোগ নম্বর *',
  saContactPlaceholder: 'আপনার যোগাযোগ নম্বর লিখুন',
  saEmailLabel: 'ইমেইল আইডি *',
  saEmailPlaceholder: 'আপনার ইমেইল লিখুন',
  saGenderLabel: 'লিঙ্গ *',
  saGenderMale: 'পুরুষ',
  saGenderFemale: 'মহিলা',
  saGenderOther: 'অন্যান্য',
  saAgeLabel: 'বয়স *',
  saAgePlaceholder: 'আপনার বয়স লিখুন',
  saWeightLabel: 'ওজন (কেজি) *',
  saWeightPlaceholder: 'আপনার ওজন লিখুন',
  saHeightLabel: 'উচ্চতা (সেমি) *',
  saHeightPlaceholder: 'আপনার উচ্চতা লিখুন',
  saMedicalInfoSection: 'চিকিৎসা সংক্রান্ত তথ্য',
  saMedicalConditionsQ: 'আপনার কি কোনো চিকিৎসাগত অবস্থা আছে?',
  saMedicalDetailsLabel: 'অনুগ্রহ করে বিবরণ দিন *',
  saMedicalPlaceholder: 'আপনার চিকিৎসাগত অবস্থার তালিকা দিন',
  saMedicationsQ: 'আপনি কি বর্তমানে কোনো ওষুধ বা সাপ্লিমেন্ট গ্রহণ করছেন?',
  saMedDetailsLabel: 'অনুগ্রহ করে বিবরণ দিন *',
  saMedPlaceholder: 'আপনার ওষুধ/সাপ্লিমেন্টের তালিকা দিন',
  saDietSection: 'ডায়েটের ইতিহাস',
  saDietBeforeQ: 'আপনি কি আগে কোনো ডায়েট পরিকল্পনা অনুসরণ করেছেন?',
  saDietOption1: 'না, এটি প্রথমবার',
  saDietOption2: 'হ্যাঁ, কয়েকটি',
  saDietOption3: 'হ্যাঁ, অনেক',
  saDietTypesQ: 'আপনি কি ধরনের ডায়েট চেষ্টা করেছেন?',
  saDietTypesPlaceholder: 'যেমন, কিটো, পালেও, ভেগান, ইত্যাদি',
  saDietTypeQ: 'আপনি কি ধরনের ডায়েট অনুসরণ করেন?',
  saDietTypeVegetarian: 'নিরামিষ',
  saDietTypeNonVeg: 'আমিষ',
  saDietTypeVegan: 'ভেগান',
  saDietTypePesc: 'পেসকাটেরিয়ান',
  saDietTypeFlex: 'ফ্লেক্সিটেরিয়ান',
  saDietTypeNoPref: 'কোনো পছন্দ নেই',
  saFoodAllergiesQ: 'আপনার কি কোনো জানা খাদ্য এলার্জি বা অসহিষ্ণুতা আছে?',
  saFoodAllergiesPlaceholder: 'যেমন, ল্যাকটোজ, গ্লুটেন, বাদাম, ইত্যাদি (বা "কোনোটি নয়" লিখুন)',
  saFitnessGoalsSection: 'ফিটনেস লক্ষ্য',
  saCurrentGoalQ: 'আপনার বর্তমান স্বাস্থ্য বা ফিটনেস লক্ষ্য কী?',
  saCurrentGoalPlaceholder: 'যেমন, ওজন হ্রাস, পেশী বৃদ্ধি, সাধারণ ফিটনেস',
  saBiggestFearQ: 'আপনার ফিটনেস/ডায়েট যাত্রায় সবচেয়ে বড় ভয় বা সংগ্রাম কী?',
  saFearOpt1: 'আমি প্রেরণা হারাই',
  saFearOpt2: 'আমি রুটিন ধরে রাখতে পারি না',
  saFearOpt3: 'আমি কী খাব তা নিয়ে বিভ্রান্ত হই',
  saFearOpt4: 'আমি ইমোশনাল ইটিং-এর সাথে লড়াই করি',
  saFearOpt5: 'অন্যান্য',
  saFearSpecify: 'অনুগ্রহ করে উল্লেখ করুন',
  saFearSpecifyPlaceholder: 'আপনার সংগ্রাম বর্ণনা করুন',
  saActivitySection: 'কার্যকলাপ ও জীবনধারা',
  saActivityLevelQ: 'আপনার দৈনিক কার্যকলাপের স্তর কী?',
  saActivitySedentary: 'আসীন (কম বা কোনো ব্যায়াম নেই)',
  saActivityLightlyActive: 'সামান্য সক্রিয় (সপ্তাহে ১-৩ দিন)',
  saActivityModerately: 'মাঝারি সক্রিয় (সপ্তাহে ৩-৫ দিন)',
  saActivityVeryActive: 'খুব সক্রিয় (সপ্তাহে ৬-৭ দিন)',
  saActivityExtremelyActive: 'অত্যন্ত সক্রিয় (প্রতিদিন তীব্র ব্যায়াম)',
  saTypicalMealsQ: 'আপনার সাধারণ দৈনিক খাবারের তালিকা করুন',
  saTypicalMealsPlaceholder: 'সকালের নাস্তা, দুপুরের খাবার, স্ন্যাক্স, রাতের খাবার, ইত্যাদি',
  saWorkoutPrefQ: 'আপনি কি জিম নাকি হোম ওয়ার্কআউট পছন্দ করেন?',
  saWorkoutPrefGym: 'জিম ওয়ার্কআউট',
  saWorkoutPrefHome: 'হোম ওয়ার্কআউট',
  saWorkoutPrefBoth: 'উভয়',
  saAdditionalInfoSection: 'অতিরিক্ত তথ্য',
  saAdditionalNotesQ: 'আর কিছু জানাতে চান?',
  saAdditionalNotesPlaceholder: 'ঐচ্ছিক: যেকোনো অতিরিক্ত তথ্য শেয়ার করুন',
  saSubmitBtn: 'মূল্যায়ন সম্পন্ন করুন',

  // Onboarding
  onboardingWelcomeTitle: 'Fitzen-এ স্বাগতম!',
  onboardingSubtitleText: 'আসুন আপনার ফিটনেস যাত্রা ব্যক্তিগতকৃত করি',
  onboardingAlreadyMemberText: 'ইতিমধ্যে সদস্য? সাইন ইন করুন',
  onboardingSeeStoriesBtn: 'সাফল্যের গল্প ও রূপান্তর দেখুন',
  onboardingLiveConsultationOpt: 'লাইভ পরামর্শ',
  onboardingLiveConsultationDesc: 'আপনার কোচের সাথে ১-এ-১ কল শিডিউল করুন',
  onboardingSelfAssessmentOpt: 'স্ব-মূল্যায়ন',
  onboardingSelfAssessmentDesc: 'একটি বিস্তারিত প্রশ্নাবলী সম্পন্ন করুন',
  onboardingScheduleCallTitle: 'আপনার কল শিডিউল করুন',
  onboardingScheduleCallSub: 'আপনার পরামর্শের জন্য একটি সুবিধাজনক সময় বেছে নিন',
  onboardingBookConsultationBtn: 'পরামর্শ বুক করুন',
  onboardingTellAboutTitle: 'আমাদের আপনার সম্পর্কে বলুন',
  onboardingTellAboutSub: 'আপনার নিখুঁত ফিটনেস পরিকল্পনা তৈরিতে সাহায্য করুন',
  onboardingGetStarted: 'শুরু করুন',
  onboardingStepOf: (step, total) => `ধাপ ${step} / ${total}`,
  onboardingDuration: 'সময়কাল',
  onboardingDurationValue: '৩০-৪৫ মিনিট',
  onboardingWhatToExpect: 'কী প্রত্যাশা করবেন',
  onboardingCallExpect: 'আপনার ফিটনেস লক্ষ্য, স্বাস্থ্য ইতিহাস আলোচনা করুন এবং ব্যক্তিগতকৃত সুপারিশ পান',

  // Coach Selection
  csScreenTitle: 'আপনার কোচ বেছে নিন',
  csScreenSubtitle: 'আপনার কোচিং অভিজ্ঞতা ব্যক্তিগতকৃত করুন',
  csAlreadyMemberText: 'ইতিমধ্যে সদস্য?',
  csCoachGenderLabel: 'কোচের লিঙ্গ',
  csCoachGenderDesc: 'আপনি যে লিঙ্গের সাথে সবচেয়ে স্বাচ্ছন্দ্য বোধ করেন তা নির্বাচন করুন',
  csCoachingStyleLabel: 'কোচিং স্টাইল',
  csCoachingStyleDesc: 'আপনি চান যে কোচ আপনার সাথে কীভাবে যোগাযোগ করুক?',
  csYourSelectionLabel: 'আপনার নির্বাচন',
  csStartJourneyBtn: 'আমার যাত্রা শুরু করুন',
  csStyleFriendly: 'বন্ধুত্বপূর্ণ ও সহায়ক',
  csStyleStrict: 'কঠোর ও শৃঙ্খলাবদ্ধ',
  csStyleCalm: 'শান্ত ও সুষম',
  csStyleMotivational: 'অনুপ্রেরণামূলক ও উৎসাহী',
  csStyleFriendlyDesc: 'উৎসাহব্যঞ্জক ও উষ্ণ পদ্ধতি',
  csStyleStrictDesc: 'কঠোর ভালোবাসা ও দায়িত্বশীলতা',
  csStyleCalmDesc: 'সচেতন ও স্থির মার্গদর্শন',
  csStyleMotivationalDesc: 'উচ্চ শক্তি ও অনুপ্রেরণামূলক',
  csPreviewText: (genderLabel, styleName) => `${genderLabel} কোচ ${styleName} পদ্ধতিতে`,
  csMaleCoach: 'পুরুষ',
  csFemaleCoach: 'মহিলা',

  // Payment
  payPremiumFeaturesTitle: 'প্রিমিয়াম ফিচার',
  payChoosePlanTitle: 'আপনার প্ল্যান বেছে নিন',
  payMonthlyPlan: 'মাসিক',
  payYearlyPlan: 'বার্ষিক',
  payPopularBadge: 'জনপ্রিয়',
  payMethodLabel: 'পেমেন্ট পদ্ধতি',
  payUPI: 'UPI',
  payCard: 'কার্ড',
  payNetBanking: 'নেট ব্যাংকিং',
  payOrderSummaryTitle: 'অর্ডার সারসংক্ষেপ',
  payTaxLabel: 'কর (১৮%)',
  payTotalLabel: 'মোট',
  payFeature1: 'ব্যক্তিগতকৃত AI ব্যায়াম পরিকল্পনা',
  payFeature2: 'কাস্টম খাবার পরিকল্পনা',
  payFeature3: 'উন্নত বিশ্লেষণ ও অন্তর্দৃষ্টি',
  payFeature4: 'অগ্রাধিকার চ্যাট সহায়তা',
  payFeature5: 'বিজ্ঞাপন-মুক্ত অভিজ্ঞতা',
  payFeature6: 'সীমাহীন ব্যায়াম ট্র্যাকিং',
  paySaveAmount: (n) => `₹${n} সাশ্রয়`,
  payEnterUPITitle: 'UPI আইডি লিখুন',
  payUPIHint: 'আপনার UPI অ্যাপে একটি পেমেন্ট অনুরোধ পাবেন',
  payCardDetailsTitle: 'কার্ডের বিবরণ',
  payCardNumberLabel: 'কার্ড নম্বর',
  payExpiryLabel: 'মেয়াদ',
  payCVVLabel: 'CVV',
  payCardholderLabel: 'কার্ডধারীর নাম',
  paySelectBankTitle: 'ব্যাংক নির্বাচন করুন',
  paySelectMethodError: 'অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন',
  payEnterUPIError: 'অনুগ্রহ করে আপনার UPI আইডি লিখুন',
  payFillCardError: 'অনুগ্রহ করে সমস্ত কার্ড বিবরণ পূরণ করুন',
  paySelectBankError: 'অনুগ্রহ করে আপনার ব্যাংক নির্বাচন করুন',
  paySuccessTitle: 'পেমেন্ট সফল! 🎉',
  paySuccessMessage: 'আপনার প্রিমিয়াম সদস্যপদ সক্রিয় হয়েছে।',
  payMonthDuration: 'মাস',
  payYearDuration: 'বছর',
  payNowBtn: (amount) => `₹${amount} পরিশোধ করুন`,

  // Common new
  goBack: 'ফিরে যান',

  // Splash
  splashTagline: 'আপনার AI ফিটনেস কোচ',
  splashPoweredBy: 'AI দ্বারা চালিত',

  // Social
  socialCommunity: 'কমিউনিটি',
  socialComments: 'মন্তব্য',
  socialWriteComment: 'একটি মন্তব্য লিখুন...',
  socialNoComments: 'এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!',
  socialMinutesAgo: (n) => `${n} মিনিট আগে`,
  socialHoursAgo: (n) => `${n} ঘণ্টা আগে`,
  socialDaysAgo: (n) => `${n} দিন আগে`,
};

const hi: AppTranslations = {
  languageName: 'हिंदी',
  languageInstruction: 'Please respond in Hindi (हिंदी) language only. ',

  user: 'उपयोगकर्ता',
  cancel: 'रद्द करें',
  language: 'भाषा',
  success: 'सफलता',

  logout: 'लॉगआउट',
  logoutConfirmTitle: 'लॉगआउट',
  logoutConfirmMessage: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',

  home: 'होम',
  aiCoachChat: 'AI कोच चैट',
  profile: 'प्रोफाइल',
  settings: 'सेटिंग्स',
  upgradeToPremium: 'प्रीमियम में अपग्रेड करें',

  greeting: (name) => `नमस्ते, ${name}! 👋`,
  motivationText: 'आज अपने लक्ष्य को हासिल करें!',
  dayStreak: 'दिन की लय',

  todaysGoals: 'आज के लक्ष्य',
  steps: 'कदम',
  calories: 'कैलोरी',
  activeTime: 'सक्रिय समय',

  statGoal: 'लक्ष्य:',
  calBurned: 'कैलोरी जली',
  glasses: 'गिलास',
  sleep: 'नींद',
  stepsLabel: 'कदम',
  distance: 'दूरी',

  weeklySteps: 'साप्ताहिक कदम',
  weeklyCalories: 'साप्ताहिक कैलोरी',
  avg: 'औसत',
  total: 'कुल',

  aiCoachFeatures: '🤖 AI कोच फीचर्स',
  viewAll: 'सब देखें',
  water: 'पानी',
  trackIntake: 'सेवन ट्रैक करें',
  dailyActivity: 'दैनिक गतिविधि',
  weeklyReview: 'साप्ताहिक समीक्षा',
  seeProgress: 'प्रगति देखें',
  dashboard: 'डैशबोर्ड',
  allMetrics: 'सभी मेट्रिक्स',
  aiInsights: 'AI अंतर्दृष्टि',
  smartTips: 'स्मार्ट टिप्स',

  quickActions: 'त्वरित क्रियाएं',
  workoutPlans: 'व्यायाम योजनाएं',
  recipes: 'रेसिपी',
  myGoals: 'मेरे लक्ष्य',
  habits: 'आदतें',
  successStories: 'सफलता की कहानियां',

  limitedOffer: 'सीमित ऑफर',
  upgradeToPremiumTitle: 'प्रीमियम में अपग्रेड करें',
  premiumSubtitle: 'सभी फीचर्स अनलॉक करें और व्यक्तिगत कोचिंग पाएं',
  unlimitedAICoach: 'असीमित AI कोच सत्र',
  advancedAnalytics: 'उन्नत विश्लेषण और अंतर्दृष्टि',
  customMealWorkout: 'कस्टम भोजन और व्यायाम योजनाएं',
  prioritySupport: 'प्राथमिकता सहायता',
  perMonth: '/माह',
  upgradeNow: 'अभी अपग्रेड करें',

  aiFitnessCoach: 'AI फिटनेस कोच',
  online: '● ऑनलाइन',

  foodMenu: 'खाना मेनू',
  workout: 'व्यायाम',
  progress: 'प्रगति',

  typeFoodOrAsk: 'खाने का नाम लिखें या कुछ पूछें...',
  analyzingFood: 'खाने की छवि का विश्लेषण हो रहा है...',

  selectFoodItems: 'खाद्य पदार्थ चुनें',
  itemsSelected: (n) => `${n} आइटम चुने गए`,
  clearAll: 'सब साफ करें',
  calculate: (n) => `गणना करें (${n})`,

  logToNutritionDiary: 'पोषण डायरी में लॉग करें',
  foodLoggedSuccess: 'खाना पोषण डायरी में लॉग किया गया!',

  uploadFoodImage: 'खाने की छवि अपलोड करें',
  chooseHowToAdd: 'खाने की छवि कैसे जोड़ें चुनें',
  takePhoto: 'फोटो लें',
  chooseFromGallery: 'गैलरी से चुनें',

  chatInitialMessage:
    'नमस्ते! 👋 मैं आपका AI फिटनेस कोच हूं। मैं आपको आपके स्वास्थ्य और फिटनेस लक्ष्यों को प्राप्त करने में मदद करने के लिए यहां हूं!\n\nमैं इनमें मदद कर सकता हूं:\n- व्यक्तिगत व्यायाम योजनाएं बनाना\n- स्वस्थ भोजन योजनाएं सुझाना\n- आपकी प्रगति ट्रैक करना\n- फिटनेस प्रश्नों के उत्तर देना\n- प्रेरणा और सुझाव प्रदान करना\n\nआज मैं आपकी कैसे मदद कर सकता हूं?',

  foodAnalyzedImage: 'बढ़िया! आपकी खाने की छवि का विश्लेषण हो गया। यहां मिला:',
  foodAnalyzedPhoto: 'परफेक्ट! आपकी खाने की फोटो का विश्लेषण हो गया। पोषण विवरण:',
  foodAnalyzedText: 'परफेक्ट! आपके खाने का विश्लेषण हो गया:',
  greatChoice: 'बढ़िया विकल्प! यहां पोषण संबंधी जानकारी है:',
  combinedNutrition: (n) => `परफेक्ट! आपके ${n} आइटम की संयुक्त पोषण जानकारी:`,

  workoutPlanRequest: 'मेरे लिए एक व्यायाम योजना बनाएं',
  progressTrackingRequest: 'मैं अपनी प्रगति कैसे ट्रैक कर सकता हूं?',

  profileSectionFitness: 'फिटनेस',
  profileSectionNutrition: 'पोषण',
  profileSectionHealthWellness: 'स्वास्थ्य और कल्याण',
  profileSectionRewards: 'पुरस्कार',
  profileSectionSettings: 'सेटिंग्स',
  profileSectionAppearance: 'रूप',
  profileSectionSupport: 'सहायता',
  profileSectionAbout: 'के बारे में',
  profileSectionDeveloper: 'डेवलपर विकल्प',

  statWeight: 'वज़न',
  statHeight: 'ऊंचाई',
  statAge: 'आयु',
  statBMI: 'BMI',
  statUnitKg: 'किग्रा',
  statUnitCm: 'सेमी',
  statUnitYrs: 'वर्ष',

  premiumMember: 'प्रीमियम सदस्य',

  workoutHistory: 'व्यायाम इतिहास',
  workoutHistorySub: 'अपने पिछले व्यायाम देखें',
  bodyMeasurements: 'शारीरिक माप',
  bodyMeasurementsSub: 'अपनी शारीरिक संरचना ट्रैक करें',
  progressPhotos: 'प्रगति फ़ोटो',
  progressPhotosSub: 'पहले और बाद की फ़ोटो',
  achievements: 'उपलब्धियां',
  achievementsSub: 'बैज और मील के पत्थर',

  mealHistory: 'भोजन इतिहास',
  mealHistorySub: 'अपना पोषण लॉग देखें',
  recipesMenuSub: 'स्वस्थ भोजन के विचार',
  habitsAndCravings: 'आदतें और लालसाएं',
  habitsAndCravingsSub: 'खाने की आदतों का विश्लेषण करें',

  periodTracker: 'पीरियड ट्रैकर',
  periodTrackerSub: 'अपने मासिक चक्र को ट्रैक करें',

  referAndEarn: 'रेफर करें और कमाएं',
  referAndEarnSub: 'अपना कोड शेयर करें और पुरस्कार पाएं',

  reminders: 'रिमाइंडर',
  remindersSub: 'अपनी सूचनाएं प्रबंधित करें',

  themeLight: 'हल्का',
  themeDark: 'गहरा',
  themeSystem: 'सिस्टम',

  editProfile: 'प्रोफाइल संपादित करें',
  editProfileSub: 'अपनी व्यक्तिगत जानकारी अपडेट करें',
  goalsMenu: 'लक्ष्य',
  goalsMenuSub: 'अपने फिटनेस लक्ष्य प्रबंधित करें',
  notifications: 'सूचनाएं',
  notificationsSub: 'पुश सूचनाएं और रिमाइंडर',
  privacySecurity: 'गोपनीयता और सुरक्षा',
  privacySecuritySub: 'अपनी गोपनीयता सेटिंग्स प्रबंधित करें',

  helpCenter: 'सहायता केंद्र',
  helpCenterSub: 'किसी भी समस्या में मदद लें',
  contactSupport: 'सहायता से संपर्क करें',
  contactSupportSub: 'हम मदद के लिए यहां हैं',
  termsAndConditions: 'नियम और शर्तें',
  termsAndConditionsSub: 'हमारी शर्तें पढ़ें',
  privacyPolicy: 'गोपनीयता नीति',
  privacyPolicySub: 'हम आपका डेटा कैसे सुरक्षित रखते हैं',

  appVersion: 'ऐप संस्करण',
  rateUs: 'हमें रेट करें',
  rateUsSub: 'अपनी प्रतिक्रिया साझा करें',

  resetOnboarding: 'ऑनबोर्डिंग रीसेट करें',
  resetOnboardingSub: 'ऑनबोर्डिंग स्क्रीन फिर से देखें',
  resetOnboardingTitle: 'ऑनबोर्डिंग रीसेट करें',
  resetOnboardingMessage: 'इससे ऑनबोर्डिंग डेटा साफ हो जाएगा और ऐप प्रवाह फिर से शुरू होगा।',
  resetButton: 'रीसेट',
  resetOnboardingError: 'ऑनबोर्डिंग रीसेट करने में विफल',

  // Common
  today: 'आज',
  yesterday: 'कल',
  all: 'सभी',
  or: 'या',
  done: 'हो गया',
  deleteLabel: 'हटाएं',
  error: 'त्रुटि',
  completedLabel: 'पूर्ण',
  activeLabel: 'सक्रिय',
  notesLabel: 'नोट्स',
  daysUnit: 'दिन',
  hoursUnit: 'घंटे',
  glassesUnit: 'गिलास',
  stepsUnit: 'कदम',
  goalSuffix: 'लक्ष्य',

  // Login
  loginSubtitle: 'आपका व्यक्तिगत फिटनेस सहायक',
  phoneNumberLabel: 'फोन नंबर',
  enterPhoneNumber: 'अपना फोन नंबर दर्ज करें',
  sendOTP: 'OTP भेजें',
  continueWithGoogle: 'Google से जारी रखें',
  termsText: 'जारी रखने पर, आप हमारी सेवा की शर्तें और गोपनीयता नीति से सहमत होते हैं',
  validPhoneError: 'कृपया एक वैध फोन नंबर दर्ज करें',

  // Verify OTP
  verifyOTPTitle: 'OTP सत्यापित करें',
  otpInstruction: 'यहां भेजा गया 6-अंकीय कोड दर्ज करें',
  resendOTPTimer: (n) => `${n}s में OTP फिर भेजें`,
  resendOTPBtn: 'OTP फिर भेजें',
  otpResent: 'OTP आपके फोन पर फिर भेजा गया है',
  enterCompleteOTP: 'पूरा OTP दर्ज करें',

  // Workout History
  workoutsCountLabel: 'वर्कआउट',
  minutesCountLabel: 'मिनट',
  filterStrength: 'शक्ति',
  filterCardio: 'कार्डियो',
  filterYoga: 'योग',
  filterHIIT: 'HIIT',

  // Achievements
  achievementUnlocked: 'अनलॉक',
  achievementLocked: 'लॉक',
  achievementPoints: 'अंक',
  achievementComplete: 'पूर्ण',

  // Nutrition
  nutritionScreenTitle: 'पोषण',
  caloriesConsumed: 'कैलोरी सेवन',
  calRemaining: 'कैलोरी बची',
  macros: 'मैक्रोज़',
  protein: 'प्रोटीन',
  carbs: 'कार्ब्स',
  fat: 'वसा',
  weeklyOverview: 'साप्ताहिक अवलोकन',
  todaysMeals: 'आज के भोजन',
  mealBreakfast: 'नाश्ता',
  mealLunch: 'दोपहर का खाना',
  mealDinner: 'रात का खाना',
  mealSnack: 'स्नैक',

  // Goals
  goalsScreenTitle: 'मेरे लक्ष्य',
  goalsCatWeight: 'वज़न',
  goalsCatWorkout: 'वर्कआउट',
  goalsCatNutrition: 'पोषण',
  goalsCatHabit: 'आदत',
  goalsCatPerformance: 'प्रदर्शन',
  goalsStatTotal: 'कुल',
  goalsStatActive: 'सक्रिय',
  goalsStatCompleted: 'पूर्ण',
  goalsNoGoals: 'इस श्रेणी में कोई लक्ष्य नहीं',
  goalsPercentComplete: '% पूर्ण',
  goalsNoDeadline: 'कोई समय सीमा नहीं',
  goalsOverdue: 'समय बीत गया',
  goalsTomorrow: 'कल',
  goalsDaysLeft: (n) => `${n} दिन बचे`,

  // Recipes
  recipesSubtitle: 'स्वस्थ और स्वादिष्ट भोजन',
  recipesSearch: 'रेसिपी खोजें...',
  recipesFilterHighProtein: 'उच्च प्रोटीन',
  recipesFilterLowCarb: 'कम कार्ब',
  recipesFilterVegetarian: 'शाकाहारी',
  recipesFilterQuickEasy: 'जल्दी और आसान',
  recipesDiffEasy: 'आसान',
  recipesDiffMedium: 'मध्यम',
  recipesDiffHard: 'कठिन',
  recipesPrep: 'तैयारी:',
  recipesCook: 'पकाना:',
  recipesServings: 'सर्विंग्स',
  recipesBackToList: 'रेसिपी पर वापस जाएं',
  recipesNutritionPerServing: 'प्रति सर्विंग पोषण',
  recipesIngredients: 'सामग्री',
  recipesInstructions: 'निर्देश',
  recipesAddToMealPlan: 'भोजन योजना में जोड़ें',

  // Reminders
  remindersScreenTitle: 'स्मार्ट रिमाइंडर',
  remindersScreenSubtitle: 'अपने लक्ष्यों पर बने रहें',
  remindersCustomize: 'अपने रिमाइंडर कस्टमाइज़ करें',
  remindersInfo: 'रिमाइंडर चालू/बंद करें। सभी रिमाइंडर वैकल्पिक हैं और आपके शेड्यूल के अनुसार कस्टमाइज़ किए जा सकते हैं।',
  remindersActiveLabel: 'सक्रिय',
  remindersTotalLabel: 'कुल',
  remindersAll: 'सभी रिमाइंडर',
  remindersWaterIntakeTitle: 'पानी पीना',
  remindersWaterIntakeSub: 'दिन भर हाइड्रेटेड रहें',
  remindersDailyStepsTitle: 'दैनिक कदम लक्ष्य',
  remindersDailyStepsSub: 'आगे बढ़ें और अपना कदम लक्ष्य पूरा करें',
  remindersMorningWorkoutTitle: 'सुबह का वर्कआउट',
  remindersMorningWorkoutSub: 'व्यायाम से अपना दिन शुरू करें',
  remindersEveningWorkoutTitle: 'शाम का वर्कआउट',
  remindersEveningWorkoutSub: 'शाम का प्रशिक्षण सत्र',
  remindersMealPrepTitle: 'खाना तैयारी',
  remindersMealPrepSub: 'स्वस्थ भोजन तैयार करें',
  remindersSleepReminderTitle: 'नींद रिमाइंडर',
  remindersSleepReminderSub: 'बेहतर आराम के लिए आराम करने का समय',
  remindersWeighInTitle: 'वजन मापें',
  remindersWeighInSub: 'अपनी साप्ताहिक प्रगति ट्रैक करें',
  remindersStretchBreakTitle: 'स्ट्रेच ब्रेक',
  remindersStretchBreakSub: 'एक पल स्ट्रेच करें',
  remindersAddCustom: 'कस्टम रिमाइंडर जोड़ें',
  remindersTipsTitle: 'सफलता के टिप्स',
  remindersTip1: 'ऐसे समय पर रिमाइंडर सेट करें जब आप वास्तव में उन पर कार्य कर सकें',
  remindersTip2: '2-3 मुख्य रिमाइंडर से शुरू करें, फिर आवश्यकतानुसार और जोड़ें',
  remindersTip3: 'अपनी जीवनशैली और शेड्यूल के अनुसार आवृत्ति समायोजित करें',

  // Body Measurements
  bmScreenTitle: 'शारीरिक माप',
  bmScreenSubtitle: 'अपनी शारीरिक संरचना ट्रैक करें',
  bmTabWeight: 'वज़न',
  bmTabBodyFat: 'शरीर की चर्बी %',
  bmTabMeasurements: 'माप',
  bmWeightTrend: 'वज़न का रुझान',
  bmBodyFatTrend: 'शरीर की चर्बी % रुझान',
  bmStarting: 'शुरुआत',
  bmCurrent: 'वर्तमान',
  bmChange: 'परिवर्तन',
  bmChest: 'छाती',
  bmWaist: 'कमर',
  bmHips: 'कूल्हे',
  bmArms: 'बाहें',
  bmThighs: 'जांघें',
  bmMeasurementHistory: 'माप इतिहास',
  bmBodyFatRanges: 'शरीर की चर्बी की सीमाएं',
  bmBodyFatLabel: '% BF',

  // Habits Analysis
  habitsScreenTitle: 'आदतें और लालसाएं',
  habitsScreenSubtitle: 'अपने पैटर्न समझें',
  habitsTabCravings: 'लालसाएं',
  habitsTabHabits: 'आदतें',
  habitsTabInsights: 'अंतर्दृष्टि',
  habitsCravingPatterns: 'लालसा के पैटर्न',
  habitsThisWeek: 'इस सप्ताह',
  habitsAvgIntensity: 'औसत तीव्रता',
  habitsTopTrigger: 'शीर्ष ट्रिगर',
  habitsCravingsByTime: 'दिन के समय के अनुसार लालसाएं',
  habitsMorning: 'सुबह',
  habitsAfternoon: 'दोपहर',
  habitsEvening: 'शाम',
  habitsNight: 'रात',
  habitsRecentCravings: 'हाल की लालसाएं',
  habitsOverallCompletion: 'समग्र समापन दर',
  habitsYourHabits: 'आपकी आदतें',
  habitsLastCompleted: 'अंतिम पूर्ण:',
  habitsKeyInsights: 'मुख्य अंतर्दृष्टि',
  habitsTriggerLabel: 'ट्रिगर:',
  habitsRecommendations: 'व्यक्तिगत अनुशंसाएं',

  // Period Tracker
  ptLogNewCycle: 'नया चक्र दर्ज करें',
  ptCycleStartDate: 'चक्र प्रारंभ तिथि',
  ptCycleLength: 'चक्र की लंबाई (दिन)',
  ptNotesOptional: 'नोट्स (वैकल्पिक)',
  ptNotesPlaceholder: 'कोई लक्षण या टिप्पणियां...',
  ptAddCycleData: 'चक्र डेटा जोड़ें',
  ptCycleHistory: 'चक्र इतिहास',
  ptDeleteCycleTitle: 'चक्र हटाएं',
  ptDeleteCycleMessage: 'क्या आप वाकई इस चक्र का रिकॉर्ड हटाना चाहते हैं?',
  ptAddCycleSuccess: 'चक्र डेटा सफलतापूर्वक जोड़ा गया',
  ptInvalidInput: 'अमान्य इनपुट',
  ptInvalidLength: 'कृपया 20-45 दिनों के बीच चक्र की लंबाई दर्ज करें',
  ptNextCyclePredicted: 'अगला चक्र अनुमानित:',
  ptPhaseMenstrual: 'मासिक',
  ptPhaseFollicular: 'फॉलिकुलर',
  ptPhaseOvulation: 'ओव्यूलेशन',
  ptPhaseLuteal: 'ल्यूटियल',
  ptPhaseFuture: 'भविष्य',
  ptPhaseLate: 'देर चक्र',
  ptTipMenstrual: 'आराम और पुनर्प्राप्ति चरण। हल्के व्यायाम पर ध्यान दें।',
  ptTipFollicular: 'उच्च ऊर्जा! तीव्र वर्कआउट का अच्छा समय।',
  ptTipOvulation: 'चरम ऊर्जा और शक्ति। अपनी सीमाएं पार करें!',
  ptTipLuteal: 'ऊर्जा कम हो सकती है। मध्यम गतिविधियों पर ध्यान दें।',
  ptInfoText: 'अपने हार्मोनल चरणों के आधार पर वर्कआउट और पोषण को अनुकूलित करने के लिए अपने मासिक धर्म चक्र को ट्रैक करें। अपने चक्र को समझना आपको शरीर के विरुद्ध नहीं, बल्कि शरीर के साथ काम करने में मदद करता है!',
  ptPhaseLabel: 'चरण',
  ptDoneButton: 'हो गया',
  ptDeleteButton: 'हटाएं',

  // Referral
  referralAvailablePoints: 'उपलब्ध अंक',
  referralEarned: 'अर्जित',
  referralCash: 'नकद',
  referralCountLabel: 'रेफरल',
  referralYourCode: 'आपका रेफरल कोड',
  referralCopy: 'कॉपी करें',
  referralShare: 'शेयर करें',
  referralHowItWorks: 'यह कैसे काम करता है',
  referralRedeemPoints: 'अपने अंक भुनाएं',
  referralYourReferrals: 'आपके रेफरल',
  referralTermsText: 'पुरस्कार 24 घंटों के भीतर क्रेडिट किए जाते हैं। प्रति माह अधिकतम 50 रेफरल। नियम और शर्तें लागू।',
  referralCopied: 'कॉपी हो गया!',
  referralCopiedMsg: 'रेफरल कोड क्लिपबोर्ड पर कॉपी हो गया',
  referralPendingStatus: 'लंबित',
  referralJoinedStatus: 'जुड़ गए',
  referralPremiumStatus: 'प्रीमियम',
  referralRedeem: 'भुनाएं',
  referralMorePtsNeeded: (n) => `${n} और pts`,
  referralDiscount: 'नए उपयोगकर्ताओं को 20% छूट',
  referralDiscountInfo: 'आपका कोड उपयोग करने पर पहले महीने छूट',
  referralStep1Title: 'अपना कोड शेयर करें',
  referralStep2Title: 'दोस्त साइन अप करें',
  referralStep3Title: 'वे प्रीमियम लें',
  referralStep4Title: 'पुरस्कार भुनाएं',
  referralScreenTitle: 'रेफर करें और कमाएं',
  referralStep1Desc: 'अपना कोड शेयर करें - दोस्तों को पहले महीने 20% छूट मिलेगी',
  referralStep2Desc: 'वे आपके कोड से जुड़ें - आप 50 पॉइंट + $5 कमाएं',
  referralStep3Desc: 'जब वे अपग्रेड करें - आप 100 पॉइंट + $5 और कमाएं',
  referralStep4Desc: 'छूट या मुफ्त महीनों के लिए पॉइंट इस्तेमाल करें',
  referralJoinedLabel: (d) => `${d} को जुड़े`,
  referralRedeemTitle: 'पुरस्कार भुनाएं',
  referralSuccessTitle: 'सफलता!',
  referralSuccessMsg: (label) => `आपने ${label} भुनाया! छूट के लिए अपना खाता जांचें।`,
  referralNotEnoughTitle: 'पर्याप्त पॉइंट नहीं',

  // Water Tracking
  waterScreenTitle: 'पानी ट्रैकिंग',
  waterTodaysHydration: 'आज का जलयोजन',
  waterGlassesLabel: 'गिलास',
  waterGoalLabel: 'लक्ष्य',
  waterToGoLabel: 'बाकी',
  waterGoalAchieved: '🎉 लक्ष्य प्राप्त!',
  waterAlmostThere: '💪 लगभग हो गया!',
  waterHalfwayDone: '👍 आधा हो गया!',
  waterKeepGoing: '🚀 आगे बढ़ें!',
  waterQuickAdd: 'जल्दी जोड़ें',
  waterHalfGlass: '½ गिलास',
  waterOneGlass: '1 गिलास',
  waterTwoGlasses: '2 गिलास',
  waterWeeklyTrend: 'साप्ताहिक ट्रेंड',
  waterAvgLabel: 'औसत:',
  waterGlassesPerDay: 'गिलास/दिन',
  waterGoalDisplay: 'लक्ष्य: 8 गिलास',
  waterAIInsightsTitle: 'AI अंतर्दृष्टि',
  waterHydrationReminders: 'जलयोजन रिमाइंडर',
  waterSetReminders: 'रिमाइंडर सेट करें',
  waterRemindersHint: 'दिन भर पानी पीने के लिए सूचित हों',
  waterTipsTitle: '💡 जलयोजन टिप्स',
  waterTip1: 'एक गिलास पानी से दिन शुरू करें',
  waterTip2: 'प्रत्येक भोजन से पहले पानी पिएं',
  waterTip3: 'पानी की बोतल पास रखें',
  waterTip4: 'व्यायाम के दौरान/बाद में अधिक पानी पिएं',

  // Steps Tracking
  stepsScreenTitle: 'कदम ट्रैकिंग',
  stepsTodaysActivity: 'आज की गतिविधि',
  stepsActiveTimeLabel: 'सक्रिय समय',
  stepsDistanceLabel: 'दूरी',
  stepsActiveLabel: 'सक्रिय',
  stepsWeekLabel: 'सप्ताह',
  stepsMonthLabel: 'महीना',
  stepsThisWeekTitle: 'इस सप्ताह',
  stepsMonthlyTitle: 'मासिक अवलोकन',
  stepsAvgLabel: 'औसत:',
  stepsAchievementsTitle: 'उपलब्धियां',
  stepsAIInsightsTitle: 'AI अंतर्दृष्टि',
  stepsQuickActionsTitle: 'त्वरित क्रियाएं',
  stepsStartWorkout: 'वर्कआउट शुरू करें',
  stepsAdjustGoal: 'लक्ष्य समायोजित करें',
  stepsGoalCrushed: '🎉 लक्ष्य हासिल!',
  stepsAlmostThere: '💪 लगभग हो गया!',
  stepsHalfwayDone: '⚡ आधा हो गया!',
  stepsKeepMoving: '🚶 चलते रहें!',
  stepsGoalDisplay: (n) => `लक्ष्य: ${n.toLocaleString()} कदम`,
  stepsLegendSteps: 'कदम',
  stepsLegendActiveTime: 'सक्रिय समय',
  stepsLegendCalories: 'कैलोरी',

  // Weekly Review
  weeklyReviewScreenTitle: 'साप्ताहिक समीक्षा',
  weeklyReviewScoreTitle: 'साप्ताहिक प्रदर्शन स्कोर',
  weeklyReviewGradeLabel: 'ग्रेड:',
  weeklyReviewProgressBreakdownTitle: 'प्रगति विश्लेषण',
  weeklyReviewDailyCompletionTitle: 'दैनिक लक्ष्य पूर्ण',
  weeklyReviewAchievementsTitle: 'इस सप्ताह की उपलब्धियां',
  weeklyReviewAISummaryTitle: 'AI कोच सारांश',
  weeklyReviewAreasTitle: 'सुधार के क्षेत्र',
  weeklyReviewPatternTitle: 'पैटर्न विश्लेषण',
  weeklyReviewStrengthsTitle: '✓ ताकत',
  weeklyReviewChallengesTitle: '⚠ चुनौतियां',
  weeklyReviewRecommendationsTitle: 'अगले सप्ताह के लिए अनुशंसाएं',
  weeklyReviewUpdateGoalsBtn: 'अगले सप्ताह के लिए मेरे लक्ष्य अपडेट करें',
  weeklyReviewHighPriority: 'उच्च',
  weeklyReviewMediumPriority: 'मध्यम',
  weeklyReviewCurrentLabel: 'वर्तमान:',
  weeklyReviewGoalLabel: 'लक्ष्य:',
  weeklyReviewGradeA: 'असाधारण!',
  weeklyReviewGradeB: 'बहुत अच्छा!',
  weeklyReviewGradeC: 'अच्छा प्रयास!',
  weeklyReviewGradeD: 'प्रयास जारी रखें!',
  weeklyReviewGradeF: 'सुधार करते हैं!',
  weeklyReviewImpactLabel: 'प्रभाव:',

  // Progress Dashboard
  pdScreenTitle: 'प्रगति डैशबोर्ड',
  pdOverallProgressTitle: 'समग्र प्रगति',
  pd3MonthsLabel: '3 महीने',
  pdTrendAnalysisTitle: 'ट्रेंड विश्लेषण',
  pdThisWeekVsLast: 'इस सप्ताह बनाम पिछले सप्ताह',
  pdMilestonesTitle: 'मील के पत्थर',
  pdWeeklyReviewBtn: 'साप्ताहिक समीक्षा',
  pdUpdateGoalsBtn: 'लक्ष्य अपडेट करें',
  pdProgressPhotosBtn: 'प्रगति फ़ोटो',
  pdHabitsBtn: 'आदतें',
  pdQuickActionsTitle: 'त्वरित कार्रवाई',
  pdGoalLabel: 'लक्ष्य:',
  pdWeekLabel: 'सप्ताह',
  pdMonthLabel: 'महीना',

  // AI Insights
  aiInsightsScreenTitle: 'AI अंतर्दृष्टि',
  aiInsightsSummaryTitle: 'अंतर्दृष्टि सारांश',
  aiInsightsPatternsLabel: 'पैटर्न',
  aiInsightsSuggestionsLabel: 'सुझाव',
  aiInsightsWarningsLabel: 'चेतावनी',
  aiInsightsAchievementsLabel: 'उपलब्धियां',
  aiInsightsAllLabel: 'सभी',
  aiInsightsActivityLabel: 'गतिविधि',
  aiInsightsNutritionLabel: 'पोषण',
  aiInsightsSleepLabel: 'नींद',
  aiInsightsHabitsLabel: 'आदतें',
  aiInsightsNoInsightsTitle: 'कोई अंतर्दृष्टि नहीं मिली',
  aiInsightsNoInsightsHintText: 'एक अलग श्रेणी चुनें या अधिक अंतर्दृष्टि उत्पन्न करने के लिए अपनी गतिविधियां ट्रैक करते रहें।',
  aiInsightsHowItWorksTitle: 'AI अंतर्दृष्टि कैसे काम करती है',
  aiInsightsFoundCount: (n) => `${n} अंतर्दृष्टि मिली`,

  // Founder Story
  founderCoachName: 'आपके कोच का नाम',
  founderCoachTitle: 'प्रमाणित फिटनेस और पोषण कोच',
  founderStoryText: "अपनी खुद की परिवर्तन यात्रा और 500+ महिलाओं के फिटनेस लक्ष्य प्राप्त करने में मदद करने के बाद, मैंने हर महिला के लिए व्यक्तिगत कोचिंग सुलभ बनाने के लिए यह ऐप बनाया।\n\nचाहे आप नए मम्मा हों, PCOS प्रबंधन, मांसपेशियाँ बनाना, या व्यस्त कैरियर संभालना—आप एक ऐसी योजना के योग्य हैं जो आपकी जिंदगी के साथ काम करे, न कि उसके खिलाफ।",
  founderTransformationsTitle: 'शीर्ष 10 परिवर्तन',
  founderTransformationsSub: 'वास्तविक ग्राहक। वास्तविक परिणाम।',
  founderBefore: 'पहले',
  founderAfter: 'बाद',
  founderSpecialized: 'प्रसवोत्तर पुनर्प्राप्ति, पीसीओएस प्रबंधन, मांसपेशी निर्माण, व्यस्त पेशेवर और शाकाहारी जीवनशैली के लिए विशेष परिणाम',
  founderStartTransformationBtn: 'अपना परिवर्तन शुरू करें',

  // Progress Photos
  ppScreenTitle: 'प्रगति फ़ोटो',
  ppDaysLabel: 'दिन',
  ppKgLostLabel: 'kg कम',
  ppPhotosLabel: 'फ़ोटो',
  ppGridView: 'ग्रिड',
  ppTimelineView: 'टाइमलाइन',
  ppAddPhotoBtn: 'फ़ोटो जोड़ें',
  ppAddNewPhotoTitle: 'नई फ़ोटो जोड़ें',
  ppInDaysLabel: (n) => `${n} दिनों में`,
  wpNotesTitle: 'नोट',
  wpAdditionalResourcesTitle: 'अतिरिक्त संसाधन',

  // Self Assessment
  saScreenTitle: 'स्व-मूल्यांकन',
  saIntroText: 'आपकी व्यक्तिगत फिटनेस और पोषण योजना बनाने में मदद के लिए यह व्यापक प्रश्नावली भरें।',
  saBasicInfoSection: 'बुनियादी जानकारी',
  saNameLabel: 'नाम *',
  saNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
  saContactLabel: 'संपर्क नंबर *',
  saContactPlaceholder: 'अपना संपर्क नंबर दर्ज करें',
  saEmailLabel: 'ईमेल आईडी *',
  saEmailPlaceholder: 'अपना ईमेल दर्ज करें',
  saGenderLabel: 'लिंग *',
  saGenderMale: 'पुरुष',
  saGenderFemale: 'महिला',
  saGenderOther: 'अन्य',
  saAgeLabel: 'आयु *',
  saAgePlaceholder: 'अपनी आयु दर्ज करें',
  saWeightLabel: 'वज़न (किग्रा) *',
  saWeightPlaceholder: 'अपना वज़न दर्ज करें',
  saHeightLabel: 'ऊंचाई (सेमी) *',
  saHeightPlaceholder: 'अपनी ऊंचाई दर्ज करें',
  saMedicalInfoSection: 'चिकित्सा जानकारी',
  saMedicalConditionsQ: 'क्या आपकी कोई चिकित्सीय स्थिति है?',
  saMedicalDetailsLabel: 'कृपया विवरण दें *',
  saMedicalPlaceholder: 'अपनी चिकित्सीय स्थितियां सूचीबद्ध करें',
  saMedicationsQ: 'क्या आप वर्तमान में कोई दवाएं या पूरक ले रहे हैं?',
  saMedDetailsLabel: 'कृपया विवरण दें *',
  saMedPlaceholder: 'अपनी दवाएं/पूरक सूचीबद्ध करें',
  saDietSection: 'आहार इतिहास',
  saDietBeforeQ: 'क्या आपने पहले कोई आहार योजना का पालन किया है?',
  saDietOption1: 'नहीं, यह पहली बार है',
  saDietOption2: 'हां, कुछ',
  saDietOption3: 'हां, कई',
  saDietTypesQ: 'आपने किस प्रकार के आहार का प्रयास किया है?',
  saDietTypesPlaceholder: 'जैसे, कीटो, पालेओ, वीगन, आदि',
  saDietTypeQ: 'आप किस प्रकार का आहार लेते हैं?',
  saDietTypeVegetarian: 'शाकाहारी',
  saDietTypeNonVeg: 'मांसाहारी',
  saDietTypeVegan: 'वीगन',
  saDietTypePesc: 'पेस्कटेरियन',
  saDietTypeFlex: 'फ्लेक्सिटेरियन',
  saDietTypeNoPref: 'कोई प्राथमिकता नहीं',
  saFoodAllergiesQ: 'क्या आपको कोई ज्ञात खाद्य एलर्जी या असहिष्णुता है?',
  saFoodAllergiesPlaceholder: 'जैसे, लैक्टोज, ग्लूटेन, नट्स, आदि (या "कोई नहीं" लिखें)',
  saFitnessGoalsSection: 'फिटनेस लक्ष्य',
  saCurrentGoalQ: 'आपका वर्तमान स्वास्थ्य या फिटनेस लक्ष्य क्या है?',
  saCurrentGoalPlaceholder: 'जैसे, वज़न घटाना, मांसपेशी बढ़ाना, सामान्य फिटनेस',
  saBiggestFearQ: 'आपकी फिटनेस/आहार यात्रा में सबसे बड़ा डर या संघर्ष क्या है?',
  saFearOpt1: 'मैं प्रेरणा खो देता/देती हूं',
  saFearOpt2: 'मैं रुटीन नहीं मानता/मानती',
  saFearOpt3: 'मैं क्या खाऊं इसमें उलझ जाता/जाती हूं',
  saFearOpt4: 'मैं भावनात्मक खाने से जूझता/जूझती हूं',
  saFearOpt5: 'अन्य',
  saFearSpecify: 'कृपया बताएं',
  saFearSpecifyPlaceholder: 'अपना संघर्ष बताएं',
  saActivitySection: 'गतिविधि और जीवनशैली',
  saActivityLevelQ: 'आपका दैनिक गतिविधि स्तर क्या है?',
  saActivitySedentary: 'अनिष्क्रिय (कम या कोई व्यायाम नहीं)',
  saActivityLightlyActive: 'थोड़ा सक्रिय (सप्ताह में 1-3 दिन)',
  saActivityModerately: 'मध्यम सक्रिय (सप्ताह में 3-5 दिन)',
  saActivityVeryActive: 'बहुत सक्रिय (सप्ताह में 6-7 दिन)',
  saActivityExtremelyActive: 'अत्यंत सक्रिय (प्रतिदिन तीव्र व्यायाम)',
  saTypicalMealsQ: 'अपने सामान्य दैनिक भोजन की सूची बनाएं',
  saTypicalMealsPlaceholder: 'नाश्ता, दोपहर का खाना, स्नैक्स, रात का खाना, आदि',
  saWorkoutPrefQ: 'क्या आप जिम या होम वर्कआउट पसंद करते हैं?',
  saWorkoutPrefGym: 'जिम वर्कआउट',
  saWorkoutPrefHome: 'होम वर्कआउट',
  saWorkoutPrefBoth: 'दोनों',
  saAdditionalInfoSection: 'अतिरिक्त जानकारी',
  saAdditionalNotesQ: 'क्या आप कुछ और बताना चाहते हैं?',
  saAdditionalNotesPlaceholder: 'वैकल्पिक: कोई अतिरिक्त जानकारी साझा करें',
  saSubmitBtn: 'मूल्यांकन पूर्ण करें',

  // Onboarding
  onboardingWelcomeTitle: 'Fitzen में आपका स्वागत है!',
  onboardingSubtitleText: 'आपकी फिटनेस यात्रा को व्यक्तिगत बनाएं',
  onboardingAlreadyMemberText: 'पहले से सदस्य? साइन इन करें',
  onboardingSeeStoriesBtn: 'सफलता की कहानियां और परिवर्तन देखें',
  onboardingLiveConsultationOpt: 'लाइव परामर्श',
  onboardingLiveConsultationDesc: 'अपने कोच के साथ 1-ऑन-1 कॉल शेड्यूल करें',
  onboardingSelfAssessmentOpt: 'स्व-मूल्यांकन',
  onboardingSelfAssessmentDesc: 'एक विस्तृत प्रश्नावली पूरी करें',
  onboardingScheduleCallTitle: 'अपनी कॉल शेड्यूल करें',
  onboardingScheduleCallSub: 'अपनी परामर्श के लिए एक सुविधाजनक समय चुनें',
  onboardingBookConsultationBtn: 'परामर्श बुक करें',
  onboardingTellAboutTitle: 'हमें अपने बारे में बताएं',
  onboardingTellAboutSub: 'आपकी परफेक्ट फिटनेस योजना बनाने में मदद करें',
  onboardingGetStarted: 'शुरू करें',
  onboardingStepOf: (step, total) => `चरण ${step} / ${total}`,
  onboardingDuration: 'अवधि',
  onboardingDurationValue: '30-45 मिनट',
  onboardingWhatToExpect: 'क्या उम्मीद करें',
  onboardingCallExpect: 'अपने फिटनेस लक्ष्यों, स्वास्थ्य इतिहास पर चर्चा करें और व्यक्तिगत सुझाव पाएं',

  // Coach Selection
  csScreenTitle: 'अपना कोच चुनें',
  csScreenSubtitle: 'अपना कोचिंग अनुभव व्यक्तिगत बनाएं',
  csAlreadyMemberText: 'पहले से सदस्य?',
  csCoachGenderLabel: 'कोच का लिंग',
  csCoachGenderDesc: 'वह लिंग चुनें जिसके साथ आप सबसे अधिक सहज हैं',
  csCoachingStyleLabel: 'कोचिंग स्टाइल',
  csCoachingStyleDesc: 'आप चाहते हैं कि आपका कोच आपसे कैसे संवाद करे?',
  csYourSelectionLabel: 'आपका चयन',
  csStartJourneyBtn: 'मेरी यात्रा शुरू करें',
  csStyleFriendly: 'मैत्रीपूर्ण और सहायक',
  csStyleStrict: 'कड़क और अनुशासित',
  csStyleCalm: 'शांत और संतुलित',
  csStyleMotivational: 'प्रेरक और ऊर्जावान',
  csStyleFriendlyDesc: 'उत्साहजनक और गर्म दृष्टिकोण',
  csStyleStrictDesc: 'कठोर प्यार और जवाबदेही',
  csStyleCalmDesc: 'सचेत और स्थिर मार्गदर्शन',
  csStyleMotivationalDesc: 'उच्च ऊर्जा और प्रेरणादायक',
  csPreviewText: (genderLabel, styleName) => `${genderLabel} कोच ${styleName} दृष्टिकोण के साथ`,
  csMaleCoach: 'पुरुष',
  csFemaleCoach: 'महिला',

  // Payment
  payPremiumFeaturesTitle: 'प्रीमियम फीचर्स',
  payChoosePlanTitle: 'अपनी योजना चुनें',
  payMonthlyPlan: 'मासिक',
  payYearlyPlan: 'वार्षिक',
  payPopularBadge: 'लोकप्रिय',
  payMethodLabel: 'भुगतान विधि',
  payUPI: 'UPI',
  payCard: 'कार्ड',
  payNetBanking: 'नेट बैंकिंग',
  payOrderSummaryTitle: 'ऑर्डर सारांश',
  payTaxLabel: 'कर (18%)',
  payTotalLabel: 'कुल',
  payFeature1: 'व्यक्तिगत AI वर्कआउट योजनाएं',
  payFeature2: 'कस्टम भोजन योजना',
  payFeature3: 'उन्नत विश्लेषण और अंतर्दृष्टि',
  payFeature4: 'प्राथमिकता चैट सहायता',
  payFeature5: 'विज्ञापन-मुक्त अनुभव',
  payFeature6: 'असीमित वर्कआउट ट्रैकिंग',
  paySaveAmount: (n) => `₹${n} बचाएं`,
  payEnterUPITitle: 'UPI आईडी दर्ज करें',
  payUPIHint: 'आपको अपने UPI ऐप पर एक भुगतान अनुरोध मिलेगा',
  payCardDetailsTitle: 'कार्ड विवरण',
  payCardNumberLabel: 'कार्ड नंबर',
  payExpiryLabel: 'समाप्ति',
  payCVVLabel: 'CVV',
  payCardholderLabel: 'कार्डधारक का नाम',
  paySelectBankTitle: 'बैंक चुनें',
  paySelectMethodError: 'कृपया एक भुगतान विधि चुनें',
  payEnterUPIError: 'कृपया अपना UPI आईडी दर्ज करें',
  payFillCardError: 'कृपया सभी कार्ड विवरण भरें',
  paySelectBankError: 'कृपया अपना बैंक चुनें',
  paySuccessTitle: 'भुगतान सफल! 🎉',
  paySuccessMessage: 'आपकी प्रीमियम सदस्यता सक्रिय हो गई है।',
  payMonthDuration: 'महीना',
  payYearDuration: 'साल',
  payNowBtn: (amount) => `₹${amount} भुगतान करें`,

  // Common new
  goBack: 'वापस जाएं',

  // Splash
  splashTagline: 'आपका AI फिटनेस कोच',
  splashPoweredBy: 'AI द्वारा संचालित',

  // Social
  socialCommunity: 'समुदाय',
  socialComments: 'टिप्पणियां',
  socialWriteComment: 'एक टिप्पणी लिखें...',
  socialNoComments: 'अभी कोई टिप्पणी नहीं। पहले टिप्पणी करें!',
  socialMinutesAgo: (n) => `${n} मिनट पहले`,
  socialHoursAgo: (n) => `${n} घंटे पहले`,
  socialDaysAgo: (n) => `${n} दिन पहले`,
};

export const translations: Record<Language, AppTranslations> = { en, bn, hi };
