# Setup Guide - AI Coach App

## Quick Start Guide

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React Navigation
- Expo modules
- Chart libraries
- Authentication libraries

### Step 2: Setup Development Environment

#### For iOS Development (macOS only):
1. Install Xcode from the App Store
2. Install iOS Simulator
3. Run: `npm run ios`

#### For Android Development:
1. Install Android Studio
2. Setup Android Emulator
3. Run: `npm run android`

#### For Web Development:
```bash
npm run web
```

### Step 3: Configure Authentication

#### Google Sign-In:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Sign-In API
4. Get your OAuth client ID
5. Update `app.json` with your configuration

#### Apple Sign-In:
1. Requires Apple Developer account ($99/year)
2. Configure in Apple Developer Console
3. Already configured in the app

#### OTP Authentication:
- Integrate with SMS provider (Twilio, Firebase, etc.)
- Update the authentication logic in `screens/LoginScreen.tsx`
- Add your API endpoints

### Step 4: Configure AI Chat

The AI chat currently uses mock responses. To integrate a real AI:

1. **Option 1: OpenAI API**
   ```bash
   npm install openai
   ```
   Update `screens/ChatScreen.tsx` with your API key

2. **Option 2: Google's Gemini**
   ```bash
   npm install @google/generative-ai
   ```

3. **Option 3: Custom Backend**
   - Create your own AI backend
   - Update API calls in ChatScreen

### Step 5: Setup Payment Gateway

#### UPI Integration:
- Integrate with Razorpay, PayU, or similar
- Add merchant credentials

#### Card Payments:
- Use Stripe or Razorpay
- Add publishable key and secret key

Example Razorpay setup:
```bash
npm install react-native-razorpay
```

Update `screens/PaymentScreen.tsx` with:
```typescript
import RazorpayCheckout from 'react-native-razorpay';

const options = {
  key: 'YOUR_KEY_ID',
  amount: amount * 100,
  currency: 'INR',
  name: 'AI Coach',
  description: 'Premium Membership',
  prefill: {
    email: user.email,
    contact: user.phone,
  }
};
```

### Step 6: Database Setup

Currently, the app uses AsyncStorage for local storage. For production:

1. **Firebase Setup** (Recommended):
   ```bash
   npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
   ```

2. **Supabase Setup**:
   ```bash
   npm install @supabase/supabase-js
   ```

3. Create services in `/services` folder:
   - `authService.ts`
   - `userService.ts`
   - `activityService.ts`
   - `socialService.ts`

### Step 7: Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://your-api.com
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-key
EXPO_PUBLIC_RAZORPAY_KEY=your-razorpay-key
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-key
```

Install dotenv:
```bash
npm install react-native-dotenv
```

### Step 8: Testing

Run the app:
```bash
npm start
```

Then:
- Press `i` for iOS
- Press `a` for Android
- Press `w` for web

### Step 9: Build for Production

#### iOS:
```bash
expo build:ios
```

#### Android:
```bash
expo build:android
```

Or use EAS Build:
```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

## Common Issues & Solutions

### Issue 1: Metro Bundler Error
```bash
npx react-native start --reset-cache
```

### Issue 2: Pod Installation Error (iOS)
```bash
cd ios
pod install
cd ..
```

### Issue 3: Android Build Error
```bash
cd android
./gradlew clean
cd ..
```

## Project Configuration Files

### app.json
- Update `slug`, `name`, and `bundleIdentifier`
- Configure splash screen and icon
- Add required permissions

### package.json
- All dependencies are listed
- Scripts for running the app

### tsconfig.json
- TypeScript configuration
- Path aliases configured

## Folder Structure Best Practices

```
/screens        - All screen components
/components     - Reusable UI components
/navigation     - Navigation configuration
/contexts       - React Context for state management
/services       - API calls and business logic
/utils          - Helper functions
/hooks          - Custom React hooks
/constants      - Constants and configurations
/types          - TypeScript type definitions
/assets         - Images, fonts, etc.
```

## Next Steps

1. **Customize Branding**
   - Update app name in `app.json`
   - Replace icon and splash screen in `/assets`
   - Update colors in `constants/theme.ts`

2. **Add Real Data**
   - Connect to backend API
   - Implement real authentication
   - Setup database

3. **Enhance Features**
   - Add workout videos
   - Implement push notifications
   - Add analytics tracking
   - Integrate wearable devices

4. **Testing**
   - Write unit tests
   - Perform user testing
   - Test on multiple devices

5. **Deploy**
   - Submit to App Store
   - Submit to Google Play Store

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Support

If you encounter any issues:
1. Check the documentation
2. Search for similar issues on GitHub
3. Ask in React Native community forums
4. Create an issue in the repository

---

Happy Coding! 🚀
