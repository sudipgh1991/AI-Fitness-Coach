# Feature Access Guide

This document explains how to access the newly added features in the Fitzen AI Coach app.

## 🩸 Period Tracker

### Purpose
Track menstrual cycles to align fitness and nutrition plans with hormonal phases for optimal results.

### How to Access
1. Open the app
2. Navigate to the **Profile** tab (bottom navigation)
3. Scroll to the **"Health & Wellness"** section
4. Tap on **"Period Tracker"**

### Features
- **Log Cycle Data**: Record cycle start date and cycle length (20-45 days)
- **Phase Detection**: Automatically detects current hormonal phase:
  - 🔴 Menstrual Phase (Days 1-5): Rest and recovery
  - 🔵 Follicular Phase (Days 6-13): High energy workouts
  - 🟢 Ovulation Phase (Days 14-16): Peak performance
  - 🟡 Luteal Phase (Days 17-28): Moderate activities
- **Predictions**: Shows when your next cycle is expected
- **Fitness Tips**: Provides phase-specific workout recommendations
- **History**: View all your past cycle records

### Navigation Path
```
Main App → Profile Tab → Health & Wellness → Period Tracker
```

### Route Name
`PeriodTracker`

---

## 🎁 Referral Code System

### Purpose
Share your unique referral code with friends and earn cashback rewards when they join.

### How to Access
1. Open the app
2. Navigate to the **Profile** tab (bottom navigation)
3. Scroll to the **"Rewards"** section
4. Tap on **"Refer & Earn"**

### Features
- **Unique Code**: Your personal referral code (e.g., FIT2026)
- **Easy Sharing**: Copy to clipboard or share via social media
- **Earnings Tracker**: See your total earnings at a glance
- **Referral Stats**: Track:
  - Total referrals
  - Premium conversions
  - Average earning per user
- **Referral History**: View all your referrals with status:
  - 🟡 Pending: Friend hasn't signed up yet
  - 🔵 Joined: Friend signed up (you earn $5)
  - 🟢 Premium: Friend upgraded to premium (you earn additional $5)
- **How It Works Guide**: Step-by-step explanation

### Reward Structure
- **Friend Signs Up**: $5 reward
- **Friend Upgrades to Premium**: Additional $5 reward
- **Maximum**: $10 per successful referral

### Navigation Path
```
Main App → Profile Tab → Rewards → Refer & Earn
```

### Route Name
`Referral`

---

## 📱 UI Integration

Both features are integrated into the **ProfileScreen** with dedicated menu items:

### Period Tracker Menu Item
- **Icon**: 📅 Calendar
- **Title**: Period Tracker
- **Subtitle**: Track your menstrual cycle
- **Section**: Health & Wellness

### Referral Menu Item
- **Icon**: 🎁 Gift
- **Title**: Refer & Earn
- **Subtitle**: Share your code and get rewards
- **Section**: Rewards

---

## 🎨 Design Features

### Period Tracker
- Color-coded phases for easy identification
- Date picker for easy date selection
- Clean history view with delete option
- Informative tips for each hormonal phase
- Predictions based on average cycle length

### Referral Screen
- Large earnings display at the top
- Quick copy and share buttons
- Visual status badges (Pending/Joined/Premium)
- Step-by-step guide for new users
- Terms and conditions footer

---

## 🔄 Navigation Stack

Both screens are part of the **ProfileStack** in the navigation hierarchy:

```
TabNavigator
  └─ Profile Tab
      └─ ProfileStack
          ├─ ProfileMain (default)
          ├─ Achievements
          ├─ ProgressPhotos
          ├─ BodyMeasurements
          ├─ Reminders
          ├─ PeriodTracker ⬅️ NEW
          └─ Referral ⬅️ NEW
```

---

## 📝 Developer Notes

### Navigation Usage in Code
```typescript
// Navigate to Period Tracker
navigation.navigate('PeriodTracker');

// Navigate to Referral
navigation.navigate('Referral');
```

### Required Dependencies
- `@react-native-community/datetimepicker` - For date selection in Period Tracker
- `expo-clipboard` - For copy functionality in Referral screen

### Component Files
- `/frontend/screens/PeriodTrackerScreen.tsx`
- `/frontend/screens/ReferralScreen.tsx`
- `/frontend/navigation/MainNavigator.tsx` (updated)
- `/frontend/screens/ProfileScreen.tsx` (updated)

---

## 🎯 User Benefits

### Period Tracker
- Better workout planning aligned with energy levels
- Understanding weight fluctuations during different phases
- Reduced risk of injury by avoiding high-intensity workouts during low-energy phases
- Improved nutrition timing based on hormonal needs

### Referral System
- Earn money by sharing the app
- Help friends discover a great fitness platform
- Build community and accountability
- Unlock premium features faster with rewards

---

## ✅ Testing Checklist

- [ ] Period Tracker accessible from Profile screen
- [ ] Date picker works on both iOS and Android
- [ ] Cycle data saves correctly
- [ ] Phase detection shows correct phase
- [ ] Predictions calculate properly
- [ ] Referral code displays correctly
- [ ] Copy to clipboard works
- [ ] Share functionality opens system share sheet
- [ ] Referral history displays with correct status
- [ ] Back navigation works from both screens

---

Last Updated: January 8, 2026
