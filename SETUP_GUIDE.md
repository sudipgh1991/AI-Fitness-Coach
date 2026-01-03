# Fitzen AI Coach App - Full Stack Setup Guide

Complete Python Flask backend with AWS Bedrock Claude integration and React Native Expo frontend.

## 🏗️ Project Structure

```
ai-coach-app/
├── backend/                      # Python Flask API server
│   ├── routes/                   # API route handlers
│   │   ├── auth.py              # Authentication endpoints
│   │   ├── users.py             # User profile endpoints
│   │   ├── chat.py              # AI chat endpoints
│   │   ├── workouts.py          # Workout tracking endpoints
│   │   ├── nutrition.py         # Nutrition & recipes endpoints
│   │   ├── goals.py             # Goals tracking endpoints
│   │   ├── measurements.py      # Body measurements endpoints
│   │   ├── habits.py            # Habits tracking endpoints
│   │   └── reminders.py         # Reminders endpoints
│   ├── models/                   # Data models
│   │   └── storage.py           # CSV storage handlers
│   ├── services/                 # Business logic
│   │   └── bedrock_service.py   # AWS Bedrock AI integration
│   ├── data/                     # CSV data files (auto-created)
│   ├── app.py                    # Flask app factory
│   ├── config.py                 # Configuration management
│   ├── run.py                    # Server entry point
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment variables template
│   ├── setup.sh                  # Setup script
│   └── README.md                 # Backend documentation
│
└── frontend/                     # React Native Expo app
    ├── screens/                  # All app screens
    ├── components/               # Reusable components
    ├── services/                 # API service layer
    │   └── api.ts               # Backend API client
    ├── contexts/                 # React contexts
    ├── navigation/               # Navigation setup
    ├── types/                    # TypeScript types
    └── package.json              # Node dependencies
```

## 🚀 Backend Setup

### Prerequisites

- Python 3.8 or higher
- AWS Account with Bedrock access
- AWS Bedrock Claude 3 Sonnet model enabled

### Step 1: Install Dependencies

```bash
cd backend

# Option 1: Use setup script (macOS/Linux)
chmod +x setup.sh
./setup.sh

# Option 2: Manual setup
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your AWS credentials:

```env
# Flask Configuration
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-change-in-production-12345

# AWS Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# API Configuration
API_HOST=0.0.0.0
API_PORT=5000
FRONTEND_URL=http://localhost:8081

# Data Storage
DATA_DIR=./data
```

### Step 3: Start Backend Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the server
python run.py
```

The backend server will start on `http://localhost:5000`

## 📱 Frontend Setup

### Prerequisites

- Node.js 16 or higher
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure API Endpoint

The API endpoint is automatically configured in `frontend/services/api.ts`:
- Development: `http://localhost:5000/api`
- Production: Update in the file

### Step 3: Start Expo Development Server

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## 🔧 Backend API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/google-signin` - Google sign-in
- `POST /api/auth/apple-signin` - Apple sign-in

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/onboarding` - Complete onboarding
- `POST /api/users/:id/premium` - Upgrade to premium

### Chat (AI Integration)
- `POST /api/chat/message` - Send message to AI coach
- `GET /api/chat/history/:user_id` - Get chat history
- `DELETE /api/chat/clear/:user_id` - Clear chat history

### Workouts
- `GET /api/workouts/:user_id` - Get all workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `POST /api/workouts/generate-plan` - Generate AI workout plan
- `GET /api/workouts/stats/:user_id` - Get workout statistics

### Nutrition
- `GET /api/nutrition/log/:user_id` - Get nutrition logs
- `POST /api/nutrition/log` - Log meal/nutrition
- `DELETE /api/nutrition/log/:id` - Delete log
- `GET /api/nutrition/daily-summary/:user_id` - Get daily summary
- `POST /api/nutrition/generate-meal-plan` - Generate AI meal plan
- `GET /api/nutrition/recipes` - Get recipes
- `POST /api/nutrition/recipes/suggest` - Get AI recipe suggestions

### Goals, Measurements, Habits, Reminders
See [backend/README.md](backend/README.md) for complete API documentation.

## 🧪 Testing the Integration

### 1. Test Backend Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "message": "Fitzen AI Coach Backend is running"
}
```

