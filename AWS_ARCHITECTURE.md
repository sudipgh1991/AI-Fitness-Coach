# Fitzen AI Coach - Optimized AWS Architecture

## Executive Summary

This document outlines a production-ready, cost-optimized AWS architecture for the Fitzen AI Coach application, a mobile fitness coaching app with AI-powered chat, workout tracking, nutrition planning, and habit monitoring.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       MOBILE APP (React Native + Expo)                  │
│                    iOS & Android via Expo Go / EAS Build                │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ HTTPS
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AWS CLOUDFRONT CDN                              │
│                  (Global Edge Locations, SSL/TLS)                       │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      AWS API GATEWAY (REST API)                         │
│              • Request validation & throttling                          │
│              • API key management                                       │
│              • CORS configuration                                       │
│              • Request/Response transformation                          │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER (AWS ECS Fargate)                  │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              Flask Backend (Python 3.13)                        │   │
│  │                                                                 │   │
│  │  Routes:  /auth  /users  /chat  /workouts  /nutrition         │   │
│  │           /goals  /habits  /measurements  /reminders           │   │
│  │                                                                 │   │
│  │  Auto-scaling: 2-10 tasks based on CPU/Memory                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Application Load Balancer (ALB)                                        │
│  • Health checks                                                        │
│  • SSL termination                                                      │
│  • Path-based routing                                                   │
└──────────────┬───────────────────────────────┬───────────────────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐   ┌──────────────────────────────┐
│   AWS BEDROCK                │   │   DATA LAYER                 │
│                              │   │                              │
│  • Claude 3.5 Sonnet         │   │  ┌────────────────────────┐ │
│    (AI Chat & Coaching)      │   │  │   Amazon RDS           │ │
│  • Pay-per-use pricing       │   │  │   PostgreSQL           │ │
│  • No infrastructure mgmt    │   │  │                        │ │
│                              │   │  │  • Multi-AZ            │ │
└──────────────────────────────┘   │  │  • Automated backups   │ │
                                   │  │  • Read replicas       │ │
                                   │  └────────────────────────┘ │
                                   │                              │
                                   │  ┌────────────────────────┐ │
                                   │  │   Amazon DynamoDB      │ │
                                   │  │   (Chat History)       │ │
                                   │  │                        │ │
                                   │  │  • On-Demand pricing   │ │
                                   │  │  • Single-digit ms     │ │
                                   │  │  • Auto-scaling        │ │
                                   │  └────────────────────────┘ │
                                   │                              │
                                   │  ┌────────────────────────┐ │
                                   │  │   Amazon S3            │ │
                                   │  │   (Progress Photos)    │ │
                                   │  │                        │ │
                                   │  │  • Standard-IA tier    │ │
                                   │  │  • Lifecycle policies  │ │
                                   │  │  • CloudFront CDN      │ │
                                   │  └────────────────────────┘ │
                                   └──────────────────────────────┘
               
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUPPORTING SERVICES                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │  Amazon Cognito  │  │  Amazon SNS      │  │  AWS Secrets     │     │
│  │                  │  │                  │  │  Manager         │     │
│  │  • User pools    │  │  • Push notifs   │  │                  │     │
│  │  • Social login  │  │  • SMS OTP       │  │  • API keys      │     │
│  │  • MFA           │  │  • Email alerts  │  │  • DB creds      │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │  CloudWatch      │  │  AWS Lambda      │  │  AWS WAF         │     │
│  │                  │  │                  │  │                  │     │
│  │  • Logs          │  │  • Scheduled     │  │  • DDoS protect  │     │
│  │  • Metrics       │  │    tasks         │  │  • Bot control   │     │
│  │  • Alarms        │  │  • Event-driven  │  │  • Rate limiting │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

## Detailed Component Architecture

### 1. **Frontend Distribution**
- **Service**: AWS Amplify Hosting (for web version) / Expo EAS
- **Purpose**: Deploy and host React Native web builds
- **Features**:
  - Continuous deployment from Git
  - Global CDN distribution
  - SSL certificates
  - Preview deployments

