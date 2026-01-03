import json
import boto3
from botocore.exceptions import ClientError
from config import Config


class BedrockService:
    """Service to interact with AWS Bedrock Claude model"""
    
    def __init__(self):
        self.client = boto3.client(
            service_name='bedrock-runtime',
            region_name=Config.AWS_REGION,
            aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
        )
        self.model_id = Config.BEDROCK_MODEL_ID
    
    def generate_response(self, prompt, system_prompt=None, max_tokens=2000):
        """Generate response from Claude model"""
        try:
            # Prepare messages
            messages = [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
            
            # Prepare request body
            body = {
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": max_tokens,
                "messages": messages
            }
            
            # Add system prompt if provided
            if system_prompt:
                body["system"] = system_prompt
            
            # Invoke model
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=json.dumps(body)
            )
            
            # Parse response
            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']
            
        except ClientError as e:
            print(f"Error calling Bedrock API: {e}")
            return f"I apologize, but I'm having trouble connecting right now. Please try again later."
        except Exception as e:
            print(f"Unexpected error: {e}")
            return "An unexpected error occurred. Please try again."
    
    def get_fitness_advice(self, user_context, question):
        """Get fitness advice based on user context and question"""
        system_prompt = """You are Fitzen AI Coach - an expert fitness and nutrition coach. 
You provide personalized, evidence-based advice on workouts, nutrition, and healthy lifestyle habits.
Be supportive, motivating, and specific in your recommendations.
Always consider the user's fitness level, goals, and any health conditions mentioned."""
        
        prompt = f"""User Context:
{json.dumps(user_context, indent=2)}

User Question: {question}

Please provide a helpful, personalized response considering the user's context."""
        
        return self.generate_response(prompt, system_prompt)
    
    def generate_workout_plan(self, user_profile):
        """Generate personalized workout plan"""
        system_prompt = """You are an expert fitness trainer creating personalized workout plans.
Provide structured, achievable workout plans tailored to the user's fitness level and goals."""
        
        prompt = f"""Create a weekly workout plan for:
- Fitness Level: {user_profile.get('fitness_level', 'Beginner')}
- Goal: {user_profile.get('goal', 'General fitness')}
- Available Days: {user_profile.get('days_per_week', 3)} days per week
- Equipment: {user_profile.get('equipment', 'Basic home equipment')}
- Duration: {user_profile.get('session_duration', '30-45 minutes')} per session

Please provide:
1. Weekly schedule with specific exercises
2. Sets, reps, and rest periods
3. Progression plan
4. Tips for success"""
        
        return self.generate_response(prompt, system_prompt, max_tokens=3000)
    
    def generate_meal_plan(self, user_profile):
        """Generate personalized meal plan"""
        system_prompt = """You are an expert nutritionist creating personalized meal plans.
Provide balanced, realistic meal plans considering dietary preferences and goals."""
        
        prompt = f"""Create a daily meal plan for:
- Goal: {user_profile.get('goal', 'General health')}
- Diet Type: {user_profile.get('diet_type', 'No restrictions')}
- Calories Target: {user_profile.get('calories', '2000')} kcal/day
- Protein Target: {user_profile.get('protein', '150')}g
- Meals per Day: {user_profile.get('meals_per_day', 3)}
- Food Allergies: {user_profile.get('allergies', 'None')}

Please provide:
1. Detailed meal breakdown with timing
2. Macros for each meal
3. Simple, practical recipes
4. Shopping list suggestions"""
        
        return self.generate_response(prompt, system_prompt, max_tokens=3000)
    
    def analyze_habits(self, habits_data):
        """Analyze user habits and provide insights"""
        system_prompt = """You are a wellness coach analyzing user habits.
Provide constructive insights and actionable recommendations."""
        
        prompt = f"""Analyze these user habits:
{json.dumps(habits_data, indent=2)}

Please provide:
1. Key patterns and trends
2. Areas of strength
3. Areas for improvement
4. Specific, actionable recommendations
5. Motivational insights"""
        
        return self.generate_response(prompt, system_prompt, max_tokens=2000)
    
    def generate_recipe_suggestions(self, preferences):
        """Generate recipe suggestions based on preferences"""
        system_prompt = """You are a creative chef providing healthy recipe suggestions.
Focus on nutritious, delicious, and easy-to-prepare meals."""
        
        prompt = f"""Suggest 3 healthy recipes for:
- Cuisine: {preferences.get('cuisine', 'Any')}
- Meal Type: {preferences.get('meal_type', 'Dinner')}
- Diet: {preferences.get('diet_type', 'No restrictions')}
- Prep Time: {preferences.get('prep_time', 'Under 30 minutes')}
- Calories per serving: Around {preferences.get('calories', '400-600')}

For each recipe, provide:
1. Recipe name
2. Ingredients list
3. Step-by-step instructions
4. Nutritional information (calories, protein, carbs, fats)
5. Prep and cook time"""
        
        return self.generate_response(prompt, system_prompt, max_tokens=3000)


# Create a singleton instance
bedrock_service = BedrockService()
