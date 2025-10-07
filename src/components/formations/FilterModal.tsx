import React, { useState, useEffect } from 'react';
import { X, Filter, Globe, GraduationCap, BookOpen, Clock, DollarSign, Star, Users, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationSystems, nonEducationalCategories, getEducationSystemByCountry, getLevelsByCategory, getSubjectsByLevel, getAllCountries, type EducationSystem, type EducationLevel } from '../../config/educationSystems';
import { subjectIcons, getSubjectById } from '../../config/subjectIcons';
import SubjectBadge from '../ui/SubjectBadge';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FormationFilters) => void;
  currentFilters: FormationFilters;
}

export interface FormationFilters {
  // Basic filters
  type: 'all' | 'educational' | 'non-educational';
  
  // Educational filters
  country?: string;
  educationLevel?: 'primary' | 'secondary' | 'higher';
  schoolYear?: string;
  subjects?: string[];
  
  // Non-educational filters
  category?: string;
  subcategory?: string;
  
  // Common filters
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all';
  duration?: 'short' | 'medium' | 'long' | 'all'; // <5h, 5-20h, >20h
  price?: 'free' | 'paid' | 'all';
  priceRange?: [number, number];
  rating?: number; // minimum rating
  language?: string[];
  hasSubtitles?: boolean;
  hasCertificate?: boolean;
  
