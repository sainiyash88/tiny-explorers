import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radii, Spacing, MIN_TAP_TARGET } from '@/constants/theme';
import { ACTIVITIES } from '@/constants/config';
import type { ActivityId } from '@/constants/config';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import GiraffeCartoon  from '@/components/ui/animals/GiraffeCartoon';
import ElephantCartoon from '@/components/ui/animals/ElephantCartoon';
import MonkeyCartoon   from '@/components/ui/animals/MonkeyCartoon';
import LionCartoon     from '@/components/ui/animals/LionCartoon';

const TILE_COLORS: Record<ActivityId, string> = {
  tracing:  Colors.tileTracing,
  puzzles:  Colors.tilePuzzles,
  matching: Colors.tileMatching,
  braingym: Colors.tileBrainGym,
};

function TileAnimal({ id, size }: { id: ActivityId; size: number }) {
  if (id === 'tracing')  return <GiraffeCartoon  size={size} />;
  if (id === 'puzzles')  return <ElephantCartoon size={size} />;
  if (id === 'matching') return <MonkeyCartoon   size={size} />;
  if (id === 'braingym') return <LionCartoon     size={size} />;
  return null;
}

interface TileProps {
  activity: (typeof ACTIVITIES)[number];
  tileSize: number;
  index: number;
  isTablet: boolean;
}

function ActivityTile({ activity, tileSize, index, isTablet }: TileProps) {
  const bounceAnim = useRef(new Animated.Value(-80)).current;
  const bobAnim    = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animal drops in from above with a spring, staggered per tile
    Animated.spring(bounceAnim, {
      toValue: 0,
      delay: index * 150 + 300,
      useNativeDriver: true,
      friction: 5,
      tension: 60,
    }).start(() => {
      // Gentle continuous bob after landing
      Animated.loop(
        Animated.sequence([
          Animated.timing(bobAnim, { toValue: -8, duration: 700, useNativeDriver: true }),
          Animated.timing(bobAnim, { toValue:  0, duration: 700, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  function handlePressIn() {
    Animated.spring(scaleAnim, { toValue: 1.15, useNativeDriver: true, friction: 4 }).start();
  }

  function handlePressOut() {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push(`/${activity.id}`)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.tile,
          {
            backgroundColor: TILE_COLORS[activity.id],
            width: tileSize,
            // Extra top padding so the animal has room to sit above content
            paddingTop: Spacing.xxl + Spacing.md,
          },
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Animal mascot — positioned above tile top edge */}
        <Animated.View
          style={[
            styles.animalBadge,
            { transform: [{ translateY: bounceAnim }, { translateY: bobAnim }] },
          ]}
          pointerEvents="none"
        >
          <TileAnimal id={activity.id} size={isTablet ? 100 : 82} />
        </Animated.View>

        <Text style={styles.tileEmoji}>{activity.emoji}</Text>
        <Text style={styles.tileName}>{activity.title}</Text>
        <Text style={styles.tileDesc}>{activity.description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const cols = isTablet ? 2 : 1;
  const tileSize = (width - Spacing.lg * 2 - Spacing.lg * (cols - 1)) / cols;

  useBackgroundMusic();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={[styles.titleTiny, isTablet && styles.titleTinyTablet]}>tiny</Text>
            <Text style={[styles.titleExplorers, isTablet && styles.titleExplorersTablet]}>Explorers</Text>
          </View>
          <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
            What do you want to do today?
          </Text>
        </View>

        {/* Activity tiles */}
        <View style={[styles.grid, isTablet && styles.gridTablet]}>
          {ACTIVITIES.map((activity, i) => (
            <ActivityTile
              key={activity.id}
              activity={activity}
              tileSize={tileSize}
              index={i}
              isTablet={isTablet}
            />
          ))}
        </View>

        {/* Parent area */}
        <TouchableOpacity
          style={styles.parentBtn}
          onPress={() => router.push('/parent-gate?next=settings')}
        >
          <Text style={styles.parentBtnText}>👨‍👩‍👧 Parent Area</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.bgMain },
  scroll: { padding: Spacing.lg, gap: Spacing.xl },

  header:        { alignItems: 'center', paddingTop: Spacing.md },
  logoRow:       { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  titleTiny:     { fontSize: 22, fontWeight: '700', color: Colors.secondary, letterSpacing: 3, paddingBottom: 4, textTransform: 'uppercase' },
  titleTinyTablet:      { fontSize: 28 },
  titleExplorers:       { fontSize: 40, fontWeight: '900', color: Colors.primaryDark, letterSpacing: -1 },
  titleExplorersTablet: { fontSize: 52 },
  subtitle:      { fontSize: FontSizes.md, color: Colors.textMuted, marginTop: Spacing.xs, textAlign: 'center' },
  subtitleTablet:{ fontSize: FontSizes.lg },

  grid:       { gap: Spacing.xl, alignItems: 'center' },
  gridTablet: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },

  tile: {
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'visible',
    minHeight: MIN_TAP_TARGET,
  },

  // Animal sits just above the top edge of the tile
  animalBadge: {
    position: 'absolute',
    top: -44,
    alignSelf: 'center',
    zIndex: 10,
  },

  tileEmoji: { fontSize: 48 },
  tileName:  { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  tileDesc:  { fontSize: FontSizes.sm, color: 'rgba(255,255,255,0.85)', textAlign: 'center' },

  parentBtn: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    minHeight: MIN_TAP_TARGET,
    justifyContent: 'center',
  },
  parentBtnText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary },
});
