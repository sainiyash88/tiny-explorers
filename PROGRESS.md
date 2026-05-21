# KidsApp — Build Progress

## Overview
Children's educational mobile + tablet app (iOS + Android) for ages 2–5.
Four activities: Tracing, Puzzles, Matching, Brain Gym.
Freemium model: Chapter 1 free, Chapters 2–5 require one-time IAP.
Theme: Jungle / Animals.

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React Native + Expo | SDK 54 |
| Navigation | Expo Router | v6 |
| Canvas | React Native Skia | v2.2.12 |
| Animations | React Native Reanimated | v4.1.7 |
| Gestures | React Native Gesture Handler | v2.28 |
| State | Zustand | v5 |
| Storage | AsyncStorage + Expo SecureStore | — |
| IAP | RevenueCat (react-native-purchases) | Phase 6 — not yet wired |

---

## Phase Status

| Phase | Description | Status |
|---|---|---|
| 1 | Foundation — navigation, stores, home, parent gate | ✅ Done |
| 2 | Tracing activity | ✅ Done |
| 3 | Puzzles activity | ✅ Done |
| 4 | Matching / Memory activity | ✅ Done |
| 5 | Brain Gym activity | ✅ Done |
| 6 | IAP + Content Download (RevenueCat) | ⏳ Next |
| 7 | Polish + QA | ⏳ Pending |
| 8 | Store Submission | ⏳ Pending |

---

## File Map

### Foundation
```
app/_layout.tsx               Root layout — loads stores, GestureHandlerRootView
app/index.tsx                 Home screen — 4 activity tiles
app/parent-gate.tsx           Arithmetic challenge gate
app/paywall.tsx               IAP unlock screen (UI only, not wired)
constants/theme.ts            Jungle colour palette, spacing, font sizes
constants/config.ts           Chapter definitions + free/paid flags
store/progressStore.ts        Per-activity level progress (Zustand + AsyncStorage)
store/entitlementStore.ts     Free vs paid state (Zustand + SecureStore)
hooks/useProgress.ts          Convenience wrapper for progressStore
hooks/useSound.ts             No-op stub (expo-av removed, add back in Phase 7)
```

### Tracing (Phase 2)
```
app/tracing/_layout.tsx
app/tracing/index.tsx         Chapter list
app/tracing/[chapter].tsx     Level-select grid
app/tracing/level.tsx         Play screen (uses RN built-in Animated, NOT Reanimated)
components/tracing/TracingCanvas.tsx   forwardRef canvas — Skia + Gesture Handler
components/tracing/pathUtils.ts        minDistToPath, calcCoverage, coversEnd
components/ui/RewardOverlay.tsx        Confetti + stars — shared by all activities
components/ui/RetryOverlay.tsx         "Almost there!" — tracing only
content/tracing/chapter1.ts           8 levels: lines, curves, shapes
```

### Puzzles (Phase 3)
```
app/puzzles/_layout.tsx
app/puzzles/[chapter].tsx
app/puzzles/level.tsx
components/puzzles/PuzzlePiece.tsx     Draggable via Gesture.Pan()
components/puzzles/DropZone.tsx        Shadow target, bounces on snap
components/puzzles/PuzzleBoard.tsx     Snap logic via view.measure() absolute coords
content/puzzles/chapter1.ts           6 animals × 3 pieces (col/row grid positions)
```

### Matching (Phase 4)
```
app/matching/_layout.tsx
app/matching/[chapter].tsx
app/matching/level.tsx
components/matching/FlipCard.tsx       3D flip via RN built-in Animated
components/matching/MatchGrid.tsx      Shuffle, flip/match detection, star logic
content/matching/chapter1.ts          6 levels × 4 cards (2 pairs each)
```

### Brain Gym (Phase 5)
```
app/braingym/_layout.tsx
app/braingym/[chapter].tsx
app/braingym/level.tsx                 Dispatches to correct game by level.type
components/braingym/PatternGame.tsx    Sequence with blank — pick next item
components/braingym/MissingGame.tsx    Row with hidden item — pick missing
components/braingym/BigSmallGame.tsx   Two sizes same emoji — tap correct
content/braingym/chapter1.ts          8 levels: 3 pattern, 3 missing, 2 big/small
```

---

## Key Implementation Notes

### Reanimated + Android Fabric
- **Never use Reanimated `Animated.View` with mixed style arrays in screen-level components** — causes "Text strings must be rendered within a Text component" crash on Android.
- Fix: use React Native's built-in `Animated` (`import { Animated } from 'react-native'`) for any animated views inside screens.
- Reanimated is safe inside standalone modal/overlay components (e.g. `RetryOverlay`).

### Worklet / JS Thread Boundary (Tracing)
- Gesture Handler worklets cannot directly call Skia path methods (JS objects).
- Pattern: worklet reads only `e.x` / `e.y`, dispatches all logic via `runOnJS(handler)(x, y)`.

### Tracing Path Sampling
- Use `Skia.ContourMeasureIter` + `getPosTan()` for true arc-length distribution of sample points.
- Completion requires **80% coverage** AND `coversEnd()` (last 15% of path is 50%+ covered).
- `onIncomplete` fires when child lifts finger with meaningful strokes but hasn't finished.

### Puzzle Snap Detection
- `view.measure()` inside a `ref` callback gives absolute screen coordinates.
- Snap radius: 80px from zone centre.
- Stars: 0 mistakes = 3 ⭐, 1–2 = 2 ⭐, 3+ = 1 ⭐.

### Matching Flip Logic
- Two cards face-up triggers evaluation; input is locked during the 900ms "show and flip back" delay.
- Match confirmed at 400ms; `onComplete` fires 500ms after the final match.

### Brain Gym Scoring
- Correct on first attempt = 3 ⭐, wrong = 1 ⭐ (then retry available).

---

## Phase 6 — IAP Checklist (Next)

- [ ] `npx expo install react-native-purchases` (RevenueCat SDK)
- [ ] Configure RevenueCat project — create product `kids_full_access` (one-time) on App Store Connect + Google Play Console
- [ ] Add `usePurchase.ts` hook — wraps `Purchases.purchasePackage()` + `Purchases.restorePurchases()`
- [ ] Wire `paywall.tsx` — call `usePurchase`, on success call `entitlementStore.setPremium(true)`
- [ ] Add `Purchases.configure({ apiKey })` in `app/_layout.tsx` on mount
- [ ] Test with Apple Sandbox + Google Play test track before going live
- [ ] Expo FileSystem download for paid chapter content (Chapters 2–5 assets)

---

## Phase 7 — Polish Checklist

- [ ] Replace `useSound.ts` no-op with real Expo AV implementation
- [ ] Add voice prompts per level (auto-play on mount)
- [ ] Add background jungle music (loop, parent can mute)
- [ ] Jungle art pass — character illustrations, tile backgrounds
- [ ] Tablet layout QA (iPad Pro, Android tablet)
- [ ] Accessibility: larger font option, high contrast
- [ ] COPPA review — confirm no PII collected

---

## Phase 8 — Store Submission Checklist

- [ ] App icons (1024×1024 for iOS, adaptive for Android)
- [ ] Splash screen
- [ ] App Store Connect: age rating 4+, Educational category
- [ ] Google Play Console: Everyone rating
- [ ] Privacy policy URL (required for children's apps)
- [ ] Store screenshots — phone + tablet (English)
- [ ] Submit for review
