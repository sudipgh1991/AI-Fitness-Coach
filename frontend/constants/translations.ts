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
};

export const translations: Record<Language, AppTranslations> = { en, bn, hi };