### 2. **API Gateway**
- **Service**: Amazon API Gateway (REST API)
- **Configuration**:
  ```
  Endpoints:
  - POST   /api/auth/send-otp
  - POST   /api/auth/verify-otp
  - POST   /api/auth/google-signin
  - POST   /api/auth/apple-signin
  - GET    /api/users/{userId}
  - PUT    /api/users/{userId}
  - POST   /api/chat/message
  - GET    /api/chat/history/{userId}
  - POST   /api/workouts
  - GET    /api/workouts/{userId}
  - POST   /api/nutrition/meals
  - GET    /api/nutrition/meals/{userId}
  - POST   /api/goals
  - GET    /api/goals/{userId}
  - POST   /api/habits
  - GET    /api/habits/{userId}
  - POST   /api/measurements
  - GET    /api/measurements/{userId}
  - POST   /api/reminders
  - GET    /api/reminders/{userId}
  ```
- **Throttling**: 10,000 requests/second with burst 5,000
- **Caching**: Enable for GET endpoints (5 minutes TTL)
- **Cost**: ~$3.50 per million API calls

### 3. **Compute Layer - AWS ECS Fargate**
- **Why Fargate over Lambda?**
  - Flask app requires consistent runtime
  - Complex AI interactions with Bedrock
  - Better for stateful connections
  - Cost-effective for consistent traffic

- **Configuration**:
  ```yaml
  Task Definition:
    CPU: 0.5 vCPU (512 units)
    Memory: 1 GB
    Container: Flask Python 3.13 app
    
  Service:
    Min tasks: 2 (high availability)
    Max tasks: 10 (auto-scale)
    Target CPU: 70%
    Target Memory: 80%
    
  Network:
    VPC with private subnets
    NAT Gateway for outbound
    Security groups (port 5001)
  ```

- **Deployment**: Blue/Green deployment via CodeDeploy
- **Cost**: ~$30-150/month (depending on scale)

### 4. **Database Layer**

#### **Option A: Amazon RDS PostgreSQL (Recommended for Production)**
```yaml
Instance: db.t4g.micro (2 vCPU, 1 GB RAM)
Storage: 20 GB GP3 SSD
Multi-AZ: Yes (high availability)
Automated Backups: 7-day retention
Read Replicas: 1 (for read-heavy operations)

Tables:
  - users (user profiles, subscription status)
  - workouts (workout history, exercises)
  - nutrition (meals, recipes, macro tracking)
  - goals (fitness goals, progress)
  - habits (habit tracking, streaks)
  - measurements (body measurements, weight)
  - reminders (scheduled notifications)

Cost: ~$25-40/month (t4g.micro Multi-AZ)
```

**Migration Path**: Convert CSV storage to PostgreSQL using SQLAlchemy ORM

#### **Option B: Amazon DynamoDB (Cost-Optimized)**
```yaml
Billing: On-Demand (pay per request)
Tables:
  - Users (PK: user_id)
  - Workouts (PK: user_id, SK: workout_id)
  - Nutrition (PK: user_id, SK: meal_id)
  - Goals (PK: user_id, SK: goal_id)
  - Habits (PK: user_id, SK: habit_id)
  - Measurements (PK: user_id, SK: timestamp)
  - ChatHistory (PK: user_id, SK: timestamp)

Features:
  - Single-digit millisecond latency
  - Auto-scaling
  - Global tables for multi-region
  - TTL for chat history cleanup

Cost: ~$1-10/month for small scale (<1M requests)
```

**Recommendation**: Start with **DynamoDB** for cost optimization, migrate to **RDS** if complex queries are needed.

### 5. **Chat History Storage**
- **Service**: Amazon DynamoDB
- **Table**: `ChatHistory`
  ```
  PK: user_id (String)
  SK: timestamp (Number, Unix epoch)
  Attributes: message, response, chat_id, sender
  ```
- **TTL**: Auto-delete messages older than 90 days
- **Cost**: ~$0.25-1/month

### 6. **File Storage - Amazon S3**
- **Buckets**:
  ```
  fitzen-progress-photos/
    {user_id}/
      {timestamp}_front.jpg
      {timestamp}_side.jpg
      {timestamp}_back.jpg
  
  fitzen-profile-images/
    {user_id}/avatar.jpg
  
  fitzen-recipe-images/
    {recipe_id}/image.jpg
  ```

