import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'kids_entitlement_v1';

interface EntitlementState {
  isPremium: boolean;
  isLoading: boolean;
  setPremium: (value: boolean) => Promise<void>;
  loadEntitlement: () => Promise<void>;
  canAccessChapter: (chapterFree: boolean) => boolean;
}

export const useEntitlementStore = create<EntitlementState>((set, get) => ({
  isPremium: false,
  isLoading: true,

  setPremium: async (value) => {
    set({ isPremium: value });
    await SecureStore.setItemAsync(STORAGE_KEY, value ? '1' : '0');
  },

  loadEntitlement: async () => {
    try {
      const stored = await SecureStore.getItemAsync(STORAGE_KEY);
      set({ isPremium: stored === '1', isLoading: false });
    } catch {
      set({ isPremium: false, isLoading: false });
    }
  },

  canAccessChapter: (chapterFree) => {
    if (__DEV__) return true; // unlock all chapters in Expo Go for testing
    return chapterFree || get().isPremium;
  },
}));
