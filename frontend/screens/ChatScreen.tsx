import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { ChatMessage, NutritionalInfo } from '../types';

interface FoodMenuItem {
  id: string;
  name: string;
  category: string;
  nutritionalInfo: NutritionalInfo;
  icon: string;
}

// Predefined food menu items
const foodMenuItems: FoodMenuItem[] = [
  // Breakfast
  {
    id: 'b1',
    name: '2 Poached Eggs',
    category: 'Breakfast',
    icon: '🥚',
    nutritionalInfo: {
      foodName: '2 Poached Eggs',
      calories: 140,
      protein: 12,
      carbs: 1,
      fats: 10,
      servingSize: '2 eggs (100g)',
    },
  },
  {
    id: 'b2',
    name: 'Whole Wheat Bread (1 slice)',
    category: 'Breakfast',
    icon: '🍞',
    nutritionalInfo: {
      foodName: 'Whole Wheat Bread',
      calories: 80,
      protein: 4,
      carbs: 14,
      fats: 1,
      fiber: 2,
      servingSize: '1 slice (28g)',
    },
  },
  {
    id: 'b3',
    name: 'Oatmeal Bowl',
    category: 'Breakfast',
    icon: '🥣',
    nutritionalInfo: {
      foodName: 'Oatmeal Bowl',
      calories: 150,
      protein: 5,
      carbs: 27,
      fats: 3,
      fiber: 4,
      servingSize: '1 cup (234g)',
    },
  },
  {
    id: 'b4',
    name: 'Greek Yogurt',
    category: 'Breakfast',
    icon: '🥛',
    nutritionalInfo: {
      foodName: 'Greek Yogurt',
      calories: 100,
      protein: 17,
      carbs: 6,
      fats: 0,
      servingSize: '170g',
    },
  },
  {
    id: 'b5',
    name: 'Avocado Toast',
    category: 'Breakfast',
    icon: '🥑',
    nutritionalInfo: {
      foodName: 'Avocado Toast',
      calories: 250,
      protein: 7,
      carbs: 24,
      fats: 15,
      fiber: 8,
      servingSize: '1 slice with avocado',
    },
  },
  {
    id: 'b6',
    name: 'Smoothie Bowl',
    category: 'Breakfast',
    icon: '🍓',
    nutritionalInfo: {
      foodName: 'Smoothie Bowl',
      calories: 320,
      protein: 10,
      carbs: 58,
      fats: 8,
      fiber: 9,
      servingSize: '1 bowl (350ml)',
    },
  },
  {
    id: 'b7',
    name: 'Scrambled Eggs (3)',
    category: 'Breakfast',
    icon: '🍳',
    nutritionalInfo: {
      foodName: 'Scrambled Eggs',
      calories: 210,
      protein: 18,
      carbs: 2,
      fats: 15,
      servingSize: '3 eggs (150g)',
    },
  },
  {
    id: 'b8',
    name: 'Pancakes (2)',
    category: 'Breakfast',
    icon: '🥞',
    nutritionalInfo: {
      foodName: 'Pancakes',
      calories: 350,
      protein: 8,
      carbs: 58,
      fats: 10,
      fiber: 2,
      servingSize: '2 pancakes with syrup',
    },
  },
  // Lunch
  {
    id: 'l1',
    name: 'Grilled Chicken Breast',
    category: 'Lunch',
    icon: '🍗',
    nutritionalInfo: {
      foodName: 'Grilled Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 4,
      servingSize: '100g',
    },
  },
  {
    id: 'l2',
    name: 'Brown Rice',
    category: 'Lunch',
    icon: '🍚',
    nutritionalInfo: {
      foodName: 'Brown Rice',
      calories: 215,
      protein: 5,
      carbs: 45,
      fats: 2,
      fiber: 4,
      servingSize: '1 cup (195g)',
    },
  },
  {
    id: 'l3',
    name: 'Mixed Salad',
    category: 'Lunch',
    icon: '🥗',
    nutritionalInfo: {
      foodName: 'Mixed Salad',
      calories: 50,
      protein: 2,
      carbs: 10,
      fats: 0,
      fiber: 3,
      servingSize: '1 bowl (150g)',
    },
  },
  {
    id: 'l4',
    name: 'Salmon Fillet',
    category: 'Lunch',
    icon: '🐟',
    nutritionalInfo: {
      foodName: 'Salmon Fillet',
      calories: 280,
      protein: 39,
      carbs: 0,
      fats: 13,
      servingSize: '150g',
    },
  },
  {
    id: 'l5',
    name: 'Pasta with Tomato Sauce',
    category: 'Lunch',
    icon: '🍝',
    nutritionalInfo: {
      foodName: 'Pasta with Tomato Sauce',
      calories: 320,
      protein: 12,
      carbs: 58,
      fats: 5,
      fiber: 5,
      servingSize: '1 bowl (250g)',
    },
  },
  {
    id: 'l6',
    name: 'Beef Steak',
    category: 'Lunch',
    icon: '🥩',
    nutritionalInfo: {
      foodName: 'Beef Steak',
      calories: 310,
      protein: 35,
      carbs: 0,
      fats: 18,
      servingSize: '150g',
    },
  },
  {
    id: 'l7',
    name: 'Turkey Sandwich',
    category: 'Lunch',
    icon: '🥪',
    nutritionalInfo: {
      foodName: 'Turkey Sandwich',
      calories: 280,
      protein: 22,
      carbs: 32,
      fats: 7,
      fiber: 4,
      servingSize: '1 sandwich',
    },
  },
  {
    id: 'l8',
    name: 'Tuna Salad',
    category: 'Lunch',
    icon: '🥙',
    nutritionalInfo: {
      foodName: 'Tuna Salad',
      calories: 240,
      protein: 28,
      carbs: 8,
      fats: 10,
      fiber: 3,
      servingSize: '1 bowl (200g)',
    },
  },
  // Snacks
  {
    id: 's1',
    name: 'Apple',
    category: 'Snacks',
    icon: '🍎',
    nutritionalInfo: {
      foodName: 'Apple',
      calories: 95,
      protein: 0,
      carbs: 25,
      fats: 0,
      fiber: 4,
      servingSize: '1 medium (182g)',
    },
  },
  {
    id: 's2',
    name: 'Banana',
    category: 'Snacks',
    icon: '🍌',
    nutritionalInfo: {
      foodName: 'Banana',
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      fiber: 3,
      servingSize: '1 medium (118g)',
    },
  },
  {
    id: 's3',
    name: 'Almonds (10 pieces)',
    category: 'Snacks',
    icon: '🥜',
    nutritionalInfo: {
      foodName: 'Almonds',
      calories: 70,
      protein: 3,
      carbs: 3,
      fats: 6,
      fiber: 2,
      servingSize: '10 almonds (14g)',
    },
  },
  {
    id: 's4',
    name: 'Protein Bar',
    category: 'Snacks',
    icon: '🍫',
    nutritionalInfo: {
      foodName: 'Protein Bar',
      calories: 200,
      protein: 20,
      carbs: 22,
      fats: 7,
      fiber: 3,
      servingSize: '1 bar (60g)',
    },
  },
  {
    id: 's5',
    name: 'Protein Shake',
    category: 'Snacks',
    icon: '🥤',
    nutritionalInfo: {
      foodName: 'Protein Shake',
      calories: 120,
      protein: 24,
      carbs: 3,
      fats: 1,
      servingSize: '1 scoop (30g)',
    },
  },
  {
    id: 's6',
    name: 'Mixed Nuts',
    category: 'Snacks',
    icon: '🌰',
    nutritionalInfo: {
      foodName: 'Mixed Nuts',
      calories: 180,
      protein: 6,
      carbs: 7,
      fats: 16,
      fiber: 3,
      servingSize: '1/4 cup (30g)',
    },
  },
  {
    id: 's7',
    name: 'Carrots & Hummus',
    category: 'Snacks',
    icon: '🥕',
    nutritionalInfo: {
      foodName: 'Carrots & Hummus',
      calories: 140,
      protein: 5,
      carbs: 16,
      fats: 7,
      fiber: 5,
      servingSize: '1 cup carrots + 2 tbsp hummus',
    },
  },
  {
    id: 's8',
    name: 'Granola Bar',
    category: 'Snacks',
    icon: '🍪',
    nutritionalInfo: {
      foodName: 'Granola Bar',
      calories: 190,
      protein: 4,
      carbs: 28,
      fats: 7,
      fiber: 3,
      servingSize: '1 bar (40g)',
    },
  },
  {
    id: 's9',
    name: 'Orange',
    category: 'Snacks',
    icon: '🍊',
    nutritionalInfo: {
      foodName: 'Orange',
      calories: 62,
      protein: 1,
      carbs: 15,
      fats: 0,
      fiber: 3,
      servingSize: '1 medium (131g)',
    },
  },
  {
    id: 's10',
    name: 'Cottage Cheese',
    category: 'Snacks',
    icon: '🧀',
    nutritionalInfo: {
      foodName: 'Cottage Cheese',
      calories: 120,
      protein: 14,
      carbs: 6,
      fats: 5,
      servingSize: '1/2 cup (113g)',
    },
  },
  // Dinner
  {
    id: 'd1',
    name: 'Baked Fish',
    category: 'Dinner',
    icon: '🐠',
    nutritionalInfo: {
      foodName: 'Baked Fish',
      calories: 200,
      protein: 42,
      carbs: 0,
      fats: 4,
      servingSize: '150g',
    },
  },
  {
    id: 'd2',
    name: 'Quinoa',
    category: 'Dinner',
    icon: '🌾',
    nutritionalInfo: {
      foodName: 'Quinoa',
      calories: 220,
      protein: 8,
      carbs: 39,
      fats: 4,
      fiber: 5,
      servingSize: '1 cup (185g)',
    },
  },
  {
    id: 'd3',
    name: 'Steamed Vegetables',
    category: 'Dinner',
    icon: '🥦',
    nutritionalInfo: {
      foodName: 'Steamed Vegetables',
      calories: 80,
      protein: 4,
      carbs: 16,
      fats: 0,
      fiber: 6,
      servingSize: '1 cup (200g)',
    },
  },
  {
    id: 'd4',
    name: 'Chicken Curry',
    category: 'Dinner',
    icon: '🍛',
    nutritionalInfo: {
      foodName: 'Chicken Curry',
      calories: 420,
      protein: 35,
      carbs: 28,
      fats: 18,
      fiber: 4,
      servingSize: '1 bowl (300g)',
    },
  },
  {
    id: 'd5',
    name: 'Grilled Shrimp',
    category: 'Dinner',
    icon: '🍤',
    nutritionalInfo: {
      foodName: 'Grilled Shrimp',
      calories: 180,
      protein: 38,
      carbs: 2,
      fats: 3,
      servingSize: '150g',
    },
  },
  {
    id: 'd6',
    name: 'Beef Stir Fry',
    category: 'Dinner',
    icon: '🥘',
    nutritionalInfo: {
      foodName: 'Beef Stir Fry',
      calories: 380,
      protein: 32,
      carbs: 22,
      fats: 18,
      fiber: 4,
      servingSize: '1 bowl (250g)',
    },
  },
  {
    id: 'd7',
    name: 'Veggie Burger',
    category: 'Dinner',
    icon: '🍔',
    nutritionalInfo: {
      foodName: 'Veggie Burger',
      calories: 290,
      protein: 18,
      carbs: 38,
      fats: 8,
      fiber: 7,
      servingSize: '1 burger with bun',
    },
  },
  {
    id: 'd8',
    name: 'Sweet Potato',
    category: 'Dinner',
    icon: '🍠',
    nutritionalInfo: {
      foodName: 'Baked Sweet Potato',
      calories: 180,
      protein: 4,
      carbs: 41,
      fats: 0,
      fiber: 6,
      servingSize: '1 medium (150g)',
    },
  },
];

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [selectedFoodItems, setSelectedFoodItems] = useState<FoodMenuItem[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const parseFoodText = (text: string): NutritionalInfo | null => {
    // Food database for text-based calorie estimation
    const foodDatabase: { [key: string]: NutritionalInfo } = {
      'egg': { foodName: '1 Egg', calories: 70, protein: 6, carbs: 0.5, fats: 5, servingSize: '1 egg (50g)' },
      'eggs': { foodName: '1 Egg', calories: 70, protein: 6, carbs: 0.5, fats: 5, servingSize: '1 egg (50g)' },
      'bread': { foodName: 'Bread Slice', calories: 80, protein: 4, carbs: 14, fats: 1, fiber: 2, servingSize: '1 slice' },
      'toast': { foodName: 'Toast', calories: 80, protein: 4, carbs: 14, fats: 1, fiber: 2, servingSize: '1 slice' },
      'oatmeal': { foodName: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fats: 3, fiber: 4, servingSize: '1 cup' },
      'banana': { foodName: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0, fiber: 3, servingSize: '1 medium' },
      'apple': { foodName: 'Apple', calories: 95, protein: 0, carbs: 25, fats: 0, fiber: 4, servingSize: '1 medium' },
      'chicken': { foodName: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 4, servingSize: '100g' },
      'rice': { foodName: 'Rice', calories: 130, protein: 3, carbs: 28, fats: 0, servingSize: '1 cup cooked' },
      'salmon': { foodName: 'Salmon', calories: 280, protein: 39, carbs: 0, fats: 13, servingSize: '150g' },
      'salad': { foodName: 'Mixed Salad', calories: 50, protein: 2, carbs: 10, fats: 0, fiber: 3, servingSize: '1 bowl' },
      'yogurt': { foodName: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fats: 0, servingSize: '170g' },
      'almonds': { foodName: 'Almonds', calories: 170, protein: 6, carbs: 6, fats: 15, fiber: 4, servingSize: '28g' },
      'avocado': { foodName: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 7, servingSize: '1/2 avocado' },
      'milk': { foodName: 'Milk', calories: 150, protein: 8, carbs: 12, fats: 8, servingSize: '1 cup' },
      'protein shake': { foodName: 'Protein Shake', calories: 120, protein: 24, carbs: 3, fats: 1, servingSize: '1 scoop' },
    };

    const lowerText = text.toLowerCase();
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalFiber = 0;
    let foundFoods: string[] = [];
    let servingSizes: string[] = [];

    // Extract quantity multiplier
    const quantityMatch = text.match(/(\d+)\s*(x\s*)?/i);
    const baseMultiplier = quantityMatch ? parseInt(quantityMatch[1]) : 1;

    // Search for food items in the text
    for (const [keyword, nutrition] of Object.entries(foodDatabase)) {
      if (lowerText.includes(keyword)) {
        // Check for quantity before the food word
        const foodRegex = new RegExp(`(\\d+)\\s*${keyword}`, 'i');
        const match = text.match(foodRegex);
        const multiplier = match ? parseInt(match[1]) : baseMultiplier;

        totalCalories += nutrition.calories * multiplier;
        totalProtein += nutrition.protein * multiplier;
        totalCarbs += nutrition.carbs * multiplier;
        totalFats += nutrition.fats * multiplier;
        totalFiber += (nutrition.fiber || 0) * multiplier;
        
        const foodItem = multiplier > 1 ? `${multiplier} ${nutrition.foodName}` : nutrition.foodName;
        foundFoods.push(foodItem);
        servingSizes.push(nutrition.servingSize || '');
      }
    }

    if (foundFoods.length > 0) {
      return {
        foodName: foundFoods.join(' + '),
        calories: Math.round(totalCalories),
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats),
        fiber: totalFiber > 0 ? Math.round(totalFiber) : undefined,
        servingSize: 'Multiple items',
      };
    }

    return null;
  };

  const estimateCalories = (imageUri: string): NutritionalInfo => {
    // Simulate AI-based food recognition and calorie estimation
    // In production, this would call a real AI service (AWS Rekognition, Google Vision, etc.)
    const foods = [
      {
        foodName: 'Grilled Chicken Breast with Vegetables',
        calories: 350,
        protein: 42,
        carbs: 18,
        fats: 12,
        fiber: 5,
        servingSize: '1 plate (300g)',
      },
      {
        foodName: 'Caesar Salad',
        calories: 280,
        protein: 15,
        carbs: 12,
        fats: 20,
        fiber: 3,
        servingSize: '1 bowl (250g)',
      },
      {
        foodName: 'Oatmeal with Berries',
        calories: 320,
        protein: 12,
        carbs: 52,
        fats: 8,
        fiber: 9,
        servingSize: '1 bowl (200g)',
      },
      {
        foodName: 'Avocado Toast',
        calories: 400,
        protein: 14,
        carbs: 38,
        fats: 24,
        fiber: 12,
        servingSize: '2 slices',
      },
      {
        foodName: 'Protein Smoothie Bowl',
        calories: 380,
        protein: 28,
        carbs: 45,
        fats: 10,
        fiber: 8,
        servingSize: '1 bowl (350ml)',
      },
    ];

    // Randomly select a food for demo purposes
    return foods[Math.floor(Math.random() * foods.length)];
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload food images.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setIsAnalyzing(true);

        // Simulate AI analysis delay
        setTimeout(() => {
          const nutritionalInfo = estimateCalories(imageUri);
          
          // Create user message with image
          const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: '📸 Uploaded food image',
            timestamp: new Date().toISOString(),
            imageUri,
          };

          setMessages(prev => [...prev, userMessage]);
          setIsAnalyzing(false);
          setIsTyping(true);

          // Create AI response with nutritional analysis
          setTimeout(() => {
            const assistantMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Great! I've analyzed your food image. Here's what I found:`,
              timestamp: new Date().toISOString(),
              nutritionalInfo,
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
          }, 1000);
        }, 2000);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera permissions to take food photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setIsAnalyzing(true);

        setTimeout(() => {
          const nutritionalInfo = estimateCalories(imageUri);
          
          const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: '📸 Took food photo',
            timestamp: new Date().toISOString(),
            imageUri,
          };

          setMessages(prev => [...prev, userMessage]);
          setIsAnalyzing(false);
          setIsTyping(true);

          setTimeout(() => {
            const assistantMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Perfect! I've analyzed your food photo. Here's the nutritional breakdown:`,
              timestamp: new Date().toISOString(),
              nutritionalInfo,
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
          }, 1000);
        }, 2000);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Upload Food Image',
      'Choose how to add your food image',
      [
        {
          text: 'Take Photo',
          onPress: takePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: pickImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    
    // Check if message contains food items for calorie estimation
    const nutritionalInfo = parseFoodText(messageText);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // If food detected, respond with nutritional info
    if (nutritionalInfo) {
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Perfect! I've analyzed your food intake:`,
          timestamp: new Date().toISOString(),
          nutritionalInfo,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000);
    } else {
      // Regular AI response
      setTimeout(() => {
        const aiResponse = getAIResponse(messageText);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return "Great question about workouts! Based on your fitness goals, I recommend:\n\n💪 Strength Training (3x/week):\n- Push-ups: 3 sets of 12 reps\n- Squats: 3 sets of 15 reps\n- Planks: 3 sets of 30 seconds\n\n🏃 Cardio (2x/week):\n- Running: 30 minutes\n- HIIT: 20 minutes\n\nWould you like me to create a detailed weekly workout plan?";
    }
    
    if (lowerMessage.includes('diet') || lowerMessage.includes('meal') || lowerMessage.includes('food')) {
      return "Let's talk about nutrition! For your goals, I suggest:\n\n🥗 Breakfast:\n- Oatmeal with berries\n- 2 boiled eggs\n- Green tea\n\n🍗 Lunch:\n- Grilled chicken breast\n- Brown rice\n- Steamed vegetables\n\n🥙 Dinner:\n- Baked fish\n- Quinoa\n- Mixed salad\n\n💧 Remember to drink 8-10 glasses of water daily!\n\nShall I create a personalized meal plan for the week?";
    }
    
    if (lowerMessage.includes('weight') || lowerMessage.includes('lose')) {
      return "For sustainable weight loss:\n\n📊 Daily Calorie Deficit: 500 calories\n⚡ Target: 0.5-1 kg per week\n\n✅ Key Tips:\n1. Eat protein with every meal\n2. Include fiber-rich foods\n3. Stay hydrated\n4. Get 7-8 hours sleep\n5. Track your progress\n\nConsistency is key! Would you like me to set up a tracking system?";
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('help')) {
      return "I'm here to support you! 🌟\n\nRemember:\n- Progress, not perfection\n- Every workout counts\n- Small steps lead to big changes\n- Your health is an investment\n\nWhat specific area do you need help with today?";
    }
    
    return "I'm your AI fitness coach! I can help you with:\n\n💪 Workout plans\n🥗 Meal planning\n📊 Progress tracking\n🎯 Goal setting\n💡 Fitness tips\n\nWhat would you like to know more about?";
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.assistantMessageContainer,
      ]}>
        {!isUser && (
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Ionicons name="fitness" size={20} color="#FFF" />
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          {
            backgroundColor: isUser ? colors.primary : colors.card,
            maxWidth: item.imageUri || item.nutritionalInfo ? '85%' : '75%',
          },
        ]}>
          {/* Image Display */}
          {item.imageUri && (
            <Image
              source={{ uri: item.imageUri }}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}

          <Text style={[
            styles.messageText,
            { color: isUser ? '#FFF' : colors.text },
          ]}>
            {item.content}
          </Text>

          {/* Nutritional Info Card */}
          {item.nutritionalInfo && (
            <View style={[styles.nutritionCard, { backgroundColor: colors.background }]}>
              <View style={styles.nutritionHeader}>
                <Ionicons name="restaurant" size={20} color={colors.primary} />
                <Text style={[styles.foodName, { color: colors.text }]}>
                  {item.nutritionalInfo.foodName}
                </Text>
              </View>

              <View style={styles.caloriesBadge}>
                <Text style={[styles.caloriesValue, { color: colors.primary }]}>
                  {item.nutritionalInfo.calories}
                </Text>
                <Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>
                  calories
                </Text>
              </View>

              <View style={styles.macrosGrid}>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: colors.text }]}>
                    {item.nutritionalInfo.protein}g
                  </Text>
                  <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                    Protein
                  </Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: colors.text }]}>
                    {item.nutritionalInfo.carbs}g
                  </Text>
                  <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                    Carbs
                  </Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: colors.text }]}>
                    {item.nutritionalInfo.fats}g
                  </Text>
                  <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                    Fats
                  </Text>
                </View>
                {item.nutritionalInfo.fiber && (
                  <View style={styles.macroItem}>
                    <Text style={[styles.macroValue, { color: colors.text }]}>
                      {item.nutritionalInfo.fiber}g
                    </Text>
                    <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>
                      Fiber
                    </Text>
                  </View>
                )}
              </View>

              {item.nutritionalInfo.servingSize && (
                <Text style={[styles.servingSize, { color: colors.textSecondary }]}>
                  Serving: {item.nutritionalInfo.servingSize}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.logFoodButton, { backgroundColor: colors.primary }]}
                onPress={() => Alert.alert('Success', 'Food logged to your nutrition diary!')}
              >
                <Ionicons name="add-circle-outline" size={18} color="#FFF" />
                <Text style={styles.logFoodText}>Log to Nutrition Diary</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={[
            styles.messageTime,
            { color: isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary },
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>

        {isUser && (
          <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={styles.typingContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Ionicons name="fitness" size={20} color="#FFF" />
        </View>
        <View style={[styles.typingBubble, { backgroundColor: colors.card }]}>
          <View style={styles.typingDots}>
            <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />
            <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />
            <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />
          </View>
        </View>
      </View>
    );
  };

  const handleMenuFoodSelection = (item: FoodMenuItem) => {
    // Toggle selection
    setSelectedFoodItems(prev => {
      const isAlreadySelected = prev.some(selected => selected.id === item.id);
      if (isAlreadySelected) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const calculateTotalNutrition = (items: FoodMenuItem[]): NutritionalInfo => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalFiber = 0;
    const foodNames: string[] = [];

    items.forEach(item => {
      totalCalories += item.nutritionalInfo.calories;
      totalProtein += item.nutritionalInfo.protein;
      totalCarbs += item.nutritionalInfo.carbs;
      totalFats += item.nutritionalInfo.fats;
      totalFiber += item.nutritionalInfo.fiber || 0;
      foodNames.push(item.name);
    });

    return {
      foodName: foodNames.join(' + '),
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
      fiber: totalFiber > 0 ? Math.round(totalFiber) : undefined,
      servingSize: `${items.length} item${items.length > 1 ? 's' : ''}`,
    };
  };

  const handleConfirmSelection = () => {
    if (selectedFoodItems.length === 0) return;

    const totalNutrition = calculateTotalNutrition(selectedFoodItems);
    const foodIcons = selectedFoodItems.map(item => item.icon).join(' ');

    setShowFoodMenu(false);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `Selected: ${selectedFoodItems.map(item => item.name).join(', ')} ${foodIcons}`,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setSelectedFoodItems([]); // Reset selection

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: selectedFoodItems.length === 1 
          ? `Great choice! Here's the nutritional information:` 
          : `Perfect! Here's the combined nutritional information for your ${selectedFoodItems.length} items:`,
        timestamp: new Date().toISOString(),
        nutritionalInfo: totalNutrition,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleCancelSelection = () => {
    setShowFoodMenu(false);
    setSelectedFoodItems([]);
  };

  const renderFoodMenu = () => {
    const categories = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
    
    return (
      <Modal
        visible={showFoodMenu}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFoodMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Food Items
                </Text>
                {selectedFoodItems.length > 0 && (
                  <Text style={[styles.selectionCount, { color: colors.primary }]}>
                    {selectedFoodItems.length} item{selectedFoodItems.length > 1 ? 's' : ''} selected
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={handleCancelSelection}>
                <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
              {categories.map((category) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={[styles.categoryTitle, { color: colors.primary }]}>
                    {category}
                  </Text>
                  <View style={styles.foodItemsGrid}>
                    {foodMenuItems
                      .filter(item => item.category === category)
                      .map((item) => {
                        const isSelected = selectedFoodItems.some(selected => selected.id === item.id);
                        return (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.foodMenuItem,
                              { 
                                backgroundColor: isSelected ? colors.primary : colors.card,
                                borderWidth: isSelected ? 2 : 0,
                                borderColor: colors.primary,
                              }
                            ]}
                            onPress={() => handleMenuFoodSelection(item)}
                          >
                            {isSelected && (
                              <View style={styles.selectedBadge}>
                                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                              </View>
                            )}
                            <Text style={styles.foodIcon}>{item.icon}</Text>
                            <Text style={[
                              styles.foodItemName,
                              { color: isSelected ? '#FFF' : colors.text }
                            ]} numberOfLines={2}>
                              {item.name}
                            </Text>
                            <Text style={[
                              styles.foodItemCalories,
                              { color: isSelected ? '#FFF' : colors.primary }
                            ]}>
                              {item.nutritionalInfo.calories} cal
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Action Buttons */}
            {selectedFoodItems.length > 0 && (
              <View style={[styles.modalFooter, { backgroundColor: colors.card }]}>
                <TouchableOpacity
                  style={[styles.clearButton, { borderColor: colors.border }]}
                  onPress={() => setSelectedFoodItems([])}
                >
                  <Text style={[styles.clearButtonText, { color: colors.text }]}>
                    Clear All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.calculateButton, { backgroundColor: colors.primary }]}
                  onPress={handleConfirmSelection}
                >
                  <Ionicons name="calculator" size={18} color="#FFF" />
                  <Text style={styles.calculateButtonText}>
                    Calculate ({selectedFoodItems.length})
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const QuickAction = ({ icon, label, onPress }: any) => (
    <TouchableOpacity
      style={[styles.quickAction, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={[styles.quickActionText, { color: colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={['top']}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={[styles.headerAvatar, { backgroundColor: colors.primary }]}>
          <Ionicons name="fitness" size={24} color="#FFF" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            AI Fitness Coach
          </Text>
          <Text style={[styles.headerStatus, { color: colors.success }]}>
            ● Online
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <QuickAction
          icon="restaurant-outline"
          label="Food Menu"
          onPress={() => setShowFoodMenu(true)}
        />
        <QuickAction
          icon="barbell"
          label="Workout"
          onPress={() => setInputText("Create a workout plan for me")}
        />
        <QuickAction
          icon="trending-up"
          label="Progress"
          onPress={() => setInputText("How can I track my progress?")}
        />
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderTypingIndicator()}
      />

      {/* Analyzing Indicator */}
      {isAnalyzing && (
        <View style={[styles.analyzingContainer, { backgroundColor: colors.card }]}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.analyzingText, { color: colors.text }]}>
            Analyzing food image...
          </Text>
        </View>
      )}

      {/* Input Bar */}
      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={showImageOptions}
          disabled={isAnalyzing}
        >
          <Ionicons name="camera" size={28} color={isAnalyzing ? colors.border : colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Type food name or ask anything..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!isAnalyzing}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() ? colors.primary : colors.border },
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || isAnalyzing}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

      {/* Food Menu Modal */}
      {renderFoodMenu()}
    </SafeAreaView>
  );
}

// Helper function
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Initial messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! 👋 I'm your AI fitness coach. I'm here to help you achieve your health and fitness goals!\n\nI can assist you with:\n- Creating personalized workout plans\n- Suggesting healthy meal plans\n- Tracking your progress\n- Answering fitness questions\n- Providing motivation and tips\n\nHow can I help you today?",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.lg + 2,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerStatus: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  quickActionText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  messagesList: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  assistantMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  avatarText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  messageBubble: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  messageText: {
    fontSize: FontSizes.md,
    lineHeight: 22,
    marginBottom: Spacing.xs,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  nutritionCard: {
    marginTop: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  nutritionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  foodName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    flex: 1,
  },
  caloriesBadge: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  caloriesValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  caloriesLabel: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.sm,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  macroLabel: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },
  servingSize: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    fontStyle: 'italic',
  },
  logFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  logFoodText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: FontSizes.xs,
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  analyzingText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  typingBubble: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginLeft: Spacing.xs,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  attachButton: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.md,
    maxHeight: 100,
    marginRight: Spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  selectionCount: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginTop: 4,
  },
  menuScroll: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  categorySection: {
    marginBottom: Spacing.xl,
  },
  categoryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  foodItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  foodMenuItem: {
    width: '31%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  selectedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  foodIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  foodItemName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  foodItemCalories: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  clearButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  calculateButton: {
    flex: 2,
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  calculateButtonText: {
    color: '#FFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
