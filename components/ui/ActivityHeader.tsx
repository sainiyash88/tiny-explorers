import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSizes, Spacing, Radii, MIN_TAP_TARGET } from '@/constants/theme';
import GiraffeCartoon  from '@/components/ui/animals/GiraffeCartoon';
import ElephantCartoon from '@/components/ui/animals/ElephantCartoon';
import MonkeyCartoon   from '@/components/ui/animals/MonkeyCartoon';
import LionCartoon     from '@/components/ui/animals/LionCartoon';
import type { ActivityId } from '@/constants/config';

interface Props {
  title: string;
  activityId: ActivityId;
  color: string;
}

function HeaderAnimal({ activityId }: { activityId: ActivityId }) {
  if (activityId === 'tracing')  return <GiraffeCartoon  size={72} />;
  if (activityId === 'puzzles')  return <ElephantCartoon size={72} />;
  if (activityId === 'matching') return <MonkeyCartoon   size={72} />;
  if (activityId === 'braingym') return <LionCartoon     size={72} />;
  return null;
}

export default function ActivityHeader({ title, activityId, color }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={[styles.header, { backgroundColor: color }]}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <HeaderAnimal activityId={activityId} />
      <Text style={[styles.title, isTablet && styles.titleTablet]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: Radii.lg,
    borderBottomRightRadius: Radii.lg,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: Spacing.lg,
    width: MIN_TAP_TARGET,
    height: MIN_TAP_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Radii.full,
  },
  backIcon: { fontSize: FontSizes.lg, color: Colors.white },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.white, marginTop: Spacing.xs },
  titleTablet: { fontSize: FontSizes.xxl },
});
