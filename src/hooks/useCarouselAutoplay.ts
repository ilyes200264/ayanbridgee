import { useEffect, useRef, useState } from 'react';

interface UseCarouselAutoplayProps {
  isEnabled: boolean;
  interval: number;
  totalItems: number;
  visibleItems: number;
  onNext: () => void;
}

interface UseCarouselAutoplayReturn {
  isPlaying: boolean;
  isPaused: boolean;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
}

export const useCarouselAutoplay = ({
  isEnabled,
  interval,
  totalItems,
  visibleItems,
  onNext
}: UseCarouselAutoplayProps): UseCarouselAutoplayReturn => {
  const [isPlaying, setIsPlaying] = useState(isEnabled);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isPaused && isEnabled && totalItems > visibleItems) {
      intervalRef.current = setInterval(() => {
        onNext();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isEnabled, interval, totalItems, visibleItems, onNext]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  return {
    isPlaying,
    isPaused,
    togglePlay,
    pause,
    resume
  };
};