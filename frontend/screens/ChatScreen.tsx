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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { ChatMessage } from '../types';
import { api } from '../services/api';

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const loadChatHistory = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const response = await api.getChatHistory(user.id);
      
      if (response.success && response.history) {
        // Convert backend format to frontend format
        const formattedMessages: ChatMessage[] = response.history.map((chat: any) => ([
          {
            id: chat.id + '-user',
            role: 'user',
            content: chat.message,
            timestamp: chat.created_at,
          },
          {
            id: chat.id + '-assistant',
            role: 'assistant',
            content: chat.response,
            timestamp: chat.created_at,
          }
        ])).flat();
        
        // If no history, keep initial messages
        if (formattedMessages.length > 0) {
          setMessages(formattedMessages);
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Keep initial messages on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !user?.id) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText.trim();
    setInputText('');
    setIsTyping(true);

    try {
      // Build user context for personalized responses
      const userContext = {
        name: user.name || 'User',
        coach_gender: user.coach_gender || '',
        coach_style: user.coach_style || '',
        is_premium: user.is_premium || false,
      };

      // Send message to backend
      const response = await api.sendChatMessage(user.id, messageText, userContext);

      if (response.success && response.response) {
        const assistantMessage: ChatMessage = {
          id: response.chat_id || (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.response,
          timestamp: response.created_at || new Date().toISOString(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(
        'Error',
        'Failed to send message. Please check your internet connection and try again.',
        [
          {
            text: 'Retry',
            onPress: () => {
              setInputText(messageText);
              setMessages(prev => prev.slice(0, -1));
            },
          },
          { text: 'Cancel' },
        ]
      );
    } finally {
      setIsTyping(false);
    }
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