- **Configuration**:
  - Encryption: AES-256 (S3-managed keys)
  - Lifecycle: Move to S3 Standard-IA after 90 days
  - CloudFront CDN for fast delivery
  - Signed URLs for secure access

- **Cost**: ~$0.023/GB/month + $0.005/1000 requests

### 7. **AI/ML - AWS Bedrock**
- **Model**: Claude 3.5 Sonnet (anthropic.claude-3-5-sonnet-20241022-v2:0)
- **Use Cases**:
  - Personalized fitness coaching
  - Workout plan generation
  - Meal plan creation
  - Habit analysis and recommendations
  - Recipe suggestions

- **Pricing**:
  - Input: $3.00 per 1M tokens
  - Output: $15.00 per 1M tokens
  - Average conversation: ~$0.02-0.05

- **Optimization**:
  - Cache system prompts
  - Limit max_tokens to 2000-3000
  - Implement rate limiting per user
  - Use streaming for better UX

### 8. **Authentication - Amazon Cognito**
- **User Pool**:
  ```yaml
  Sign-in options:
    - Phone number (SMS OTP)
    - Email
    - Google OAuth
    - Apple Sign In
  
  MFA: Optional SMS/TOTP
  
  Password policy:
    - Minimum length: 8
    - Require uppercase, lowercase, numbers
  
  Custom attributes:
    - subscription_status
    - subscription_expires_at
    - fitness_level
    - onboarding_completed
  ```

- **Cost**: Free tier (50,000 MAUs), then $0.0055/MAU

### 9. **Notifications - Amazon SNS**
- **Topics**:
  - `fitzen-reminders` (workout/meal reminders)
  - `fitzen-achievements` (milestone notifications)
  - `fitzen-alerts` (system alerts)

- **Channels**:
  - Push notifications (via Expo Push API)
  - SMS (OTP and reminders)
  - Email (reports, updates)

- **Cost**: 
  - Push: $0.50 per 1M notifications
  - SMS: $0.00645 per message (US)

### 10. **Background Jobs - AWS Lambda**
- **Functions**:
  ```python
  # Daily digest generator
  generate-daily-digest
    Trigger: EventBridge (daily at 8 AM)
    Action: Compile progress, send summary
  
  # Reminder scheduler
  send-reminders
    Trigger: EventBridge (every hour)
    Action: Check due reminders, send notifications
  
  # Habit streak updater
  update-habit-streaks
    Trigger: EventBridge (daily at midnight)
    Action: Update habit streaks, reset daily counters
  
  # Data cleanup
  cleanup-old-data
    Trigger: EventBridge (weekly)
    Action: Remove expired sessions, old chat history
  
  # Analytics aggregator
  aggregate-analytics
    Trigger: EventBridge (daily)
    Action: Calculate user engagement metrics
  ```

- **Cost**: Free tier (1M requests/month), then $0.20 per 1M

### 11. **Monitoring & Logging**

#### **CloudWatch Logs**
```yaml
Log Groups:
  /aws/ecs/fitzen-backend (application logs)
  /aws/lambda/fitzen-* (Lambda functions)
  /aws/apigateway/fitzen-api (API Gateway logs)

Retention: 30 days
Cost: ~$0.50-3/month
```

#### **CloudWatch Metrics & Alarms**
```yaml
Metrics:
  - API Gateway: 4xx/5xx errors, latency, request count
  - ECS: CPU, memory, task count
  - Bedrock: Token usage, error rate
  - DynamoDB: Read/write capacity, throttles
  - RDS: Connections, CPU, storage

Alarms:
  - API error rate > 5%
  - ECS CPU > 80% for 5 minutes
  - DynamoDB throttles > 10
  - RDS storage < 10% free

Actions: SNS notifications to DevOps team
```

#### **AWS X-Ray**
- Distributed tracing for API requests
- Performance bottleneck identification
- Error analysis

### 12. **Security**

#### **AWS WAF (Web Application Firewall)**
```yaml
Rules:
  - Rate limiting: 2000 requests per 5 minutes per IP
  - Geo-blocking: Allow only specific countries
  - Common attack protection:
    - SQL injection
    - XSS
    - Known bad inputs
  - Bot control: Block malicious bots
```

