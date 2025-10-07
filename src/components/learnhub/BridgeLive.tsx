import React, { useState } from 'react';
import { Radio, Calendar, Clock, Users, Mic, Video, Heart, MessageCircle, Share2, Bell, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SubjectBadge from '../ui/SubjectBadge';

interface BridgeLiveProps {
  className?: string;
}

const BridgeLive: React.FC<BridgeLiveProps> = ({ className = '' }) => {
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'podcast' | 'live-show' | 'talk-show'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const formats = [
    {
      id: 'podcast',
      name: 'Podcasts Audio',
      icon: '🎙️',
      description: 'Émissions audio éducatives et inspirantes',
      color: 'text-orange-400'
    },
    {
      id: 'live-show',
      name: 'Shows Live',
      icon: '📺',
      description: 'Émissions en direct avec interaction',
      color: 'text-red-400'
    },
    {
      id: 'talk-show',
      name: 'Talk Shows',
      icon: '💬',
      description: 'Débats et discussions avec invités',
      color: 'text-blue-400'
    }
  ];

  const topics = [
    'Entrepreneuriat', 'Tech & Innovation', 'Finance & Crypto', 'Développement Personnel',
    'Marketing Digital', 'Santé & Bien-être', 'Arts & Culture', 'Science & Éducation'
  ];

  const mockShows = [
    {
      id: '1',
      title: 'Bridge Entrepreneurs - Spécial Startups Tech',
      host: 'Amine Benali & Sarah Chakir',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      format: 'live-show',
      topic: 'entrepreneuriat',
      subjects: ['entrepreneurship', 'technology'],
      status: 'live',
      viewers: 2847,
      duration: '1h 30min',
      startTime: '2024-01-15T20:00:00',
      description: 'Discussion avec 3 fondateurs de startups qui ont levé +1M€ cette année',
      likes: 1203,
      comments: 456,
      isSubscribed: false,
      nextEpisode: '2024-01-22T20:00:00'
    },
    {
      id: '2',
      title: 'Crypto Decoded - Analyse Hebdomadaire',
      host: 'Dr. Youssef Hamdi',
      thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      format: 'podcast',
      topic: 'finance',
      subjects: ['cryptocurrency', 'finance'],
      status: 'scheduled',
      viewers: 0,
      duration: '45min',
      startTime: '2024-01-16T18:00:00',
      description: 'Analyse des mouvements crypto de la semaine avec prédictions expertes',
      likes: 892,
      comments: 234,
      isSubscribed: true,
      nextEpisode: '2024-01-23T18:00:00'
    },
    {
      id: '3',
      title: 'Mind & Success - Mindset des Leaders',
      host: 'Fatima Zahra Alami',
      thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
      format: 'talk-show',
      topic: 'développement-personnel',
      subjects: ['psychology', 'leadership'],
      status: 'recorded',
      viewers: 15623,
      duration: '1h 15min',
      startTime: '2024-01-10T15:00:00',
      description: 'Invité: CEO qui a transformé son échec en succès international',
      likes: 2341,
      comments: 678,
      isSubscribed: true,
      nextEpisode: '2024-01-17T15:00:00'
    },
    {
      id: '4',
      title: 'Bridge Tech Talk - IA & Futur',
      host: 'Mohamed Bennani & Team',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      format: 'live-show',
      topic: 'tech',
      subjects: ['artificial-intelligence', 'technology'],
      status: 'upcoming',
      viewers: 0,
      duration: '2h',
      startTime: '2024-01-18T19:30:00',
      description: 'Débat sur l\'impact de l\'IA sur l\'emploi avec 4 experts internationaux',
      likes: 567,
      comments: 123,
      isSubscribed: false,
      nextEpisode: '2024-01-25T19:30:00'
    }
  ];

  const filteredShows = mockShows.filter(show => {
    if (selectedFormat !== 'all' && show.format !== selectedFormat) return false;
    if (selectedTopic && !show.topic.includes(selectedTopic.toLowerCase())) return false;
    return true;
  });

  const getStatusInfo = (status: string, startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    
    switch (status) {
      case 'live':
        return { text: '🔴 EN DIRECT', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'scheduled':
        const hoursUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60));
        return { text: `📅 Dans ${hoursUntil}h`, color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
      case 'upcoming':
        const daysUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { text: `⏰ Dans ${daysUntil}j`, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
      default:
        return { text: '📼 REPLAY', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
            <Radio className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Bridge Live</h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Podcasts exclusifs, talk-shows inspirants et émissions live avec des experts du monde entier
        </p>
      </div>

      {/* Format Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2 text-red-400" />
          Format d'émission
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFormat('all')}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              selectedFormat === 'all'
                ? 'bg-red-500/20 border-red-400 text-white'
                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="text-2xl mb-2">🎬</div>
            <div className="font-medium text-sm">Tout voir</div>
          </motion.button>
          
          {formats.map(format => (
            <motion.button
              key={format.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedFormat(format.id as any)}
              className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                selectedFormat === format.id
                  ? 'bg-red-500/20 border-red-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-2">{format.icon}</div>
              <h4 className={`font-semibold text-sm mb-1 ${selectedFormat === format.id ? 'text-white' : format.color}`}>
                {format.name}
              </h4>
              <p className="text-xs opacity-70">{format.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Topic Filters */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Thématiques</h3>
        <div className="flex flex-wrap gap-3">
          {topics.map(topic => (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTopic(topic === selectedTopic ? '' : topic)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedTopic === topic
                  ? 'bg-red-500/20 border-red-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
              }`}
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Shows List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Émissions disponibles</h3>
          <span className="text-white/60 text-sm">{filteredShows.length} émissions trouvées</span>
        </div>

        <div className="space-y-6">
          {filteredShows.map(show => {
            const statusInfo = getStatusInfo(show.status, show.startTime);
            
            return (
              <motion.div
                key={show.id}
                whileHover={{ y: -2 }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-red-400/50 transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail */}
                  <div className="relative lg:w-80 aspect-video lg:aspect-[4/3] overflow-hidden">
                    <img
                      src={show.thumbnail}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.bgColor} ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>

                    {/* Format Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                        {formats.find(f => f.id === show.format)?.icon}
                      </span>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {show.status === 'live' ? (
                          <Radio className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Live Viewers Counter */}
                    {show.status === 'live' && (
                      <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">{show.viewers.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {show.subjects.map(subject => (
                            <SubjectBadge
                              key={subject}
                              subjectId={subject}
                              size="small"
                              variant="outline"
                              showText={false}
                            />
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                          {show.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-3">Par {show.host}</p>
                      </div>
                      
                      <button 
                        className={`p-2 rounded-full transition-colors ${
                          show.isSubscribed 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <Bell className={`w-5 h-5 ${show.isSubscribed ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {show.description}
                    </p>

                    {/* Show Info */}
                    <div className="flex items-center space-x-6 text-sm text-white/60 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(show.startTime)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{show.duration}</span>
                      </div>
                      {show.status === 'recorded' && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{show.viewers.toLocaleString()} vues</span>
                        </div>
                      )}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{show.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{show.comments}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-white/60 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                          {show.status === 'live' ? (
                            <>
                              <Radio className="w-4 h-4" />
                              <span>Regarder en Direct</span>
                            </>
                          ) : show.status === 'recorded' ? (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Voir le Replay</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-4 h-4" />
                              <span>Me Rappeler</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Next Episode */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50">
                        Prochain épisode: {formatDate(show.nextEpisode)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Getting Started Section */}
      {selectedFormat === 'all' && !selectedTopic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Radio className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Découvrez nos émissions exclusives
            </h3>
            <p className="text-white/70 mb-6">
              Sélectionnez un format ou une thématique pour explorer notre contenu live et audio
            </p>
            <div className="text-white/50 text-sm">
              ✓ Émissions live avec interaction en temps réel<br/>
              ✓ Podcasts exclusifs avec des experts<br/>
              ✓ Talk-shows avec des personnalités inspirantes<br/>
              ✓ Replays disponibles 24h/7j
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BridgeLive;