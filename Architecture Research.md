**F**ii**tzen** **AI** **Coach** **-** **Opt**ii**m**ii**zed** **AWS**
**Arch**ii**tecture**

> **Execut**ii**ve** **Summary**
>
> This document outlines a production-ready, cost-optimized AWS
> architecture for the Fitzen AI Coach application, a mobile fitness
> coaching app with AI-powered chat, workout tracking, nutrition
> planning, and habit monitoring.
>
> **Arch**ii**tecture** **Overv**ii**ew**
>
> ┌─────────────────────────────────────────────────────────────────────────┐
> │ MOBILE APP (React Native + Expo) │ │ iOS & Android via Expo Go / EAS
> Build │
> └────────────────────────────────┬────────────────────────────────────────┘
>
> │ HTTPS ▼
>
> ┌─────────────────────────────────────────────────────────────────────────┐
> │ AWS CLOUDFRONT CDN │ │ (Global Edge Locations, SSL/TLS) │
> └────────────────────────────────┬────────────────────────────────────────┘
>
> │ ▼
>
> ┌─────────────────────────────────────────────────────────────────────────┐
> │ AWS API GATEWAY (REST API) │ │ • Request validation & throttling │ │
> • API key management │ │ • CORS configuration │ │ • Request/Response
> transformation │
> └────────────────────────────────┬────────────────────────────────────────┘
>
> │ ▼
>
> ┌─────────────────────────────────────────────────────────────────────────┐
> │ APPLICATION LAYER (AWS ECS Fargate) │ │ │ │
> ┌─────────────────────────────────────────────────────────────────┐ │
>
> │ │ Flask Backend (Python 3.13) │ │ │ │ │ │ │ │ Routes: /auth /users
> /chat /workouts /nutrition │ │
>
> │ │ /goals /habits /measurements /reminders │ │ │ │ │ │ │ │
> Auto-scaling: 2-10 tasks based on CPU/Memory │ │ │
> └─────────────────────────────────────────────────────────────────┘ │
>
> │ │ │ Application Load Balancer (ALB) │ │ • Health checks │ │ • SSL
> termination │ │ • Path-based routing │
> └──────────────┬───────────────────────────────┬───────────────────────────┘
>
> │ ▼
>
> ┌──────────────────────────────┐
>
> │ ▼

┌──────────────────────────────┐

> │ AWS BEDROCK
>
> │

│ │ DATA LAYER │

│ │ │

> │ • Claude 3.5 Sonnet │ │ ┌────────────────────────┐ │
>
> │ (AI Chat & Coaching) │ • Pay-per-use pricing
>
> │ • No infrastructure mgmt
>
> │

│ │ │ Amazon RDS │ │ │ │ │ PostgreSQL │ │ │ │ │ │ │

│ │ │ • Multi-AZ │ │

> └──────────────────────────────┘ │ │
>
> │ │

• Automated backups │ │

• Read replicas │ │

> │ └────────────────────────┘ │ │ │ │ ┌────────────────────────┐ │ │ │
> Amazon DynamoDB │ │ │ │ (Chat History) │ │
>
> │ │ (Chat History) │ │ │ │ │ │ │ │ • On-Demand pricing │ │ │ │ •
> Single-digit ms │ │ │ │ • Auto-scaling │ │ │
> └────────────────────────┘ │ │ │ │ ┌────────────────────────┐ │ │ │
> Amazon S3 │ │ │ │ (Progress Photos) │ │ │ │ │ │ │ │ • Standard-IA tier
> │ │ │ │ • Lifecycle policies │ │ │ │ • CloudFront CDN │ │ │
> └────────────────────────┘ │ └──────────────────────────────┘
>
> ┌─────────────────────────────────────────────────────────────────────────┐
> │ SUPPORTING SERVICES │
> ├─────────────────────────────────────────────────────────────────────────┤
> │ │ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
>
> │ │ Amazon Cognito │ │ │ │ │ │ • User pools │ │ │ • Social login │
>
> │ │ • MFA │

│ Amazon SNS │ │ │ │ • Push notifs │ │ • SMS OTP │

│ • Email alerts │

