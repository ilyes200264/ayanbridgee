import React, { useState } from 'react';
import { Star, Clock, Users, Play, Award, BookOpen, TrendingUp, Heart, Filter } from 'lucide-react';
import SubjectBadge from '../../components/ui/SubjectBadge';
import FilterModal, { type FormationFilters } from '../../components/formations/FilterModal';

interface Formation {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: string;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  description: string;
  bestseller: boolean;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  
  // New educational fields
  type: 'educational' | 'non-educational';
  country?: string;
  educationLevel?: 'primary' | 'secondary' | 'higher';
  schoolYear?: string;
  subjects?: string[];
  hasSubtitles?: boolean;
}

const FormationsSection: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FormationFilters>({
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
  const [filteredFormations, setFilteredFormations] = useState<Formation[]>([]);
  const formations: Formation[] = [
    {
      id: '1',
      title: 'Complete AI Business Strategy Masterclass 2024',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=480&h=270&fit=crop',
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 2847,
      students: '12,458',
      duration: '25.5 hours',
      lessons: 157,
      level: 'Intermediate',
      category: 'Business Strategy',
      tags: ['AI', 'Strategy', 'Innovation'],
      description: 'Master the art of integrating artificial intelligence into your business strategy for sustainable growth.',
      bestseller: true,
      lastUpdated: '12/2023',
      language: 'English',
      certificate: true,
      type: 'non-educational',
      hasSubtitles: true
    },
    {
      id: '13',
      title: 'Mathématiques Terminale S - Préparation BAC',
      instructor: 'Prof. Ahmed Benali',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae4c2d99cd?w=480&h=270&fit=crop',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviews: 1245,
      students: '8,350',
      duration: '45 hours',
      lessons: 120,
      level: 'Advanced',
      category: 'Mathematics',
      tags: ['BAC', 'Mathematics', 'Algeria'],
      description: 'Cours complet de mathématiques pour la terminale scientifique selon le programme algérien.',
      bestseller: true,
      lastUpdated: '01/2024',
      language: 'French',
      certificate: true,
      type: 'educational',
      country: 'DZ',
      educationLevel: 'secondary',
      schoolYear: 'bac',
      subjects: ['mathematics'],
      hasSubtitles: true
    },
    {
      id: '14',
      title: 'Physique-Chimie 1ère Année Bac Maroc',
      instructor: 'Dr. Fatima Zahra',
      instructorAvatar: 'https://images.unsplash.com/photo-1594736797933-d0ca29b29de2?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=480&h=270&fit=crop',
      price: 39.99,
      rating: 4.7,
      reviews: 890,
      students: '5,200',
      duration: '32 hours',
      lessons: 85,
      level: 'Intermediate',
      category: 'Sciences',
      tags: ['Physics', 'Chemistry', 'Morocco'],
      description: 'Formation complète en physique-chimie pour la première année baccalauréat marocain.',
      bestseller: false,
      lastUpdated: '11/2023',
      language: 'French',
      certificate: true,
      type: 'educational',
      country: 'MA',
      educationLevel: 'secondary',
      schoolYear: 'lycee1',
      subjects: ['physics', 'chemistry'],
      hasSubtitles: false
    },
    {
      id: '2',
      title: 'Machine Learning for Business Leaders',
      instructor: 'Prof. David Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=480&h=270&fit=crop',
      price: 79.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 1923,
      students: '8,234',
      duration: '18.5 hours',
      lessons: 98,
      level: 'Beginner',
      category: 'Technology',
      tags: ['ML', 'Python', 'Business'],
      description: 'Learn how to implement machine learning solutions without deep technical knowledge.',
      bestseller: false,
      lastUpdated: '11/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '3',
      title: 'Digital Marketing Automation with AI Tools',
      instructor: 'Maria Rodriguez',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=270&fit=crop',
      price: 69.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviews: 3156,
      students: '15,678',
      duration: '22 hours',
      lessons: 134,
      level: 'Intermediate',
      category: 'Marketing',
      tags: ['Marketing', 'Automation', 'AI'],
      description: 'Transform your marketing strategy with cutting-edge AI automation tools and techniques.',
      bestseller: true,
      lastUpdated: '01/2024',
      language: 'English',
      certificate: true
    },
    {
      id: '4',
      title: 'Startup Funding: From Idea to Series A',
      instructor: 'Alex Turner',
      instructorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
      price: 94.99,
      rating: 4.6,
      reviews: 1678,
      students: '6,789',
      duration: '16 hours',
      lessons: 89,
      level: 'Advanced',
      category: 'Entrepreneurship',
      tags: ['Funding', 'Startup', 'Investment'],
      description: 'Navigate the complex world of startup funding from angel investors to venture capital.',
      bestseller: false,
      lastUpdated: '10/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '5',
      title: 'UX/UI Design for AI Applications',
      instructor: 'Emma Wilson',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=480&h=270&fit=crop',
      price: 59.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 2234,
      students: '9,456',
      duration: '14 hours',
      lessons: 76,
      level: 'Intermediate',
      category: 'Design',
      tags: ['UX', 'UI', 'AI', 'Figma'],
      description: 'Design intuitive user experiences for AI-powered applications and platforms.',
      bestseller: false,
      lastUpdated: '12/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '6',
      title: 'Financial Management for Tech Startups',
      instructor: 'Robert Kim',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=270&fit=crop',
      price: 84.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 1445,
      students: '5,234',
      duration: '20 hours',
      lessons: 112,
      level: 'Advanced',
      category: 'Finance',
      tags: ['Finance', 'Startup', 'Management'],
      description: 'Master financial planning, forecasting, and management for technology startups.',
      bestseller: false,
      lastUpdated: '09/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '7',
      title: 'Blockchain Development Complete Course',
      instructor: 'Michael Roberts',
      instructorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=480&h=270&fit=crop',
      price: 109.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 1876,
      students: '7,342',
      duration: '30 hours',
      lessons: 186,
      level: 'Advanced',
      category: 'Blockchain',
      tags: ['Blockchain', 'Solidity', 'Web3'],
      description: 'Comprehensive blockchain development course covering smart contracts and DApp creation.',
      bestseller: true,
      lastUpdated: '01/2024',
      language: 'English',
      certificate: true
    },
    {
      id: '8',
      title: 'Data Science for Business Analytics',
      instructor: 'Dr. Jennifer Liu',
      instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop',
      price: 74.99,
      originalPrice: 139.99,
      rating: 4.8,
      reviews: 2564,
      students: '11,233',
      duration: '26 hours',
      lessons: 142,
      level: 'Intermediate',
      category: 'Data Science',
      tags: ['Python', 'Analytics', 'Visualization'],
      description: 'Transform business decisions with data science, analytics, and machine learning techniques.',
      bestseller: false,
      lastUpdated: '12/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '9',
      title: 'Cybersecurity Fundamentals for Executives',
      instructor: 'James Foster',
      instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=480&h=270&fit=crop',
      price: 64.99,
      rating: 4.5,
      reviews: 1234,
      students: '5,678',
      duration: '12 hours',
      lessons: 67,
      level: 'Beginner',
      category: 'Cybersecurity',
      tags: ['Security', 'Risk', 'Compliance'],
      description: 'Essential cybersecurity knowledge for business leaders and decision makers.',
      bestseller: false,
      lastUpdated: '11/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '10',
      title: 'Remote Team Leadership Mastery',
      instructor: 'Lisa Martinez',
      instructorAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=270&fit=crop',
      price: 49.99,
      originalPrice: 89.99,
      rating: 4.7,
      reviews: 1987,
      students: '8,765',
      duration: '15 hours',
      lessons: 89,
      level: 'Intermediate',
      category: 'Leadership',
      tags: ['Remote', 'Management', 'Culture'],
      description: 'Master the skills needed to lead and manage high-performing remote teams effectively.',
      bestseller: true,
      lastUpdated: '01/2024',
      language: 'English',
      certificate: true
    },
    {
      id: '11',
      title: 'E-commerce Growth & Optimization',
      instructor: 'Carlos Rodriguez',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=270&fit=crop',
      price: 69.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 2345,
      students: '9,876',
      duration: '19 hours',
      lessons: 103,
      level: 'Intermediate',
      category: 'E-commerce',
      tags: ['Growth', 'Conversion', 'Analytics'],
      description: 'Comprehensive strategies to grow and optimize your e-commerce business for maximum revenue.',
      bestseller: false,
      lastUpdated: '12/2023',
      language: 'English',
      certificate: true
    },
    {
      id: '12',
      title: 'Product Management Excellence',
      instructor: 'Anna Thompson',
      instructorAvatar: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=40&h=40&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&h=270&fit=crop',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.9,
      reviews: 2876,
      students: '12,345',
      duration: '24 hours',
      lessons: 128,
      level: 'Advanced',
      category: 'Product Management',
      tags: ['Strategy', 'Agile', 'Roadmap'],
      description: 'Advanced product management strategies for building and launching successful products.',
      bestseller: true,
      lastUpdated: '01/2024',
      language: 'English',
      certificate: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-white/20'
        }`}
      />
    ));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Formations & Courses</h1>
        <p className="text-white/70">Comprehensive training programs to advance your skills</p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Advanced Filters</span>
            {(filters.type !== 'all' || filters.country || filters.category) && (
              <span className="ml-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
          
          {/* Active Filters Display */}
          {(filters.type !== 'all' || filters.country || filters.category) && (
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm">Active filters:</span>
              {filters.type !== 'all' && (
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                  {filters.type === 'educational' ? '📚 Educational' : '💼 Professional'}
                </span>
              )}
              {filters.country && (
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                  🌍 {filters.country}
                </span>
              )}
              {filters.category && (
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                  {filters.category}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-white/60 text-sm">
          {filteredFormations.length || formations.length} courses
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          // Apply filtering logic here
        }}
        currentFilters={filters}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations.map((course) => (
          <div key={course.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            {/* Course Thumbnail */}
            <div className="relative aspect-video bg-white/5 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-4xl text-white/20">🎓</div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {course.bestseller && (
                  <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
                    BESTSELLER
                  </div>
                )}
                {course.originalPrice && (
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{course.duration}</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200">
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg" aria-label="Add to wishlist">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-5">
              {/* Category and Level */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-primary font-medium">{course.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              {/* Title & Subject Badge */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors flex-1 mr-2">
                  {course.title}
                </h3>
                <SubjectBadge 
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  size="small"
                  variant="filled"
                  showText={false}
                />
              </div>

              {/* Instructor */}
              <p className="text-white/60 text-sm mb-3">by {course.instructor}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-yellow-400 font-bold text-sm">{course.rating}</span>
                <div className="flex items-center space-x-1">
                  {renderStars(course.rating)}
                </div>
                <span className="text-white/50 text-sm">({course.reviews.toLocaleString()})</span>
              </div>

              {/* Course Stats */}
              <div className="flex items-center space-x-4 mb-4 text-white/60 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>Certificate</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-xl">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-white/50 text-sm line-through">${course.originalPrice}</span>
                  )}
                </div>
                <div className="text-white/50 text-xs">
                  Updated {course.lastUpdated}
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center flex-wrap gap-1 mb-4">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Enroll Now
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Add to cart">
                  <TrendingUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Courses Section */}
      <div className="mt-12 p-6 bg-secondary-light rounded-xl border border-white/10">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-white">Featured Bestsellers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formations.filter(course => course.bestseller).slice(0, 2).map((course) => (
            <div key={`featured-${course.id}`} className="flex space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="relative w-24 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-2xl text-white/20">🎓</div>
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-1 rounded font-bold">
                  #1
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-white/60 text-xs mb-2">by {course.instructor}</p>
                <div className="flex items-center space-x-2 text-xs text-white/50">
                  <span className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </span>
                  <span>•</span>
                  <span>{course.students} students</span>
                  <span>•</span>
                  <span className="text-primary font-bold">${course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Load More Courses
        </button>
      </div>
    </div>
  );
};

export default FormationsSection; 