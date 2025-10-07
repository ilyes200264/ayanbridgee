import { 
  Calculator, 
  Microscope, 
  Globe, 
  Laptop, 
  Briefcase, 
  Palette,
  BookOpen,
  Music,
  Dumbbell,
  Heart,
  Utensils,
  Camera,
  Brush,
  Users,
  TrendingUp,
  DollarSign,
  Building,
  Wrench,
  Lightbulb,
  Brain,
  Code,
  Database,
  Wifi,
  Shield,
  Car,
  Plane,
  Home,
  TreePine,
  Stethoscope,
  Pill,
  GraduationCap,
  Languages,
  FileText,
  PenTool,
  Zap,
  Target,
  Award,
  Star,
  Rocket,
  Atom,
  FlaskConical,
  type LucideIcon
} from 'lucide-react';

export interface SubjectIconConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
  keywords: string[];
}

// Comprehensive subject icon library
export const subjectIcons: SubjectIconConfig[] = [
  // STEM Subjects
  {
    id: 'mathematics',
    name: 'Mathématiques',
    icon: Calculator,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    description: 'Algèbre, géométrie, calcul',
    keywords: ['math', 'calcul', 'algèbre', 'géométrie', 'statistiques', 'probabilités', 'équations']
  },
  {
    id: 'physics',
    name: 'Physique',
    icon: Atom,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    description: 'Mécanique, thermodynamique, optique',
    keywords: ['physique', 'mécanique', 'énergie', 'force', 'optique', 'thermodynamique']
  },
  {
    id: 'chemistry',
    name: 'Chimie',
    icon: FlaskConical,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Chimie organique, inorganique',
    keywords: ['chimie', 'molécule', 'réaction', 'laboratoire', 'organique', 'inorganique']
  },
  {
    id: 'biology',
    name: 'Biologie',
    icon: Microscope,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    description: 'Sciences de la vie',
    keywords: ['biologie', 'cellule', 'génétique', 'écologie', 'anatomie', 'botanique']
  },

  // Technology & Computing
  {
    id: 'computer_science',
    name: 'Informatique',
    icon: Code,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    description: 'Programmation, algorithmes',
    keywords: ['informatique', 'programmation', 'code', 'algorithme', 'logiciel', 'développement']
  },
  {
    id: 'technology',
    name: 'Technologie',
    icon: Laptop,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    description: 'Technologies numériques',
    keywords: ['technologie', 'digital', 'numérique', 'innovation', 'tech', 'électronique']
  },
  {
    id: 'data_science',
    name: 'Data Science',
    icon: Database,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    description: 'Analyse de données, IA',
    keywords: ['data', 'données', 'intelligence artificielle', 'machine learning', 'ia', 'analyse']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersécurité',
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    description: 'Sécurité informatique',
    keywords: ['sécurité', 'cybersécurité', 'protection', 'hacking', 'réseau', 'crypto']
  },

  // Business & Economics
  {
    id: 'business',
    name: 'Business',
    icon: Briefcase,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    description: 'Gestion, stratégie',
    keywords: ['business', 'entreprise', 'gestion', 'management', 'stratégie', 'entrepreneuriat']
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    description: 'Finance, investissement',
    keywords: ['finance', 'investissement', 'bourse', 'trading', 'économie', 'banque']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: TrendingUp,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    description: 'Marketing digital, communication',
    keywords: ['marketing', 'publicité', 'communication', 'digital', 'social media', 'branding']
  },
  {
    id: 'economics',
    name: 'Économie',
    icon: Building,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    description: 'Économie, marchés',
    keywords: ['économie', 'marché', 'commerce', 'échange', 'politique économique']
  },

  // Languages & Communication
  {
    id: 'languages',
    name: 'Langues',
    icon: Languages,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/20',
    description: 'Langues étrangères',
    keywords: ['langue', 'anglais', 'français', 'espagnol', 'allemand', 'chinois', 'communication']
  },
  {
    id: 'literature',
    name: 'Littérature',
    icon: BookOpen,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/20',
    description: 'Littérature, écriture',
    keywords: ['littérature', 'livre', 'écriture', 'lecture', 'roman', 'poésie', 'théâtre']
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: Users,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/20',
    description: 'Communication, relations',
    keywords: ['communication', 'relation', 'social', 'présentation', 'négociation']
  },

  // Arts & Creative
  {
    id: 'art',
    name: 'Art',
    icon: Palette,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
    description: 'Arts visuels, créativité',
    keywords: ['art', 'créativité', 'dessin', 'couleur', 'esthétique', 'design']
  },
  {
    id: 'design',
    name: 'Design',
    icon: PenTool,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/20',
    description: 'Design graphique, UX/UI',
    keywords: ['design', 'graphique', 'interface', 'ux', 'ui', 'visuel', 'création']
  },
  {
    id: 'music',
    name: 'Musique',
    icon: Music,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    description: 'Musique, composition',
    keywords: ['musique', 'son', 'audio', 'composition', 'instrument', 'chant']
  },
  {
    id: 'photography',
    name: 'Photographie',
    icon: Camera,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    description: 'Photo, image, vidéo',
    keywords: ['photo', 'photographie', 'image', 'vidéo', 'visuel', 'caméra']
  },

  // Health & Wellness
  {
    id: 'health',
    name: 'Santé',
    icon: Stethoscope,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    description: 'Santé, médecine',
    keywords: ['santé', 'médecine', 'bien-être', 'nutrition', 'fitness', 'mental']
  },
  {
    id: 'psychology',
    name: 'Psychologie',
    icon: Brain,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    description: 'Psychologie, comportement',
    keywords: ['psychologie', 'mental', 'comportement', 'esprit', 'thérapie', 'développement']
  },
  {
    id: 'sports',
    name: 'Sport',
    icon: Dumbbell,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    description: 'Sport, fitness, entraînement',
    keywords: ['sport', 'fitness', 'entraînement', 'exercice', 'performance', 'athlétisme']
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: Utensils,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Nutrition, alimentation',
    keywords: ['nutrition', 'alimentation', 'régime', 'santé', 'cuisine', 'diététique']
  },

  // Education & Personal Development
  {
    id: 'education',
    name: 'Éducation',
    icon: GraduationCap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    description: 'Pédagogie, enseignement',
    keywords: ['éducation', 'enseignement', 'pédagogie', 'formation', 'apprentissage']
  },
  {
    id: 'personal_development',
    name: 'Développement Personnel',
    icon: Target,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    description: 'Croissance personnelle',
    keywords: ['développement personnel', 'croissance', 'motivation', 'objectifs', 'habitudes']
  },
  {
    id: 'leadership',
    name: 'Leadership',
    icon: Award,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    description: 'Leadership, management',
    keywords: ['leadership', 'management', 'équipe', 'direction', 'influence', 'autorité']
  },

  // Science & Research
  {
    id: 'research',
    name: 'Recherche',
    icon: Lightbulb,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    description: 'Recherche, innovation',
    keywords: ['recherche', 'innovation', 'découverte', 'expérimentation', 'science']
  },
  {
    id: 'engineering',
    name: 'Ingénierie',
    icon: Wrench,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    description: 'Ingénierie, technique',
    keywords: ['ingénierie', 'technique', 'mécanique', 'construction', 'innovation']
  },

  // Other Specialized Fields
  {
    id: 'geography',
    name: 'Géographie',
    icon: Globe,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Géographie, environnement',
    keywords: ['géographie', 'monde', 'carte', 'environnement', 'climat', 'territoire']
  },
  {
    id: 'history',
    name: 'Histoire',
    icon: FileText,
    color: 'text-brown-400',
    bgColor: 'bg-amber-500/20',
    description: 'Histoire, patrimoine',
    keywords: ['histoire', 'passé', 'civilisation', 'culture', 'patrimoine', 'chronologie']
  },
  {
    id: 'environment',
    name: 'Environnement',
    icon: TreePine,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Écologie, développement durable',
    keywords: ['environnement', 'écologie', 'nature', 'durable', 'climat', 'planète']
  }
];

