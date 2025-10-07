import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Sparkles,
  Eye,
  Save,
  Download,
  Settings,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Zap,
  Copy,
  ExternalLink,
  Loader2,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface AIStudioCreatorProps {
  projectType: 'landing' | 'product';
  onBack: () => void;
}

interface ProjectData {
  title: string;
  description: string;
  targetAudience: string;
  features: string[];
  pricing: string;
  language: 'fr' | 'en' | 'ar';
  template: string;
  industry: string;
}

interface GeneratedContent {
  headline: string;
  subheadline: string;
  heroDescription: string;
  features: Array<{ title: string; description: string; icon: string }>;
  testimonials: Array<{ name: string; role: string; content: string; rating: number }>;
  cta: string;
  benefits: string[];
  socialProof: string;
}

const AIStudioCreator: React.FC<AIStudioCreatorProps> = ({ projectType, onBack }) => {
  const [currentStep, setCurrentStep] = useState<'input' | 'generation' | 'editing' | 'preview'>('input');
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    targetAudience: '',
    features: [''],
    pricing: '',
    language: 'fr',
    template: 'modern',
    industry: 'tech'
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Simulate AI content generation
  const generateContent = async () => {
    setIsGenerating(true);
    setCurrentStep('generation');
    setGenerationProgress(0);

    const steps = [
      'Analyse des données produit...',
      'Génération du titre principal...',
      'Création des descriptions...',
      'Optimisation SEO...',
      'Génération des témoignages...',
      'Finalisation du contenu...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationProgress((i + 1) * (100 / steps.length));
    }

    // Generate mock content based on input
    const mockContent: GeneratedContent = {
      headline: `${projectData.title} - Transformez Votre ${projectData.targetAudience}`,
      subheadline: 'Découvrez la solution révolutionnaire qui change la donne',
      heroDescription: `${projectData.description} Rejoignez plus de 10,000 utilisateurs satisfaits qui ont déjà transformé leur approche.`,
      features: [
        {
          title: 'Innovation Technologique',
          description: 'Technology de pointe pour des résultats exceptionnels',
          icon: '🚀'
        },
        {
          title: 'Support Expert 24/7',
          description: 'Équipe d\'experts disponible à tout moment',
          icon: '🎯'
        },
        {
          title: 'Résultats Garantis',
          description: 'Satisfaction garantie ou remboursé sous 30 jours',
          icon: '✅'
        }
      ],
      testimonials: [
        {
          name: 'Sarah M.',
          role: 'Entrepreneur',
          content: 'Cette solution a complètement transformé mon approche. Résultats visibles dès la première semaine!',
          rating: 5
        },
        {
          name: 'Ahmed K.',
          role: 'Consultant',
          content: 'Interface intuitive et support exceptionnel. Je recommande vivement!',
          rating: 5
        }
      ],
      cta: 'Commencer Maintenant - Offre Limitée',
      benefits: [
        'Accès immédiat à tous les modules',
        'Support premium inclus',
        'Mises à jour gratuites à vie',
        'Garantie satisfaction 30 jours'
      ],
      socialProof: '10,000+ clients satisfaits • Note moyenne 4.9/5'
    };

    setGeneratedContent(mockContent);
    setIsGenerating(false);
    setCurrentStep('editing');
  };

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    setProjectData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Input Form Step
  const InputForm = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Informations sur votre {projectType === 'landing' ? 'page de vente' : 'produit'}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white font-medium mb-2">Titre du produit/service *</label>
            <input
              type="text"
              value={projectData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Formation Trading Crypto"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description *</label>
            <textarea
              value={projectData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez votre produit/service en quelques phrases..."
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-white font-medium mb-2">Public cible *</label>
            <input
              type="text"
              value={projectData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="Ex: Entrepreneurs débutants en crypto"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-white font-medium mb-2">Fonctionnalités principales</label>
            {projectData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Fonctionnalité ${index + 1}`}
                  className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                />
                {projectData.features.length > 1 && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addFeature}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              + Ajouter une fonctionnalité
            </button>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-white font-medium mb-2">Prix</label>
            <input
              type="text"
              value={projectData.pricing}
              onChange={(e) => handleInputChange('pricing', e.target.value)}
              placeholder="Ex: 99€ ou Gratuit"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Language and Template */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Langue</label>
              <select
                value={projectData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Secteur</label>
              <select
                value={projectData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="tech">Technologie</option>
                <option value="finance">Finance</option>
                <option value="education">Éducation</option>
                <option value="health">Santé</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>

          <button
            onClick={generateContent}
            disabled={!projectData.title || !projectData.description}
            className="bg-gradient-to-r from-primary to-purple-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Générer avec l'IA</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Generation Step
  const GenerationStep = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white/5 rounded-2xl border border-white/10 p-12">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">IA en cours de travail...</h2>
        <p className="text-white/70 mb-8">
          Notre intelligence artificielle analyse vos données et génère un contenu optimisé pour maximiser vos conversions
        </p>

        <div className="w-full bg-white/10 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${generationProgress}%` }}
            className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="text-primary font-medium">{generationProgress.toFixed(0)}% terminé</div>
        
        <div className="mt-8 space-y-2 text-left">
          {[
            'Analyse sémantique du contenu',
            'Génération des accroches marketing',
            'Optimisation pour la conversion',
            'Création des call-to-action',
            'Génération des témoignages',
            'Optimisation SEO automatique'
          ].map((step, index) => (
            <div key={index} className="flex items-center text-sm text-white/60">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                generationProgress > (index + 1) * 16.66 ? 'bg-primary' : 'bg-white/20'
              }`} />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Editing Step
  const EditingStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Édition du contenu</h2>
          <button
            onClick={generateContent}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Régénérer</span>
          </button>
        </div>

        {generatedContent && (
          <div className="space-y-4">
            {/* Headline */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <label className="block text-white font-medium mb-2">Titre principal</label>
              <input
                type="text"
                value={generatedContent.headline}
                onChange={(e) => setGeneratedContent(prev => prev ? {...prev, headline: e.target.value} : null)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>

            {/* Subheadline */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <label className="block text-white font-medium mb-2">Sous-titre</label>
              <input
                type="text"
                value={generatedContent.subheadline}
                onChange={(e) => setGeneratedContent(prev => prev ? {...prev, subheadline: e.target.value} : null)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={generatedContent.heroDescription}
                onChange={(e) => setGeneratedContent(prev => prev ? {...prev, heroDescription: e.target.value} : null)}
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* CTA */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
              <label className="block text-white font-medium mb-2">Call-to-Action</label>
              <input
                type="text"
                value={generatedContent.cta}
                onChange={(e) => setGeneratedContent(prev => prev ? {...prev, cta: e.target.value} : null)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentStep('preview')}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="bg-white/10 p-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-white text-sm">Aperçu en temps réel</span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="p-6 h-96 overflow-y-auto">
          {generatedContent && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">{generatedContent.headline}</h1>
                <p className="text-primary font-medium mb-4">{generatedContent.subheadline}</p>
                <p className="text-white/70 text-sm mb-6">{generatedContent.heroDescription}</p>
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
                  {generatedContent.cta}
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {generatedContent.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                        <p className="text-white/60 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Nouveau {projectType === 'landing' ? 'Page de Vente' : 'Page Produit'}
            </h1>
            <p className="text-white/60 text-sm">Créé avec l'IA • Étape {currentStep === 'input' ? '1' : currentStep === 'generation' ? '2' : currentStep === 'editing' ? '3' : '4'} sur 4</p>
          </div>
        </div>

        {currentStep === 'editing' && (
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" title="Paramètres">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors" title="Export">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-8">
        <motion.div
          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
          initial={{ width: '25%' }}
          animate={{ 
            width: currentStep === 'input' ? '25%' : 
                   currentStep === 'generation' ? '50%' : 
                   currentStep === 'editing' ? '75%' : '100%' 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 'input' && <InputForm />}
          {currentStep === 'generation' && <GenerationStep />}
          {currentStep === 'editing' && <EditingStep />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AIStudioCreator;