#### **AWS Secrets Manager**
```yaml
Secrets:
  /fitzen/prod/db-credentials
  /fitzen/prod/jwt-secret
  /fitzen/prod/bedrock-api-key
  /fitzen/prod/google-oauth-client-secret
  /fitzen/prod/apple-signin-key
  
Rotation: Automatic every 30 days (DB creds)
Cost: $0.40 per secret/month
```

#### **IAM Roles & Policies**
```yaml
Roles:
  FitzenECSTaskRole:
    - Bedrock: InvokeModel
    - DynamoDB: Read/Write
    - S3: Get/PutObject
    - Secrets Manager: GetSecretValue
    - SNS: Publish
  
  FitzenLambdaRole:
    - DynamoDB: Read/Write
    - SNS: Publish
    - CloudWatch: PutMetricData
  
  FitzenAPIGatewayRole:
    - CloudWatch: Logs
```

#### **VPC Security**
```yaml
Public Subnets (2 AZs):
  - ALB
  - NAT Gateway

Private Subnets (2 AZs):
  - ECS Tasks
  - RDS/DynamoDB endpoints
  
Security Groups:
  ALB-SG: Allow 443 from Internet
  ECS-SG: Allow 5001 from ALB-SG
  RDS-SG: Allow 5432 from ECS-SG
```

### 13. **CI/CD Pipeline**

```yaml
GitHub/GitLab Repository
    ↓
AWS CodePipeline
    ↓
  ┌─────────────┐
  │ Source      │ → Webhook trigger on push to main
  └──────┬──────┘
         ↓
  ┌─────────────┐
  │ Build       │ → AWS CodeBuild
  │             │   - Run tests (pytest)
  │             │   - Build Docker image
  │             │   - Push to ECR
  └──────┬──────┘
         ↓
  ┌─────────────┐
  │ Deploy      │ → AWS CodeDeploy
  │             │   - Blue/Green deployment
  │             │   - ECS service update
  │             │   - Rollback on failure
  └─────────────┘
```

**buildspec.yml**:
```yaml
version: 0.2
phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_URI
  build:
    commands:
      - echo Running tests...
      - pip install -r requirements.txt
      - pytest tests/
      - echo Building Docker image...
      - docker build -t fitzen-backend .
      - docker tag fitzen-backend:latest $ECR_URI/fitzen-backend:$CODEBUILD_RESOLVED_SOURCE_VERSION
  post_build:
    commands:
      - docker push $ECR_URI/fitzen-backend:$CODEBUILD_RESOLVED_SOURCE_VERSION
```

## Cost Breakdown (Monthly Estimates)

### **Small Scale (1,000 users, 10,000 requests/day)**

| Service | Configuration | Monthly Cost |
|---------|--------------|--------------|
| **API Gateway** | 300K requests | $1.05 |
| **ECS Fargate** | 2 tasks × 24/7 | $30.00 |
| **DynamoDB** | 300K reads, 100K writes | $0.75 |
| **S3** | 10 GB storage, 50K requests | $0.40 |
| **CloudFront** | 20 GB transfer | $1.50 |
| **Bedrock** | 5M tokens input, 1M output | $30.00 |
| **Cognito** | 1K MAUs | Free |
| **SNS** | 10K push, 1K SMS | $10.95 |
| **Lambda** | 100K invocations | Free |
| **CloudWatch** | Standard logs/metrics | $5.00 |
| **Secrets Manager** | 5 secrets | $2.00 |
| **Route 53** | Hosted zone + queries | $0.50 |
| **WAF** | Basic rules | $5.00 |
| **TOTAL** | | **~$87/month** |

### **Medium Scale (10,000 users, 100,000 requests/day)**

| Service | Configuration | Monthly Cost |
|---------|--------------|--------------|
| **API Gateway** | 3M requests | $10.50 |
| **ECS Fargate** | 4 tasks × 24/7 | $60.00 |
| **RDS PostgreSQL** | db.t4g.small Multi-AZ | $60.00 |
| **DynamoDB** | 1M reads, 300K writes | $2.25 |
| **S3** | 100 GB storage, 500K requests | $3.80 |
| **CloudFront** | 200 GB transfer | $15.00 |
| **Bedrock** | 50M tokens input, 10M output | $300.00 |
| **Cognito** | 10K MAUs | $55.00 |
| **SNS** | 100K push, 10K SMS | $64.95 |
| **Lambda** | 1M invocations | $0.20 |
| **CloudWatch** | Enhanced monitoring | $20.00 |
| **Secrets Manager** | 5 secrets | $2.00 |
| **Route 53** | Hosted zone + queries | $1.00 |
| **WAF** | Advanced rules | $20.00 |
| **Backup** | RDS backups | $5.00 |
| **TOTAL** | | **~$620/month** |

