import { useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

const TRACKS = {
  home:     { src: require('../assets/audio/jungle-theme.mp3'),   volume: 0.4 },
  index:    { src: require('../assets/audio/index_music.mp3'),    volume: 0.3 },
  chapter:  { src: require('../assets/audio/chapter_music.mp3'),  volume: 0.15 },
  activity: { src: require('../assets/audio/activity_music.mp3'), volume: 0.10 },
};

export type MusicTrack = keyof typeof TRACKS;

export function useBackgroundMusic(track: MusicTrack = 'home') {
  const { src, volume } = TRACKS[track];
  const player = useAudioPlayer(src);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    if (!status.isLoaded) return;
    player.loop = true;
    player.volume = volume;
  }, [status.isLoaded]);

  useFocusEffect(
    useCallback(() => {
      if (status.isLoaded) player.play();
      return () => {
        try { player.pause(); } catch { /* ignore */ }
      };
    }, [player, status.isLoaded])
  );
}