│ AWS Secrets │ │ │ Manager │ │ │ │ │ │ • API keys │ │

│ • DB creds │ │

> │ └──────────────────┘ │
>
> │ ┌──────────────────┐

└──────────────────┘

┌──────────────────┐

└──────────────────┘ │

> │

┌──────────────────┐ │

> │ │ CloudWatch │ │
>
> │ │ • Logs
>
> │ │ • Metrics

│ │ AWS Lambda │ │

│ │ • Scheduled

│ │ tasks

│ │ AWS WAF │ │ │ │ │ │ │ │ • DDoS protect │ │

│ │ • Bot control │ │

> │ │ • Alarms │ │ • Event-driven │ │ • Rate limiting │ │ │
> └──────────────────┘ └──────────────────┘ └──────────────────┘ │
>
> └─────────────────────────────────────────────────────────────────────────┘

**Deta**iill**ed** **Component** **Arch**ii**tecture**

**1**.. **Frontend** **D**ii**str**ii**but**ii**on**

> **Se**rr**v**ii**ce**: AWS Amplify Hosting (for web version) / Expo
> EAS **Pu**rr**pose**: Deploy and host React Native web builds
> **Fea**tt**u**rr**es**:
>
> Continuous deployment from Git Global CDN distribution
>
> SSL certificates Preview deployments

**2**.. **AP**II **Gateway**

> **Se**rr**v**ii**ce**: Amazon API Gateway (REST API)
> **Con**ffii**gu**rr**a**ttii**on**:

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

> **Th**rr**o**ttttllii**ng**: 10,000 requests/second with burst 5,000
> **Cach**ii**ng**: Enable for GET endpoints (5 minutes TTL) **Cos**tt:
> ~\$3.50 per million API calls

**3**.. **Compute** **Layer** -- **AWS** **ECS** **Fargate**

> **Why** **Fa**rr**ga**tt**e** **ove**rr **Lambda?**
>
> Flask app requires consistent runtime Complex AI interactions with
> Bedrock Better for stateful connections
>
> Cost-effective for consistent traffic
>
> **Con**ffii**gu**rr**a**ttii**on**:

||
||
||
||
||
||
||
||
||
||
||
||
||

> **Dep**ll**oymen**tt: Blue/Green deployment via CodeDeploy
>
> **Cos**tt: ~\$30-150/month (depending on scale)

**4**.. **Database** **Layer**

**Op**ttii**on** **A**:: **Amazon** **RDS** **Pos**tt**g**rr**eSQL**
((**Recommended** ff**o**rr **P**rr**oduc**ttii**on**))

||
||
||
||
||
||
||

||
||
||
||
||
||
||
||
||
||

> Cost: ~\$25-40/month (t4g.micro Multi-AZ)

**M**ii**g**rr**a**ttii**on** **Pa**tt**h**: Convert CSV storage to
PostgreSQL using SQLAlchemy ORM

**Op**ttii**on** **B**:: **Amazon** **DynamoDB**
((**Cos**tt--**Op**ttii**m**ii**zed**))

||
||
||
||
||
||
||
||
||
||
||

||
||
||
||
||
||
||

> Cost: ~\$1-10/month for small scale (\<1M requests)

**Recommenda**ttii**on**: Start with**DynamoDB** for cost optimization,
migrate to **RDS** if complex queries are needed.

**5**.. **Chat** **H**ii**story** **Storage**

> **Se**rr**v**ii**ce**: Amazon DynamoDB **Tab**ll**e**: ChatHistory

||
||
||
||
||

> **TTL**: Auto-delete messages older than 90 days **Cos**tt:
> ~\$0.25-1/month

**6**.. **F**iill**e** **Storage** -- **Amazon** **S3**

> **Bucke**tt**s**:

||
||
||
||
||
||

> fitzen-profile-images/ {user_id}/avatar.jpg

||
||
||
||

> **Con**ffii**gu**rr**a**ttii**on**:
>
> Encryption: AES-256 (S3-managed keys) Lifecycle: Move to S3
> Standard-IA after 90 days CloudFront CDN for fast delivery
>
> Signed URLs for secure access
>
> **Cos**tt: ~\$0.023/GB/month + \$0.005/1000 requests

