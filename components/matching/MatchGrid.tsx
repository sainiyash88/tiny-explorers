import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Spacing, Colors, FontSizes } from '@/constants/theme';
import FlipCard from './FlipCard';
import type { MatchLevel } from '@/content/matching/chapter1';

interface Props {
  level: MatchLevel;
  disabled?: boolean;
  onComplete: () => void;
  onMismatch?: () => void;
  peekTrigger?: number;
  onPeekingChange?: (isPeeking: boolean) => void;
}

type CardState = 'hidden' | 'flipped' | 'matched';

// Peek phase durations
const PEEK_SHOW_MS  = 1800; // how long all cards stay face-up
const FLIP_STAGGER  = 120;  // ms between each card flipping back

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchGrid({ level, disabled, onComplete, onMismatch, peekTrigger, onPeekingChange }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const cols = level.cols ?? (level.cards.length <= 4 ? 2 : isTablet ? 4 : 3);
  const cardGap = Spacing.sm;
  const cardSize = Math.min(
    Math.floor((width - Spacing.lg * 2 - cardGap * (cols - 1)) / cols),
    isTablet ? 140 : 110
  );

  const [cards] = useState(() => shuffle(level.cards));

  // Start all cards face-up (peek phase)
  const [states, setStates] = useState<Record<string, CardState>>(() =>
    Object.fromEntries(level.cards.map((c) => [c.id, 'flipped']))
  );
  const [peeking, setPeeking] = useState(true);
  const [countdown, setCountdown] = useState(2);

  const flippedIds = useRef<string[]>([]);
  const locked = useRef(true); // locked during peek
  const mistakeCount = useRef(0);
  const matchedCount = useRef(0);

  // Initial peek sequence: show cards → countdown → cascade flip back → unlock
  useEffect(() => {
    onPeekingChange?.(true);
    const tick = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    const peekTimer = setTimeout(() => {
      clearInterval(tick);
      setPeeking(false);
      onPeekingChange?.(false);

      cards.forEach((card, i) => {
        setTimeout(() => {
          setStates((prev) => ({ ...prev, [card.id]: 'hidden' }));
        }, i * FLIP_STAGGER);
      });

      const unlockDelay = cards.length * FLIP_STAGGER + 400;
      setTimeout(() => {
        locked.current = false;
      }, unlockDelay);
    }, PEEK_SHOW_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(peekTimer);
    };
  }, []);

  // Retry peek: flip only unmatched hidden cards face-up, then back
  useEffect(() => {
    if (!peekTrigger) return;
    locked.current = true;
    onPeekingChange?.(true);
    setPeeking(true);
    setCountdown(2);

    // Reveal only hidden cards (leave matched as-is)
    setStates((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => { if (next[id] === 'hidden') next[id] = 'flipped'; });
      return next;
    });

    const tick = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    const peekTimer = setTimeout(() => {
      clearInterval(tick);
      setPeeking(false);
      onPeekingChange?.(false);

      cards.forEach((card, i) => {
        setTimeout(() => {
          setStates((prev) => {
            if (prev[card.id] === 'matched') return prev;
            return { ...prev, [card.id]: 'hidden' };
          });
        }, i * FLIP_STAGGER);
      });

      const unlockDelay = cards.length * FLIP_STAGGER + 400;
      setTimeout(() => {
        locked.current = false;
      }, unlockDelay);
    }, PEEK_SHOW_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(peekTimer);
    };
  }, [peekTrigger]);

  const handlePress = useCallback(
    (id: string) => {
      if (disabled || locked.current) return;
      if (states[id] !== 'hidden') return;
      if (flippedIds.current.includes(id)) return;

      setStates((prev) => ({ ...prev, [id]: 'flipped' }));
      flippedIds.current = [...flippedIds.current, id];

      if (flippedIds.current.length < 2) return;

      locked.current = true;
      const [firstId, secondId] = flippedIds.current;
      flippedIds.current = [];

      const firstCard = level.cards.find((c) => c.id === firstId)!;
      const secondCard = level.cards.find((c) => c.id === secondId)!;

      if (firstCard.pairId === secondCard.pairId) {
        matchedCount.current += 1;
        setTimeout(() => {
          setStates((prev) => ({ ...prev, [firstId]: 'matched', [secondId]: 'matched' }));
          locked.current = false;

          const totalPairs = level.cards.length / 2;
          if (matchedCount.current === totalPairs) {
            setTimeout(() => onComplete(), 500);
          }
        }, 400);
      } else {
        mistakeCount.current += 1;
        onMismatch?.();
        setTimeout(() => {
          setStates((prev) => ({ ...prev, [firstId]: 'hidden', [secondId]: 'hidden' }));
          locked.current = false;
        }, 900);
      }
    },
    [disabled, states, level.cards, onComplete]
  );

  return (
    <View style={styles.container}>
      {peeking && (
        <View style={styles.peekBanner}>
          <Text style={styles.peekText}>Remember the cards! 🧠</Text>
          <Text style={styles.peekCountdown}>{countdown}</Text>
        </View>
      )}
      <View style={[styles.grid, { gap: cardGap }]}>
        {cards.map((card) => (
          <FlipCard
            key={card.id}
            id={card.id}
            emoji={card.emoji}
            label={card.label}
            color={card.color}
            svgKey={card.svgKey}
            size={cardSize}
            state={states[card.id]}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  peekBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: Spacing.md,
  },
  peekText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#7B6000',
  },
  peekCountdown: {
    fontSize: FontSizes.lg,
    fontWeight: '900',
    color: Colors.tileMatching,
    minWidth: 20,
    textAlign: 'center',
  },
});
