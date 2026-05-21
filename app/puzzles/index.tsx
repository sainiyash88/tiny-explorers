import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityHeader from '@/components/ui/ActivityHeader';
import ChapterList from '@/components/ui/ChapterList';
import MascotGuide from '@/components/ui/MascotGuide';
import { ACTIVITIES } from '@/constants/config';
import { Colors, Spacing } from '@/constants/theme';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

const activity = ACTIVITIES.find((a) => a.id === 'puzzles')!;

export default function PuzzlesIndex() {
  useBackgroundMusic('index');
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <MascotGuide activity="puzzles" phrase="Pick a chapter!" />
      <ActivityHeader title={activity.title} activityId="puzzles" color={Colors.tilePuzzles} />
      <ScrollView contentContainerStyle={styles.content}>
        <ChapterList activity={activity} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgMain },
  content: { padding: Spacing.lg, gap: Spacing.md },
});