  // Sorting
  sortBy?: 'popular' | 'rating' | 'price_asc' | 'price_desc' | 'newest' | 'duration';
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [filters, setFilters] = useState<FormationFilters>(currentFilters);
  const [selectedSystem, setSelectedSystem] = useState<EducationSystem | null>(null);
  const [availableLevels, setAvailableLevels] = useState<EducationLevel[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  
  const countries = getAllCountries();
  const languages = ['French', 'English', 'Arabic', 'Spanish', 'German', 'Italian'];

  useEffect(() => {
    if (filters.country) {
      const system = getEducationSystemByCountry(filters.country);
      setSelectedSystem(system || null);
      
      if (system && filters.educationLevel) {
        const levels = getLevelsByCategory(system, filters.educationLevel);
        setAvailableLevels(levels);
        
        // Reset school year if it's not available in new levels
        if (!levels.find(l => l.id === filters.schoolYear)) {
          setFilters(prev => ({ ...prev, schoolYear: undefined }));
        }
      }
    } else {
      setSelectedSystem(null);
      setAvailableLevels([]);
    }
  }, [filters.country, filters.educationLevel]);

  useEffect(() => {
    if (selectedSystem && filters.schoolYear) {
      const subjects = getSubjectsByLevel(selectedSystem, filters.schoolYear);
      setAvailableSubjects(subjects);
      
      // Filter out subjects that are no longer available
      if (filters.subjects) {
        const validSubjects = filters.subjects.filter(s => subjects.includes(s));
        if (validSubjects.length !== filters.subjects.length) {
          setFilters(prev => ({ ...prev, subjects: validSubjects }));
        }
      }
    } else {
      setAvailableSubjects([]);
    }
  }, [selectedSystem, filters.schoolYear]);

  const handleTypeChange = (type: FormationFilters['type']) => {
    setFilters(prev => ({
      ...prev,
      type,
      // Reset specific filters when changing type
      country: undefined,
      educationLevel: undefined,
      schoolYear: undefined,
      subjects: [],
      category: undefined,
      subcategory: undefined
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFilters(prev => ({
      ...prev,
      subjects: prev.subjects?.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...(prev.subjects || []), subject]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFilters(prev => ({
      ...prev,
      language: prev.language?.includes(language)
        ? prev.language.filter(l => l !== language)
        : [...(prev.language || []), language]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      type: 'all',
      level: 'all',
      duration: 'all',
      price: 'all',
      rating: 0,
      language: [],
      hasSubtitles: false,
      hasCertificate: false,
      sortBy: 'popular'
    });
  };

  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-secondary border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Formation Filters</h2>
                <p className="text-white/60 text-sm">Find the perfect learning experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="space-y-8">
              
              {/* Formation Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Formation Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'all', label: 'All Formations', icon: Globe, desc: 'Educational & Professional' },
                    { id: 'educational', label: 'Educational', icon: GraduationCap, desc: 'School curriculum based' },
                    { id: 'non-educational', label: 'Professional', icon: Briefcase, desc: 'Skills & career development' }
                  ].map(type => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleTypeChange(type.id as FormationFilters['type'])}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          filters.type === type.id
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-6 h-6 mt-1 ${filters.type === type.id ? 'text-primary' : 'text-white/60'}`} />
                          <div>
                            <h4 className="font-medium text-sm">{type.label}</h4>
                            <p className="text-xs opacity-70 mt-1">{type.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Educational Filters */}
              {filters.type === 'educational' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Country Selection */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-primary" />
                      Country
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {countries.map(country => (
                        <button
                          key={country.code}
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            country: prev.country === country.code ? undefined : country.code 
                          }))}
                          className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                            filters.country === country.code
                              ? 'bg-primary/20 border-primary text-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm font-medium truncate">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Education Level */}
                  {selectedSystem && (
                    <div>
                      <h4 className="text-md font-semibold text-white mb-3">Education Level</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'primary', label: selectedSystem.categories.primary },
                          { id: 'secondary', label: selectedSystem.categories.secondary },
                          { id: 'higher', label: selectedSystem.categories.higher }
                        ].map(level => (
                          <button
                            key={level.id}
                            onClick={() => setFilters(prev => ({ 
                              ...prev, 
                              educationLevel: prev.educationLevel === level.id ? undefined : level.id as any
                            }))}
                            className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                              filters.educationLevel === level.id
                                ? 'bg-primary/20 border-primary text-white'
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                            }`}
                          >
                            <span className="text-sm font-medium">{level.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* School Year */}
                  {availableLevels.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-white mb-3">School Year</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {availableLevels.map(level => (
                          <button
                            key={level.id}
                            onClick={() => setFilters(prev => ({ 
                              ...prev, 
                              schoolYear: prev.schoolYear === level.id ? undefined : level.id
                            }))}
                            className={`p-2 rounded-lg border transition-all duration-200 text-left ${
                              filters.schoolYear === level.id
                                ? 'bg-primary/20 border-primary text-white'
                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                            }`}
                          >
                            <div className="text-xs font-medium">{level.name}</div>
                            <div className="text-xs opacity-60 mt-1">{level.localName}</div>
                            {level.isExamYear && (
                              <div className="text-xs text-yellow-400 mt-1">📋 Exam Year</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subjects */}
                  {availableSubjects.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-white mb-3">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableSubjects.map(subject => {
                          const subjectData = getSubjectById(subject);
                          return (
                            <button
                              key={subject}
                              onClick={() => handleSubjectToggle(subject)}
                              className={`transition-all duration-200 ${
                                filters.subjects?.includes(subject)
                                  ? 'ring-2 ring-primary'
                                  : 'hover:scale-105'
                              }`}
                            >
                              <SubjectBadge
                                subjectId={subject}
                                size="medium"
                                variant={filters.subjects?.includes(subject) ? 'filled' : 'outline'}
                                showText={true}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Non-Educational Filters */}
              {filters.type === 'non-educational' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Category Selection */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Category</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {nonEducationalCategories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            category: prev.category === category.id ? undefined : category.id,
                            subcategory: undefined // Reset subcategory when changing category
                          }))}
                          className={`p-4 rounded-lg border transition-all duration-200 text-center ${
                            filters.category === category.id
                              ? 'bg-primary/20 border-primary text-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="text-sm font-medium">{category.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subcategory Selection */}
                  {filters.category && (
                    <div>
                      <h4 className="text-md font-semibold text-white mb-3">Subcategory</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {nonEducationalCategories
                          .find(cat => cat.id === filters.category)
                          ?.subcategories.map(subcategory => (
                            <button
                              key={subcategory.id}
                              onClick={() => setFilters(prev => ({ 
                                ...prev, 
                                subcategory: prev.subcategory === subcategory.id ? undefined : subcategory.id
                              }))}
                              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                                filters.subcategory === subcategory.id
                                  ? 'bg-primary/20 border-primary text-white'
                                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                              }`}
                            >
                              <span className="text-sm font-medium">{subcategory.name}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Common Filters */}
              <div className="space-y-6 border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white">Additional Filters</h3>
                
                {/* Difficulty Level */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Difficulty Level</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 'all', label: 'All Levels' },
                      { id: 'beginner', label: 'Beginner' },
                      { id: 'intermediate', label: 'Intermediate' },
                      { id: 'advanced', label: 'Advanced' }
                    ].map(level => (
                      <button
                        key={level.id}
                        onClick={() => setFilters(prev => ({ ...prev, level: level.id as any }))}
                        className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                          filters.level === level.id
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm font-medium">{level.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Duration
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 'all', label: 'Any Duration' },
                      { id: 'short', label: 'Short (<5h)' },
                      { id: 'medium', label: 'Medium (5-20h)' },
                      { id: 'long', label: 'Long (>20h)' }
                    ].map(duration => (
                      <button
                        key={duration.id}
                        onClick={() => setFilters(prev => ({ ...prev, duration: duration.id as any }))}
                        className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                          filters.duration === duration.id
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm font-medium">{duration.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-primary" />
                    Price
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'all', label: 'Any Price' },
                      { id: 'free', label: 'Free' },
                      { id: 'paid', label: 'Paid' }
                    ].map(price => (
                      <button
                        key={price.id}
                        onClick={() => setFilters(prev => ({ ...prev, price: price.id as any }))}
                        className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                          filters.price === price.id
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm font-medium">{price.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-primary" />
                    Minimum Rating
                  </h4>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={filters.rating || 0}
                      onChange={(e) => setFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-white font-medium min-w-[3rem]">
                      {filters.rating || 0}+ ⭐
                    </span>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {languages.map(language => (
                      <button
                        key={language}
                        onClick={() => handleLanguageToggle(language)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                          filters.language?.includes(language)
                            ? 'bg-primary/20 border-primary text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasSubtitles || false}
                      onChange={(e) => setFilters(prev => ({ ...prev, hasSubtitles: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-white text-sm">Has Subtitles</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasCertificate || false}
                      onChange={(e) => setFilters(prev => ({ ...prev, hasCertificate: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-white text-sm">Certificate Included</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={clearAllFilters}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Clear All Filters
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterModal;