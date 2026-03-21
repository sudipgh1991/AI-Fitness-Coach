import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

type PaymentMethodType = 'upi' | 'card' | 'netbanking' | null;

export default function PaymentScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  
  // Payment form states
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const plans = {
    monthly: {
      price: 499,
      duration: t.payMonthDuration,
      savings: 0,
    },
    yearly: {
      price: 4999,
      duration: t.payYearDuration,
      savings: 989,
    },
  };

  const currentPlan = plans[selectedPlan];

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert(t.error, t.paySelectMethodError);
      return;
    }

    // Validate based on payment method
    if (selectedMethod === 'upi' && !upiId) {
      Alert.alert(t.error, t.payEnterUPIError);
      return;
    }

    if (selectedMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        Alert.alert(t.error, t.payFillCardError);
        return;
      }
    }

    if (selectedMethod === 'netbanking' && !selectedBank) {
      Alert.alert(t.error, t.paySelectBankError);
      return;
    }

    // Simulate payment processing
    Alert.alert(
      t.paySuccessTitle,
      t.paySuccessMessage,
      [
        {
          text: t.done,
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const PlanCard = ({ type, isPopular = false }: any) => {
    const plan = plans[type as keyof typeof plans];
    const isSelected = selectedPlan === type;

    return (
      <TouchableOpacity
        style={[
          styles.planCard,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: 2,
          },
        ]}
        onPress={() => setSelectedPlan(type)}
      >
        {isPopular && (
          <View style={[styles.popularBadge, { backgroundColor: colors.secondary }]}>
            <Text style={styles.popularText}>{t.payPopularBadge}</Text>
          </View>
        )}
        
        <Text style={[styles.planType, { color: colors.text }]}>
          {type === 'monthly' ? t.payMonthlyPlan : t.payYearlyPlan}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.currency, { color: colors.text }]}>₹</Text>
          <Text style={[styles.price, { color: colors.text }]}>{plan.price}</Text>
          <Text style={[styles.duration, { color: colors.textSecondary }]}>
            /{plan.duration}
          </Text>
        </View>

        {plan.savings > 0 && (
          <View style={[styles.savingsBadge, { backgroundColor: colors.success + '20' }]}>
            <Text style={[styles.savingsText, { color: colors.success }]}>
              {t.paySaveAmount(plan.savings)}
            </Text>
          </View>
        )}

        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
            <Ionicons name="checkmark" size={16} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const PaymentMethodButton = ({ type, icon, title }: any) => {
    const isSelected = selectedMethod === type;

    return (
      <TouchableOpacity
        style={[
          styles.methodButton,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: 2,
          },
        ]}
        onPress={() => setSelectedMethod(type)}
      >
        <View style={[styles.methodIcon, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name={icon} size={28} color={colors.primary} />
        </View>
        <Text style={[styles.methodTitle, { color: colors.text }]}>
          {title}
        </Text>
        {isSelected && (
          <View style={[styles.radioOuter, { borderColor: colors.primary }]}>
            <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Premium Features */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.payPremiumFeaturesTitle}
          </Text>
          <View style={styles.featuresList}>
            {[
              t.payFeature1,
              t.payFeature2,
              t.payFeature3,
              t.payFeature4,
              t.payFeature5,
              t.payFeature6,
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={[styles.featureText, { color: colors.text }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Plan Selection */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.payChoosePlanTitle}
          </Text>
          <View style={styles.plansContainer}>
            <PlanCard type="monthly" />
            <PlanCard type="yearly" isPopular />
          </View>
        </Card>

        {/* Payment Methods */}
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.payMethodLabel}
          </Text>
          <View style={styles.methodsContainer}>
            <PaymentMethodButton type="upi" icon="qr-code" title={t.payUPI} />
            <PaymentMethodButton type="card" icon="card" title={t.payCard} />
            <PaymentMethodButton type="netbanking" icon="business" title={t.payNetBanking} />
          </View>
        </Card>

        {/* Payment Details Form */}
        {selectedMethod === 'upi' && (
          <Card title={t.payEnterUPITitle}>
            <InputField
              value={upiId}
              onChangeText={setUpiId}
              placeholder="yourname@upi"
              icon="at"
              autoCapitalize="none"
            />
            <Text style={[styles.helpText, { color: colors.textSecondary }]}>
              {t.payUPIHint}
            </Text>
          </Card>
        )}

        {selectedMethod === 'card' && (
          <Card title={t.payCardDetailsTitle}>
            <InputField
              label={t.payCardNumberLabel}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              icon="card"
            />
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  label={t.payExpiryLabel}
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  label={t.payCVVLabel}
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>
            <InputField
              label={t.payCardholderLabel}
              value={cardName}
              onChangeText={setCardName}
              placeholder="John Doe"
              icon="person"
            />
          </Card>
        )}

        {selectedMethod === 'netbanking' && (
          <Card title={t.paySelectBankTitle}>
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank}
                style={[
                  styles.bankItem,
                  {
                    backgroundColor: selectedBank === bank ? colors.primary + '10' : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedBank(bank)}
              >
                <Text style={[styles.bankName, { color: colors.text }]}>
                  {bank}
                </Text>
                {selectedBank === bank && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* Order Summary */}
        <Card title={t.payOrderSummaryTitle}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              {selectedPlan === 'monthly' ? t.payMonthlyPlan : t.payYearlyPlan}
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ₹{currentPlan.price}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              {t.payTaxLabel}
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ₹{Math.round(currentPlan.price * 0.18)}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              {t.payTotalLabel}
            </Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              ₹{currentPlan.price + Math.round(currentPlan.price * 0.18)}
            </Text>
          </View>
        </Card>

        {/* Pay Button */}
        <View style={styles.payButtonContainer}>
          <Button
            title={t.payNowBtn(currentPlan.price + Math.round(currentPlan.price * 0.18))}
            onPress={handlePayment}
            fullWidth
            size="large"
          />
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  featuresList: {
    gap: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  planCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  popularText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  planType: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  currency: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  price: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
  },
  duration: {
    fontSize: FontSizes.sm,
  },
  savingsBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  savingsText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodsContainer: {
    gap: Spacing.md,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  methodIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  methodTitle: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  helpText: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  bankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  bankName: {
    fontSize: FontSizes.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.md,
  },
  summaryValue: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  totalLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  payButtonContainer: {
    padding: Spacing.lg,
  },
});
