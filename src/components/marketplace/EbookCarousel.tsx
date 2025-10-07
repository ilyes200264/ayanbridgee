import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Download, Eye, Star, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../context/AuthContext';
import SubjectBadge from '../ui/SubjectBadge';

interface Ebook {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  description: string;
  pages: number;
  category: string;
  pdfUrl?: string;
}

interface EbookCarouselProps {
  ebooks: Ebook[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showLimitedCollection?: boolean;
}

const EbookCarousel: React.FC<EbookCarouselProps> = ({
  ebooks,
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
        setVisibleItems(3); // Desktop small: 3 items
      } else {
        setVisibleItems(4); // Desktop large: 4 items
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Limit collection based on authentication
  const displayedEbooks = showLimitedCollection && !isAuthenticated 
    ? ebooks.slice(0, 6) 
    : ebooks;

  const totalItems = displayedEbooks.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, autoPlay, autoPlayInterval, maxIndex]);

  const goToNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const goToPrev = () => {
    setCurrentIndex(prev => {
      const prevIndex = prev - 1;
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
            E-books Collection
          </h2>
          <p className="text-white/60 text-xs sm:text-sm">
            {!isAuthenticated && showLimitedCollection 
              ? `Showing ${displayedEbooks.length} of ${ebooks.length} books • Sign in to see full collection`
              : `${displayedEbooks.length} premium e-books available`
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
            onClick={goToPrev}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            disabled={totalItems <= visibleItems}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            disabled={totalItems <= visibleItems}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
          className="flex gap-4"
          animate={{
            x: `${-currentIndex * (100 / visibleItems)}%`
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300
          }}
          style={{
            width: `${(totalItems / visibleItems) * 100}%`
          }}
        >
          {displayedEbooks.map((book) => (
            <motion.div
              key={book.id}
              className="flex-shrink-0"
              style={{ width: `${100 / totalItems}%` }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group h-full">
                {/* Book Cover */}
                <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" fill="%23374151"><rect width="200" height="300" fill="%23374151"/><text x="100" y="150" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="48">📖</text></svg>';
                    }}
                  />
                  {book.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Save ${(book.originalPrice - book.price).toFixed(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-lg flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 text-sm">
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-3 sm:p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{book.category}</span>
                    <SubjectBadge 
                      title={book.title}
                      description={book.description}
                      category={book.category}
                      size="small"
                      variant="filled"
                      showText={false}
                    />
                  </div>
                  
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  
                  <p className="text-white/60 text-xs mb-2">by {book.author}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(book.rating)}
                    </div>
                    <span className="text-white text-xs font-medium">{book.rating}</span>
                    <span className="text-white/50 text-xs">({book.reviews})</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-primary font-bold text-sm sm:text-base">${book.price}</span>
                      {book.originalPrice && (
                        <span className="text-white/50 text-xs line-through">${book.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {isItemPurchased(book.id) ? (
                        <button className="p-1.5 sm:p-2 bg-green-500/20 text-green-400 rounded-lg" title="Already Purchased">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => addToCart({
                            id: book.id,
                            title: book.title,
                            author: book.author,
                            cover: book.cover,
                            price: book.price,
                            originalPrice: book.originalPrice,
                            type: 'ebook',
                            pdfUrl: book.pdfUrl
                          })}
                          className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" 
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Pages Info - Hidden on mobile for space */}
                  <div className="hidden sm:block mt-2 pt-2 border-t border-white/10 text-xs text-white/50">
                    {book.pages} pages
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicator Dots */}
      {totalItems > visibleItems && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-white/30 w-2 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
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

export default EbookCarousel;