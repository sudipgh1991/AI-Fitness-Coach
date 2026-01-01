# 🚀 Quick Reference Card

## Installation Commands

```bash
# Navigate to project
cd ai-coach-app

# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Project Files

| Category | Files | Purpose |
|----------|-------|---------|
| **Screens** | 7 files | All app screens (Login, Home, Social, Chat, Profile, Payment, OTP) |
| **Components** | 3 files | Reusable UI components (Button, Card, InputField) |
| **Navigation** | 2 files | App routing and tab navigation |
| **Contexts** | 2 files | Theme and Auth state management |
| **Constants** | 1 file | Colors, spacing, typography |
| **Types** | 1 file | TypeScript interfaces |

## Key Features Checklist

- ✅ Mobile OTP Authentication
- ✅ Google Sign-In
- ✅ Apple Sign-In
- ✅ Dashboard with Charts
- ✅ Activity Tracking
- ✅ Social Media Feed
- ✅ AI Chat Assistant
- ✅ Profile Management
- ✅ Theme Switching (Light/Dark/System)
- ✅ Payment Integration (UPI/Card/NetBanking)
- ✅ Bottom Tab Navigation

## Folder Structure

```
ai-coach-app/
├── screens/        # App screens
├── components/     # Reusable components
├── navigation/     # Navigation setup
├── contexts/       # State management
├── constants/      # Theme & constants
├── types/          # TypeScript types
├── assets/         # Images & icons
└── App.tsx         # Root component
```

## Color Theme

### Light Mode
- Primary: `#6C63FF` (Purple)
- Secondary: `#FF6584` (Pink)
- Background: `#FFFFFF`
- Text: `#212529`

### Dark Mode
- Primary: `#8B7FFF` (Light Purple)
- Secondary: `#FF7B98` (Light Pink)
- Background: `#121212`
- Text: `#FFFFFF`

## Navigation Structure

```
App
├── Auth Stack (if not logged in)
│   ├── Login
│   └── VerifyOTP
│
└── Main Stack (if logged in)
    ├── Tab Navigator
    │   ├── Home
    │   ├── Social
    │   ├── Chat
    │   └── Profile
    │
    └── Payment (Modal)
```

## API Integration Points

### To Connect Backend:

1. **Authentication**
   - POST `/auth/send-otp`
   - POST `/auth/verify-otp`
   - POST `/auth/google`
   - POST `/auth/apple`

2. **Activity**
   - GET `/activity/today`
   - GET `/activity/weekly`
   - POST `/activity/workout`
   - POST `/activity/meal`

3. **Social**
   - GET `/posts`
   - POST `/posts`
   - POST `/posts/:id/like`
   - POST `/posts/:id/comment`

4. **Chat**
   - POST `/chat/message`
   - GET `/chat/history`

5. **Payment**
   - POST `/payment/create-order`
   - POST `/payment/verify`

## Environment Variables

Create `.env` file:
```env
EXPO_PUBLIC_API_URL=https://your-api.com
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-key
EXPO_PUBLIC_RAZORPAY_KEY=your-razorpay-key
```

## Common Tasks

### Add New Screen
1. Create file in `/screens/NewScreen.tsx`
2. Import in navigation file
3. Add to navigator

### Add New Component
1. Create file in `/components/NewComponent.tsx`
2. Import where needed
3. Use component

### Modify Theme
1. Edit `/constants/theme.ts`
2. Changes apply app-wide

### Add Dependencies
```bash
npm install package-name
```

## Troubleshooting

### Metro Bundler Issues
```bash
npx react-native start --reset-cache
```

### iOS Pod Issues
```bash
cd ios && pod install && cd ..
```

### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
```

## Build Commands

### Development Build
```bash
npm start
```

### Production Build (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build
eas build --platform ios
eas build --platform android
```

## Testing

### Run Tests (when implemented)
```bash
npm test
```

### Type Check
```bash
npx tsc --noEmit
```

### Lint Check
```bash
npx eslint .
```

## Documentation Files

- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `DEVELOPMENT.md` - Development best practices
- `FEATURES.md` - Complete features list
- `PROJECT_SUMMARY.md` - This summary

## Support Resources

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Next Steps

1. ✅ Project created
2. ⏭️ Install dependencies: `npm install`
3. ⏭️ Start dev server: `npm start`
4. ⏭️ Customize branding
5. ⏭️ Connect backend APIs
6. ⏭️ Add real AI integration
7. ⏭️ Test on devices
8. ⏭️ Deploy to stores

---

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm start` | Start development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run in web browser |
| `npx expo install` | Install Expo packages |
| `eas build` | Build for production |

---

**Keep this file handy for quick reference!** 📌
