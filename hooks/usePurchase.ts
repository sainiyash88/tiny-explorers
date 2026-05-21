import { useState, useCallback } from 'react';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useEntitlementStore } from '@/store/entitlementStore';
import { IAP_PRODUCT_ID, IAP_ENTITLEMENT_ID } from '@/constants/config';

export type PurchaseStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled';

export function usePurchase() {
  const [status, setStatus] = useState<PurchaseStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const setPremium = useEntitlementStore((s) => s.setPremium);

  const purchase = useCallback(async () => {
    try {
      setStatus('loading');
      setErrorMessage('');

      const offerings = await Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages.find(
        (p) => p.product.identifier === IAP_PRODUCT_ID
      ) ?? offerings.current?.availablePackages[0];

      if (!pkg) {
        setErrorMessage('Product not available. Please try again later.');
        setStatus('error');
        return;
      }

      const { customerInfo } = await Purchases.purchasePackage(pkg);
      const isPremium = !!customerInfo.entitlements.active[IAP_ENTITLEMENT_ID];
      await setPremium(isPremium);
      setStatus(isPremium ? 'success' : 'error');
    } catch (e: any) {
      if (e?.userCancelled) {
        setStatus('cancelled');
      } else {
        setErrorMessage(e?.message ?? 'Purchase failed. Please try again.');
        setStatus('error');
      }
    }
  }, [setPremium]);

  const restorePurchases = useCallback(async () => {
    try {
      setStatus('loading');
      setErrorMessage('');

      const customerInfo = await Purchases.restorePurchases();
      const isPremium = !!customerInfo.entitlements.active[IAP_ENTITLEMENT_ID];
      await setPremium(isPremium);
      setStatus(isPremium ? 'success' : 'error');
      if (!isPremium) setErrorMessage('No previous purchase found.');
    } catch (e: any) {
      setErrorMessage(e?.message ?? 'Restore failed. Please try again.');
      setStatus('error');
    }
  }, [setPremium]);

  return { status, errorMessage, purchase, restorePurchases };
}
