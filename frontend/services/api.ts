// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5001/api' 
  : 'https://your-production-api.com/api';

// Storage for auth token
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    headers?: Record<string, string>
  ) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      defaultHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Request failed');
      }

      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async sendOTP(phone: string) {
    return this.request('/auth/send-otp', 'POST', { phone });
  }

  async verifyOTP(phone: string, otp: string) {
    return this.request('/auth/verify-otp', 'POST', { phone, otp });
  }

  async googleSignIn(token: string, email: string, name: string, avatar?: string) {
    return this.request('/auth/google-signin', 'POST', { token, email, name, avatar });
  }

  async appleSignIn(token: string, email?: string, name?: string) {
    return this.request('/auth/apple-signin', 'POST', { token, email, name });
  }

  // Users
  async getUser(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId: string, data: any) {
    return this.request(`/users/${userId}`, 'PUT', data);
  }

  async completeOnboarding(userId: string, data: any) {
    return this.request(`/users/${userId}/onboarding`, 'POST', data);
  }

  async upgradeToPremium(userId: string) {
    return this.request(`/users/${userId}/premium`, 'POST');
  }

  // Chat
  async sendChatMessage(userId: string, message: string, userContext?: any) {
    return this.request('/chat/message', 'POST', { user_id: userId, message, user_context: userContext });
  }

  async getChatHistory(userId: string) {
    return this.request(`/chat/history/${userId}`);
  }

  async clearChatHistory(userId: string) {
    return this.request(`/chat/clear/${userId}`, 'DELETE');
  }

  // Workouts
  async getWorkouts(userId: string) {
    return this.request(`/workouts/${userId}`);
  }

  async createWorkout(data: any) {
    return this.request('/workouts', 'POST', data);
  }

  async updateWorkout(workoutId: string, data: any) {
    return this.request(`/workouts/${workoutId}`, 'PUT', data);
  }

  async deleteWorkout(workoutId: string) {
    return this.request(`/workouts/${workoutId}`, 'DELETE');
  }

  async generateWorkoutPlan(userProfile: any) {
    return this.request('/workouts/generate-plan', 'POST', { user_profile: userProfile });
  }

  async getWorkoutStats(userId: string) {
    return this.request(`/workouts/stats/${userId}`);
  }

  // Nutrition
  async getNutritionLogs(userId: string) {
    return this.request(`/nutrition/log/${userId}`);
  }

  async logNutrition(data: any) {
    return this.request('/nutrition/log', 'POST', data);
  }

  async deleteNutritionLog(logId: string) {
    return this.request(`/nutrition/log/${logId}`, 'DELETE');
  }

  async getDailySummary(userId: string, date?: string) {
    const dateParam = date ? `?date=${date}` : '';
    return this.request(`/nutrition/daily-summary/${userId}${dateParam}`);
  }

  async generateMealPlan(userProfile: any) {
    return this.request('/nutrition/generate-meal-plan', 'POST', { user_profile: userProfile });
  }

  async getRecipes(cuisine?: string, mealType?: string) {
    const params = new URLSearchParams();
    if (cuisine) params.append('cuisine', cuisine);
    if (mealType) params.append('meal_type', mealType);
    const queryString = params.toString();
    return this.request(`/nutrition/recipes${queryString ? '?' + queryString : ''}`);
  }

  async getRecipe(recipeId: string) {
    return this.request(`/nutrition/recipes/${recipeId}`);
  }

  async suggestRecipes(preferences: any) {
    return this.request('/nutrition/recipes/suggest', 'POST', { preferences });
  }

  // Goals
  async getGoals(userId: string, status?: string) {
    const statusParam = status ? `?status=${status}` : '';
    return this.request(`/goals/${userId}${statusParam}`);
  }

  async createGoal(data: any) {
    return this.request('/goals', 'POST', data);
  }

  async updateGoal(goalId: string, data: any) {
    return this.request(`/goals/${goalId}`, 'PUT', data);
  }

  async deleteGoal(goalId: string) {
    return this.request(`/goals/${goalId}`, 'DELETE');
  }

  async updateGoalProgress(goalId: string, currentValue: number) {
    return this.request(`/goals/${goalId}/progress`, 'POST', { current_value: currentValue });
  }

  // Measurements
  async getMeasurements(userId: string) {
    return this.request(`/measurements/${userId}`);
  }

  async addMeasurement(data: any) {
    return this.request('/measurements', 'POST', data);
  }

  async updateMeasurement(measurementId: string, data: any) {
    return this.request(`/measurements/${measurementId}`, 'PUT', data);
  }

  async deleteMeasurement(measurementId: string) {
    return this.request(`/measurements/${measurementId}`, 'DELETE');
  }

  async getLatestMeasurement(userId: string) {
    return this.request(`/measurements/latest/${userId}`);
  }

  async getMeasurementProgress(userId: string) {
    return this.request(`/measurements/progress/${userId}`);
  }

  // Habits
  async getHabits(userId: string) {
    return this.request(`/habits/${userId}`);
  }

  async createHabit(data: any) {
    return this.request('/habits', 'POST', data);
  }

  async updateHabit(habitId: string, data: any) {
    return this.request(`/habits/${habitId}`, 'PUT', data);
  }

  async deleteHabit(habitId: string) {
    return this.request(`/habits/${habitId}`, 'DELETE');
  }

  async completeHabit(habitId: string) {
    return this.request(`/habits/${habitId}/complete`, 'POST');
  }

  async skipHabit(habitId: string) {
    return this.request(`/habits/${habitId}/skip`, 'POST');
  }

  async analyzeHabits(userId: string) {
    return this.request(`/habits/analyze/${userId}`);
  }

  // Reminders
  async getReminders(userId: string, isActive?: boolean) {
    const activeParam = isActive !== undefined ? `?is_active=${isActive}` : '';
    return this.request(`/reminders/${userId}${activeParam}`);
  }

  async createReminder(data: any) {
    return this.request('/reminders', 'POST', data);
  }

  async updateReminder(reminderId: string, data: any) {
    return this.request(`/reminders/${reminderId}`, 'PUT', data);
  }

  async deleteReminder(reminderId: string) {
    return this.request(`/reminders/${reminderId}`, 'DELETE');
  }

  async toggleReminder(reminderId: string) {
    return this.request(`/reminders/${reminderId}/toggle`, 'POST');
  }

  async getUpcomingReminders(userId: string) {
    return this.request(`/reminders/upcoming/${userId}`);
  }
}

// Export API client instance
export const api = new ApiClient(API_BASE_URL);
export default api;