### **Large Scale (100,000 users, 1M requests/day)**

| Service | Configuration | Monthly Cost |
|---------|--------------|--------------|
| **API Gateway** | 30M requests | $105.00 |
| **ECS Fargate** | 10 tasks × 24/7 | $150.00 |
| **RDS PostgreSQL** | db.r6g.large Multi-AZ | $450.00 |
| **DynamoDB** | 10M reads, 3M writes | $22.50 |
| **S3** | 1 TB storage, 5M requests | $28.00 |
| **CloudFront** | 2 TB transfer | $150.00 |
| **Bedrock** | 500M tokens input, 100M output | $3,000.00 |
| **Cognito** | 100K MAUs | $550.00 |
| **SNS** | 1M push, 100K SMS | $645.50 |
| **Lambda** | 10M invocations | $2.00 |
| **CloudWatch** | Full monitoring | $100.00 |
| **ElastiCache** | Redis (caching) | $45.00 |
| **Secrets Manager** | 5 secrets | $2.00 |
| **Route 53** | Hosted zone + queries | $5.00 |
| **WAF** | Advanced + Bot Control | $50.00 |
| **Backup** | RDS + S3 | $20.00 |
| **TOTAL** | | **~$5,325/month** |

## Cost Optimization Strategies

### 1. **Compute Optimization**
- Use **Spot Instances** for non-critical ECS tasks (70% savings)
- Implement **ECS Task auto-scaling** based on CPU/Memory
- Use **Fargate Spot** for batch processing
- Consider **AWS Savings Plans** (up to 72% discount)

### 2. **Storage Optimization**
- Use **S3 Intelligent-Tiering** for automatic cost optimization
- Implement **S3 Lifecycle policies** (Standard → Standard-IA → Glacier)
- Enable **DynamoDB On-Demand** for unpredictable workloads
- Use **RDS Reserved Instances** for predictable loads (60% savings)

### 3. **AI/ML Optimization**
- **Cache Bedrock responses** for common queries (CloudFront/ElastiCache)
- Implement **token usage limits** per user
- Use **prompt engineering** to reduce token consumption
- Consider **batch processing** for non-real-time AI tasks

### 4. **Network Optimization**
- Enable **API Gateway caching** (5-minute TTL for GET requests)
- Use **CloudFront** for all static assets
- Implement **compression** for API responses
- Use **VPC endpoints** to avoid NAT Gateway costs

### 5. **Monitoring Optimization**
- Set **CloudWatch Logs retention** to 7-30 days
- Use **metric filters** instead of storing all logs
- Implement **custom metrics** only where needed
- Use **AWS Cost Explorer** and **Budgets** for tracking

## Deployment Checklist

### Phase 1: Foundation (Week 1)
- [ ] Create AWS account and set up billing alerts
- [ ] Set up VPC with public/private subnets across 2 AZs
- [ ] Configure NAT Gateway and Internet Gateway
- [ ] Set up Route 53 hosted zone for domain
- [ ] Request ACM SSL certificate
- [ ] Create S3 buckets for storage
- [ ] Set up CloudWatch Log Groups

### Phase 2: Authentication & User Management (Week 2)
- [ ] Configure Amazon Cognito User Pool
- [ ] Set up Google OAuth integration
- [ ] Set up Apple Sign In integration
- [ ] Implement SMS OTP via SNS
- [ ] Create IAM roles and policies
- [ ] Set up Secrets Manager

### Phase 3: Database & Storage (Week 2)
- [ ] Provision RDS PostgreSQL or DynamoDB tables
- [ ] Migrate CSV storage to database
- [ ] Set up automated backups
- [ ] Create DynamoDB table for chat history
- [ ] Configure S3 bucket policies and CORS
- [ ] Set up S3 lifecycle policies

