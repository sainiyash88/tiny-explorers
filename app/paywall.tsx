import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { usePurchase } from '@/hooks/usePurchase';

export default function Paywall() {
  const { status, errorMessage, purchase, restorePurchases } = usePurchase();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'success') {
      router.back();
    }
  }, [status]);

  useEffect(() => {
    if (status === 'error' && errorMessage) {
      Alert.alert('Oops', errorMessage);
    }
  }, [status, errorMessage]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} disabled={isLoading}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.emoji}>🌟</Text>
        <Text style={styles.heading}>Unlock Everything!</Text>
        <Text style={styles.sub}>
          Get all chapters across every activity — one time, forever.
        </Text>

        <View style={styles.featureList}>
          {[
            '✏️  All Tracing chapters (A–Z, 0–9, Animals)',
            '🧩  All Puzzle levels (up to 12 pieces)',
            '🃏  All Matching sets (Fruits, Vehicles, Emotions)',
            '🧠  All Brain Gym challenges',
          ].map((f) => (
            <Text key={f} style={styles.feature}>{f}</Text>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.buyBtn, isLoading && styles.btnDisabled]}
          activeOpacity={0.85}
          onPress={purchase}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <Text style={styles.buyText}>Unlock Full Access</Text>
              <Text style={styles.buyPrice}>One-time purchase</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restoreBtn}
          activeOpacity={0.7}
          onPress={restorePurchases}
          disabled={isLoading}
        >
          <Text style={styles.restoreText}>Restore Purchase</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          No subscription. No ads. No data collected from children.{'\n'}
          <Text style={styles.legalLink} onPress={() => Linking.openURL('https://sainiyash88.github.io/tiny-explorers/')}>
            Terms &amp; Conditions
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    borderRadius: Radii.full,
    backgroundColor: Colors.locked,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: FontSizes.md, color: Colors.textPrimary },

  emoji: { fontSize: 72 },
  heading: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.textPrimary, textAlign: 'center' },
  sub: { fontSize: FontSizes.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22 },

  featureList: {
    alignSelf: 'stretch',
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  feature: { fontSize: FontSizes.sm, color: Colors.textPrimary, lineHeight: 24 },

  buyBtn: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    gap: 4,
  },
  btnDisabled: { opacity: 0.6 },
  buyText: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.white },
  buyPrice: { fontSize: FontSizes.xs, color: 'rgba(255,255,255,0.75)' },

  restoreBtn: { minHeight: MIN_TAP_TARGET, justifyContent: 'center' },
  restoreText: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },

  legal: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
