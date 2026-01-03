# Fitzen AI Coach Backend

Python Flask backend server for the Fitzen AI Coach mobile app.

## Features

- **Authentication**: Phone OTP, Google, and Apple sign-in
- **AI Coach**: AWS Bedrock Claude integration for personalized fitness advice
- **Workouts**: Track and generate personalized workout plans
- **Nutrition**: Log meals, track macros, generate meal plans
- **Recipes**: Browse and get AI-powered recipe suggestions
- **Goals**: Set and track fitness goals
- **Measurements**: Track body measurements and progress
- **Habits**: Build and maintain healthy habits
- **Reminders**: Schedule and manage workout/meal reminders
- **Chat**: Real-time AI chat with personalized fitness coach

## Tech Stack

- **Framework**: Flask 3.0.0
- **AI**: AWS Bedrock Claude 3 Sonnet
- **Database**: CSV files with pandas
- **Authentication**: JWT tokens
- **CORS**: Flask-CORS for cross-origin requests

## Setup

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env and add your AWS credentials
```

3. **Run the server**:
```bash
python run.py
```

The server will start on `http://localhost:5000`

## API Endpoints

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

### Chat
- `POST /api/chat/message` - Send message to AI coach
- `GET /api/chat/history/:user_id` - Get chat history
- `DELETE /api/chat/clear/:user_id` - Clear chat history

### Workouts
- `GET /api/workouts/:user_id` - Get all workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `POST /api/workouts/generate-plan` - Generate AI workout plan
- `GET /api/workouts/stats/:user_id` - Get workout stats

### Nutrition
- `GET /api/nutrition/log/:user_id` - Get nutrition logs
- `POST /api/nutrition/log` - Log meal/nutrition
- `DELETE /api/nutrition/log/:id` - Delete log
- `GET /api/nutrition/daily-summary/:user_id` - Get daily summary
- `POST /api/nutrition/generate-meal-plan` - Generate AI meal plan
- `GET /api/nutrition/recipes` - Get recipes
- `GET /api/nutrition/recipes/:id` - Get specific recipe
- `POST /api/nutrition/recipes/suggest` - Get AI recipe suggestions

### Goals
- `GET /api/goals/:user_id` - Get all goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `POST /api/goals/:id/progress` - Update goal progress

### Measurements
- `GET /api/measurements/:user_id` - Get all measurements
- `POST /api/measurements` - Add measurement
- `PUT /api/measurements/:id` - Update measurement
- `DELETE /api/measurements/:id` - Delete measurement
- `GET /api/measurements/latest/:user_id` - Get latest measurement
- `GET /api/measurements/progress/:user_id` - Get progress over time

### Habits
- `GET /api/habits/:user_id` - Get all habits
- `POST /api/habits` - Create habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/complete` - Mark habit as completed
- `POST /api/habits/:id/skip` - Skip habit (reset streak)
- `GET /api/habits/analyze/:user_id` - Get AI habit analysis

### Reminders
- `GET /api/reminders/:user_id` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `POST /api/reminders/:id/toggle` - Toggle reminder active status
- `GET /api/reminders/upcoming/:user_id` - Get upcoming reminders

## Data Storage

Data is stored in CSV files in the `data/` directory:
- `users.csv` - User profiles and authentication
- `workouts.csv` - Workout tracking
- `nutrition.csv` - Nutrition logs
- `recipes.csv` - Recipe database
- `goals.csv` - Fitness goals
- `measurements.csv` - Body measurements
- `habits.csv` - Habit tracking
- `reminders.csv` - Reminders schedule
- `chat_history.csv` - AI chat conversations

## AWS Bedrock Configuration

The app uses AWS Bedrock Claude 3 Sonnet for AI features. You need:
1. AWS account with Bedrock access
2. Claude model enabled in your region
3. AWS credentials configured in `.env`

Model: `anthropic.claude-3-sonnet-20240229-v1:0`

## Development

The backend uses:
- Flask Blueprints for route organization
- CSV storage with pandas for data persistence
- Service layer pattern for AWS Bedrock integration
- Factory pattern for Flask app creation
- CORS enabled for mobile app communication

## Production Deployment

For production:
1. Replace CSV storage with proper database (PostgreSQL, MongoDB)
2. Implement proper JWT verification
3. Add rate limiting
4. Enable HTTPS
5. Set up proper logging
6. Configure AWS credentials securely
7. Implement actual OTP service (Twilio, AWS SNS)
8. Add input validation and sanitization
9. Implement proper error handling
10. Set up monitoring and alerts
