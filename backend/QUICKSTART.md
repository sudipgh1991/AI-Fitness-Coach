# Fitzen Backend - Quick Reference

## Start the Backend

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python run.py             # Start server
```

Server runs at: `http://localhost:5001`

## Configuration

Edit `.env` file:

```env
# Required: AWS Credentials for Bedrock
AWS_ACCESS_KEY_ID=your-key-here
AWS_SECRET_ACCESS_KEY=your-secret-here
AWS_REGION=us-east-1

# Optional: Change if needed
API_PORT=5001
SECRET_KEY=your-secret-key
```

## Key Endpoints

### Test Health
```bash
curl http://localhost:5001/health
```

### Login (OTP accepts any 6-digit code in dev)
```bash
# Send OTP
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'

# Verify OTP
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "otp": "123456"}'
```

### AI Chat
```bash
curl -X POST http://localhost:5001/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "USER_ID",
    "message": "Create a workout plan"
  }'
```

## Data Files

Located in `backend/data/`:
- `users.csv`
- `chat_history.csv`
- `workouts.csv`
- `nutrition.csv`
- `goals.csv`
- `measurements.csv`
- `habits.csv`
- `reminders.csv`
- `recipes.csv`

Auto-created on first use.

## AWS Bedrock Setup

1. Enable Claude 3 Sonnet in AWS Bedrock console
2. Create IAM user with `AmazonBedrockFullAccess` policy
3. Add credentials to `.env` file

## Common Issues

**"Module not found"**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**"AWS credentials not found"**
- Add AWS credentials to `.env` file
- Verify credentials are correct
- Check IAM permissions

**"Port already in use"**
- Change `API_PORT` in `.env`
- Or kill process: `lsof -ti:5001 | xargs kill -9`

## Frontend Integration

Frontend automatically connects to backend at `http://localhost:5001/api`

Make sure backend is running before starting frontend.

## Production Checklist

- [ ] Replace CSV with proper database
- [ ] Implement proper JWT verification
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up logging and monitoring
- [ ] Configure real OTP service
- [ ] Add input validation
- [ ] Set strong SECRET_KEY
- [ ] Restrict CORS origins
- [ ] Enable production mode

---

See [SETUP_GUIDE.md](../SETUP_GUIDE.md) for complete documentation
