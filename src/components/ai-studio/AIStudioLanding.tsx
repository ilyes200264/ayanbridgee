import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  ShoppingBag, 
  Wand2, 
  Zap, 
  Eye, 
  Download, 
  Settings,
  Plus,
  Target,
  Palette,
  Code,
  Globe,
  ChevronRight,
  Star,
  Clock,
  Users
} from 'lucide-react';

interface AIStudioLandingProps {
  onCreateProject: (type: 'landing' | 'product') => void;
}

const AIStudioLanding: React.FC<AIStudioLandingProps> = ({ onCreateProject }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const projectTypes = [
    {
      id: 'landing',
      title: 'Page de Vente',
      description: 'Créez une page de vente optimisée pour convertir vos visiteurs en clients',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Headlines accrocheurs générés par IA',
        'Structure optimisée pour la conversion',
        'Call-to-action personnalisés',
        'Design responsive automatique'
      ],
      templates: [
        { name: 'SaaS Classic', preview: '🚀', conversion: '12.5%' },
        { name: 'E-learning Pro', preview: '📚', conversion: '15.2%' },
        { name: 'Crypto Modern', preview: '₿', conversion: '18.7%' },
        { name: 'Service Premium', preview: '💎', conversion: '14.9%' }
      ]
    },
    {
      id: 'product',
      title: 'Page Produit',
      description: 'Générez des pages produit détaillées avec descriptions et points clés automatiques',
      icon: ShoppingBag,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Descriptions produit automatiques',
        'Points clés optimisés SEO',
        'Pricing dynamique intelligent',
        'Avis clients intégrés'
      ],
      templates: [
        { name: 'E-commerce Clean', preview: '🛍️', conversion: '8.3%' },
        { name: 'Formation Focus', preview: '🎯', conversion: '11.7%' },
        { name: 'Digital Product', preview: '📱', conversion: '9.8%' },
        { name: 'Subscription Box', preview: '📦', conversion: '13.4%' }
      ]
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'IA Générative Avancée',
      description: 'Génération de contenu optimisé basé sur les meilleures pratiques marketing'
    },
    {
      icon: Palette,
      title: 'Design Personnalisable',
      description: 'Templates modernes avec personnalisation complète des couleurs et polices'
    },
    {
      icon: Eye,
      title: 'Aperçu Temps Réel',
      description: 'Visualisez vos modifications instantanément avec notre éditeur en direct'
    },
    {
      icon: Globe,
      title: 'Multi-langue',
      description: 'Génération de contenu en français, anglais et arabe'
    },
    {
      icon: Zap,
      title: 'Export Optimisé',
      description: 'Export HTML/CSS prêt pour le déploiement ou intégration CMS'
    },
    {
      icon: Settings,
      title: 'SEO Intégré',
      description: 'Optimisation automatique pour les moteurs de recherche'
    }
  ];

  const stats = [
    { value: '15.2%', label: 'Taux conversion moyen' },
    { value: '2.3x', label: 'Génération plus rapide' },
    { value: '94%', label: 'Satisfaction client' },
    { value: '500+', label: 'Pages créées' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          AI Studio
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            Créateur de Pages
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
          Transformez vos idées en pages de vente et produit performantes grâce à 
          l'intelligence artificielle. Génération automatique de contenu, design optimisé et conversion maximisée.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Choisissez votre projet
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center`}>
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-primary px-3 py-1 bg-primary/20 rounded-full">
                    Nouveau
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-white/70 mb-6">{type.description}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                {/* Templates Preview */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold text-sm mb-3">Templates disponibles</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {type.templates.map((template, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedTemplate(template.name)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                            <span className="text-lg">{template.preview}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-medium truncate">{template.name}</div>
                            <div className="text-primary text-xs">↗ {template.conversion}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => onCreateProject(type.id as 'landing' | 'product')}
                  className={`w-full bg-gradient-to-r ${type.color} hover:scale-105 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Créer {type.title}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Fonctionnalités puissantes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl p-8 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Processus de création simple
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Informations',
              description: 'Renseignez les détails de votre produit/service',
              icon: FileText
            },
            {
              step: '02',
              title: 'IA Génération',
              description: 'Notre IA crée le contenu optimisé automatiquement',
              icon: Sparkles
            },
            {
              step: '03',
              title: 'Personnalisation',
              description: 'Ajustez le design et le contenu selon vos besoins',
              icon: Palette
            },
            {
              step: '04',
              title: 'Export',
              description: 'Téléchargez ou publiez votre page finalisée',
              icon: Download
            }
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
              
              {index < 3 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <ChevronRight className="w-6 h-6 text-white/30 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Projets récents</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1">
            <span>Voir tout</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Formation Crypto Landing',
              type: 'landing',
              created: '2 jours',
              status: 'Publié',
              views: '1.2k',
              conversion: '12.5%'
            },
            {
              name: 'E-book Trading Page',
              type: 'product',
              created: '5 jours',
              status: 'Brouillon',
              views: '-',
              conversion: '-'
            },
            {
              name: 'SaaS Pricing Page',
              type: 'landing',
              created: '1 sem',
              status: 'Publié',
              views: '3.4k',
              conversion: '18.2%'
            }
          ].map((project, index) => (
            <div key={index} className="bg-white/5 rounded-xl border border-white/10 p-6 hover:border-white/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Publié' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-white/60 text-xs mb-1">Vues</div>
                  <div className="text-white font-medium">{project.views}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Conversion</div>
                  <div className="text-primary font-medium">{project.conversion}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Créé</div>
                  <div className="text-white font-medium">{project.created}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIStudioLanding;