import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselControlsProps {
  isPlaying: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  showPlayPause?: boolean;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  isPlaying,
  canGoPrev,
  canGoNext,
  onTogglePlay,
  onPrev,
  onNext,
  showPlayPause = true
}) => {
  return (
    <div className="flex items-center space-x-2">
      {showPlayPause && (
        <button
          onClick={onTogglePlay}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
          title={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white group-hover:text-primary" />
          ) : (
            <Play className="w-4 h-4 text-white group-hover:text-primary" />
          )}
        </button>
      )}
      
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
        title="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-primary group-disabled:group-hover:text-white" />
      </button>
      
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
        title="Next"
      >
        <ChevronRight className="w-5 h-5 text-white group-hover:text-primary group-disabled:group-hover:text-white" />
      </button>
    </div>
  );
};

export default CarouselControls;