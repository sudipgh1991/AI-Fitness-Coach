import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

interface Referral {
  id: string;
  name: string;
  status: 'pending' | 'joined' | 'premium';
  reward: number;
  points: number;
  date: Date;
}

interface RewardTier {
  points: number;
  label: string;
  discount: string;
  color: string;
}

export default function ReferralScreen({ navigation }: any) {
  const { colors } = useTheme();
  
  // Mock referral code for demo
  const [referralCode] = useState('FIT2026');
  const [totalPoints, setTotalPoints] = useState(150);
  const [availablePoints, setAvailablePoints] = useState(150);
  const [referrerDiscount] = useState('20%'); // Discount referrer can offer
  const [referrals, setReferrals] = useState<Referral[]>([
    { id: '1', name: 'Sarah Johnson', status: 'premium', reward: 10, points: 100, date: new Date('2026-01-01') },
    { id: '2', name: 'Mike Chen', status: 'joined', reward: 5, points: 50, date: new Date('2026-01-03') },
    { id: '3', name: 'Emma Davis', status: 'pending', reward: 0, points: 0, date: new Date('2026-01-05') },
  ]);
  
  const rewardTiers: RewardTier[] = [
    { points: 50, label: '5% Discount', discount: '5%', color: colors.info },
    { points: 100, label: '10% Discount', discount: '10%', color: colors.warning },
    { points: 250, label: '15% Discount', discount: '15%', color: colors.success },
    { points: 500, label: '1 Month Free', discount: 'FREE', color: colors.primary },
  ];
  
  const totalEarned = referrals.reduce((sum, ref) => sum + ref.reward, 0);
  const premiumReferrals = referrals.filter(r => r.status === 'premium').length;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `Join me on Fitzen AI Coach! Use my referral code ${referralCode} to get ${referrerDiscount} OFF your first month, and I'll earn reward points! 💪 Win-win!`,
        title: 'Join Fitzen AI Coach',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'premium': return colors.success;
      case 'joined': return colors.info;
      case 'pending': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'premium': return 'checkmark-circle';
      case 'joined': return 'person-add';
      case 'pending': return 'time';
      default: return 'help-circle';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleRedeemReward = (tier: RewardTier) => {
    if (availablePoints >= tier.points) {
      Alert.alert(
        'Redeem Reward',
        `Redeem ${tier.points} points for ${tier.label}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Redeem',
            onPress: () => {
              setAvailablePoints(availablePoints - tier.points);
              Alert.alert('Success!', `You've redeemed ${tier.label}! Check your account for the discount.`);
            },
          },
        ]
      );
    } else {
      Alert.alert('Not Enough Points', `You need ${tier.points - availablePoints} more points to redeem this reward.`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Refer & Earn</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Points Summary */}
        <Card>
          <View style={styles.earningsCard}>
            <View style={[styles.earningsBadge, { backgroundColor: colors.primary + '20' }]}>  
              <Ionicons name="trophy" size={32} color={colors.primary} />
            </View>
            <Text style={[styles.earningsAmount, { color: colors.text }]}>
              {availablePoints}
            </Text>
            <Text style={[styles.earningsLabel, { color: colors.textSecondary }]}>
              Available Points
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>{totalPoints}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Earned</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>${totalEarned}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cash</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>{referrals.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Referrals</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Referral Code */}
        <Card title="Your Referral Code">
          <View style={styles.codeSection}>
            <View style={[styles.discountBanner, { backgroundColor: colors.success + '15', borderColor: colors.success }]}>
              <Ionicons name="gift" size={24} color={colors.success} />
              <View style={styles.discountInfo}>
                <Text style={[styles.discountTitle, { color: colors.success }]}>New Users Get {referrerDiscount} OFF</Text>
                <Text style={[styles.discountSubtitle, { color: colors.textSecondary }]}>First month discount when they use your code</Text>
              </View>
            </View>
            <View style={[styles.codeBox, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
              <Text style={[styles.codeText, { color: colors.primary }]}>
                {referralCode}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={copyToClipboard}
              >
                <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.info }]}
                onPress={shareCode}
              >
                <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* How It Works */}
        <Card title="How It Works">
          <View style={styles.stepsList}>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>Share Your Code</Text>
                <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                  Share your code - friends get {referrerDiscount} OFF first month
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>Friend Signs Up</Text>
                <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                  They join with your code - You earn 50 points + $5
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>They Go Premium</Text>
                <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                  When they upgrade - You earn 100 points + $5 more
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>Redeem Rewards</Text>
                <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                  Use points for discounts or free months
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Reward Tiers */}
        <Card title="Redeem Your Points">
          <View style={styles.rewardsGrid}>
            {rewardTiers.map((tier, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.rewardCard,
                  { 
                    backgroundColor: tier.color + '15',
                    borderColor: tier.color,
                    opacity: availablePoints >= tier.points ? 1 : 0.6,
                  },
                ]}
                onPress={() => handleRedeemReward(tier)}
                disabled={availablePoints < tier.points}
              >
                <View style={[styles.rewardIcon, { backgroundColor: tier.color }]}>
                  <Ionicons name="star" size={20} color="#FFF" />
                </View>
                <Text style={[styles.rewardPoints, { color: tier.color }]}>
                  {tier.points} pts
                </Text>
                <Text style={[styles.rewardLabel, { color: colors.text }]}>
                  {tier.label}
                </Text>
                {availablePoints >= tier.points ? (
                  <View style={[styles.redeemButton, { backgroundColor: tier.color }]}>
                    <Text style={styles.redeemButtonText}>Redeem</Text>
                  </View>
                ) : (
                  <Text style={[styles.lockedText, { color: colors.textSecondary }]}>
                    {tier.points - availablePoints} more
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Referral History */}
        {referrals.length > 0 && (
          <Card title="Your Referrals">
            {referrals.map((referral) => (
              <View
                key={referral.id}
                style={[styles.referralItem, { borderBottomColor: colors.border }]}
              >
                <View style={styles.referralInfo}>
                  <View style={styles.referralHeader}>
                    <Text style={[styles.referralName, { color: colors.text }]}>
                      {referral.name}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(referral.status) + '20' }]}>
                      <Ionicons name={getStatusIcon(referral.status)} size={14} color={getStatusColor(referral.status)} />
                      <Text style={[styles.statusText, { color: getStatusColor(referral.status) }]}>
                        {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.referralDetails}>
                    <Text style={[styles.referralDate, { color: colors.textSecondary }]}>
                      Joined {formatDate(referral.date)}
                    </Text>
                    <View style={styles.rewardInfo}>
                      {referral.points > 0 && (
                        <Text style={[styles.referralPoints, { color: colors.primary }]}>
                          +{referral.points} pts
                        </Text>
                      )}
                      <Text style={[styles.referralReward, { color: colors.success }]}>
                        {referral.reward > 0 ? `+$${referral.reward}` : 'Pending'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Terms */}
        <Card>
          <View style={styles.termsCard}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.info} />
            <Text style={[styles.termsText, { color: colors.textSecondary }]}>
              Rewards are credited within 24 hours. Maximum 50 referrals per month. 
              Terms & conditions apply.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  earningsCard: {
    alignItems: 'center',
  },
  earningsBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  earningsAmount: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  earningsLabel: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  codeSection: {
    gap: Spacing.md,
  },
  discountBanner: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  discountInfo: {
    flex: 1,
  },
  discountTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  discountSubtitle: {
    fontSize: FontSizes.xs,
  },
  codeBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  stepsList: {
    gap: Spacing.lg,
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  referralItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  referralInfo: {
    gap: Spacing.sm,
  },
  referralHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referralName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  referralDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  referralPoints: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  referralDate: {
    fontSize: FontSizes.sm,
  },
  referralReward: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  termsCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  termsText: {
    flex: 1,
    fontSize: FontSizes.xs,
    lineHeight: 18,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  rewardCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  rewardPoints: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  rewardLabel: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  redeemButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  redeemButtonText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  lockedText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
