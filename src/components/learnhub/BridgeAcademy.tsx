import React, { useState } from 'react';
import { Briefcase, Target, TrendingUp, Clock, Users, Star, Play, BookOpen, Award, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import SubjectBadge from '../ui/SubjectBadge';

interface BridgeAcademyProps {
  className?: string;
}

const BridgeAcademy: React.FC<BridgeAcademyProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  const categories = [
    {
      id: 'business',
      name: 'Business & Entrepreneuriat',
      icon: '💼',
      description: 'Compétences entrepreneuriales et gestion d\'entreprise',
      domains: ['marketing', 'finance', 'management', 'strategy']
    },
    {
      id: 'tech',
      name: 'Technologies & Digital',
      icon: '💻',
      description: 'Développement, data science et compétences numériques',
      domains: ['programming', 'data', 'design', 'cybersecurity']
    },
    {
      id: 'creative',
      name: 'Arts & Créativité',
      icon: '🎨',
      description: 'Design, arts visuels et création de contenu',
      domains: ['graphic-design', 'photography', 'video', 'music']
    },
    {
      id: 'personal',
      name: 'Développement Personnel',
      icon: '🧠',
      description: 'Leadership, communication et croissance personnelle',
      domains: ['leadership', 'communication', 'productivity', 'mindset']
    },
    {
      id: 'health',
      name: 'Santé & Bien-être',
      icon: '🏃‍♂️',
      description: 'Nutrition, fitness et développement holistique',
      domains: ['nutrition', 'fitness', 'mental-health', 'lifestyle']
    },
    {
      id: 'finance',
      name: 'Finance & Investissement',
      icon: '📈',
      description: 'Gestion financière et stratégies d\'investissement',
      domains: ['personal-finance', 'investing', 'crypto', 'real-estate']
    }
  ];

  const levels = [
    {
      id: 'beginner',
      name: 'Débutant',
      icon: '🌱',
      description: 'Pour ceux qui commencent leur parcours',
      color: 'text-green-400'
    },
    {
      id: 'intermediate',
      name: 'Intermédiaire',
      icon: '🚀',
      description: 'Approfondissement des connaissances',
      color: 'text-blue-400'
    },
    {
      id: 'advanced',
      name: 'Avancé',
      icon: '👑',
      description: 'Expertise et maîtrise complète',
      color: 'text-purple-400'
    }
  ];

  const mockCourses = [
    {
      id: '1',
      title: 'Marketing Digital Avancé',
      instructor: 'Amine Chakir - Expert Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      duration: '12h',
      students: '4,567',
      rating: 4.9,
      level: 'advanced',
      category: 'business',
      domain: 'marketing',
      subjects: ['marketing', 'digital'],
      price: 149,
      type: 'recorded',
      nextLive: '2024-01-20 16:00',
      progress: 0,
      certificate: true,
      practicalProjects: 5
    },
    {
      id: '2',
      title: 'Python pour Data Science',
      instructor: 'Dr. Sarah Bennani - Data Scientist',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop',
      duration: '25h',
      students: '3,241',
      rating: 4.8,
      level: 'intermediate',
      category: 'tech',
      domain: 'data',
      subjects: ['python', 'data-science'],
      price: 199,
      type: 'hybrid',
      nextLive: '2024-01-18 19:00',
      progress: 23,
      certificate: true,
      practicalProjects: 8
    },
    {
      id: '3',
      title: 'Leadership et Management',
      instructor: 'Mohamed Alami - Executive Coach',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
      duration: '18h',
      students: '2,893',
      rating: 4.9,
      level: 'intermediate',
      category: 'personal',
      domain: 'leadership',
      subjects: ['leadership', 'management'],
      price: 129,
      type: 'live',
      nextLive: '2024-01-19 14:30',
      progress: 0,
      certificate: true,
      practicalProjects: 3
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const filteredCourses = mockCourses.filter(course => {
    if (selectedCategory && course.category !== selectedCategory) return false;
    if (selectedLevel && course.level !== selectedLevel) return false;
    if (selectedDomain && course.domain !== selectedDomain) return false;
    return true;
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Bridge Academy</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Formation professionnelle pour adultes actifs, entrepreneurs et professionnels en reconversion
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            Domaines de formation
          </h3>
          <button 
            onClick={() => {
              setSelectedCategory('');
              setSelectedLevel('');
              setSelectedDomain('');
            }}
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
          >
            <Filter className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(category.id === selectedCategory ? '' : category.id);
                setSelectedDomain('');
              }}
              className={`p-5 rounded-xl border transition-all duration-200 text-left group ${
                selectedCategory === category.id
                  ? 'bg-purple-500/20 border-purple-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-sm opacity-70 mb-2">{category.description}</p>
                  <div className="text-xs opacity-50">
                    {category.domains.length} spécialisations disponibles
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Level Selection */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Niveau d'expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levels.map(level => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLevel(level.id === selectedLevel ? '' : level.id as any)}
                className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedLevel === level.id
                    ? 'bg-purple-500/20 border-purple-400 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{level.icon}</div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${selectedLevel === level.id ? 'text-white' : level.color}`}>
                      {level.name}
                    </h4>
                    <p className="text-sm opacity-70">{level.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Domain Filters */}
      {selectedCategoryData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Spécialisations</h3>
          <div className="flex flex-wrap gap-3">
            {selectedCategoryData.domains.map(domain => (
              <motion.button
                key={domain}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDomain(domain === selectedDomain ? '' : domain)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedDomain === domain
                    ? 'bg-purple-500/20 border-purple-400 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                }`}
              >
                {domain.charAt(0).toUpperCase() + domain.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available Courses */}
      {(selectedCategory || selectedLevel) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Formations disponibles</h3>
            <span className="text-white/60 text-sm">{filteredCourses.length} formations trouvées</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/50 transition-all duration-200 group"
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Course Type & Level Badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.type === 'live' 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : course.type === 'hybrid'
                        ? 'bg-orange-500/80 text-white'
                        : 'bg-blue-500/80 text-white'
                    }`}>
                      {course.type === 'live' ? '🔴 LIVE' : 
                       course.type === 'hybrid' ? '🔄 HYBRIDE' : '📹 Enregistré'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'beginner' ? 'bg-green-500/80' :
                      course.level === 'intermediate' ? 'bg-blue-500/80' : 'bg-purple-500/80'
                    } text-white`}>
                      {course.level === 'beginner' ? 'DÉBUTANT' :
                       course.level === 'intermediate' ? 'INTERMÉDIAIRE' : 'AVANCÉ'}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-bold">
                      {course.price}€
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div 
                        className="h-full bg-purple-400 transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold text-lg line-clamp-2 flex-1 mr-2">
                      {course.title}
                    </h4>
                    <div className="flex gap-1">
                      {course.subjects.map(subject => (
                        <SubjectBadge
                          key={subject}
                          subjectId={subject}
                          size="small"
                          variant="filled"
                          showText={false}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-white/60 text-sm mb-4">{course.instructor}</p>

                  {/* Course Features */}
                  <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Benefits */}
                  <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                    {course.certificate && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>Certificat</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{course.practicalProjects} projets pratiques</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    {course.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Continuer ({course.progress}%)</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>Commencer la formation - {course.price}€</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Getting Started Section */}
      {!selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Développez vos compétences professionnelles
            </h3>
            <p className="text-white/70 mb-6">
              Choisissez votre domaine d'expertise et commencez votre parcours de formation professionnelle
            </p>
            <div className="text-white/50 text-sm">
              ✓ Formations certifiantes<br/>
              ✓ Projets pratiques et cas réels<br/>
              ✓ Sessions live avec experts<br/>
              ✓ Accès à vie au contenu
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BridgeAcademy;