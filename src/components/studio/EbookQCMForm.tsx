import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Brain,
  FileText,
  Upload,
  Target,
  Users,
  Clock,
  DollarSign,
  Globe,
  Zap
} from 'lucide-react';

interface EbookQCMData {
  length: string;
  purpose: string;
  targetAudience: string;
  writingStyle: string;
  complexity: string;
  language: string;
  file?: File;
}

interface EbookQCMFormProps {
  onComplete: (data: EbookQCMData) => void;
  onBack: () => void;
}

const EbookQCMForm: React.FC<EbookQCMFormProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<EbookQCMData>({
    length: '',
    purpose: '',
    targetAudience: '',
    writingStyle: '',
    complexity: '',
    monetization: '',
    language: 'fr'
  });

  const questions = [
    {
      id: 'length',
      title: 'Quelle est la longueur souhaitée pour votre ebook ?',
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      options: [
        { value: 'short', label: 'Court (10-20 pages)', description: 'Guide rapide, résumé' },
        { value: 'medium', label: 'Moyen (21-40 pages)', description: 'Manuel pratique' },
        { value: 'long', label: 'Long (41-60 pages)', description: 'Guide complet' },
        { value: 'extensive', label: 'Très long (60+ pages)', description: 'Encyclopédie du sujet' }
      ]
    },
    {
      id: 'purpose',
      title: 'Quel est l\'objectif principal de votre ebook ?',
      icon: <Target className="w-8 h-8 text-green-500" />,
      options: [
        { value: 'education', label: 'Éducation', description: 'Enseigner un sujet spécifique' },
        { value: 'business', label: 'Business', description: 'Guide professionnel ou commercial' },
        { value: 'entertainment', label: 'Divertissement', description: 'Contenu ludique et engageant' },
        { value: 'self-help', label: 'Développement personnel', description: 'Aide à l\'amélioration personnelle' },
        { value: 'technical', label: 'Technique', description: 'Manuel technique ou procédural' }
      ]
    },
    {
      id: 'targetAudience',
      title: 'Qui est votre audience cible ?',
      icon: <Users className="w-8 h-8 text-purple-500" />,
      options: [
        { value: 'beginners', label: 'Débutants', description: 'Personnes nouvelles au sujet' },
        { value: 'intermediate', label: 'Intermédiaires', description: 'Connaissances de base' },
        { value: 'advanced', label: 'Avancés', description: 'Experts dans le domaine' },
        { value: 'mixed', label: 'Mixte', description: 'Tous les niveaux' },
        { value: 'professionals', label: 'Professionnels', description: 'Experts du métier' }
      ]
    },
    {
      id: 'writingStyle',
      title: 'Quel style d\'écriture préférez-vous ?',
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      options: [
        { value: 'formal', label: 'Formel', description: 'Ton professionnel et académique' },
        { value: 'casual', label: 'Décontracté', description: 'Ton amical et accessible' },
        { value: 'conversational', label: 'Conversationnel', description: 'Comme une discussion' },
        { value: 'technical', label: 'Technique', description: 'Précis et détaillé' },
        { value: 'storytelling', label: 'Narratif', description: 'Récit et exemples' }
      ]
    },
    {
      id: 'complexity',
      title: 'Quel niveau de complexité souhaitez-vous ?',
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      options: [
        { value: 'simple', label: 'Simple', description: 'Concepts de base, facile à comprendre' },
        { value: 'moderate', label: 'Modéré', description: 'Équilibre entre simplicité et profondeur' },
        { value: 'complex', label: 'Complexe', description: 'Concepts avancés et détaillés' },
        { value: 'expert', label: 'Expert', description: 'Niveau universitaire/professionnel' }
      ]
    },
    {
      id: 'language',
      title: 'Dans quelle langue souhaitez-vous votre ebook ?',
      icon: <Globe className="w-8 h-8 text-cyan-500" />,
      options: [
        { value: 'fr', label: 'Français', description: 'Version française' },
        { value: 'en', label: 'Anglais', description: 'Version anglaise' },
        { value: 'es', label: 'Espagnol', description: 'Version espagnole' },
        { value: 'de', label: 'Allemand', description: 'Version allemande' },
        { value: 'it', label: 'Italien', description: 'Version italienne' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion].id as keyof EbookQCMData;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id as keyof EbookQCMData];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                Configuration de votre Ebook
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-normal">
                  Powered by AI
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Répondez à quelques questions pour personnaliser votre ebook
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <motion.div 
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border p-8"
        >
          {/* Question Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {currentQuestionData.icon}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {currentQuestionData.title}
            </h2>
            <p className="text-muted-foreground">
              Choisissez l'option qui correspond le mieux à vos besoins
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestionData.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  currentAnswer === option.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    currentAnswer === option.value
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {currentAnswer === option.value && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {option.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentQuestion === 0 ? 'Retour' : 'Précédent'}
            </button>

            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Générer l\'ebook' : 'Suivant'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Summary */}
        {currentQuestion === questions.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-accent/20 rounded-xl p-6 border border-border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Résumé de votre configuration</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Longueur:</span>
                <span className="ml-2 text-foreground font-medium">
                  {questions[0].options.find(opt => opt.value === answers.length)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Objectif:</span>
                <span className="ml-2 text-foreground font-medium">
                  {questions[1].options.find(opt => opt.value === answers.purpose)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Audience:</span>
                <span className="ml-2 text-foreground font-medium">
                  {questions[2].options.find(opt => opt.value === answers.targetAudience)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Style:</span>
                <span className="ml-2 text-foreground font-medium">
                  {questions[3].options.find(opt => opt.value === answers.writingStyle)?.label}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Complexité:</span>
                <span className="ml-2 text-foreground font-medium">
                  {questions[4].options.find(opt => opt.value === answers.complexity)?.label}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EbookQCMForm;