### Phase 4: Application Deployment (Week 3)
- [ ] Create Dockerfile for Flask backend
- [ ] Push Docker image to Amazon ECR
- [ ] Create ECS cluster and task definition
- [ ] Configure ECS service with ALB
- [ ] Set up auto-scaling policies
- [ ] Test health checks and deployments

### Phase 5: API Gateway & CDN (Week 3)
- [ ] Create API Gateway REST API
- [ ] Configure API Gateway endpoints
- [ ] Set up request validation and throttling
- [ ] Enable API Gateway caching
- [ ] Configure CloudFront distribution
- [ ] Set up WAF rules

### Phase 6: AI & Background Jobs (Week 4)
- [ ] Enable AWS Bedrock access
- [ ] Test Claude model integration
- [ ] Create Lambda functions for scheduled tasks
- [ ] Set up EventBridge rules
- [ ] Configure SNS topics and subscriptions
- [ ] Test notification delivery

### Phase 7: Monitoring & CI/CD (Week 4)
- [ ] Set up CloudWatch dashboards
- [ ] Configure CloudWatch alarms
- [ ] Enable AWS X-Ray tracing
- [ ] Create CodePipeline for backend
- [ ] Create CodePipeline for frontend (Expo)
- [ ] Test blue/green deployments

### Phase 8: Testing & Launch (Week 5)
- [ ] Perform load testing (Artillery, k6)
- [ ] Security audit (penetration testing)
- [ ] User acceptance testing
- [ ] Set up monitoring dashboards
- [ ] Configure backup and disaster recovery
- [ ] Soft launch to beta users

## Disaster Recovery & High Availability

### Recovery Point Objective (RPO): 1 hour
### Recovery Time Objective (RTO): 30 minutes

### Backup Strategy
```yaml
RDS PostgreSQL:
  Automated Backups: Daily, 7-day retention
  Manual Snapshots: Before major deployments
  Point-in-Time Recovery: Up to 35 days
  
DynamoDB:
  On-Demand Backups: Weekly
  Point-in-Time Recovery: 35 days
  
S3:
  Versioning: Enabled
  Cross-Region Replication: Optional for critical data
  
Application Code:
  GitHub/GitLab: Primary repository
  AWS CodeCommit: Mirror repository
```

### Multi-AZ Deployment
- ECS tasks across 2 availability zones
- RDS Multi-AZ deployment
- Application Load Balancer in 2+ AZs
- NAT Gateway in each AZ (optional for higher availability)

### Disaster Recovery Plan
1. **Automated Monitoring**: CloudWatch alarms trigger SNS notifications
2. **Automated Failover**: RDS Multi-AZ automatic failover (<2 minutes)
3. **Manual Recovery**: ECS tasks can be launched in different AZ
4. **Data Recovery**: Restore from latest RDS snapshot or DynamoDB backup
5. **Traffic Rerouting**: Update Route 53 records if necessary

## Scaling Strategy

### Horizontal Scaling
```yaml
ECS Auto-Scaling:
  Metric: CPU utilization
  Target: 70%
  Scale-out: Add 1 task every 60 seconds
  Scale-in: Remove 1 task every 300 seconds
  Min tasks: 2
  Max tasks: 20

API Gateway:
  Default limit: 10,000 requests/second
  Burst: 5,000 requests
  Can request increase: Up to 500K requests/second

DynamoDB:
  On-Demand: Automatic scaling
  Provisioned: Configure auto-scaling based on target utilization
```

### Vertical Scaling
```yaml
ECS Task Size:
  Start: 0.5 vCPU, 1 GB RAM
  Medium: 1 vCPU, 2 GB RAM
  Large: 2 vCPU, 4 GB RAM

RDS Instance:
  Start: db.t4g.micro (2 vCPU, 1 GB)
  Medium: db.t4g.small (2 vCPU, 2 GB)
  Large: db.r6g.large (2 vCPU, 16 GB)
```

### Caching Strategy
```yaml
API Gateway Cache:
  TTL: 5 minutes
  Endpoints: GET /users/{id}, GET /workouts/{id}

CloudFront Cache:
  Default TTL: 24 hours
  Static assets: 7 days
  Images: 30 days

ElastiCache Redis (Optional):
  Use case: Bedrock response caching
  Instance: cache.t4g.micro
  Cost: $12/month
```