**7**.. **A**II**/ML** -- **AWS** **Bedrock**

> **Mode**ll: Claude 3.5 Sonnet
> (anthropic.claude-3-5-sonnet-20241022-v2:0)
>
> **Use** **Cases**:
>
> Personalized fitness coaching Workout plan generation
>
> Meal plan creation
>
> Habit analysis and recommendations Recipe suggestions
>
> **P**rrii**c**ii**ng**:
>
> Input: \$3.00 per 1M tokens Output: \$15.00 per 1M tokens
>
> Average conversation: ~\$0.02-0.05
>
> **Op**ttii**m**ii**za**ttii**on**:
>
> Cache system prompts
>
> Limit max_tokens to 2000-3000 Implement rate limiting per user Use
> streaming for better UX

**8**.. **Authent**ii**cat**ii**on** -- **Amazon** **Cogn**ii**to**

> **Use**rr **Poo**ll:

||
||
||
||
||
||

> MFA: Optional SMS/TOTP

||
||
||
||
||

||
||
||
||
||
||

> **Cos**tt: Free tier (50,000 MAUs), then \$0.0055/MAU

**9**.. **Not**ii**f**ii**cat**ii**ons** -- **Amazon** **SNS**

> **Top**ii**cs**:
>
> fitzen-reminders (workout/meal reminders) fitzen-achievements
> (milestone notifications) fitzen-alerts (system alerts)
>
> **Channe**ll**s**:
>
> Push notifications (via Expo Push API) SMS (OTP and reminders)
>
> Email (reports, updates)
>
> **Cos**tt:
>
> Push: \$0.50 per 1M notifications SMS: \$0.00645 per message (US)

**10**.. **Background** **Jobs** -- **AWS** **Lambda**

> **Func**ttii**ons**:

||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||
||

> **Cos**tt: Free tier (1M requests/month), then \$0.20 per 1M

**11**.. **Mon**ii**tor**ii**ng** **&** **Logg**ii**ng**

**C**ll**oudWa**tt**ch** **Logs**

||
||
||
||
||
||

||
||
||
||

**C**ll**oudWa**tt**ch** **Me**ttrrii**cs** **&** **A**ll**a**rr**ms**

||
||
||
||
||
||
||
||

||
||
||
||
||
||
||

> Actions: SNS notifications to DevOps team

**AWS** **X**--**Ray**

> Distributed tracing for API requests Performance bottleneck
> identification Error analysis

**12**.. **Secur**ii**ty**

**AWS** **WAF** ((**Web** **App**llii**ca**ttii**on**
**F**iirr**ewa**llll))

||
||
||
||
||
||
||
||
||
||

**AWS** **Sec**rr**e**tt**s** **Manage**rr

||
||
||
||
||
||
||
||
||
||
||

II**AM** **Ro**ll**es** **&** **Po**llii**c**ii**es**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**VPC** **Secu**rriitt**y**

||
||
||
||
||

||
||
||
||
||
||
||
||
||

**13**.. **C**II**/CD** **P**ii**pe**llii**ne**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**bu**iill**dspec**..**ym**ll:

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**Cost** **Breakdown** **(Month**ll**y** **Est**ii**mates)**

**Sma**llll **Sca**ll**e** **(1**,,**000** **users**,, **10**,,**000**
**requests/day)**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**Med**ii**um** **Sca**ll**e** **(10**,,**000** **users**,,
**100**,,**000** **requests/day)**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

> **Se**rr**v**ii**ce** **Con**ffii**gu**rr**a**ttii**on**
> **Mon**tt**h**ll**y** **Cos**tt

**Large** **Sca**ll**e** **(100**,,**000** **users**,, **1M**
**requests/day)**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**Cost** **Opt**ii**m**ii**zat**ii**on** **Strateg**ii**es**

**1**.. **Compute** **Opt**ii**m**ii**zat**ii**on**

