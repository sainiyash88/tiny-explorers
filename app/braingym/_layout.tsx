import { Stack } from 'expo-router';

export default function BrainGymLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[chapter]" />
      <Stack.Screen name="level" />
    </Stack>
  );
}
