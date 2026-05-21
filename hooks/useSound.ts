import { useCallback, useEffect, useRef } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const SUCCESS_FILES = [
  require('../assets/audio/success_1.mp3'),
  require('../assets/audio/success_2.mp3'),
  require('../assets/audio/success_3.mp3'),
];

const FAIL_FILES = [
  require('../assets/audio/fail_1.mp3'),
  require('../assets/audio/fail_2.mp3'),
  require('../assets/audio/fail_3.mp3'),
];

// Pick once per mount — stable across re-renders
function pickOnce<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const COOLDOWN_MS = 1500;

export function useSound() {
  // Stable file selection — ref so it never changes after mount
  const successFile = useRef(pickOnce(SUCCESS_FILES)).current;
  const failFile = useRef(pickOnce(FAIL_FILES)).current;

  const successPlayer = useAudioPlayer(successFile);
  const failPlayer = useAudioPlayer(failFile);

  const successStatus = useAudioPlayerStatus(successPlayer);
  const failStatus = useAudioPlayerStatus(failPlayer);

  const lastSuccessPlayedAt = useRef(0);
  const lastFailPlayedAt = useRef(0);
  const failDoneCallback = useRef<(() => void) | null>(null);

  // Fire the onDone callback when the fail sound finishes
  useEffect(() => {
    if (failStatus.didJustFinish && failDoneCallback.current) {
      const cb = failDoneCallback.current;
      failDoneCallback.current = null;
      cb();
    }
  }, [failStatus.didJustFinish]);

  const playSuccess = useCallback(() => {
    if (!successStatus.isLoaded) return;
    const now = Date.now();
    if (now - lastSuccessPlayedAt.current < COOLDOWN_MS) return;
    lastSuccessPlayedAt.current = now;
    successPlayer.seekTo(0).catch(() => {});
    try { successPlayer.play(); } catch {}
  }, [successPlayer, successStatus.isLoaded]);

  const playFail = useCallback((onDone?: () => void) => {
    if (!failStatus.isLoaded) return;
    const now = Date.now();
    if (now - lastFailPlayedAt.current < COOLDOWN_MS) return;
    lastFailPlayedAt.current = now;
    if (onDone) failDoneCallback.current = onDone;
    failPlayer.seekTo(0).catch(() => {});
    try { failPlayer.play(); } catch {}
  }, [failPlayer, failStatus.isLoaded]);

  return { playSuccess, playFail };
}