> Use**Spo**tt II**ns**tt**ances** for non-critical ECS tasks (70%
> savings) Implement **ECS** **Task** **au**tt**o**--**sca**llii**ng**
> based on CPU/Memory Use**Fa**rr**ga**tt**e** **Spo**tt for batch
> processing
>
> Consider **AWS** **Sav**ii**ngs** **P**ll**ans** (up to 72% discount)

**2**.. **Storage** **Opt**ii**m**ii**zat**ii**on**

> Use**S3** II**n**tt**e**llllii**gen**tt--**T**ii**e**rrii**ng** for
> automatic cost optimization Implement **S3** **L**iiff**ecyc**ll**e**
> **po**llii**c**ii**es** (Standard → Standard-IA → Glacier) Enable
> **DynamoDB** **On**--**Demand** for unpredictable workloads Use**RDS**
> **Rese**rr**ved** II**ns**tt**ances** for predictable loads (60%
> savings)

**3**.. **A**II**/ML** **Opt**ii**m**ii**zat**ii**on**

> **Cache** **Bed**rr**ock** rr**esponses** for common queries
> (CloudFront/ElastiCache) Implement tt**oken** **usage**
> llii**m**iitt**s** per user
>
> Use**p**rr**omp**tt **eng**ii**nee**rrii**ng** to reduce token
> consumption Consider **ba**tt**ch** **p**rr**ocess**ii**ng** for
> non-real-time AI tasks

**4**.. **Network** **Opt**ii**m**ii**zat**ii**on**

> Enable **AP**II **Ga**tt**eway** **cach**ii**ng** (5-minute TTL for
> GET requests)
>
> Use**C**ll**oudF**rr**on**tt for all static assets Implement
> **comp**rr**ess**ii**on** for API responses
>
> Use**VPC** **endpo**ii**n**tt**s** to avoid NAT Gateway costs

**5**.. **Mon**ii**tor**ii**ng** **Opt**ii**m**ii**zat**ii**on**

> Set**C**ll**oudWa**tt**ch** **Logs** rr**e**tt**en**ttii**on** to 7-30
> days Use**me**ttrrii**c** ffiilltt**e**rr**s** instead of storing all
> logs Implement **cus**tt**om** **me**ttrrii**cs** only where needed
> Use**AWS** **Cos**tt **Exp**ll**o**rr**e**rr and **Budge**tt**s** for
> tracking

**Dep**ll**oyment** **Check**llii**st**

**Phase** **1**:: **Foundat**ii**on** **(Week** **1)**

> Create AWS account and set up billing alerts
>
> Set up VPC with public/private subnets across 2 AZs Configure NAT
> Gateway and Internet Gateway
>
> Set up Route 53 hosted zone for domain Request ACM SSL certificate
>
> Create S3 buckets for storage Set up CloudWatch Log Groups

**Phase** **2**:: **Authent**ii**cat**ii**on** **&** **User**
**Management** **(Week** **2)**

> Configure Amazon Cognito User Pool Set up Google OAuth integration
>
> Set up Apple Sign In integration Implement SMS OTP via SNS Create IAM
> roles and policies Set up Secrets Manager

**Phase** **3**:: **Database** **&** **Storage** **(Week** **2)**

> Provision RDS PostgreSQL or DynamoDB tables Migrate CSV storage to
> database
>
> Set up automated backups
>
> Create DynamoDB table for chat history Configure S3 bucket policies
> and CORS Set up S3 lifecycle policies

**Phase** **4**:: **App**llii**cat**ii**on** **Dep**ll**oyment**
**(Week** **3)**

> Create Dockerfile for Flask backend Push Docker image to Amazon ECR
> Create ECS cluster and task definition Configure ECS service with ALB
>
> Set up auto-scaling policies
>
> Test health checks and deployments

**Phase** **5**:: **AP**II **Gateway** **&** **CDN** **(Week** **3)**

> Create API Gateway REST API Configure API Gateway endpoints
>
> Set up request validation and throttling Enable API Gateway caching
> Configure CloudFront distribution
>
> Set up WAF rules

**Phase** **6**:: **A**II **&** **Background** **Jobs** **(Week** **4)**

> Enable AWS Bedrock access Test Claude model integration
>
> Create Lambda functions for scheduled tasks Set up EventBridge rules
>
> Configure SNS topics and subscriptions Test notification delivery