### 2. Test OTP Authentication

```bash
# Send OTP
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'

# Verify OTP (any 6-digit code works in development)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "otp": "123456"}'
```

### 3. Test AI Chat

```bash
# Replace USER_ID and TOKEN with values from login
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "user_id": "USER_ID",
    "message": "Create a workout plan for me"
  }'
```

### 4. Test Frontend Integration

1. Start both backend and frontend servers
2. Open app in simulator/emulator
3. Complete onboarding
4. Login with phone OTP (any 6-digit code works)
5. Go to Chat screen and send a message
6. Verify AI responds with personalized advice

## 📊 Data Storage

Data is stored in CSV files in `backend/data/` directory:
- `users.csv` - User profiles
- `workouts.csv` - Workout logs
- `nutrition.csv` - Nutrition logs
- `recipes.csv` - Recipe database
- `goals.csv` - User goals
- `measurements.csv` - Body measurements
- `habits.csv` - Habit tracking
- `reminders.csv` - Reminders
- `chat_history.csv` - AI chat conversations

Files are auto-created with proper headers on first use.

## 🔐 AWS Bedrock Setup

### 1. Enable Bedrock Access

1. Go to AWS Console → Amazon Bedrock
2. Navigate to "Model access" in the left sidebar
3. Click "Manage model access"
4. Select "Anthropic - Claude 3 Sonnet"
5. Click "Request model access"
6. Wait for approval (usually instant)

### 2. Create IAM User

1. Go to AWS Console → IAM
2. Create new user with programmatic access
3. Attach policy: `AmazonBedrockFullAccess`
4. Save access key ID and secret access key
5. Add to `.env` file

### 3. Verify Model ID

The backend uses: `anthropic.claude-3-sonnet-20240229-v1:0`

Check available models in your region:
```bash
aws bedrock list-foundation-models --region us-east-1
```

## 🚨 Troubleshooting

### Backend Issues

**Import errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**AWS Bedrock errors:**
- Verify AWS credentials in `.env`
- Check model is enabled in your region
- Confirm IAM user has Bedrock permissions

**Port already in use:**
```bash
# Change port in .env
API_PORT=5001
```

### Frontend Issues

**Cannot connect to backend:**
- Verify backend is running on `http://localhost:5000`
- Check API_BASE_URL in `frontend/services/api.ts`
- For physical devices, use computer's IP instead of localhost

**TypeScript errors:**
```bash
cd frontend
npm install
```

## 📈 Next Steps

### For Production

1. **Database**: Replace CSV with PostgreSQL/MongoDB
2. **Authentication**: Implement proper JWT verification
3. **OTP Service**: Integrate Twilio or AWS SNS
4. **Security**: Add rate limiting, input validation
5. **Hosting**: Deploy backend to AWS/Heroku, frontend to Expo EAS
6. **Monitoring**: Add logging, error tracking (Sentry)
7. **CI/CD**: Set up automated testing and deployment

### Feature Enhancements

1. Update remaining screens to use backend APIs
2. Add real-time notifications
3. Implement social features (friends, challenges)
4. Add workout/meal plan templates
5. Integrate with fitness trackers (Fitbit, Apple Health)
6. Add progress photos and comparisons
7. Implement streak tracking and gamification

## 📝 Development Notes

- Backend uses Flask blueprints for modular route organization
- Frontend uses TypeScript for type safety
- AI responses are personalized using user context
- CSV storage is temporary - migrate to database for production
- Mock OTP accepts any 6-digit code in development

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License - See LICENSE file for details

---

Built with ❤️ using Flask, AWS Bedrock Claude, and React Native Expo