## Security Best Practices

### 1. **Data Encryption**
- Encrypt all data at rest (S3, RDS, DynamoDB, EBS)
- Encrypt all data in transit (TLS 1.2+)
- Use AWS KMS for key management

### 2. **Access Control**
- Implement least privilege IAM policies
- Use IAM roles instead of access keys
- Enable MFA for root and admin accounts
- Rotate secrets regularly

### 3. **Network Security**
- Use VPC with private subnets for sensitive resources
- Configure security groups with minimal access
- Enable VPC Flow Logs for network monitoring
- Use AWS WAF to protect against common attacks

### 4. **Compliance**
- HIPAA compliance (if storing health data)
- GDPR compliance (for EU users)
- Data residency requirements
- Audit logging (CloudTrail)

### 5. **Vulnerability Management**
- Regular security audits
- Dependency scanning (Dependabot, Snyk)
- Container image scanning (ECR built-in)
- Penetration testing

## Alternative Architecture Options

### Option 1: Serverless-First (Ultra Low Cost)
```yaml
Compute: AWS Lambda (Python 3.13)
API: API Gateway HTTP API
Database: DynamoDB only
Storage: S3
AI: Bedrock
Auth: Cognito

Pros:
  - Pay only for actual usage
  - No idle costs
  - Auto-scaling built-in
  - Lower cost for low traffic

Cons:
  - Cold start latency (1-3 seconds)
  - Harder to debug
  - Complex for stateful operations
  - 15-minute Lambda timeout

Best for: Early stage, unpredictable traffic

Monthly cost (1,000 users): $20-40
```

### Option 2: Kubernetes (EKS) - Enterprise Scale
```yaml
Compute: Amazon EKS (Kubernetes)
Nodes: EC2 instances (t3.medium)
Database: Amazon Aurora PostgreSQL
Cache: ElastiCache Redis
Storage: S3 + EFS

Pros:
  - Full control over orchestration
  - Advanced deployment strategies
  - Multi-cloud portability
  - Rich ecosystem

Cons:
  - Higher complexity
  - Higher cost ($72/month for control plane)
  - Steeper learning curve
  - More operational overhead

Best for: Large enterprise, multi-service architecture

Monthly cost (10,000 users): $800-1,200
```

### Option 3: Hybrid (Recommended)
```yaml
Real-time API: ECS Fargate (Flask)
Background jobs: Lambda
Database: DynamoDB + RDS (hybrid)
Cache: ElastiCache Redis
Storage: S3
AI: Bedrock

Pros:
  - Best of both worlds
  - Cost-optimized
  - Flexible scaling
  - Good performance

Cons:
  - Slightly more complex
  - Need to manage both ECS and Lambda

Best for: Growing startup, balanced needs

Monthly cost (10,000 users): $500-700
```

## Monitoring Dashboard (CloudWatch)

```yaml
Dashboard: Fitzen Production Metrics

Widgets:
  1. API Performance
     - Request count (per minute)
     - Average latency
     - P99 latency
     - Error rate (4xx, 5xx)
  
  2. Application Health
     - ECS task count
     - CPU utilization
     - Memory utilization
     - Health check failures
  
  3. Database Metrics
     - DynamoDB throttles
     - RDS connections
     - Query latency
     - Storage usage
  
  4. AI Usage
     - Bedrock invocations
     - Token consumption
     - Error rate
     - Average response time
  
  5. User Activity
     - Active users (last hour)
     - New signups
     - Chat messages sent
     - API calls per endpoint
  
  6. Cost Tracking
     - Estimated daily cost
     - Cost by service
     - Budget alerts
     - Usage trends

Alarms:
  Critical:
    - API error rate > 5% for 5 minutes
    - All ECS tasks unhealthy
    - RDS CPU > 90% for 10 minutes
    - DynamoDB throttles > 100 in 5 minutes
  
  Warning:
    - API latency > 2 seconds (P95)
    - ECS CPU > 80% for 10 minutes
    - Daily cost > $100
    - Bedrock token usage > 10M/day
```

## Recommended Tech Stack Updates

