import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, BorderRadius, FontSizes } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, title, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }, style]}>
      {title && (
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
});
