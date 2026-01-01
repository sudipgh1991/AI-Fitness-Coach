export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  fitnessGoal?: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
  targetWeight?: number;
  currentWeight?: number;
  height?: number;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  isPremium: boolean;
  createdAt: string;
}

export interface ActivityData {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  type: 'cardio' | 'strength' | 'yoga' | 'sports' | 'other';
  name: string;
  duration: number;
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface NutritionLog {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'netbanking';
  displayName: string;
  details?: string;
}
