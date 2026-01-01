# Development Guide

## Architecture Overview

This app follows a modern React Native architecture with:
- **Context API** for state management
- **Component-based** architecture
- **TypeScript** for type safety
- **Functional components** with hooks

## State Management

### ThemeContext
Manages app theme (light/dark/system):
```typescript
const { colors, theme, setTheme, isDark } = useTheme();
```

### AuthContext
Manages user authentication:
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

## API Integration Guide

### Creating API Services

Create `/services/apiClient.ts`:
```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Example: Activity Service

Create `/services/activityService.ts`:
```typescript
import apiClient from './apiClient';
import { ActivityData } from '../types';

export const activityService = {
  getTodayActivity: async (): Promise<ActivityData> => {
    const response = await apiClient.get('/activity/today');
    return response.data;
  },

  logWorkout: async (workout: any) => {
    const response = await apiClient.post('/activity/workout', workout);
    return response.data;
  },

  getWeeklyStats: async () => {
    const response = await apiClient.get('/activity/weekly');
    return response.data;
  },
};
```

### Example: Chat Service

Create `/services/chatService.ts`:
```typescript
import apiClient from './apiClient';
import { ChatMessage } from '../types';

export const chatService = {
  sendMessage: async (message: string): Promise<ChatMessage> => {
    const response = await apiClient.post('/chat/message', {
      message,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },

  getChatHistory: async (): Promise<ChatMessage[]> => {
    const response = await apiClient.get('/chat/history');
    return response.data;
  },
};
```

## Custom Hooks

### useApi Hook

Create `/hooks/useApi.ts`:
```typescript
import { useState, useEffect } from 'react';

export function useApi<T>(apiFunc: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunc();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Usage in component:
// const { data, loading, error } = useApi(() => activityService.getTodayActivity());
```

### useDebounce Hook

Create `/hooks/useDebounce.ts`:
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## Utils

### Date Formatting

Create `/utils/dateFormatter.ts`:
```typescript
import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatTime = (date: string | Date) => {
  return format(new Date(date), 'hh:mm a');
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
```

### Validation Utils

Create `/utils/validation.ts`:
```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateUPI = (upiId: string): boolean => {
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
  return upiRegex.test(upiId);
};
```

## Testing

### Unit Testing Setup

Install testing libraries:
```bash
npm install --save-dev @testing-library/react-native jest
```

Create `__tests__/Button.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../components/Button';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Button title="Test Button" onPress={() => {}} />
      </ThemeProvider>
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <Button title="Test Button" onPress={onPressMock} />
      </ThemeProvider>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimization

### Memoization

```typescript
import React, { memo, useMemo, useCallback } from 'react';

// Memoize expensive computations
const expensiveCalculation = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handlePress = useCallback(() => {
  doSomething();
}, [dependencies]);

// Memoize components
export const ExpensiveComponent = memo(({ data }) => {
  return <View>{/* render */}</View>;
});
```

### List Optimization

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  // Optimize performance
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

## Error Handling

### Global Error Boundary

Create `/components/ErrorBoundary.tsx`:
```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong</Text>
          <Button
            title="Try again"
            onPress={() => this.setState({ hasError: false, error: null })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Analytics Integration

### Firebase Analytics

```bash
npm install @react-native-firebase/analytics
```

Create `/utils/analytics.ts`:
```typescript
import analytics from '@react-native-firebase/analytics';

export const logEvent = async (eventName: string, params?: object) => {
  await analytics().logEvent(eventName, params);
};

export const logScreenView = async (screenName: string) => {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};

// Usage:
// logEvent('workout_completed', { type: 'cardio', duration: 30 });
// logScreenView('HomeScreen');
```

## Push Notifications

### Setup Expo Notifications

```typescript
import * as Notifications from 'expo-notifications';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permissions
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Schedule a notification
export const scheduleNotification = async (
  title: string,
  body: string,
  trigger: Date
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      date: trigger,
    },
  });
};
```

## Code Style Guide

### Naming Conventions
- **Components**: PascalCase (e.g., `HomeScreen`, `Button`)
- **Functions**: camelCase (e.g., `handlePress`, `fetchData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `ActivityData`)

### File Organization
- One component per file
- Co-locate related files
- Use index.ts for clean imports

### Best Practices
- Use functional components with hooks
- Implement proper error handling
- Add TypeScript types for all props
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

## Debugging

### React Native Debugger
```bash
# Install
brew install --cask react-native-debugger

# Use
# Cmd+D in iOS simulator or Cmd+M in Android emulator
# Select "Debug with Chrome"
```

### Flipper
```bash
# Built-in debugging tool
# Automatically available with React Native
```

### Console Logging
```typescript
console.log('Debug info:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

## Deployment Checklist

- [ ] Remove all console.logs
- [ ] Update app version
- [ ] Test on real devices
- [ ] Optimize images
- [ ] Enable production mode
- [ ] Configure app signing
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Test payment flows
- [ ] Enable crash reporting
- [ ] Setup analytics

---

This guide covers the essential aspects of developing and maintaining the AI Coach app. Refer to individual service documentation for more specific details.