### Backend Dependencies (requirements.txt)
```python
# Core
Flask==3.0.0
Flask-CORS==4.0.0
python-dotenv==1.0.0

# AWS SDK
boto3==1.36.0
botocore>=1.36.0,<1.36.4

# Database
psycopg2-binary==2.9.9  # For RDS PostgreSQL
boto3-dynamodb==0.5.1   # For DynamoDB

# ORM (if using PostgreSQL)
SQLAlchemy==2.0.23
alembic==1.13.0  # Database migrations

# Authentication
PyJWT==2.8.0
python-jose[cryptography]==3.3.0
bcrypt==4.1.1

# AWS Cognito
pycognito==2024.5.1

# Validation
marshmallow==3.20.1
python-dateutil==2.8.2

# Monitoring
aws-xray-sdk==2.12.1
watchtower==3.0.1  # CloudWatch Logs handler

# Performance
gunicorn==21.2.0  # Production WSGI server
gevent==23.9.1   # Async worker

# Testing
pytest==7.4.3
pytest-cov==4.1.0
pytest-mock==3.12.0
moto==4.2.9  # AWS service mocking

# Development
black==23.12.0
flake8==6.1.0
mypy==1.7.1
```

### Docker Configuration (Dockerfile)
```dockerfile
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create data directory
RUN mkdir -p /app/data

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:5001/health')"

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "4", "--worker-class", "gevent", "--timeout", "120", "app:create_app()"]
```

### Environment Variables (.env.example)
```bash
# Application
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key-from-secrets-manager

# API
API_HOST=0.0.0.0
API_PORT=5001
FRONTEND_URL=https://your-app.com

# AWS Configuration
AWS_REGION=us-east-1
AWS_DEFAULT_REGION=us-east-1

# AWS Bedrock
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0

# Database (RDS PostgreSQL)
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432
DB_NAME=fitzen_db
DB_USER=admin
DB_PASSWORD=stored-in-secrets-manager

# DynamoDB
DYNAMODB_REGION=us-east-1
DYNAMODB_ENDPOINT=https://dynamodb.us-east-1.amazonaws.com

# Storage
S3_BUCKET_PHOTOS=fitzen-progress-photos
S3_BUCKET_PROFILES=fitzen-profile-images
S3_REGION=us-east-1

# Authentication (Cognito)
COGNITO_USER_POOL_ID=us-east-1_XXXXX
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
COGNITO_REGION=us-east-1

# Notifications (SNS)
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:fitzen-notifications
SNS_REGION=us-east-1

# Monitoring
XRAY_ENABLED=True
LOG_LEVEL=INFO
```

## Next Steps

1. **Immediate Actions** (Week 1):
   - Set up AWS account and configure billing alerts
   - Choose database option (DynamoDB vs RDS)
   - Create development environment in AWS
   - Set up basic monitoring

2. **Short Term** (Month 1):
   - Migrate CSV storage to chosen database
   - Deploy backend to ECS Fargate
   - Set up CI/CD pipeline
   - Configure Cognito for authentication
   - Test Bedrock integration

3. **Medium Term** (Month 2-3):
   - Implement caching strategy
   - Set up comprehensive monitoring
   - Perform load testing
   - Optimize costs based on usage
   - Launch beta version

4. **Long Term** (Month 4+):
   - Implement advanced features
   - Scale based on user growth
   - Add multi-region support if needed
   - Optimize AI token usage
   - Continuous improvement

## Conclusion

This architecture provides:
- ✅ **Scalability**: Handle growth from 1K to 100K+ users
- ✅ **Reliability**: Multi-AZ deployment, automated backups
- ✅ **Cost-Effective**: Start at ~$87/month, scale as needed
- ✅ **Security**: Enterprise-grade security practices
- ✅ **Performance**: Single-digit ms latency for most operations
- ✅ **Maintainability**: Managed services reduce operational burden

The **recommended starting configuration**:
- **Compute**: ECS Fargate (2 tasks)
- **Database**: DynamoDB (On-Demand)
- **Storage**: S3 + CloudFront
- **AI**: AWS Bedrock (Claude 3.5 Sonnet)
- **Auth**: Amazon Cognito
- **Monitoring**: CloudWatch

**Estimated starting cost**: ~$87-150/month for 1,000 active users.

As you grow, you can seamlessly scale up to the medium or large configurations without major architectural changes.
