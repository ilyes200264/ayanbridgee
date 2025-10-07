import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Play, Settings, Brain, X, CheckCircle, ArrowRight, Edit, Globe, Save, X as CloseIcon } from 'lucide-react';
import type { LessonData, FileUploadState } from '../../types/studio';
import { mockLessonData } from '../../data/mockLesson';
import { uploadPDFWithPrompt } from '../../lib/pdfUpload';
// import LessonVideoPlayer from './LessonVideoPlayer';
// import LessonContent from './LessonContent';
// import LessonOutlineSidebar from './LessonOutlineSidebar';
// import LessonAIChat from './LessonAIChat';
import ContextualHelperMenu from './ContextualHelperMenu';
import PracticeExercises from './PracticeExercises';
import TrainerModePanel from './TrainerModePanel';
import { FloatingGenerationButton } from '../FloatingGenerationButton';

interface LessonStudioPageProps {
  className?: string;
}

type CreationStep = 'file-upload' | 'ai-prompt' | 'trainer-mode' | 'generating';

const LessonStudioPage: React.FC<LessonStudioPageProps> = ({ className }) => {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  // const [currentTime, setCurrentTime] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const [isTrainerMode, setIsTrainerMode] = useState(false);
  const [showGenerationQueue, setShowGenerationQueue] = useState(false);
  // const [isVideoSticky, setIsVideoSticky] = useState(false);
  // const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  // const [isVideoPinned, setIsVideoPinned] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);

  // const [pipDimensions, setPipDimensions] = useState({ width: 400, height: 225 });
  // const [pipPosition, setPipPosition] = useState({ x: window.innerWidth - 420, y: 80 });
  // const [isResizing, setIsResizing] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0
  });

  // New state for course creation flow
  const [currentStep, setCurrentStep] = useState<CreationStep>('file-upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');

  // New state for edit and publish functionality
  const [isEditing, setIsEditing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const pipVideoRef = useRef<HTMLVideoElement>(null);
  // const contentRef = useRef<HTMLDivElement>(null);
  // const videoContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky video - COMMENTED OUT
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (videoContainerRef.current && !isVideoPinned) {
  //       const rect = videoContainerRef.current.getBoundingClientRect();
  //       const shouldBeSticky = rect.top < -100; // When video scrolls 100px past top
  //       setIsVideoSticky(shouldBeSticky);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isVideoPinned]);

  // Ensure PiP video is always muted - COMMENTED OUT
  // useEffect(() => {
  //   if (pipVideoRef.current) {
  //     pipVideoRef.current.muted = true;
  //   }
  // }, [pipVideoRef.current]);

  // Ensure PiP video is muted when lesson data changes - COMMENTED OUT
  // useEffect(() => {
  //   if (pipVideoRef.current && lessonData) {
  //     pipVideoRef.current.muted = true;
  //   }
  // }, [lessonData]);

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setCurrentStep('ai-prompt');
  };

  const handleGenerateCourse = async () => {
    if (!selectedFile || !aiPrompt.trim()) return;
    
    setCurrentStep('generating');
    setUploadState({
      isUploading: true,
      progress: 0,
      fileName: selectedFile.name
    });

    try {
      // Upload PDF with prompt to backend
      const uploadResponse = await uploadPDFWithPrompt(selectedFile, aiPrompt);
      
      // Simulate processing progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadState(prev => ({ ...prev, progress: i }));
      }

      // Load mock lesson data after "processing"
      setTimeout(() => {
        setLessonData(mockLessonData);
        setUploadState({
          isUploading: false,
          progress: 100,
          fileName: selectedFile.name
        });
        setCurrentStep('file-upload');
        setSelectedFile(null);
        setAiPrompt('');
        setIsTrainerMode(false);
      }, 500);

      console.log('Upload successful:', uploadResponse);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadState({
        isUploading: false,
        progress: 0,
        fileName: selectedFile.name
      });
      setCurrentStep('ai-prompt');
      // You might want to show an error message to the user here
    }
  };


  const handleBackToFileUpload = () => {
    setCurrentStep('file-upload');
    setSelectedFile(null);
    setAiPrompt('');
  };

  const handleBackToPrompt = () => {
    setCurrentStep('ai-prompt');
  };

  // Edit and Publish handlers
  const handleEdit = () => {
    setIsEditing(true);
    // Initialize edited content with current lesson content
    setEditedContent(lessonData?.content || '');
  };

  const handleSaveEdit = () => {
    if (lessonData) {
      setLessonData({
        ...lessonData,
        content: editedContent
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const handlePublish = () => {
    setShowPublishModal(true);
    setIsPublishing(true);
    setPublishProgress(0);
    
    // Simulate publishing process
    const interval = setInterval(() => {
      setPublishProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsPublishing(false);
            setShowPublishModal(false);
            setPublishProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // COMMENTED OUT - UNUSED FUNCTION
  // const handleTextSelection = (text: string, position: { x: number; y: number }) => {
  //   if (text.trim()) {
  //     setSelectedText(text);
  //     setSelectionPosition(position);
  //   } else {
  //     setSelectedText('');
  //     setSelectionPosition(null);
  //   }
  // };

  // COMMENTED OUT - UNUSED FUNCTIONS FOR VIDEO HANDLING
  // const handleSectionClick = (sectionId: string, timestamp: number) => {
  //   setCurrentTime(timestamp);
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = timestamp;
  //   }
    
  //   // Scroll to section in content
  //   const element = document.getElementById(`section-${sectionId}`);
  //   if (element && contentRef.current) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  // const handleVideoTimeUpdate = (time: number) => {
  //   setCurrentTime(time);
  // };

  // // Synchronize video playback between main and PiP videos
  // const syncVideoPlayback = (action: 'play' | 'pause') => {
  //   const videos = [videoRef.current, pipVideoRef.current];
  //   videos.forEach((video, index) => {
  //     if (video) {
  //       if (action === 'play') {
  //         video.play();
  //         // Ensure PiP video is always muted
  //         if (index === 1) { // pipVideoRef is the second video
  //           video.muted = true;
  //         }
  //       } else {
  //         video.pause();
  //       }
  //     }
  //   });
  // };

  // // Handle play/pause from main video
  // const handleMainVideoPlay = () => {
  //   setIsPlaying(true);
  //   syncVideoPlayback('play');
  // };

  // const handleMainVideoPause = () => {
  //   setIsPlaying(false);
  //   syncVideoPlayback('pause');
  // };

  // // Handle play/pause from PiP video
  // const handlePipVideoPlay = () => {
  //   setIsPlaying(true);
  //   syncVideoPlayback('play');
  // };

  // const handlePipVideoPause = () => {
  //   setIsPlaying(false);
  //   syncVideoPlayback('pause');
  // };

  // // Handle time sync when one video seeks
  // const handleVideoSeek = (time: number) => {
  //   const videos = [videoRef.current, pipVideoRef.current];
  //   videos.forEach(video => {
  //     if (video && Math.abs(video.currentTime - time) > 0.5) {
  //       video.currentTime = time;
  //     }
  //   });
  // };

  // // Handle PiP drag start
  // const handleDragStart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(true);
    
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setDragOffset({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top
  //   });
    
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const newX = e.clientX - dragOffset.x;
  //     const newY = e.clientY - dragOffset.y;
    
  //     // Keep within screen bounds
  //     const maxX = window.innerWidth - pipDimensions.width;
  //     const maxY = window.innerHeight - pipDimensions.height;
    
  //     setPipPosition({
  //       x: Math.max(0, Math.min(maxX, newX)),
  //       y: Math.max(0, Math.min(maxY, newY))
  //     });
  //   };
    
  //   const handleMouseUp = () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //     document.body.style.cursor = '';
  //     document.body.style.userSelect = '';
  //     setIsDragging(false);
  //   };
    
  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  //   document.body.style.cursor = 'move';
  //   document.body.style.userSelect = 'none';
  // };

  // // Handle PiP resize
  // const handleResizeStart = (e: React.MouseEvent, corner: string) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsResizing(true);
    
  //   const startX = e.clientX;
  //   const startY = e.clientY;
  //   const startWidth = pipDimensions.width;
  //   const startHeight = pipDimensions.height;
  //   const startPosX = pipPosition.x;
  //   const startPosY = pipPosition.y;
    
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const deltaX = e.clientX - startX;
  //     const deltaY = e.clientY - startY;
    
  //     const minWidth = 200;
  //     const minHeight = 120;
  //     const maxWidth = window.innerWidth - 40;
  //     const maxHeight = window.innerHeight - 40;
    
  //     let newWidth = startWidth;
  //     let newHeight = startHeight;
  //     let newPosX = startPosX;
  //     let newPosY = startPosY;
    
  //     // Resize based on corner
  //     switch (corner) {
  //       case 'bottom-right':
  //         newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
  //         newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
  //         break;
  //       case 'bottom-left':
  //         newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
  //         newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
  //         newPosX = startPosX + (startWidth - newWidth);
  //         break;
  //       case 'top-right':
  //         newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
  //         newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
  //         newPosY = startPosY + (startHeight - newHeight);
  //         break;
  //       case 'top-left':
  //         newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
  //         newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
  //         newPosX = startPosX + (startWidth - newWidth);
  //         newPosY = startPosY + (startHeight - newHeight);
  //         break;
  //     }
    
  //     setPipDimensions({ width: newWidth, height: newHeight });
  //     setPipPosition({ x: newPosX, y: newPosY });
  //   };
    
  //   const handleMouseUp = () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //     document.body.style.cursor = '';
  //     document.body.style.userSelect = '';
  //     setIsResizing(false);
  //   };
    
  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  //   document.body.style.cursor = 'nw-resize';
  //   document.body.style.userSelect = 'none';
  // };

  // // Quick resize buttons
  // const handleQuickResize = (size: 'small' | 'medium' | 'large') => {
  //   switch (size) {
  //     case 'small':
  //       setPipDimensions({ width: 300, height: 169 });
  //       break;
  //     case 'medium':
  //       setPipDimensions({ width: 450, height: 253 });
  //       break;
  //     case 'large':
  //       setPipDimensions({ width: 600, height: 338 });
  //       break;
  //   }
  // };



  if (!lessonData) {
    return (
      <div className={`min-h-screen bg-background p-6 ${className}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header with Upload */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Brain className="w-8 h-8 text-primary" />
                  Studio AI
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-normal">
                    Powered by AI
                  </span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Transformez vos documents en leçons interactives enrichies par l'IA
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setLessonData(null)}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Nouveau cours
                </button>
              </div>
            </div>

            {/* Course Creation Flow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card/50"
            >
              {currentStep === 'generating' && uploadState.isUploading ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                  <h3 className="text-lg font-semibold">Traitement en cours...</h3>
                  <p className="text-muted-foreground">
                    Analyse du document : {uploadState.fileName}
                  </p>
                  <div className="w-full max-w-xs mx-auto bg-secondary rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadState.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {uploadState.progress}% - Génération de la vidéo et des exercices...
                  </p>
                </div>
              ) : currentStep === 'file-upload' ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Déposez votre document ici</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Glissez-déposez un fichier Word, PDF ou PowerPoint pour générer automatiquement 
                    une leçon interactive avec vidéo, exercices et chat IA.
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <label className="px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Choisir un fichier
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Formats supportés: PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx)
                  </p>
                  
                  <button
                    onClick={() => setLessonData(mockLessonData)}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto mt-4"
                  >
                    <Play className="w-4 h-4" />
                    Demo avec contenu exemple
                  </button>
                </div>
              ) : currentStep === 'ai-prompt' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={handleBackToFileUpload}
                      className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      title="Retour à la sélection de fichier"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Fichier sélectionné: {selectedFile?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-center">
                    <Brain className="w-16 h-16 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold">Personnalisez votre cours avec l'IA</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Décrivez comment vous souhaitez que votre vidéo soit générée. Plus votre description est détaillée, 
                    meilleur sera le résultat.
                  </p>
                  
                  <div className="max-w-2xl mx-auto">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Exemple: Créez une vidéo éducative avec un ton professionnel, incluant des animations pour expliquer les concepts complexes, des exemples pratiques, et une structure claire avec introduction, développement et conclusion..."
                      className="w-full h-32 p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {aiPrompt.length}/500 caractères
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Plus de détails = meilleur résultat
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setCurrentStep('trainer-mode')}
                      disabled={!aiPrompt.trim()}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Générer le cours
                    </button>
                  </div>
                </div>
              ) : currentStep === 'trainer-mode' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={handleBackToPrompt}
                      className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      title="Retour à la personnalisation IA"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Fichier: {selectedFile?.name} • Prompt: {aiPrompt.substring(0, 30)}...
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">Configuration du Mode Formateur</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Activez le mode formateur pour des options avancées de personnalisation
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleGenerateCourse}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Générer le cours
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>


          </motion.div>
        </div>
      </div>
    );
  }

  if (showPractice) {
    return (
      <PracticeExercises 
        exercises={lessonData.exercises}
        onComplete={() => setShowPractice(false)}
        onBack={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hide main content when generation queue is shown */}
        {showGenerationQueue ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Génération en cours...</h3>
              <p className="text-muted-foreground">Veuillez patienter pendant que nous traitons votre demande.</p>
            </div>
          </div>
        ) : (
          <>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              {lessonData.title}
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-normal">
                Powered by AI
              </span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
            
            <button
              onClick={handlePublish}
              className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Publier
            </button>
            
            <button
              onClick={() => setIsTrainerMode(!isTrainerMode)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                isTrainerMode 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Settings className="w-4 h-4" />
              Mode Formateur
            </button>
            
            <button
              onClick={() => setLessonData(null)}
              className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
            >
              Nouveau cours
            </button>
          </div>
        </motion.div>

        {/* Trainer Mode Panel */}
        <AnimatePresence>
          {isTrainerMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <TrainerModePanel 
                onLoadTemplate={() => setLessonData(mockLessonData)} 
                onShowGenerationQueue={setShowGenerationQueue}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Editor Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-4xl h-[80vh] flex flex-col"
              >
                {/* Editor Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Modifier le contenu du cours</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
                    >
                      <CloseIcon className="w-4 h-4" />
                      Annuler
                    </button>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-4">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-full p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Modifiez le contenu de votre cours ici..."
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Publish Modal */}
        <AnimatePresence>
          {showPublishModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-md p-6"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Globe className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Publication en cours...</h3>
                  <p className="text-muted-foreground">
                    {isPublishing ? 'Publication de votre cours sur la plateforme' : 'Cours publié avec succès!'}
                  </p>
                  
                  <div className="w-full bg-secondary rounded-full h-3">
                    <motion.div 
                      className="bg-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${publishProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {publishProgress}% - {isPublishing ? 'Traitement...' : 'Terminé!'}
                  </p>
                  
                  {!isPublishing && publishProgress >= 100 && (
                    <button
                      onClick={() => setShowPublishModal(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Fermer
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generation Queue Screen */}
        <div className="flex items-center justify-center min-h-[60vh]">
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
                Génération en cours... 🚀
              </h2>
              <p className="text-lg text-muted-foreground">
                Notre IA travaille dur pour créer votre contenu personnalisé
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
                  <span className="text-foreground">Génération de la vidéo</span>
                </div>
                <div className="w-8 h-0.5 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-border rounded-full"></div>
                  <span className="text-muted-foreground">Création des exercices</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="w-full bg-secondary rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                 Génération de la vidéo en cours...
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
                  <span className="font-medium text-foreground">Leçon interactive</span>
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
                onClick={() => setShowGenerationQueue(false)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
            </div>
          </div>
        </div>

        {/* Floating Generation Button - Always visible on queue screen */}
        <FloatingGenerationButton />

        {/* COMMENTED OUT MAIN LAYOUT - ORIGINAL CONTENT */}
        {/*
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border p-6">
              <LessonOutlineSidebar
                sections={lessonData.sections}
                currentTime={currentTime}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div ref={videoContainerRef} className="relative">
              <div className={`bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border overflow-hidden transition-all duration-300 ${
                isVideoMinimized ? 'h-16' : ''
              }`}>
                <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    🎥 Vidéo du cours
                    {isVideoSticky && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Épinglé</span>}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsVideoPinned(!isVideoPinned)}
                      className={`p-2 rounded-lg transition-colors ${
                        isVideoPinned 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground'
                      }`}
                      title={isVideoPinned ? 'Détacher la vidéo' : 'Épingler la vidéo'}
                    >
                      {isVideoPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsVideoMinimized(!isVideoMinimized)}
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                      title={isVideoMinimized ? 'Agrandir la vidéo' : 'Réduire la vidéo'}
                    >
                      {isVideoMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isVideoMinimized && (
                  <LessonVideoPlayer
                    ref={videoRef}
                    videoUrl={lessonData.videoUrl}
                    transcript={lessonData.transcript}
                    currentTime={currentTime}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onPlay={handleMainVideoPlay}
                    onPause={handleMainVideoPause}
                    onSeek={handleVideoSeek}
                  />
                )}
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border p-6">
              <LessonContent
                ref={contentRef}
                sections={lessonData.sections}
                onTextSelection={handleTextSelection}
                onPracticeClick={() => setShowPractice(true)}
              />
            </div>

            <div className="bg-accent/20 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border">
              <div className="p-4 border-b border-border bg-accent/10">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  🤖 Assistant IA du cours
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">En direct</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Posez vos questions sur le contenu du cours
                </p>
              </div>
              <div className="p-6">
                <LessonAIChat lessonTitle={lessonData.title} />
              </div>
              
              <div className="p-6 border-t border-border bg-accent/5">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Félicitations ! 🎉
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Vous avez terminé la leçon. Êtes-vous prêt à tester vos connaissances 
                      avec des exercices pratiques ?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowPractice(true)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                    >
                      J'ai bien compris
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                      Relire la leçon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Contextual Menu - Zone E */}
        <AnimatePresence>
          {selectedText && selectionPosition && (
            <ContextualHelperMenu
              selectedText={selectedText}
              position={selectionPosition}
              onClose={() => {
                setSelectedText('');
                setSelectionPosition(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Trainer Mode Panel */}
        <AnimatePresence>
          {isTrainerMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
                              <TrainerModePanel 
                                onLoadTemplate={(template) => {
                                  // Only load template if it's not the generation queue
                                  if (template !== 'generated-content') {
                                    setLessonData(mockLessonData);
                                  }
                                  // For 'generated-content', the TrainerModePanel will handle showing the generation queue
                                }} 
                                onShowGenerationQueue={setShowGenerationQueue}
                              />
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonStudioPage;