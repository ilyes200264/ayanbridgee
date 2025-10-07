import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Users, 
  Play, 
  CheckCircle, 
  Calendar, 
  Target, 
  Star,
  Trophy,
  Radio,
  PlusCircle,
  Filter,
  Search,
  Book,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import PDFPreviewModal from '../components/PDFPreviewModal';
import { motion } from 'framer-motion';
import BridgeSchool from '../components/learnhub/BridgeSchool';
import BridgeAcademy from '../components/learnhub/BridgeAcademy';
import BridgeLive from '../components/learnhub/BridgeLive';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  enrolled: number;
  progress: number;
  category: string;
  instructor: string;
  rating: number;
  certificate: boolean;
  nextModule: string;
  skills: string[];
}

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  category: string;
  isLive: boolean;
  isRegistered: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  pathId: string;
  score: number;
  skills: string[];
  verified: boolean;
}

const LearnHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bridge-school' | 'bridge-academy' | 'bridge-live' | 'paths' | 'sessions' | 'certificates'>('overview');
  const [pdfPreview, setPdfPreview] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
    author: string;
  }>({
    isOpen: false,
    pdfUrl: '',
    title: '',
    author: ''
  });
  
  const { purchasedItems } = useCart();

  const openPDFPreview = (pdfUrl: string, title: string, author: string) => {
    setPdfPreview({
      isOpen: true,
      pdfUrl,
      title,
      author
    });
  };

  const closePDFPreview = () => {
    setPdfPreview({
      isOpen: false,
      pdfUrl: '',
      title: '',
      author: ''
    });
  };

  const purchasedEbooks = purchasedItems.filter(item => item.type === 'ebook');

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'AI Business Strategy Fundamentals',
      description: 'Master the essential concepts of integrating AI into business strategy and operations.',
      difficulty: 'Beginner',
      duration: '12 weeks',
      modules: 8,
      enrolled: 2847,
      progress: 65,
      category: 'Business Strategy',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      certificate: true,
      nextModule: 'AI Implementation Planning',
      skills: ['Strategy', 'AI Integration', 'Business Planning']
    },
    {
      id: '2',
      title: 'Machine Learning for Business Leaders',
      description: 'Comprehensive path covering ML applications in business without deep technical requirements.',
      difficulty: 'Intermediate',
      duration: '16 weeks',
      modules: 12,
      enrolled: 1923,
      progress: 30,
      category: 'Technology',
      instructor: 'Prof. David Chen',
      rating: 4.7,
      certificate: true,
      nextModule: 'Data Analytics Fundamentals',
      skills: ['Machine Learning', 'Data Science', 'Analytics']
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Complete digital marketing curriculum with AI-powered tools and automation strategies.',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      modules: 10,
      enrolled: 3156,
      progress: 0,
      category: 'Marketing',
      instructor: 'Maria Rodriguez',
      rating: 4.9,
      certificate: true,
      nextModule: 'Getting Started with Digital Marketing',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics']
    }
  ];

  const liveSessions: LiveSession[] = [
    {
      id: '1',
      title: 'AI Strategy Workshop: Real-World Case Studies',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '14:00',
      duration: '2 hours',
      participants: 45,
      maxParticipants: 50,
      category: 'Business Strategy',
      isLive: false,
      isRegistered: true
    },
    {
      id: '2',
      title: 'Machine Learning Q&A Session',
      instructor: 'Prof. David Chen',
      date: '2024-01-12',
      time: '16:00',
      duration: '1.5 hours',
      participants: 32,
      maxParticipants: 40,
      category: 'Technology',
      isLive: true,
      isRegistered: false
    },
    {
      id: '3',
      title: 'Digital Marketing Trends 2024',
      instructor: 'Maria Rodriguez',
      date: '2024-01-18',
      time: '10:00',
      duration: '1 hour',
      participants: 28,
      maxParticipants: 60,
      category: 'Marketing',
      isLive: false,
      isRegistered: false
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Business Intelligence Fundamentals',
      issueDate: '2023-12-15',
      pathId: '1',
      score: 92,
      skills: ['BI', 'Analytics', 'Data Visualization'],
      verified: true
    },
    {
      id: '2',
      title: 'Project Management Essentials',
      issueDate: '2023-11-20',
      pathId: '2',
      score: 88,
      skills: ['Project Management', 'Leadership', 'Planning'],
      verified: true
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

  const getDifficultyColor = (level: string) => {
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

  // Demo video component
  const DemoVideo = () => (
    <div className="relative mb-8">
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl overflow-hidden border border-white/10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
              <p className="text-lg">Demo Video - Platform Overview</p>
            </div>
          </div>
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold mb-1">Découvrez AyanBridge Learn Hub</h3>
          <p className="text-sm text-white/80">Votre plateforme d'apprentissage tout-en-un</p>
        </div>
      </div>
    </div>
  );

  // Bridge Pillars Overview
  const BridgePillarsOverview = () => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Nos 3 Piliers d'Apprentissage</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('bridge-school')}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-400/30 cursor-pointer group hover:border-blue-400/50 transition-all duration-200"
        >
          <div className="w-16 h-16 bg-blue-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Bridge School</h3>
          <p className="text-blue-200/80 text-sm mb-4">
            Programme scolaire adapté par pays avec cours enregistrés et sessions live
          </p>
          <div className="text-xs text-blue-300/60">
            ✓ Programmes par pays<br/>
            ✓ Cours live + enregistrés<br/>
            ✓ Suivi de progression
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('bridge-academy')}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-400/30 cursor-pointer group hover:border-purple-400/50 transition-all duration-200"
        >
          <div className="w-16 h-16 bg-purple-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Briefcase className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Bridge Academy</h3>
          <p className="text-purple-200/80 text-sm mb-4">
            Formation professionnelle pour adultes actifs et entrepreneurs
          </p>
          <div className="text-xs text-purple-300/60">
            ✓ Formations certifiantes<br/>
            ✓ Projets pratiques<br/>
            ✓ Sessions avec experts
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('bridge-live')}
          className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-6 rounded-xl border border-red-400/30 cursor-pointer group hover:border-red-400/50 transition-all duration-200"
        >
          <div className="w-16 h-16 bg-red-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Radio className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Bridge Live</h3>
          <p className="text-red-200/80 text-sm mb-4">
            Podcasts, talk-shows et émissions live avec des experts
          </p>
          <div className="text-xs text-red-300/60">
            ✓ Podcasts exclusifs<br/>
            ✓ Shows live interactifs<br/>
            ✓ Débats avec experts
          </div>
        </motion.div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Demo Video */}
      <DemoVideo />
      
      {/* Bridge Pillars */}
      <BridgePillarsOverview />
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">65%</div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-sm text-white/60">Average across all paths</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Certificates Earned</h3>
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{certificates.length}</div>
          <p className="text-sm text-white/60">Total achievements</p>
        </div>

        <div className="bg-secondary-light p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Study Time</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">47h</div>
          <p className="text-sm text-white/60">This month</p>
        </div>
      </div>

      {/* Current Learning Paths */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Continue Learning</h3>
        <div className="space-y-4">
          {learningPaths.filter(path => path.progress > 0).map((path) => (
            <div key={path.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{path.title}</h4>
                <p className="text-sm text-white/60 mb-2">Next: {path.nextModule}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${path.progress}%` }}></div>
                  </div>
                  <span className="text-sm text-white/60">{path.progress}%</span>
                </div>
              </div>
              <button className="ml-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Purchased Ebooks */}
      {purchasedEbooks.length > 0 && (
        <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Your Ebooks</h3>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {purchasedEbooks.slice(0, 3).map((ebook) => (
              <div key={ebook.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <img
                    src={ebook.cover}
                    alt={ebook.title}
                    className="w-12 h-16 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" fill="%23374151"><rect width="200" height="300" fill="%23374151"/><text x="100" y="150" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="48">📖</text></svg>';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm line-clamp-2 mb-1">
                      {ebook.title}
                    </h4>
                    <p className="text-white/60 text-xs mb-2">by {ebook.author}</p>
                    <p className="text-white/50 text-xs mb-3">
                      Purchased on {new Date(ebook.purchaseDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => openPDFPreview(ebook.pdfUrl || '', ebook.title, ebook.author)}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Book className="w-4 h-4" />
                      <span>Read</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Upcoming Live Sessions</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {liveSessions.slice(0, 2).map((session) => (
            <div key={session.id} className="flex items-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                <Radio className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60">{session.instructor}</p>
                <div className="flex items-center space-x-4 text-sm text-white/50 mt-1">
                  <span>{session.date}</span>
                  <span>{session.time}</span>
                  <span>{session.duration}</span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                session.isRegistered 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}>
                {session.isRegistered ? 'Registered' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PathsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search learning paths..."
              className="w-full pl-10 pr-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-light border border-white/20 rounded-lg text-white hover:bg-white/5">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <div key={path.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-primary font-medium">{path.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                </div>
                {path.certificate && (
                  <Award className="w-5 h-5 text-yellow-400" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              
              <p className="text-sm text-white/70 mb-4 line-clamp-2">
                {path.description}
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(path.rating)}
                </div>
                <span className="text-sm text-white/60">{path.rating}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{path.modules} modules</span>
                  <span>{path.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{path.enrolled.toLocaleString()} enrolled</span>
                  <span>by {path.instructor}</span>
                </div>
              </div>

              {path.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${path.progress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {path.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors">
                {path.progress > 0 ? 'Continue Learning' : 'Start Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Path */}
      <div className="bg-secondary-light rounded-xl border border-white/10 border-dashed p-8 text-center hover:border-white/20 transition-colors cursor-pointer">
        <PlusCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Explore More Paths</h3>
        <p className="text-white/60 mb-4">Discover new learning opportunities tailored to your goals</p>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Browse Catalog
        </button>
      </div>
    </div>
  );

  const SessionsTab = () => (
    <div className="space-y-6">
      {/* Live Now */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-white">Live Now</h3>
        </div>
        {liveSessions.filter(session => session.isLive).map((session) => (
          <div key={session.id} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60">{session.instructor}</p>
                <div className="flex items-center space-x-2 text-sm text-white/50 mt-1">
                  <Users className="w-4 h-4" />
                  <span>{session.participants}/{session.maxParticipants} participants</span>
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-secondary-light rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h3>
        <div className="space-y-4">
          {liveSessions.filter(session => !session.isLive).map((session) => (
            <div key={session.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{session.title}</h4>
                <p className="text-sm text-white/60 mb-1">{session.instructor}</p>
                <div className="flex items-center space-x-4 text-sm text-white/50">
                  <span>{session.date}</span>
                  <span>{session.time}</span>
                  <span>{session.duration}</span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{session.participants}/{session.maxParticipants}</span>
                  </span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                session.isRegistered 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}>
                {session.isRegistered ? 'Registered' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CertificatesTab = () => (
    <div className="space-y-6">
      {/* Achievements Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{certificates.length}</div>
          <p className="text-sm text-white/60">Certificates Earned</p>
        </div>
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">92%</div>
          <p className="text-sm text-white/60">Average Score</p>
        </div>
        <div className="bg-secondary-light p-6 rounded-xl border border-white/10 text-center">
          <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">15</div>
          <p className="text-sm text-white/60">Skills Mastered</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-secondary-light rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-200 group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  {cert.verified && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-2xl font-bold text-white">{cert.score}%</span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-sm text-white/60 mb-4">
                Issued on {new Date(cert.issueDate).toLocaleDateString()}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-medium transition-colors">
                  View Certificate
                </button>
                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" aria-label="Share certificate">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Bridge School Tab
  const BridgeSchoolTab = () => (
    <BridgeSchool className="" />
  );

  // Bridge Academy Tab  
  const BridgeAcademyTab = () => (
    <BridgeAcademy className="" />
  );

  // Bridge Live Tab
  const BridgeLiveTab = () => (
    <BridgeLive className="" />
  );

  const tabs = [
    { id: 'overview', label: 'Accueil', icon: Target },
    { id: 'bridge-school', label: 'Bridge School', icon: GraduationCap },
    { id: 'bridge-academy', label: 'Bridge Academy', icon: Briefcase },
    { id: 'bridge-live', label: 'Bridge Live', icon: Radio },
    { id: 'paths', label: 'Parcours', icon: BookOpen },
    { id: 'sessions', label: 'Sessions Live', icon: Calendar },
    { id: 'certificates', label: 'Certificats', icon: Award }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn Hub</h1>
        <p className="text-white/70">Your personalized learning journey with structured paths and live sessions</p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 bg-secondary-light rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'bridge-school' && <BridgeSchoolTab />}
        {activeTab === 'bridge-academy' && <BridgeAcademyTab />}
        {activeTab === 'bridge-live' && <BridgeLiveTab />}
        {activeTab === 'paths' && <PathsTab />}
        {activeTab === 'sessions' && <SessionsTab />}
        {activeTab === 'certificates' && <CertificatesTab />}
      </div>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={pdfPreview.isOpen}
        onClose={closePDFPreview}
        pdfUrl={pdfPreview.pdfUrl}
        title={pdfPreview.title}
        author={pdfPreview.author}
      />
    </div>
  );
};

export default LearnHub; 