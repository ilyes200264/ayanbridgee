import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EbookDetailsForm from '../components/studio/EbookDetailsForm';
// import ContentInputForm from '../components/studio/ContentInputForm'; // Removed - not used
import EbookQCMForm from '../components/studio/EbookQCMForm';
import LessonStudioPage from '../components/studio/LessonStudioPage';
import AIStudioLanding from '../components/ai-studio/AIStudioLanding';
import AIStudioCreator from '../components/ai-studio/AIStudioCreator';
import { FloatingGenerationButton } from '../components/FloatingGenerationButton';
import { uploadPDFWithPrompt } from '../lib/pdfUpload';
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Upload, 
  FileText, 
  Brain, 
  Edit, 
  Send,
  X,
  CheckCircle,
  Sparkles,
  Download,
  Eye,
  DollarSign,
  Users,
  Crown,
  Shield,
  Share2,
  Megaphone,
  Tag,
  TrendingUp,
  Star,
  ChevronLeft,
  Plus,
  Trash2,
  Copy,
  RefreshCw,
  Settings
} from 'lucide-react';

type ContentType = 'ebook' | 'course' | 'landing-page' | 'product-page' | null;
type CreationStep = 'content-type' | 'ai-studio-main' | 'ai-studio-creator' | 'ebook-details' | 'ebook-qcm' | 'content-input' | 'ai-generation' | 'content-editor' | 'publishing';

export interface EbookDetails {
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  chapters: number;
  estimatedPages: number;
}

interface ContentData {
  type: 'text' | 'upload';
  text?: string;
  file?: File;
}

interface EbookQCMData {
  length: string;
  purpose: string;
  targetAudience: string;
  writingStyle: string;
  complexity: string;
  language: string;
  file?: File;
}

interface GeneratedContent {
  title: string;
  chapters: Array<{
    id: string;
    title: string;
    content: string;
    wordCount: number;
  }>;
  totalWords: number;
  estimatedReadTime: string;
}

interface PublishingOptions {
  makePublic: boolean;
  allowInvestment: boolean;
  sellLicense: boolean;
  affiliateProgram: boolean;
  promoCode: boolean;
  sponsorship: boolean;
  pricing: {
    basePrice: number;
    licensePrice: number;
    affiliateCommission: number;
  };
}