**Phase** **7**:: **Mon**ii**tor**ii**ng** **&** **C**II**/CD**
**(Week** **4)**

> Set up CloudWatch dashboards Configure CloudWatch alarms Enable AWS
> X-Ray tracing Create CodePipeline for backend
>
> Create CodePipeline for frontend (Expo) Test blue/green deployments

**Phase** **8**:: **Test**ii**ng** **&** **Launch** **(Week** **5)**

> Perform load testing (Artillery, k6) Security audit (penetration
> testing) User acceptance testing
>
> Set up monitoring dashboards Configure backup and disaster recovery
> Soft launch to beta users

**D**ii**saster** **Recovery** **&** **H**ii**gh**
**Ava**iill**ab**iillii**ty**

**Recovery** **Po**ii**nt** **Ob**jj**ect**ii**ve** **(RPO)**:: **1**
**hour**

**Recovery** **T**ii**me** **Ob**jj**ect**ii**ve** **(RTO)**:: **30**
**m**ii**nutes**

**Backup** **Strategy**

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

**Mu**ll**t**ii--**AZ** **Dep**ll**oyment**

> ECS tasks across 2 availability zones RDS Multi-AZ deployment
> Application Load Balancer in 2+ AZs
>
> NAT Gateway in each AZ (optional for higher availability)

**D**ii**saster** **Recovery** **P**ll**an**

> 1\. **Au**tt**oma**tt**ed** **Mon**iitt**o**rrii**ng**: CloudWatch
> alarms trigger SNS notifications 2. **Au**tt**oma**tt**ed**
> **Fa**iill**ove**rr: RDS Multi-AZ automatic failover (\<2 minutes)
>
> 3\. **Manua**ll **Recove**rr**y**: ECS tasks can be launched in
> different AZ
>
> 4\. **Da**tt**a** **Recove**rr**y**: Restore from latest RDS snapshot
> or DynamoDB backup 5. **T**rr**a**ffffii**c**
> **Re**rr**ou**ttii**ng**: Update Route 53 records if necessary

**Sca**llii**ng** **Strategy**

**Hor**ii**zonta**ll **Sca**llii**ng**

||
||
||
||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||

**Vert**ii**ca**ll **Sca**llii**ng**

||
||
||
||
||
||

||
||
||
||
||

**Cach**ii**ng** **Strategy**

||
||
||
||
||

||
||
||
||
||

||
||
||
||
||
||

**Secur**ii**ty** **Best** **Pract**ii**ces**

**1**.. **Data** **Encrypt**ii**on**

> Encrypt all data at rest (S3, RDS, DynamoDB, EBS) Encrypt all data in
> transit (TLS 1.2+)
>
> Use AWS KMS for key management

**2**.. **Access** **Contro**ll

> Implement least privilege IAM policies Use IAM roles instead of access
> keys Enable MFA for root and admin accounts Rotate secrets regularly

**3**.. **Network** **Secur**ii**ty**

> Use VPC with private subnets for sensitive resources Configure
> security groups with minimal access
>
> Enable VPC Flow Logs for network monitoring Use AWS WAF to protect
> against common attacks

**4**.. **Comp**llii**ance**

> HIPAA compliance (if storing health data) GDPR compliance (for EU
> users)
>
> Data residency requirements Audit logging (CloudTrail)

**5**.. **Vu**ll**nerab**iillii**ty** **Management**

> Regular security audits
>
> Dependency scanning (Dependabot, Snyk) Container image scanning (ECR
> built-in) Penetration testing

**A**ll**ternat**ii**ve** **Arch**ii**tecture** **Opt**ii**ons**

**Opt**ii**on** **1**:: **Server**ll**ess**--**F**ii**rst**
**(U**ll**tra** **Low** **Cost)**

||
||
||
||
||
||
||

||
||
||
||
||
||
||

||
||
||
||
||
||
||

> Best for: Early stage, unpredictable traffic
>
> Monthly cost (1,000 users): \$20-40

**Opt**ii**on** **2**:: **Kubernetes** **(EKS)** -- **Enterpr**ii**se**
**Sca**ll**e**

