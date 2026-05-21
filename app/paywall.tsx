import { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
  Alert, Image, Linking, ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { usePurchase } from '@/hooks/usePurchase';

const FEATURES = [
  { icon: '✏️', label: 'All Tracing chapters (A–Z, 0–9, Animals)' },
  { icon: '🧩', label: 'All Puzzle levels (up to 12 pieces)' },
  { icon: '🃏', label: 'All Matching sets (Fruits, Vehicles, Emotions)' },
  { icon: '🧠', label: 'All Brain Gym challenges' },
];

export default function Paywall() {
  const { status, errorMessage, purchase, restorePurchases } = usePurchase();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'success') router.back();
  }, [status]);

  useEffect(() => {
    if (status === 'error' && errorMessage) Alert.alert('Oops', errorMessage);
  }, [status, errorMessage]);

  return (
    <View style={styles.root}>
      {/* Full-screen background image */}
      <Image
        source={require('@/assets/images/tinyExplorers.jpeg')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      {/* Dark overlay so content is readable */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} disabled={isLoading}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.badge}>🌟 ONE-TIME UNLOCK</Text>
            <Text style={styles.heading}>Unlock Everything!</Text>
            <Text style={styles.sub}>
              Get all chapters across every activity — forever.
            </Text>
          </View>

          {/* Feature list */}
          <View style={styles.featureCard}>
            {FEATURES.map((f) => (
              <View key={f.label} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureText}>{f.label}</Text>
              </View>
            ))}
          </View>

          {/* Buy button */}
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
                <Text style={styles.buyText}>🔓 Unlock Full Access</Text>
                <Text style={styles.buyPrice}>One-time purchase · No subscription</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Restore */}
          <TouchableOpacity style={styles.restoreBtn} onPress={restorePurchases} disabled={isLoading}>
            <Text style={styles.restoreText}>Restore Purchase</Text>
          </TouchableOpacity>

          {/* Legal */}
          <Text style={styles.legal}>No ads · No data collected from children</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://sainiyash88.github.io/tiny-explorers/')}>
            <Text style={styles.legalLink}>Terms &amp; Conditions</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  safe: { flex: 1 },

  closeBtn: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: FontSizes.md, color: '#fff' },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingTop: 64,
    gap: Spacing.lg,
  },

  header: { alignItems: 'center', gap: Spacing.sm },
  badge: {
    fontSize: FontSizes.xs,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 1.5,
    backgroundColor: 'rgba(245,166,35,0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radii.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  heading: {
    fontSize: FontSizes.xl,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  sub: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
  },

  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radii.md,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  featureIcon: { fontSize: 22, width: 30 },
  featureText: { flex: 1, fontSize: FontSizes.sm, color: '#fff', fontWeight: '600' },

  buyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
    gap: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  btnDisabled: { opacity: 0.6 },
  buyText: { fontSize: FontSizes.md, fontWeight: '900', color: '#fff' },
  buyPrice: { fontSize: FontSizes.xs, color: 'rgba(255,255,255,0.8)' },

  restoreBtn: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  restoreText: { fontSize: FontSizes.sm, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },

  legal: {
    fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  legalLink: {
    fontSize: FontSizes.xs,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
