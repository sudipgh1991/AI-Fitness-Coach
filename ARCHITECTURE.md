# Fitzen Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MOBILE APP (React Native + Expo)            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Screens    │  │  Components  │  │   Contexts   │              │
│  │              │  │              │  │              │              │
│  │ • Chat       │  │ • Button     │  │ • Auth       │              │
│  │ • Profile    │  │ • Card       │  │ • Theme      │              │
│  │ • Workouts   │  │ • Input      │  │              │              │
│  │ • Nutrition  │  │ • etc.       │  │              │              │
│  └──────┬───────┘  └──────────────┘  └──────────────┘              │
│         │                                                            │
│         └─────────────────┐                                         │
│                           ▼                                         │
│                  ┌─────────────────┐                                │
│                  │  API Service    │                                │
│                  │  (api.ts)       │                                │
│                  │                 │                                │
│                  │ • Auth methods  │                                │
│                  │ • Chat methods  │                                │
│                  │ • CRUD methods  │                                │
│                  └────────┬────────┘                                │
│                           │                                         │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
                            │ HTTP/JSON
                            │ REST API Calls
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER (Flask)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                      API Routes (Flask Blueprints)           │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │                                                              │   │
│  │  /api/auth/*        /api/users/*       /api/chat/*         │   │
│  │  Authentication     User Profiles      AI Chat             │   │
│  │                                                              │   │
│  │  /api/workouts/*    /api/nutrition/*   /api/goals/*        │   │
│  │  Workout Tracking   Meals & Recipes    Goal Setting        │   │
│  │                                                              │   │
│  │  /api/measurements/* /api/habits/*     /api/reminders/*    │   │
│  │  Body Tracking      Habit Building     Notifications       │   │
│  │                                                              │   │
│  └─────────┬────────────────────────────┬──────────────────────┘   │
│            │                            │                           │
│            ▼                            ▼                           │
│   ┌─────────────────┐        ┌──────────────────────┐              │
│   │  Data Layer     │        │   Service Layer      │              │
│   │  (models/)      │        │   (services/)        │              │
│   ├─────────────────┤        ├──────────────────────┤              │
│   │                 │        │                      │              │
│   │ CSVStorage      │        │  BedrockService      │              │
│   │ Base Class      │        │                      │              │
│   │                 │        │ • generate_response  │              │
│   │ 9 Specific      │        │ • fitness_advice     │──────┐       │
│   │ Storage Classes │        │ • workout_plan       │      │       │
│   │                 │        │ • meal_plan          │      │       │
│   │ • Users         │        │ • habit_analysis     │      │       │
│   │ • Workouts      │        │ • recipe_suggestions │      │       │
│   │ • Nutrition     │        │                      │      │       │
│   │ • Recipes       │        └──────────┬───────────┘      │       │
│   │ • Goals         │                   │                  │       │
│   │ • Measurements  │                   │                  │       │
│   │ • Habits        │                   │  boto3 client    │       │
│   │ • Reminders     │                   │                  │       │
│   │ • ChatHistory   │                   ▼                  │       │
│   │                 │        ┌──────────────────────┐      │       │
│   └────────┬────────┘        │                      │      │       │
│            │                 │   AWS Bedrock API    │◄─────┘       │
│            ▼                 │                      │              │
│   ┌─────────────────┐        │  Claude 3 Sonnet    │              │
│   │   CSV Files     │        │  Foundation Model   │              │
│   │   (data/)       │        │                      │              │
│   ├─────────────────┤        └──────────────────────┘              │
│   │                 │                                               │
│   │ • users.csv     │                                               │
│   │ • workouts.csv  │                                               │
│   │ • nutrition.csv │                                               │
│   │ • recipes.csv   │                                               │
│   │ • goals.csv     │                                               │
│   │ • etc.          │                                               │
│   │                 │                                               │
│   └─────────────────┘                                               │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. User Login with OTP

```
Mobile App                Backend API               CSV Storage
    │                          │                         │
    │──sendOTP(phone)──────────>│                         │
    │                          │                         │
    │<─────{success}───────────│                         │
    │                          │                         │
    │──verifyOTP(phone,otp)────>│                         │
    │                          │──read users.csv─────────>│
    │                          │<────user exists?────────│
    │                          │                         │
    │                          │──create/update user─────>│
    │<─{user, token}───────────│<────success─────────────│
    │                          │                         │
```

### 2. AI Chat Message

```
Mobile App                Backend API          BedrockService        AWS Bedrock
    │                          │                     │                    │
    │──sendMessage(msg)────────>│                     │                    │
    │                          │──get_fitness_advice─>│                    │
    │                          │    (context,msg)     │                    │
    │                          │                      │──invoke_model──────>│
    │                          │                      │   Claude API       │
    │                          │                      │<───AI response─────│
    │                          │<────response─────────│                    │
    │                          │──save chat history───>                    │
    │<──{message,response}─────│    (chat_history.csv)                    │
    │                          │                                           │
```

### 3. Generate Workout Plan

```
Mobile App                Backend API          BedrockService        AWS Bedrock
    │                          │                     │                    │
    │──generateWorkoutPlan()───>│                     │                    │
    │   (userProfile)          │                     │                    │
    │                          │──generate_workout_  │                    │
    │                          │   plan(profile)────>│                    │
    │                          │                      │──invoke_model──────>│
    │                          │                      │   with system      │
    │                          │                      │   prompt: "You     │
    │                          │                      │   are a fitness    │
    │                          │                      │   trainer..."      │
    │                          │                      │<───workout plan────│
    │                          │<────plan─────────────│   (structured)     │
    │<──{success,plan}─────────│                                           │
    │                          │                                           │
```

## Tech Stack Summary

### Frontend
- **Framework**: React Native 0.81.5
- **Platform**: Expo SDK 54.0.0
- **UI**: Custom components + React Navigation
- **State**: React Context API
- **Storage**: AsyncStorage
- **HTTP**: Fetch API

### Backend
- **Framework**: Flask 3.0.0
- **Language**: Python 3.8+
- **AI**: AWS Bedrock (boto3)
- **Model**: Claude 3 Sonnet
- **Storage**: CSV (pandas)
- **Auth**: JWT tokens
- **CORS**: Flask-CORS

### Infrastructure
- **Development**: 
  - Backend: localhost:5000
  - Frontend: Expo Dev Server
  
- **Production** (recommended):
  - Backend: AWS EC2, Heroku, or Railway
  - Frontend: Expo EAS + CDN
  - Database: PostgreSQL or MongoDB
  - Storage: AWS S3 for media files

## Key Features

### Mobile App
✅ Onboarding flow before login
✅ Phone OTP authentication
✅ AI chat with personalized coach
✅ Workout tracking and generation
✅ Nutrition logging and meal plans
✅ Recipe database with AI suggestions
✅ Goal setting and progress tracking
✅ Body measurement tracking
✅ Habit building and analysis
✅ Smart reminders
✅ Dark/Light theme support

### Backend API
✅ RESTful API design
✅ AWS Bedrock Claude integration
✅ CSV-based data storage
✅ JWT authentication
✅ CORS enabled
✅ Modular route organization
✅ Service layer separation
✅ Auto-created data files
✅ Error handling
✅ Health check endpoint

### AI Capabilities
✅ Personalized fitness advice
✅ Workout plan generation
✅ Meal plan creation
✅ Recipe suggestions
✅ Habit pattern analysis
✅ Context-aware responses
✅ Natural conversation flow

## Security Considerations

### Current (Development)
- Mock OTP (accepts any 6-digit code)
- Basic JWT implementation
- Open CORS policy
- CSV file storage

### Required for Production
- Real OTP service (Twilio/AWS SNS)
- Proper JWT verification with expiry
- Restricted CORS origins
- Database with encryption
- HTTPS only
- Rate limiting
- Input validation & sanitization
- SQL injection prevention
- XSS protection
- Environment variable management
- Logging and monitoring
- Backup strategy

## Performance Considerations

### Current Limitations
- CSV file I/O on every request
- No caching layer
- No connection pooling
- Synchronous operations
- No pagination

### Optimizations for Scale
- Migrate to PostgreSQL/MongoDB
- Implement Redis caching
- Add connection pooling
- Use async operations
- Implement pagination
- CDN for static assets
- Load balancing
- Database indexing
- Query optimization

---

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete setup instructions
