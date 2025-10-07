import React, { useState } from 'react';
import { GraduationCap, Globe, BookOpen, Play, Clock, Users, Star, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { educationSystems, getEducationSystemByCountry, getLevelsByCategory } from '../../config/educationSystems';
import SubjectBadge from '../ui/SubjectBadge';

interface BridgeSchoolProps {
  className?: string;
}

const BridgeSchool: React.FC<BridgeSchoolProps> = ({ className = '' }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<'primary' | 'secondary' | 'higher' | ''>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const countries = educationSystems.map(system => ({
    code: system.countryCode,
    name: system.country,
    flag: system.flag
  }));

  const selectedSystem = selectedCountry ? getEducationSystemByCountry(selectedCountry) : null;
  const availableLevels = selectedSystem && selectedLevel ? getLevelsByCategory(selectedSystem, selectedLevel) : [];

  // Mock course data for selected configuration
  const mockCourses = [
    {
      id: '1',
      title: 'Mathématiques - Programme Complet',
      instructor: 'Prof. Ahmed Benali',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae4c2d99cd?w=300&h=200&fit=crop',
      duration: '45h',
      students: '2,341',
      rating: 4.9,
      type: 'recorded',
      subjects: ['mathematics'],
      nextLive: '2024-01-15 14:00',
      progress: 35
    },
    {
      id: '2',
      title: 'Sciences Physiques et Chimie',
      instructor: 'Dr. Fatima Zahra',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
      duration: '38h',
      students: '1,876',
      rating: 4.8,
      type: 'live',
      subjects: ['physics', 'chemistry'],
      nextLive: '2024-01-16 15:30',
      progress: 0
    },
    {
      id: '3',
      title: 'Langues et Communication',
      instructor: 'Mme. Sophie Martin',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      duration: '32h',
      students: '3,124',
      rating: 4.7,
      type: 'recorded',
      subjects: ['french', 'arabic'],
      nextLive: '2024-01-17 10:00',
      progress: 67
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Bridge School</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Programme scolaire adapté par pays avec cours enregistrés et sessions live en temps réel
        </p>
      </div>

      {/* Country Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-400" />
          Sélectionnez votre pays
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {countries.map(country => (
            <motion.button
              key={country.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCountry(country.code === selectedCountry ? '' : country.code);
                setSelectedLevel('');
                setSelectedYear('');
              }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                selectedCountry === country.code
                  ? 'bg-blue-500/20 border-blue-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-2">{country.flag}</div>
              <div className="text-sm font-medium">{country.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Education Level Selection */}
      {selectedSystem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Niveau d'enseignement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                id: 'primary', 
                label: selectedSystem.categories.primary, 
                icon: '👶',
                desc: 'Enseignement de base et fondamental'
              },
              { 
                id: 'secondary', 
                label: selectedSystem.categories.secondary, 
                icon: '🎓',
                desc: 'Préparation aux examens nationaux'
              },
              { 
                id: 'higher', 
                label: selectedSystem.categories.higher, 
                icon: '🏛️',
                desc: 'Enseignement supérieur et universitaire'
              }
            ].map(level => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedLevel(level.id === selectedLevel ? '' : level.id as any);
                  setSelectedYear('');
                }}
                className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                  selectedLevel === level.id
                    ? 'bg-blue-500/20 border-blue-400 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{level.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{level.label}</h4>
                    <p className="text-sm opacity-70">{level.desc}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* School Year Selection */}
      {availableLevels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Année scolaire</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableLevels.map(year => (
              <motion.button
                key={year.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedYear(year.id === selectedYear ? '' : year.id)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  selectedYear === year.id
                    ? 'bg-blue-500/20 border-blue-400 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="font-medium text-sm mb-1">{year.name}</div>
                <div className="text-xs opacity-60 mb-2">{year.localName}</div>
                <div className="text-xs opacity-50">
                  {year.ageRange[0]}-{year.ageRange[1]} ans
                </div>
                {year.isExamYear && (
                  <div className="mt-2 flex items-center text-yellow-400">
                    <Award className="w-3 h-3 mr-1" />
                    <span className="text-xs">Année d'examen</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available Courses */}
      {selectedYear && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Cours disponibles</h3>
            <span className="text-white/60 text-sm">{mockCourses.length} cours trouvés</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map(course => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 transition-all duration-200 group"
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Course Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.type === 'live' 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-blue-500/80 text-white'
                    }`}>
                      {course.type === 'live' ? '🔴 LIVE' : '📹 Enregistré'}
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
                        className="h-full bg-blue-400 transition-all duration-300"
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

                  {/* Course Stats */}
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

                  {/* Next Live Session */}
                  {course.type === 'live' && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 text-red-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Prochaine session: {new Date(course.nextLive).toLocaleString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    {course.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Continuer ({course.progress}%)</span>
                      </>
                    ) : course.type === 'live' ? (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Rejoindre la session</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>Commencer le cours</span>
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
      {!selectedCountry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Commencez votre parcours scolaire
            </h3>
            <p className="text-white/70 mb-6">
              Sélectionnez votre pays pour accéder aux programmes adaptés à votre système éducatif
            </p>
            <div className="text-white/50 text-sm">
              ✓ Programmes conformes aux curriculums nationaux<br/>
              ✓ Cours enregistrés + Sessions live<br/>
              ✓ Suivi personnalisé de progression
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BridgeSchool;