// Auto-categorization function
export const getSubjectByKeywords = (title: string, description: string = '', category: string = ''): SubjectIconConfig | null => {
  const searchText = `${title} ${description} ${category}`.toLowerCase();
  
  // Find the best matching subject based on keywords
  let bestMatch: { subject: SubjectIconConfig; score: number } | null = null;
  
  for (const subject of subjectIcons) {
    let score = 0;
    
    // Check how many keywords match
    for (const keyword of subject.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        score += keyword.length; // Longer keywords get higher scores
      }
    }
    
    // Exact name match gets highest priority
    if (searchText.includes(subject.name.toLowerCase())) {
      score += 100;
    }
    
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { subject, score };
    }
  }
  
  return bestMatch ? bestMatch.subject : null;
};

// Get subject by ID
export const getSubjectById = (id: string): SubjectIconConfig | null => {
  return subjectIcons.find(subject => subject.id === id) || null;
};

// Get all subjects in categories
export const getSubjectsByCategory = () => {
  const categories = {
    'STEM': ['mathematics', 'physics', 'chemistry', 'biology'],
    'Technology': ['computer_science', 'technology', 'data_science', 'cybersecurity'],
    'Business': ['business', 'finance', 'marketing', 'economics'],
    'Languages': ['languages', 'literature', 'communication'],
    'Creative': ['art', 'design', 'music', 'photography'],
    'Health': ['health', 'psychology', 'sports', 'nutrition'],
    'Education': ['education', 'personal_development', 'leadership'],
    'Other': ['research', 'engineering', 'geography', 'history', 'environment']
  };
  
  const result: { [key: string]: SubjectIconConfig[] } = {};
  
  for (const [categoryName, subjectIds] of Object.entries(categories)) {
    result[categoryName] = subjectIds
      .map(id => getSubjectById(id))
      .filter(subject => subject !== null) as SubjectIconConfig[];
  }
  
  return result;
};

export default subjectIcons;