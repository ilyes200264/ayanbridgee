import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, Clock, TrendingUp, Filter, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'ebook' | 'formation' | 'live' | 'video';
  description: string;
  image?: string;
  category?: string;
  relevanceScore: number;
}

interface AISearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  placeholder?: string;
  className?: string;
}

const AISearchBar: React.FC<AISearchBarProps> = ({
  onSearch,
  onFilterChange,
  placeholder = "Recherchez avec l'IA... ex: 'cours de trading pour débutants'",
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isAIMode, setIsAIMode] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Mock data for suggestions and results
  const mockSuggestions = [
    'Trading crypto pour débutants',
    'Analyse technique avancée',
    'DeFi et yield farming',
    'NFT et métaverse',
    'Psychologie du trading',
    'Portfolio management',
    'Sécurité blockchain',
    'Formation business en ligne'
  ];

  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Guide Complet du Trading Crypto',
      type: 'ebook',
      description: 'Un guide complet pour maîtriser le trading de cryptomonnaies',
      category: 'Trading',
      relevanceScore: 0.95,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      title: 'Formation Trading Crypto Complète',
      type: 'formation',
      description: 'La formation la plus complète sur le trading crypto',
      category: 'Formation',
      relevanceScore: 0.92,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop'
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ayanbridge-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate AI processing
  const simulateAISearch = (searchQuery: string) => {
    setIsLoading(true);
    setIsAIMode(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setIsLoading(false);
      onSearch(searchQuery);
      
      // Save to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('ayanbridge-recent-searches', JSON.stringify(newRecentSearches));
    }, 1500); // 1.5s to simulate AI processing
  };

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length > 2) {
      setIsExpanded(true);
      // Show suggestions immediately for better UX
      const filteredSuggestions = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 6));
      
      // Debounced search
      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          simulateAISearch(value);
        }
      }, 800);
    } else {
      setIsExpanded(false);
      setSuggestions([]);
      setSearchResults([]);
      setIsAIMode(false);
    }
  };

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      simulateAISearch(finalQuery);
      setQuery(finalQuery);
      setIsExpanded(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSearchResults([]);
    setSuggestions([]);
    setIsExpanded(false);
    setIsAIMode(false);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return '📚';
      case 'formation': return '🎓';
      case 'live': return '📺';
      case 'video': return '🎥';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook': return 'text-blue-400';
      case 'formation': return 'text-green-400';
      case 'live': return 'text-red-400';
      case 'video': return 'text-purple-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : isAIMode ? (
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          ) : (
            <Search className="w-5 h-5 text-white/60" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            } else if (e.key === 'Escape') {
              setIsExpanded(false);
            }
          }}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-200"
          placeholder={placeholder}
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        {/* AI Processing Indicator */}
        {isAIMode && (
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isExpanded && (query.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-secondary-light border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm z-50 max-h-96 overflow-y-auto"
          >
            {/* AI Processing Banner */}
            {isLoading && (
              <div className="p-4 border-b border-white/10 bg-primary/5">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <div className="text-primary font-medium text-sm">IA en cours d'analyse...</div>
                    <div className="text-white/60 text-xs">Recherche intelligente dans notre base de données</div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && !isLoading && (
              <div className="p-2">
                <div className="flex items-center space-x-2 px-3 py-2 text-xs text-white/60 border-b border-white/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Résultats IA - {searchResults.length} trouvé(s)</span>
                </div>
                {searchResults.map((result) => (
                  <motion.button
                    key={result.id}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    onClick={() => handleSuggestionClick(result.title)}
                    className="w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      {result.image ? (
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">{getTypeIcon(result.type)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm truncate">{result.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-white/60 text-xs line-clamp-1">{result.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-white/10 rounded-full h-1">
                            <div 
                              className="bg-primary h-1 rounded-full"
                              style={{ width: `${result.relevanceScore * 100}%` }}
                            />
                          </div>
                          <span className="text-primary text-xs font-medium">
                            {Math.round(result.relevanceScore * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && !isLoading && searchResults.length === 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-white/60 border-b border-white/10">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full p-3 text-left hover:bg-white/5 rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
                    <span className="text-white text-sm">{suggestion}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length === 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span className="text-xs text-white/60">Recherches récentes</span>
                  </div>
                  <button 
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('ayanbridge-recent-searches');
                    }}
                    className="text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    Effacer
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full p-3 text-left hover:bg-white/5 rounded-lg flex items-center space-x-3 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-white/40 flex-shrink-0" />
                    <span className="text-white text-sm">{search}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.length > 2 && suggestions.length === 0 && searchResults.length === 0 && !isLoading && (
              <div className="p-6 text-center">
                <div className="text-white/40 mb-2">
                  <Search className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-white/60 text-sm">Aucun résultat pour "{query}"</div>
                <div className="text-white/40 text-xs mt-1">Essayez avec d'autres termes</div>
              </div>
            )}

            {/* AI Tips */}
            <div className="p-3 border-t border-white/10 bg-primary/5">
              <div className="flex items-center space-x-2 text-xs text-primary">
                <Sparkles className="w-3 h-3" />
                <span>💡 Astuce: Utilisez des descriptions naturelles comme "formation trading débutant"</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBar;