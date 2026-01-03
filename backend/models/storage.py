import pandas as pd
import os
from datetime import datetime
from config import Config


class CSVStorage:
    """Base class for CSV storage operations"""
    
    def __init__(self, filename):
        self.filepath = os.path.join(Config.DATA_DIR, filename)
        self._ensure_file_exists()
    
    def _ensure_file_exists(self):
        """Create file with headers if it doesn't exist"""
        if not os.path.exists(self.filepath):
            df = pd.DataFrame(columns=self.get_columns())
            df.to_csv(self.filepath, index=False)
    
    def get_columns(self):
        """Override in subclass to define columns"""
        return []
    
    def read_all(self):
        """Read all records"""
        try:
            df = pd.read_csv(self.filepath)
            return df.to_dict('records')
        except Exception as e:
            print(f"Error reading {self.filepath}: {e}")
            return []
    
    def read_by_id(self, id_column, id_value):
        """Read record by ID"""
        try:
            df = pd.read_csv(self.filepath)
            result = df[df[id_column] == id_value]
            if not result.empty:
                return result.iloc[0].to_dict()
            return None
        except Exception as e:
            print(f"Error reading {self.filepath}: {e}")
            return None
    
    def read_by_filter(self, **filters):
        """Read records by filter conditions"""
        try:
            df = pd.read_csv(self.filepath)
            for key, value in filters.items():
                df = df[df[key] == value]
            return df.to_dict('records')
        except Exception as e:
            print(f"Error reading {self.filepath}: {e}")
            return []
    
    def create(self, data):
        """Create a new record"""
        try:
            df = pd.read_csv(self.filepath)
            new_df = pd.DataFrame([data])
            df = pd.concat([df, new_df], ignore_index=True)
            df.to_csv(self.filepath, index=False)
            return True
        except Exception as e:
            print(f"Error creating record in {self.filepath}: {e}")
            return False
    
    def update(self, id_column, id_value, data):
        """Update a record"""
        try:
            df = pd.read_csv(self.filepath)
            mask = df[id_column] == id_value
            if mask.any():
                for key, value in data.items():
                    df.loc[mask, key] = value
                df.to_csv(self.filepath, index=False)
                return True
            return False
        except Exception as e:
            print(f"Error updating record in {self.filepath}: {e}")
            return False
    
    def delete(self, id_column, id_value):
        """Delete a record"""
        try:
            df = pd.read_csv(self.filepath)
            df = df[df[id_column] != id_value]
            df.to_csv(self.filepath, index=False)
            return True
        except Exception as e:
            print(f"Error deleting record from {self.filepath}: {e}")
            return False


class UsersStorage(CSVStorage):
    def __init__(self):
        super().__init__('users.csv')
    
    def get_columns(self):
        return ['id', 'name', 'email', 'phone', 'avatar', 'is_premium', 'created_at', 
                'onboarding_completed', 'coach_gender', 'coach_style']


class WorkoutsStorage(CSVStorage):
    def __init__(self):
        super().__init__('workouts.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'title', 'description', 'duration', 'calories', 
                'type', 'difficulty', 'completed_at', 'created_at']


class NutritionStorage(CSVStorage):
    def __init__(self):
        super().__init__('nutrition.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'meal_type', 'food_name', 'calories', 'protein', 
                'carbs', 'fats', 'logged_at', 'created_at']


class RecipesStorage(CSVStorage):
    def __init__(self):
        super().__init__('recipes.csv')
    
    def get_columns(self):
        return ['id', 'title', 'description', 'cuisine', 'prep_time', 'cook_time', 
                'servings', 'calories', 'protein', 'carbs', 'fats', 'ingredients', 
                'instructions', 'image_url', 'created_at']


class GoalsStorage(CSVStorage):
    def __init__(self):
        super().__init__('goals.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'title', 'description', 'type', 'target_value', 
                'current_value', 'unit', 'deadline', 'status', 'created_at', 'updated_at']


class MeasurementsStorage(CSVStorage):
    def __init__(self):
        super().__init__('measurements.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'weight', 'height', 'chest', 'waist', 'hips', 
                'arms', 'thighs', 'body_fat', 'bmi', 'measured_at', 'created_at']


class HabitsStorage(CSVStorage):
    def __init__(self):
        super().__init__('habits.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'habit_name', 'frequency', 'target_days', 
                'completed_days', 'streak', 'created_at', 'updated_at']


class RemindersStorage(CSVStorage):
    def __init__(self):
        super().__init__('reminders.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'title', 'description', 'reminder_type', 
                'scheduled_time', 'repeat', 'is_active', 'created_at']


class ChatHistoryStorage(CSVStorage):
    def __init__(self):
        super().__init__('chat_history.csv')
    
    def get_columns(self):
        return ['id', 'user_id', 'message', 'sender', 'response', 'created_at']
