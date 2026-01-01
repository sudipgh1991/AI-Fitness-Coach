# AI Coach - Fitness & Health App

A modern, AI-powered fitness and health tracking application built with React Native and Expo.

## 🌟 Features

### Authentication
- 📱 Mobile OTP-based authentication
- 🍎 Sign in with Apple
- 🔐 Sign in with Google

### Home Dashboard
- 📊 Daily activity tracking (steps, calories, distance)
- 📈 Interactive charts and graphs
- 🎯 Fitness goals tracking
- 💪 Workout logging
- 🥗 Meal tracking

### Social Media Feed
- 📝 Create and share posts
- ❤️ Like and comment on posts
- 👥 Community engagement
- 📸 Image sharing

### AI Chat Assistant
- 🤖 AI-powered fitness coach
- 💬 Personalized workout recommendations
- 🍽️ Custom meal planning
- 📊 Progress tracking advice
- 💡 Fitness tips and motivation

### Profile Management
- 👤 User profile customization
- 🎨 Theme switching (Light/Dark/System)
- ⚙️ Settings and preferences
- 💎 Premium membership management

### Payment Integration
- 💳 UPI payments
- 🏦 Credit/Debit card support
- 🏛️ Net banking
- 📦 Subscription plans (Monthly/Yearly)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## 📁 Project Structure

```
ai-coach-app/
├── screens/           # Screen components
│   ├── LoginScreen.tsx
│   ├── VerifyOTPScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SocialScreen.tsx
│   ├── ChatScreen.tsx
│   ├── ProfileScreen.tsx
│   └── PaymentScreen.tsx
├── components/        # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── InputField.tsx
├── navigation/        # Navigation setup
│   ├── AppNavigator.tsx
│   └── MainNavigator.tsx
├── contexts/          # React Context providers
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── constants/         # Constants and theme
│   └── theme.ts
├── types/            # TypeScript types
│   └── index.ts
├── App.tsx           # Root component
├── app.json          # Expo configuration
└── package.json      # Dependencies
```

## 🎨 Theme Support

The app supports three theme modes:
- **Light Mode**: Bright, clean interface
- **Dark Mode**: Easy on the eyes in low-light conditions
- **System**: Automatically matches device theme

## 🔧 Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **React Native Chart Kit** - Data visualization
- **Expo Auth Session** - OAuth authentication
- **AsyncStorage** - Local data persistence

## 📱 Screens Overview

### Authentication Flow
1. **Login Screen**: Phone OTP, Google, Apple sign-in
2. **OTP Verification**: 6-digit OTP input

### Main App Flow
1. **Home**: Dashboard with activity stats and charts
2. **Social**: Community feed with posts and interactions
3. **Chat**: AI fitness assistant chatbot
4. **Profile**: User settings and theme preferences

### Additional Screens
- **Payment**: Subscription purchase with multiple payment methods

## 🔐 Security Features

- Secure authentication with OTP
- OAuth integration (Google & Apple)
- Encrypted data storage
- Privacy policy compliance

## 🎯 Future Enhancements

- [ ] Integration with wearable devices
- [ ] Real-time workout tracking with GPS
- [ ] Video workout tutorials
- [ ] Nutrition database and calorie tracking
- [ ] Social challenges and leaderboards
- [ ] Push notifications for reminders
- [ ] Offline mode support
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Development

To contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@aicoach.app or join our community forum.

## 🙏 Acknowledgments

- Expo team for the amazing platform
- React Native community
- All contributors and testers

---

Made with ❤️ by AI Coach Team
