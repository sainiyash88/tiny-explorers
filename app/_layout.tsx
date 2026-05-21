import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useProgressStore } from '@/store/progressStore';
import { useEntitlementStore } from '@/store/entitlementStore';
import { REVENUECAT_ANDROID_KEY, IAP_ENTITLEMENT_ID } from '@/constants/config';
import ScreenBreakOverlay from '@/components/ui/ScreenBreakOverlay';

const SESSION_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

export default function RootLayout() {
  const loadProgress = useProgressStore((s) => s.loadProgress);
  const loadEntitlement = useEntitlementStore((s) => s.loadEntitlement);
  const setPremium = useEntitlementStore((s) => s.setPremium);
  const [showBreak, setShowBreak] = useState(false);

  useEffect(() => {
    loadProgress();
    loadEntitlement();

    if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: REVENUECAT_ANDROID_KEY });
    }

    Purchases.getCustomerInfo()
      .then((info) => {
        const isPremium = !!info.entitlements.active[IAP_ENTITLEMENT_ID];
        setPremium(isPremium);
      })
      .catch(() => { /* offline — keep locally stored value */ });

    // Show break reminder after 30 minutes
    const breakTimer = setTimeout(() => setShowBreak(true), SESSION_LIMIT_MS);
    return () => clearTimeout(breakTimer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="tracing" />
        <Stack.Screen name="puzzles" />
        <Stack.Screen name="matching" />
        <Stack.Screen name="braingym" />
        <Stack.Screen name="parent-gate" options={{ presentation: 'modal' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
        <Stack.Screen name="terms" options={{ presentation: 'modal' }} />
      </Stack>
      <ScreenBreakOverlay visible={showBreak} onDismiss={() => setShowBreak(false)} />
    </GestureHandlerRootView>
  );
}