const AIStudio: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>(null);
  const [currentStep, setCurrentStep] = useState<CreationStep>('content-type');
  const [selectedProjectType, setSelectedProjectType] = useState<'landing' | 'product' | null>(null);
  const [ebookDetails, setEbookDetails] = useState<EbookDetails>({
    title: '',
    description: '',
    category: '',
    targetAudience: '',
    chapters: 5,
    estimatedPages: 50
  });
  const [contentData, setContentData] = useState<ContentData>({ type: 'upload' });
  const [ebookQCMData, setEbookQCMData] = useState<EbookQCMData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [hasActiveGeneration, setHasActiveGeneration] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileName, setUploadFileName] = useState('');
  const [publishModalStep, setPublishModalStep] = useState<'options' | 'confirmation'>('options');
  const [publishingOptions, setPublishingOptions] = useState<PublishingOptions>({
    makePublic: true,
    allowInvestment: false,
    sellLicense: false,
    affiliateProgram: false,
    promoCode: false,
    sponsorship: false,
    pricing: {
      basePrice: 29,
      licensePrice: 500,
      affiliateCommission: 20
    }
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Memoized handlers to prevent re-rendering and focus loss
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEbookDetails(prev => ({...prev, title: newTitle}));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setEbookDetails(prev => ({...prev, description: newDescription}));
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setEbookDetails(prev => ({...prev, category: newCategory}));
  }, []);

  const handleAudienceChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAudience = e.target.value;
    setEbookDetails(prev => ({...prev, targetAudience: newAudience}));
  }, []);

  const handleChaptersChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newChapters = parseInt(e.target.value);
    setEbookDetails(prev => ({...prev, chapters: newChapters}));
  }, []);

  const handlePagesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPages = parseInt(e.target.value);
    setEbookDetails(prev => ({...prev, estimatedPages: newPages}));
  }, []);

  // handleContentTextChange removed - not used in ebook workflow

  // Removed handleContentTypeChange since we only support upload now

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setContentData({ type: 'upload', file });
    }
  }, []);

  const handleCreateProject = (type: 'landing' | 'product') => {
    setSelectedProjectType(type);
    setCurrentStep('ai-studio-creator');
  };

  const handleBackFromCreator = () => {
    setCurrentStep('ai-studio-main');
    setSelectedProjectType(null);
  };

  const handleNext = () => {
    const steps: CreationStep[] = ['content-type', 'ai-studio-main', 'ai-studio-creator', 'ebook-details', 'ebook-qcm', 'content-input', 'ai-generation', 'content-editor', 'publishing'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: CreationStep[] = ['content-type', 'ai-studio-main', 'ai-studio-creator', 'ebook-details', 'ebook-qcm', 'content-input', 'ai-generation', 'content-editor', 'publishing'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const simulateAIGeneration = async () => {
    if (!contentData.file || !ebookQCMData) {
      console.error('Missing file or QCM data');
      return;
    }
    
    setIsGenerating(true);
    setHasActiveGeneration(true);
    setCurrentStep('ai-generation');
    setIsUploading(true);
    setUploadProgress(0);
    setUploadFileName(contentData.file.name);
    
    try {
      // Generate prompt from QCM answers
      const prompt = generatePromptFromQCM(ebookQCMData);
      
      // Upload PDF with prompt to backend (same as course generation)
      const uploadResponse = await uploadPDFWithPrompt(contentData.file, prompt);
      
      // Simulate processing progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      // Generate content based on QCM data
      const generateContentFromQCM = (qcmData: EbookQCMData | null) => {
        if (!qcmData) return 'AI-Generated Ebook';
        
        const lengthMap = {
          'short': 'Guide Rapide',
          'medium': 'Manuel Pratique', 
          'long': 'Guide Complet',
          'extensive': 'Encyclopédie'
        };
        
        const purposeMap = {
          'education': 'Éducatif',
          'business': 'Business',
          'entertainment': 'Divertissement',
          'self-help': 'Développement Personnel',
          'technical': 'Technique'
        };
        
        return `${lengthMap[qcmData.length as keyof typeof lengthMap]} ${purposeMap[qcmData.purpose as keyof typeof purposeMap]}`;
      };
      
      const mockContent: GeneratedContent = {
        title: generateContentFromQCM(ebookQCMData) || ebookDetails.title || 'AI-Generated Ebook',
      chapters: [
        {
          id: '1',
          title: 'Introduction to the Topic',
          content: `Welcome to "${ebookDetails.title}". This comprehensive guide will take you through everything you need to know about ${ebookDetails.category.toLowerCase()}.\n\nIn this chapter, we'll cover the fundamentals and set the foundation for your learning journey. Whether you're a beginner or looking to enhance your existing knowledge, this ebook will provide valuable insights and practical applications.\n\nKey topics we'll explore:\n• Understanding the basics\n• Setting up your mindset\n• Preparing for the journey ahead\n• Common misconceptions and how to avoid them`,
          wordCount: 234
        },
        {
          id: '2',
          title: 'Core Concepts and Fundamentals',
          content: `Now that we've established the foundation, let's dive into the core concepts that make up the backbone of ${ebookDetails.category.toLowerCase()}.\n\nThis chapter will provide you with essential knowledge that every practitioner should understand. We'll break down complex ideas into digestible segments and provide real-world examples to illustrate each concept.\n\nWhat you'll learn:\n• The fundamental principles\n• Key terminology and definitions\n• How different concepts interconnect\n• Practical applications in daily scenarios\n• Common challenges and solutions`,
          wordCount: 187
        },
        {
          id: '3',
          title: 'Advanced Strategies and Techniques',
          content: `Building on the fundamentals, this chapter introduces advanced strategies that can significantly improve your results in ${ebookDetails.category.toLowerCase()}.\n\nThese techniques are used by professionals and experts in the field. We'll explore proven methodologies, advanced frameworks, and sophisticated approaches that can set you apart from others.\n\nAdvanced topics include:\n• Professional-level strategies\n• Expert frameworks and methodologies\n• Advanced problem-solving techniques\n• Optimization and efficiency improvements\n• Scalable solutions for growth`,
          wordCount: 165
        },
        {
          id: '4',
          title: 'Practical Implementation Guide',
          content: `Theory is important, but implementation is where the real value lies. This chapter provides step-by-step guidance on how to apply everything you've learned.\n\nWe'll walk through practical examples, provide templates and checklists, and give you actionable steps you can implement immediately. This hands-on approach ensures you can start seeing results right away.\n\nImplementation roadmap:\n• Step-by-step action plans\n• Ready-to-use templates and tools\n• Common implementation pitfalls\n• Measuring success and progress\n• Troubleshooting guide`,
          wordCount: 198
        },
        {
          id: '5',
          title: 'Future Trends and Continued Learning',
          content: `As we conclude this comprehensive guide, let's look toward the future and explore emerging trends in ${ebookDetails.category.toLowerCase()}.\n\nThis final chapter will help you stay ahead of the curve by understanding where the field is heading and how you can continue your learning journey beyond this ebook.\n\nLooking ahead:\n• Emerging trends and technologies\n• Future opportunities and challenges\n• Continued learning resources\n• Building a network and community\n• Next steps in your journey`,
          wordCount: 156
        }
      ],
      totalWords: 940,
      estimatedReadTime: '15-20 minutes'
    };

      setGeneratedContent(mockContent);
      setIsGenerating(false);
      setIsUploading(false);
      setUploadProgress(0);
      setCurrentStep('content-editor');
      
      console.log('Ebook generation successful:', uploadResponse);
      
    } catch (error) {
      console.error('Ebook generation failed:', error);
      setIsGenerating(false);
      setIsUploading(false);
      setUploadProgress(0);
      setHasActiveGeneration(false);
      setCurrentStep('content-input');
      // You might want to show an error message to the user here
    }
  };

  // handleFileUpload removed - not used

  const handleQCMComplete = (data: EbookQCMData) => {
    setEbookQCMData(data);
    setCurrentStep('content-input');
  };

  const handleQCMBack = () => {
    setCurrentStep('ebook-details');
  };

  // Convert QCM answers to a prompt string
  const generatePromptFromQCM = (qcmData: EbookQCMData | null): string => {
    if (!qcmData) return '';
    
    const lengthMap = {
      'short': 'un ebook court (10-20 pages)',
      'medium': 'un ebook de longueur moyenne (21-40 pages)', 
      'long': 'un ebook long (41-60 pages)',
      'extensive': 'un ebook très détaillé (60+ pages)'
    };
    
    const purposeMap = {
      'education': 'éducatif et instructif',
      'business': 'professionnel et commercial',
      'entertainment': 'divertissant et engageant',
      'self-help': 'de développement personnel',
      'technical': 'technique et spécialisé'
    };
    
    const audienceMap = {
      'beginners': 'débutants',
      'intermediate': 'niveau intermédiaire',
      'advanced': 'niveau avancé',
      'mixed': 'tous niveaux',
      'professionals': 'professionnels'
    };
    
    const styleMap = {
      'formal': 'formel et professionnel',
      'casual': 'décontracté et accessible',
      'conversational': 'conversationnel',
      'technical': 'technique et précis',
      'storytelling': 'narratif avec des exemples'
    };
    
    const complexityMap = {
      'simple': 'simple et facile à comprendre',
      'moderate': 'modéré avec un bon équilibre',
      'complex': 'complexe et détaillé',
      'expert': 'expert et spécialisé'
    };
    
    const languageMap = {
      'fr': 'français',
      'en': 'anglais',
      'es': 'espagnol',
      'de': 'allemand',
      'it': 'italien'
    };
    
    return `Créez ${lengthMap[qcmData.length as keyof typeof lengthMap]} ${purposeMap[qcmData.purpose as keyof typeof purposeMap]} pour ${audienceMap[qcmData.targetAudience as keyof typeof audienceMap]}. 
    
Le style d'écriture doit être ${styleMap[qcmData.writingStyle as keyof typeof styleMap]} avec un niveau de complexité ${complexityMap[qcmData.complexity as keyof typeof complexityMap]}.

L'ebook doit être en ${languageMap[qcmData.language as keyof typeof languageMap]}.

Structurez le contenu avec des chapitres clairs, des exemples pratiques, et une progression logique. Incluez des exercices, des résumés, et des points clés à retenir.`;
  };

  const ContentTypeSelection = () => (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI Content Studio</h1>
          <p className="text-white/70 text-xl">Create amazing content with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              contentType === 'ebook' 
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
            onClick={() => {
              setContentType('ebook');
              setCurrentStep('ebook-details');
            }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Ebook</h3>
              <p className="text-white/70 mb-6">
                Generate comprehensive ebooks with AI assistance. Perfect for sharing knowledge and creating digital products.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>AI-powered content</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4 text-green-400" />
                  <span>Built-in editor</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>Monetization options</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              contentType === 'course' 
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
            onClick={() => {
              setContentType('course');
              // Course goes directly to LessonStudioPage
            }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Course</h3>
              <p className="text-white/70 mb-6">
                Build structured online courses with lessons, exercises, and assessments for education.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>Interactive modules</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Certification</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              contentType === 'landing-page' 
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
            onClick={() => {
              setContentType('landing-page');
              setCurrentStep('ai-studio-main');
            }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sales Pages</h3>
              <p className="text-white/70 mb-6">
                Generate high-converting sales pages and product landing pages with AI.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>High conversion</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4 text-blue-400" />
                  <span>Professional templates</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>AI copywriting</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {(contentType === 'ebook' || contentType === 'course') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              Continue with {contentType === 'ebook' ? 'Ebook' : 'Course'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );



  const EbookContentInputStep = ({ 
    ebookQCMData, 
    contentData, 
    onFileChange, 
    onBack, 
    onNext, 
    fileInputRef 
  }: {
    ebookQCMData: EbookQCMData | null;
    contentData: ContentData;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBack: () => void;
    onNext: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Finalize Your Ebook Configuration</h1>
          <p className="text-white/70">Review your QCM answers and provide any additional content</p>
        </div>

        {/* QCM Summary */}
        {ebookQCMData && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Your Ebook Configuration</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/60">Length:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.length}</span>
              </div>
              <div>
                <span className="text-white/60">Purpose:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.purpose}</span>
              </div>
              <div>
                <span className="text-white/60">Audience:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.targetAudience}</span>
              </div>
              <div>
                <span className="text-white/60">Style:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.writingStyle}</span>
              </div>
              <div>
                <span className="text-white/60">Complexity:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.complexity}</span>
              </div>
              <div>
                <span className="text-white/60">Language:</span>
                <span className="ml-2 text-white font-medium">{ebookQCMData.language}</span>
              </div>
            </div>
          </div>
        )}

        {/* PDF Upload Section - Same as Course Generation */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="w-16 h-16 text-white/50" />
          </div>
          <h3 className="text-xl font-semibold text-white text-center">Déposez votre document PDF ici</h3>
          <p className="text-white/70 text-center max-w-md mx-auto">
            Glissez-déposez un fichier PDF pour générer automatiquement votre ebook personnalisé.
          </p>
          
          <div className="flex gap-3 justify-center">
            <label className="px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Choisir un fichier PDF
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          </div>
          
          <p className="text-xs text-white/50 text-center">
            Format supporté: PDF uniquement
          </p>
          
          {/* Show selected file */}
          {contentData.file && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-white font-medium">{contentData.file.name}</p>
                  <p className="text-white/60 text-sm">{(contentData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!contentData.file}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Ebook with AI
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // ContentInputStep removed - not used

  const AIGenerationStep = () => (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        {/* Animated Brain Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary"></div>
            <Brain className="w-12 h-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
        </div>
        
        {/* Main Title */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Génération de votre ebook en cours... 🚀
          </h2>
          <p className="text-lg text-muted-foreground">
            Notre IA travaille dur pour créer votre ebook personnalisé
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-foreground">Analyse du document</span>
            </div>
            <div className="w-8 h-0.5 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-foreground">Génération des chapitres</span>
            </div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-border rounded-full"></div>
              <span className="text-muted-foreground">Mise en forme finale</span>
            </div>
          </div>
        </div>

        {/* File Information */}
        {isUploading && uploadFileName && (
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Analyse du document : {uploadFileName}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="w-full bg-secondary rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {uploadProgress}% - {isUploading ? 'Analyse du document en cours...' : 'Génération des chapitres en cours...'}
          </p>
        </div>

        {/* Estimated Time */}
        <div className="bg-card/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Temps estimé restant: 24 heures</span>
          </div>
        </div>

        {/* Queue Information */}
        <div className="bg-accent/20 rounded-lg p-4 border border-border">
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Position dans la file:</span>
              <span className="font-medium text-foreground">#1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type de contenu:</span>
              <span className="font-medium text-foreground">Ebook numérique</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Qualité:</span>
              <span className="font-medium text-foreground">HD Premium</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setHasActiveGeneration(false);
              setIsGenerating(false);
              setCurrentStep('content-input');
            }}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Annuler la génération
          </button>
          <button
            onClick={() => setCurrentStep('content-input')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </button>
        </div>
      </div>
      
      {/* Floating Generation Button - Always visible on generation screen */}
      <FloatingGenerationButton />
    </div>
  );

  const ContentEditorStep = () => (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-secondary-light border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{generatedContent?.title}</h1>
            <div className="flex items-center gap-6 mt-2 text-white/60 text-sm">
              <span>{generatedContent?.totalWords} words</span>
              <span>{generatedContent?.estimatedReadTime} read time</span>
              <span>{generatedContent?.chapters.length} chapters</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button 
              onClick={() => setShowPublishModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex h-[calc(100vh-100px)]">
        {/* Chapters Sidebar */}
        <div className="w-80 bg-secondary-light border-r border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Chapters</h3>
          <div className="space-y-2">
            {generatedContent?.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  editingChapter === chapter.id 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setEditingChapter(chapter.id)}
              >
                <h4 className="text-white font-medium mb-1">{chapter.title}</h4>
                <p className="text-white/60 text-sm">{chapter.wordCount} words</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 p-3 border-2 border-dashed border-white/30 rounded-lg text-white/60 hover:border-white/50 hover:text-white/80 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Chapter
          </button>
        </div>

        {/* Content Editor */}
        <div className="flex-1 p-6 overflow-y-auto">
          {editingChapter ? (
            <div>
              {(() => {
                const chapter = generatedContent?.chapters.find(c => c.id === editingChapter);
                return chapter ? (
                  <div className="max-w-4xl">
                    <div className="flex items-center justify-between mb-6">
                      <input
                        type="text"
                        value={chapter.title}
                        className="text-2xl font-bold text-white bg-transparent border-none outline-none focus:bg-white/5 px-2 py-1 rounded"
                        onChange={(_e) => {
                          // Update chapter title logic here
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <textarea
                      value={chapter.content}
                      onChange={(_e) => {
                        // Update chapter content logic here
                      }}
                      className="w-full h-96 bg-white/5 border border-white/20 rounded-lg p-4 text-white leading-relaxed resize-none focus:outline-none focus:border-primary"
                      placeholder="Chapter content..."
                    />
                    
                    <div className="mt-4 flex items-center justify-between text-white/60 text-sm">
                      <span>{chapter.wordCount} words</span>
                      <div className="flex items-center gap-4">
                        <button className="text-primary hover:text-primary/80">Auto-improve with AI</button>
                        <button className="text-green-400 hover:text-green-400/80">Save changes</button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/60">
              <div className="text-center">
                <Edit className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a chapter to start editing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PublishingModal = () => {
    if (!showPublishModal) return null;

    const handlePublishNow = () => {
      setPublishModalStep('confirmation');
    };

    const handleBackToOptions = () => {
      setPublishModalStep('options');
    };

    const handleCloseModal = () => {
      setShowPublishModal(false);
      setPublishModalStep('options');
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-secondary rounded-2xl max-w-4xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {publishModalStep === 'options' ? 'Publish Your Ebook' : 'Confirm Publication'}
                </h3>
                {publishModalStep === 'options' && (
                  <p className="text-white/70 mt-2">Choose how you want to monetize and distribute your ebook</p>
                )}
                {publishModalStep === 'confirmation' && (
                  <p className="text-white/70 mt-2">Review your settings and confirm publication</p>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {publishModalStep === 'options' && (
              <div className="space-y-6">
              {/* Basic Publishing */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-4">Basic Publishing Options</h4>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={publishingOptions.makePublic}
                      onChange={(e) => setPublishingOptions({...publishingOptions, makePublic: e.target.checked})}
                      className="w-5 h-5 text-primary"
                    />
                    <div>
                      <span className="text-white font-medium">Make Public</span>
                      <p className="text-white/60 text-sm">List your ebook in the public marketplace</p>
                    </div>
                  </label>

                  <div className="ml-8">
                    <label className="block text-white/80 text-sm mb-2">Base Price</label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-white/60" />
                      <input
                        type="number"
                        value={publishingOptions.pricing.basePrice}
                        onChange={(e) => setPublishingOptions({
                          ...publishingOptions,
                          pricing: {...publishingOptions.pricing, basePrice: parseInt(e.target.value)}
                        })}
                        className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Options */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-4">Investment & Monetization Options</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Allow Investment */}
                  <label className="flex items-start gap-3 p-4 bg-white/5 rounded-lg cursor-pointer border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={publishingOptions.allowInvestment}
                      onChange={(e) => setPublishingOptions({...publishingOptions, allowInvestment: e.target.checked})}
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Allow Investment</span>
                      </div>
                      <p className="text-white/60 text-sm">Let others invest in your ebook's success and share in the profits</p>
                    </div>
                  </label>

                  {/* Sell License */}
                  <label className="flex items-start gap-3 p-4 bg-white/5 rounded-lg cursor-pointer border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={publishingOptions.sellLicense}
                      onChange={(e) => setPublishingOptions({...publishingOptions, sellLicense: e.target.checked})}
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">Sell License</span>
                      </div>
                      <p className="text-white/60 text-sm">Allow others to purchase resale rights to your ebook</p>
                      {publishingOptions.sellLicense && (
                        <div className="mt-3">
                          <label className="block text-white/80 text-sm mb-1">License Price</label>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-white/60" />
                            <input
                              type="number"
                              value={publishingOptions.pricing.licensePrice}
                              onChange={(e) => setPublishingOptions({
                                ...publishingOptions,
                                pricing: {...publishingOptions.pricing, licensePrice: parseInt(e.target.value)}
                              })}
                              className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white w-24"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Affiliate Program */}
                  <label className="flex items-start gap-3 p-4 bg-white/5 rounded-lg cursor-pointer border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={publishingOptions.affiliateProgram}
                      onChange={(e) => setPublishingOptions({...publishingOptions, affiliateProgram: e.target.checked})}
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Affiliate Program</span>
                      </div>
                      <p className="text-white/60 text-sm">Enable affiliates to promote your ebook for commission</p>
                      {publishingOptions.affiliateProgram && (
                        <div className="mt-3">
                          <label className="block text-white/80 text-sm mb-1">Commission Rate (%)</label>
                          <input
                            type="number"
                            value={publishingOptions.pricing.affiliateCommission}
                            onChange={(e) => setPublishingOptions({
                              ...publishingOptions,
                              pricing: {...publishingOptions.pricing, affiliateCommission: parseInt(e.target.value)}
                            })}
                            className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white w-24"
                            min="5"
                            max="50"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Promo Codes */}
                  <label className="flex items-start gap-3 p-4 bg-white/5 rounded-lg cursor-pointer border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={publishingOptions.promoCode}
                      onChange={(e) => setPublishingOptions({...publishingOptions, promoCode: e.target.checked})}
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Promo Codes</span>
                      </div>
                      <p className="text-white/60 text-sm">Allow personalized promo codes for targeted marketing</p>
                    </div>
                  </label>

                  {/* Sponsorship */}
                  <label className="flex items-start gap-3 p-4 bg-white/5 rounded-lg cursor-pointer border border-white/10 hover:border-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={publishingOptions.sponsorship}
                      onChange={(e) => setPublishingOptions({...publishingOptions, sponsorship: e.target.checked})}
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Megaphone className="w-5 h-5 text-red-400" />
                        <span className="text-white font-medium">Sponsorship</span>
                      </div>
                      <p className="text-white/60 text-sm">Accept sponsorship investments for marketing campaigns</p>
                    </div>
                  </label>

                  {/* Premium Option */}
                  <label className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-lg cursor-pointer border border-primary/30 hover:border-primary/50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-5 h-5 text-primary" />
                        <span className="text-white font-medium">Premium Investment</span>
                      </div>
                      <p className="text-white/60 text-sm">Exclusive high-value investment opportunities for VIP investors</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Revenue Projection */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                <h4 className="text-lg font-bold text-white mb-4">Revenue Projection</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">${publishingOptions.pricing.basePrice * 50}</div>
                    <div className="text-white/60 text-sm">Est. Monthly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">${publishingOptions.pricing.basePrice * 600}</div>
                    <div className="text-white/60 text-sm">Est. Yearly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {publishingOptions.sellLicense ? `$${publishingOptions.pricing.licensePrice * 3}` : '$0'}
                    </div>
                    <div className="text-white/60 text-sm">License Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {publishingOptions.affiliateProgram ? `$${Math.round(publishingOptions.pricing.basePrice * 100 * (publishingOptions.pricing.affiliateCommission / 100))}` : '$0'}
                    </div>
                    <div className="text-white/60 text-sm">Affiliate Revenue</div>
                  </div>
                </div>
              </div>
              </div>
            )}

            {publishModalStep === 'confirmation' && (
              <div className="space-y-6">
                {/* Ebook Summary */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-4">Ebook Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">{generatedContent?.title}</h5>
                      <p className="text-white/70 text-sm mb-4">{ebookDetails.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Category:</span>
                          <span className="text-white">{ebookDetails.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Chapters:</span>
                          <span className="text-white">{generatedContent?.chapters.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Total Words:</span>
                          <span className="text-white">{generatedContent?.totalWords}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Read Time:</span>
                          <span className="text-white">{generatedContent?.estimatedReadTime}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Selected Options</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          {publishingOptions.makePublic ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Public Marketplace</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {publishingOptions.allowInvestment ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Allow Investment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {publishingOptions.sellLicense ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Sell License</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {publishingOptions.affiliateProgram ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Affiliate Program</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {publishingOptions.promoCode ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Promo Codes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {publishingOptions.sponsorship ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-white/70">Sponsorship</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                  <h4 className="text-lg font-bold text-white mb-4">Pricing Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">${publishingOptions.pricing.basePrice}</div>
                      <div className="text-white/60 text-sm">Base Price</div>
                    </div>
                    {publishingOptions.sellLicense && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">${publishingOptions.pricing.licensePrice}</div>
                        <div className="text-white/60 text-sm">License Price</div>
                      </div>
                    )}
                    {publishingOptions.affiliateProgram && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">{publishingOptions.pricing.affiliateCommission}%</div>
                        <div className="text-white/60 text-sm">Commission</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Publication Agreement */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-4">Publication Agreement</h4>
                  <div className="space-y-3 text-sm text-white/70">
                    <p>By publishing this ebook, you confirm that:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>You own all rights to the content or have proper permissions</li>
                      <li>The content does not violate any copyright or intellectual property laws</li>
                      <li>You agree to the platform's terms of service and content guidelines</li>
                      <li>You understand the selected monetization options and their implications</li>
                      <li>All provided information is accurate and up-to-date</li>
                    </ul>
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="bg-gradient-to-r from-primary/20 to-green-500/20 rounded-lg p-6 border border-primary/30">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Ready to Publish!</h4>
                      <p className="text-white/70 text-sm">Your ebook will be live and available to customers within minutes.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex justify-between">
            {publishModalStep === 'options' && (
              <>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    Save as Draft
                  </button>
                  <button 
                    onClick={handlePublishNow}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-green-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Continue to Publish
                  </button>
                </div>
              </>
            )}

            {publishModalStep === 'confirmation' && (
              <>
                <button
                  onClick={handleBackToOptions}
                  className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Options
                </button>
                
                <div className="flex gap-3">
                  <button 
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-primary to-green-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Publish Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If course is selected, show LessonStudioPage directly
  if (contentType === 'course') {
    return <LessonStudioPage />;
  }

  // If there's an active generation, always show the queue screen
  if (hasActiveGeneration) {
    return (
      <div className="relative">
        <AIGenerationStep />
        <PublishingModal />
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentStep === 'content-type' && <ContentTypeSelection />}
        {currentStep === 'ai-studio-main' && <AIStudioLanding onCreateProject={handleCreateProject} />}
        {currentStep === 'ai-studio-creator' && selectedProjectType && (
          <AIStudioCreator 
            projectType={selectedProjectType} 
            onBack={handleBackFromCreator} 
          />
        )}
        {currentStep === 'ebook-details' && contentType === 'ebook' && (
          <EbookDetailsForm
            ebookDetails={ebookDetails}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onCategoryChange={handleCategoryChange}
            onAudienceChange={handleAudienceChange}
            onChaptersChange={handleChaptersChange}
            onPagesChange={handlePagesChange}
            onBack={handleBack}
            onNext={() => setCurrentStep('ebook-qcm')}
          />
        )}
        {currentStep === 'ebook-qcm' && contentType === 'ebook' && (
          <EbookQCMForm
            onComplete={handleQCMComplete}
            onBack={handleQCMBack}
          />
        )}
        {currentStep === 'content-input' && contentType === 'ebook' && (
          <EbookContentInputStep
            ebookQCMData={ebookQCMData}
            contentData={contentData}
            // onTextChange={handleContentTextChange} // Removed - not used
            onFileChange={handleFileChange}
            onBack={handleQCMBack}
            onNext={simulateAIGeneration}
            fileInputRef={fileInputRef}
          />
        )}
        {currentStep === 'ai-generation' && isGenerating && <AIGenerationStep />}
        {currentStep === 'content-editor' && generatedContent && <ContentEditorStep />}
      </AnimatePresence>

      <PublishingModal />
    </div>
  );
};

export default AIStudio;