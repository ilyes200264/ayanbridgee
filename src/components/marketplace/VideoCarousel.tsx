import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Play, Eye, Star, Clock, Users, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../context/AuthContext';
import SubjectBadge from '../ui/SubjectBadge';

interface Video {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  description: string;
  duration: string;
  lessons: number;
  category: string;
  level: string;
}

interface VideoCarouselProps {
  videos: Video[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showLimitedCollection?: boolean;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  autoPlay = true,
  autoPlayInterval = 3000,
  showLimitedCollection = true
}) => {
  const { addToCart, isItemPurchased } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive visible items
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3); // Small desktop: 3 items
      } else {
        setVisibleItems(4); // Large desktop: 4 items
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Limit displayed videos for non-authenticated users
  const displayedVideos = !isAuthenticated && showLimitedCollection 
    ? videos.slice(0, 6) 
    : videos;

  const maxIndex = Math.max(0, displayedVideos.length - visibleItems);

  useEffect(() => {
    if (isPlaying && !isPaused && autoPlay && displayedVideos.length > visibleItems) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, autoPlay, displayedVideos.length, visibleItems, maxIndex, autoPlayInterval]);

  const goNext = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const goPrev = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-white/20'
        }`}
      />
    ));
  };

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Videos Collection
          </h2>
          <p className="text-white/60 text-xs sm:text-sm">
            {!isAuthenticated && showLimitedCollection 
              ? `Showing ${displayedVideos.length} of ${videos.length} videos • Sign in to see full collection`
              : `${displayedVideos.length} premium videos available`
            }
          </p>
        </div>
        
        {/* Carousel Controls */}
        <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-3">
          {autoPlay && (
            <button
              onClick={toggleAutoPlay}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              ) : (
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              )}
            </button>
          )}
          
          <button
            onClick={goPrev}
            disabled={displayedVideos.length <= visibleItems}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
          
          <button
            onClick={goNext}
            disabled={displayedVideos.length <= visibleItems}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex"
          animate={{
            x: `calc(-${currentIndex * (100 / visibleItems)}% - ${currentIndex * (16 / visibleItems)}px)`
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          style={{ width: `calc(${displayedVideos.length * (100 / visibleItems)}% + ${(displayedVideos.length - 1) * (16 / visibleItems)}px)` }}
        >
          {displayedVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="flex-shrink-0 px-2"
              style={{ width: `calc(${100 / displayedVideos.length}% - ${16 * (displayedVideos.length - 1) / displayedVideos.length / visibleItems}px)` }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <SubjectBadge 
                      category={video.category}
                      title={video.title}
                      variant="small" 
                      showText={true}
                    />
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                      {video.level}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-white/60 text-xs mb-2">
                    Par {video.instructor}
                  </p>

                  <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(video.rating)}
                      <span className="ml-1">({video.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3" />
                      <span>{video.lessons} leçons</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-xs mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-primary font-bold text-sm">
                        {video.price}€
                      </span>
                      {video.originalPrice && (
                        <span className="text-white/40 text-xs line-through">
                          {video.originalPrice}€
                        </span>
                      )}
                    </div>
                    
                    {isItemPurchased(video.id) ? (
                      <button className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>Regarder</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => addToCart({
                          id: video.id,
                          title: video.title,
                          author: video.instructor,
                          cover: video.thumbnail,
                          price: video.price,
                          originalPrice: video.originalPrice,
                          type: 'video'
                        })}
                        className="bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Ajouter</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicators */}
      {displayedVideos.length > visibleItems && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlays for Roulette Effect */}
      <div className="absolute top-0 left-0 w-2 sm:w-4 h-full bg-gradient-to-r from-secondary to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-2 sm:w-4 h-full bg-gradient-to-l from-secondary to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default VideoCarousel;