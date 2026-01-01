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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { ChatMessage } from '../types';

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
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
            maxWidth: '75%',
          },
        ]}>
          <Text style={[
            styles.messageText,
            { color: isUser ? '#FFF' : colors.text },
          ]}>
            {item.content}
          </Text>
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
          icon="barbell"
          label="Workout Plan"
          onPress={() => setInputText("Create a workout plan for me")}
        />
        <QuickAction
          icon="restaurant"
          label="Meal Plan"
          onPress={() => setInputText("Suggest a healthy meal plan")}
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

      {/* Input Bar */}
      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Ask me anything about fitness..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() ? colors.primary : colors.border },
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
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
  messageTime: {
    fontSize: FontSizes.xs,
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
});