||
||
||
||
||
||

||
||
||
||
||
||
||

||
||
||
||
||
||
||

> Best for: Large enterprise, multi-service architecture
>
> Monthly cost (10,000 users): \$800-1,200

**Opt**ii**on** **3**:: **Hybr**ii**d** **(Recommended)**

||
||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||

> Best for: Growing startup, balanced needs
>
> Monthly cost (10,000 users): \$500-700

**Mon**ii**tor**ii**ng** **Dashboard** **(C**ll**oudWatch)**

> Dashboard: Fitzen Production Metrics

||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||
||

||
||
||
||
||
||
||
||
||
||
||
||
||
||

**Recommended** **Tech** **Stack** **Updates**

**Backend** **Dependenc**ii**es** **(requ**ii**rements**..**txt)**

||
||
||
||
||
||

||
||
||
||
||

||
||
||
||
||

||
||
||
||
||

||
||
||
||
||
||

||
||
||
||

||
||
||
||
||

||
||
||
||
||

||
||
||
||
||

||
||
||
||
||
||
||

||
||
||
||
||
||

**Docker** **Conf**ii**gurat**ii**on** **(Dockerf**iill**e)**

> FROM python:3.13-slim

||
||
||
||

||
||
||
||
||
||
||

||
||
||
||

||
||
||
||

||
||
||
||

||
||
||
||

||
||
||
||

||
||
||
||
||

||
||
||
||

**Env**ii**ronment** **Var**ii**ab**ll**es**
**(**..**env**..**examp**ll**e)**

||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||

||
||
||
||

||
||
||
||
||
||
||
||

||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||
||

||
||
||
||
||

||
||
||
||
||

**Next** **Steps**

> 1\. II**mmed**ii**a**tt**e** **Ac**ttii**ons** (Week 1):
>
> Set up AWS account and configure billing alerts Choose database option
> (DynamoDB vs RDS) Create development environment in AWS
>
> Set up basic monitoring
>
> 2\. **Sho**rrtt **Te**rr**m** (Month 1):
>
> Migrate CSV storage to chosen database Deploy backend to ECS Fargate
>
> Set up CI/CD pipeline
>
> Configure Cognito for authentication Test Bedrock integration
>
> 3\. **Med**ii**um** **Te**rr**m** (Month 2-3):
>
> Implement caching strategy
>
> Set up comprehensive monitoring Perform load testing
>
> Optimize costs based on usage Launch beta version
>
> 4\. **Long** **Te**rr**m** (Month 4+):
>
> Implement advanced features Scale based on user growth
>
> Add multi-region support if needed Optimize AI token usage Continuous
> improvement

**Conc**ll**us**ii**on**

> This architecture provides:
>
> **Sca**ll**ab**iilliitt**y**: Handle growth from 1K to 100K+ users
>
> **Re**llii**ab**iilliitt**y**: Multi-AZ deployment, automated backups
>
> **Cos**tt--**E**ffff**ec**ttii**ve**: Start at ~\$87/month, scale as
> needed
>
> **Secu**rriitt**y**: Enterprise-grade security practices
>
> **Pe**rrff**o**rr**mance**: Single-digit ms latency for most
> operations
>
> **Ma**ii**n**tt**a**ii**nab**iilliitt**y**: Managed services reduce
> operational burden
>
> The rr**ecommended** **s**tt**a**rrttii**ng**
> **con**ffii**gu**rr**a**ttii**on**:
>
> **Compu**tt**e**: ECS Fargate (2 tasks) **Da**tt**abase**: DynamoDB
> (On-Demand) **S**tt**o**rr**age**: S3 + CloudFront
>
> **A**II: AWS Bedrock (Claude 3.5 Sonnet) **Au**tt**h**: Amazon Cognito
>
> **Mon**iitt**o**rrii**ng**: CloudWatch

**Es**ttii**ma**tt**ed** **s**tt**a**rrttii**ng** **cos**tt:
~\$87-150/month for 1,000 active users.

> As you grow, you can seamlessly scale up to the medium or large
> configurations without major architectural changes.
