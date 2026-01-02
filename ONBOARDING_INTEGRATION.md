# Onboarding Integration Guide

## 🎯 Overview
The onboarding flow has been successfully integrated into the app launch sequence. New users will now see the onboarding screens before accessing the main app.

## 📱 User Flow

### For New Users (First Time App Launch):
1. **OnboardingScreen** → Choose consultation or complete questionnaire
2. **CoachSelectionScreen** → Select coach gender and style preferences
3. **Click "Start My Journey"** → Navigate to Login
4. **Login/Verify OTP** → User authenticates
5. **Main App** → Access full app features

### For Returning Users:
1. **Login/Verify OTP** → Direct to login (onboarding skipped)
2. **Main App** → Access full app features

## 🔧 Changes Made

### 1. AppNavigator.tsx
- Added state management for `hasCompletedOnboarding`
- Checks AsyncStorage for onboarding completion status on app launch
- Conditionally renders onboarding screens BEFORE login
- Added imports for OnboardingScreen and CoachSelectionScreen

**Key Logic:**
```typescript
// Three navigation states:
1. No onboarding completed → Show Onboarding/CoachSelection then Login
2. Onboarding done but not authenticated → Show Login/OTP
3. Authenticated with onboarding done → Show Main app
```

### 2. OnboardingScreen.tsx
- Added AsyncStorage import
- Updated `handleComplete` to save onboarding data
- Saves: onboarding type, form data, completion timestamp
- Navigates to CoachSelection using `replace()` (no back button)

**Data Saved:**
```typescript
{
  type: 'call' | 'form',
  formData: { age, gender, height, weight, goals, etc. },
  completedAt: ISO timestamp
}
```

### 3. CoachSelectionScreen.tsx
- Added AsyncStorage import
- Updated `handleComplete` to save coach preferences
- Marks onboarding as completed (`hasCompletedOnboarding: true`)
- Navigates to Login screen using `replace()` (no back button)

**Data Saved:**
```typescript
{
  coachGender: 'male' | 'female',
  coachStyle: 'friendly' | 'strict' | 'calm' | 'motivational',
  hasCompletedOnboarding: 'true'
}
```

### 4. ProfileScreen.tsx
- Added AsyncStorage import
- Added "Developer Options" section
- Added "Reset Onboarding" button for testing
- Clears all onboarding data and logs out user

## 🧪 Testing the Onboarding Flow

### Method 1: First Time User (Fresh Install)
1. Delete and reinstall the app OR clear app data
2. Launch the app
3. You'll see the onboarding screens FIRST
4. After completing onboarding, you'll see the login screen

### Method 2: Using Reset Button
1. Go to **Profile** tab
2. Scroll to **Developer Options** section
3. Tap **Reset Onboarding**
4. Confirm the reset
5. App will logout and restart
6. You'll see onboarding screens before login

### Method 3: Manual AsyncStorage Clear (Dev Only)
In your terminal while app is running:
```bash
# Clear AsyncStorage in Expo
# Press 'j' to open debugger, then in console:
await AsyncStorage.clear();
```

## 💾 AsyncStorage Keys Used

| Key | Value | Purpose |
|-----|-------|---------|
| `hasCompletedOnboarding` | `'true'` | Main flag to check if user completed onboarding |
| `onboardingData` | JSON string | Stores user's onboarding responses |
| `coachGender` | `'male'` or `'female'` | Selected coach gender |
| `coachStyle` | `'friendly'`, `'strict'`, etc. | Selected coaching style |

## 🎨 Navigation Behavior

### Key Points:
- Uses `navigation.replace()` instead of `navigate()`
  - Prevents back navigation to onboarding
  - Clears the navigation stack
  - User can't accidentally go back to onboarding

- Three-tier navigation check:
  ```typescript
  if (!hasCompletedOnboarding) → Onboarding screens then Login
  else if (!authenticated) → Login/OTP screens
  else → Main app
  ```

## 🚀 Future Enhancements

### Recommended Additions:
1. **Skip Button**: Allow users to skip detailed questionnaire
2. **Progress Indicators**: Show "Step 1 of 2" on screens
3. **Edit Later**: Add ability to change coach preferences in settings
4. **Onboarding Analytics**: Track which onboarding path users choose
5. **Loading Screen**: Show spinner while checking AsyncStorage
6. **Error Handling**: Better error messages if AsyncStorage fails

### Using Saved Data:
The onboarding data can be retrieved anywhere in the app:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get coach preferences
const coachGender = await AsyncStorage.getItem('coachGender');
const coachStyle = await AsyncStorage.getItem('coachStyle');

// Get full onboarding data
const onboardingDataStr = await AsyncStorage.getItem('onboardingData');
const onboardingData = JSON.parse(onboardingDataStr);

// Use in AI Chat to personalize responses
const userAge = onboardingData.formData.age;
const fitnessGoal = onboardingData.formData.fitnessGoal;
```

## 🐛 Troubleshooting

### Issue: Onboarding shows every time
**Solution:** Check that `hasCompletedOnboarding` is being saved correctly
```typescript
await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
```

### Issue: App stuck on loading screen
**Solution:** Check AppNavigator's loading states
- Ensure `isLoading` becomes false
- Ensure `hasCompletedOnboarding` is not null

### Issue: Can navigate back to onboarding
**Solution:** Use `navigation.replace()` not `navigation.navigate()`

### Issue: Reset button doesn't work
**Solution:** Make sure to logout after clearing AsyncStorage to trigger navigation refresh

## ✅ Testing Checklist

- [ ] New user sees onboarding after first login
- [ ] Onboarding data is saved correctly
- [ ] Coach selection data is saved correctly
- [ ] User lands on main app after completion
- [ ] Returning user skips onboarding
- [ ] Cannot navigate back to onboarding after completion
- [ ] Reset button clears all onboarding data
- [ ] App restarts properly after reset

## 📸 Screen Flow Diagram

```
App Launch
  ↓
Check hasCompletedOnboarding?
  ↓
No → OnboardingScreen
       ↓
       [Live Consultation] or [Self Assessment]
       ↓
       Save onboarding data
       ↓
       CoachSelectionScreen
       ↓
       [Select Gender] → [Select Style]
       ↓
       Save preferences + set hasCompletedOnboarding = true
       ↓
       Login Screen
       ↓
       Verify OTP
       ↓
       Main App (Home/Profile/Social/Chat tabs)

Yes → Login Screen directly
       ↓
       Verify OTP
       ↓
       Main App
```

## 🎉 Result

Users now have a complete onboarding experience that:
- ✅ Personalizes their fitness journey
- ✅ Collects important user information
- ✅ Allows coach preference selection
- ✅ Only shows once per user
- ✅ Can be reset for testing
- ✅ Saves all preferences for future use
- ✅ Integrates seamlessly with existing auth flow
