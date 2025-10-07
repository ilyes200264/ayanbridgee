export interface EducationLevel {
  id: string;
  name: string;
  localName: string;
  ageRange: [number, number];
  subjects: string[];
  isExamYear?: boolean;
  examName?: string;
}

export interface EducationSystem {
  country: string;
  countryCode: string;
  flag: string;
  currency: string;
  language: string;
  levels: EducationLevel[];
  categories: {
    primary: string;
    secondary: string;
    higher: string;
  };
}

// International Education Systems Configuration
export const educationSystems: EducationSystem[] = [
  {
    country: 'Algeria',
    countryCode: 'DZ',
    flag: '🇩🇿',
    currency: 'DZD',
    language: 'Arabic/French',
    categories: {
      primary: 'Enseignement Primaire',
      secondary: 'Enseignement Secondaire',
      higher: 'Enseignement Supérieur'
    },
    levels: [
      {
        id: 'prep1',
        name: '1st Year Primary',
        localName: 'السنة الأولى ابتدائي',
        ageRange: [6, 7],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'physical_education']
      },
      {
        id: 'prep2',
        name: '2nd Year Primary',
        localName: 'السنة الثانية ابتدائي',
        ageRange: [7, 8],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'physical_education', 'art']
      },
      {
        id: 'prep3',
        name: '3rd Year Primary',
        localName: 'السنة الثالثة ابتدائي',
        ageRange: [8, 9],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep4',
        name: '4th Year Primary',
        localName: 'السنة الرابعة ابتدائي',
        ageRange: [9, 10],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep5',
        name: '5th Year Primary',
        localName: 'السنة الخامسة ابتدائي',
        ageRange: [10, 11],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'Primary Education Certificate'
      },
      {
        id: 'middle1',
        name: '1st Year Middle School',
        localName: 'السنة الأولى متوسط',
        ageRange: [11, 12],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'sciences', 'technology', 'physical_education', 'art']
      },
      {
        id: 'middle2',
        name: '2nd Year Middle School',
        localName: 'السنة الثانية متوسط',
        ageRange: [12, 13],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'sciences', 'technology', 'physical_education', 'art']
      },
      {
        id: 'middle3',
        name: '3rd Year Middle School',
        localName: 'السنة الثالثة متوسط',
        ageRange: [13, 14],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'sciences', 'technology', 'physical_education', 'art']
      },
      {
        id: 'middle4',
        name: '4th Year Middle School (BEM)',
        localName: 'السنة الرابعة متوسط',
        ageRange: [14, 15],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'sciences', 'technology', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'BEM (Brevet d\'Enseignement Moyen)'
      },
      {
        id: 'secondary1',
        name: '1st Year Secondary',
        localName: 'السنة الأولى ثانوي',
        ageRange: [15, 16],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education']
      },
      {
        id: 'secondary2',
        name: '2nd Year Secondary',
        localName: 'السنة الثانية ثانوي',
        ageRange: [16, 17],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education']
      },
      {
        id: 'bac',
        name: 'Baccalaureate (BAC)',
        localName: 'البكالوريا',
        ageRange: [17, 18],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education'],
        isExamYear: true,
        examName: 'Baccalaureate (BAC)'
      }
    ]
  },
  {
    country: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    currency: 'EUR',
    language: 'French',
    categories: {
      primary: 'École Primaire',
      secondary: 'Collège et Lycée',
      higher: 'Enseignement Supérieur'
    },
    levels: [
      {
        id: 'cp',
        name: 'CP (Cours Préparatoire)',
        localName: 'CP',
        ageRange: [6, 7],
        subjects: ['french', 'mathematics', 'science', 'history', 'geography', 'art', 'physical_education']
      },
      {
        id: 'ce1',
        name: 'CE1',
        localName: 'CE1',
        ageRange: [7, 8],
        subjects: ['french', 'mathematics', 'science', 'history', 'geography', 'art', 'physical_education']
      },
      {
        id: 'ce2',
        name: 'CE2',
        localName: 'CE2',
        ageRange: [8, 9],
        subjects: ['french', 'mathematics', 'science', 'history', 'geography', 'art', 'physical_education', 'english']
      },
      {
        id: 'cm1',
        name: 'CM1',
        localName: 'CM1',
        ageRange: [9, 10],
        subjects: ['french', 'mathematics', 'science', 'history', 'geography', 'art', 'physical_education', 'english']
      },
      {
        id: 'cm2',
        name: 'CM2',
        localName: 'CM2',
        ageRange: [10, 11],
        subjects: ['french', 'mathematics', 'science', 'history', 'geography', 'art', 'physical_education', 'english']
      },
      {
        id: 'sixieme',
        name: '6ème (Collège)',
        localName: '6ème',
        ageRange: [11, 12],
        subjects: ['french', 'mathematics', 'english', 'history', 'geography', 'science', 'technology', 'art', 'music', 'physical_education']
      },
      {
        id: 'cinquieme',
        name: '5ème',
        localName: '5ème',
        ageRange: [12, 13],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'art', 'music', 'physical_education']
      },
      {
        id: 'quatrieme',
        name: '4ème',
        localName: '4ème',
        ageRange: [13, 14],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'art', 'music', 'physical_education']
      },
      {
        id: 'troisieme',
        name: '3ème (Brevet)',
        localName: '3ème',
        ageRange: [14, 15],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'art', 'music', 'physical_education'],
        isExamYear: true,
        examName: 'Diplôme National du Brevet'
      },
      {
        id: 'seconde',
        name: 'Seconde (Lycée)',
        localName: 'Seconde',
        ageRange: [15, 16],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'economics', 'philosophy', 'art', 'physical_education']
      },
      {
        id: 'premiere',
        name: 'Première',
        localName: 'Première',
        ageRange: [16, 17],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'economics', 'philosophy', 'art', 'physical_education']
      },
      {
        id: 'terminale',
        name: 'Terminale (Baccalauréat)',
        localName: 'Terminale',
        ageRange: [17, 18],
        subjects: ['french', 'mathematics', 'english', 'german', 'spanish', 'history', 'geography', 'physics', 'chemistry', 'biology', 'economics', 'philosophy', 'art', 'physical_education'],
        isExamYear: true,
        examName: 'Baccalauréat'
      }
    ]
  },
  {
    country: 'Tunisia',
    countryCode: 'TN',
    flag: '🇹🇳',
    currency: 'TND',
    language: 'Arabic/French',
    categories: {
      primary: 'Enseignement de Base',
      secondary: 'Enseignement Secondaire',
      higher: 'Enseignement Supérieur'
    },
    levels: [
      {
        id: 'prep1',
        name: '1st Year Primary',
        localName: 'السنة الأولى أساسي',
        ageRange: [6, 7],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'physical_education']
      },
      {
        id: 'prep2',
        name: '2nd Year Primary',
        localName: 'السنة الثانية أساسي',
        ageRange: [7, 8],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'physical_education', 'art']
      },
      {
        id: 'prep3',
        name: '3rd Year Primary',
        localName: 'السنة الثالثة أساسي',
        ageRange: [8, 9],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep4',
        name: '4th Year Primary',
        localName: 'السنة الرابعة أساسي',
        ageRange: [9, 10],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep5',
        name: '5th Year Primary',
        localName: 'السنة الخامسة أساسي',
        ageRange: [10, 11],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep6',
        name: '6th Year Primary',
        localName: 'السنة السادسة أساسي',
        ageRange: [11, 12],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'sciences', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'Primary Education Certificate'
      },
      {
        id: 'prep7',
        name: '7th Year (College)',
        localName: 'السنة السابعة أساسي',
        ageRange: [12, 13],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'sciences', 'technology', 'physical_education', 'art']
      },
      {
        id: 'prep8',
        name: '8th Year',
        localName: 'السنة الثامنة أساسي',
        ageRange: [13, 14],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'physical_education', 'art']
      },
      {
        id: 'prep9',
        name: '9th Year',
        localName: 'السنة التاسعة أساسي',
        ageRange: [14, 15],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'Basic Education Diploma'
      },
      {
        id: 'sec1',
        name: '1st Year Secondary',
        localName: 'السنة الأولى ثانوي',
        ageRange: [15, 16],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education']
      },
      {
        id: 'sec2',
        name: '2nd Year Secondary',
        localName: 'السنة الثانية ثانوي',
        ageRange: [16, 17],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education']
      },
      {
        id: 'bac',
        name: 'Baccalaureate',
        localName: 'البكالوريا',
        ageRange: [17, 18],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education'],
        isExamYear: true,
        examName: 'Baccalaureate'
      }
    ]
  },
  {
    country: 'Morocco',
    countryCode: 'MA',
    flag: '🇲🇦',
    currency: 'MAD',
    language: 'Arabic/French',
    categories: {
      primary: 'Enseignement Primaire',
      secondary: 'Enseignement Secondaire',
      higher: 'Enseignement Supérieur'
    },
    levels: [
      {
        id: 'prep1',
        name: '1st Year Primary',
        localName: 'السنة الأولى ابتدائي',
        ageRange: [6, 7],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'physical_education']
      },
      {
        id: 'prep2',
        name: '2nd Year Primary',
        localName: 'السنة الثانية ابتدائي',
        ageRange: [7, 8],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'physical_education', 'art']
      },
      {
        id: 'prep3',
        name: '3rd Year Primary',
        localName: 'السنة الثالثة ابتدائي',
        ageRange: [8, 9],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep4',
        name: '4th Year Primary',
        localName: 'السنة الرابعة ابتدائي',
        ageRange: [9, 10],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep5',
        name: '5th Year Primary',
        localName: 'السنة الخامسة ابتدائي',
        ageRange: [10, 11],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'history', 'geography', 'sciences', 'physical_education', 'art']
      },
      {
        id: 'prep6',
        name: '6th Year Primary',
        localName: 'السنة السادسة ابتدائي',
        ageRange: [11, 12],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'sciences', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'Primary Education Certificate'
      },
      {
        id: 'college1',
        name: '1st Year College',
        localName: 'السنة الأولى إعدادي',
        ageRange: [12, 13],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'sciences', 'technology', 'physical_education', 'art']
      },
      {
        id: 'college2',
        name: '2nd Year College',
        localName: 'السنة الثانية إعدادي',
        ageRange: [13, 14],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'physical_education', 'art']
      },
      {
        id: 'college3',
        name: '3rd Year College (BEPC)',
        localName: 'السنة الثالثة إعدادي',
        ageRange: [14, 15],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'technology', 'physical_education', 'art'],
        isExamYear: true,
        examName: 'BEPC (Brevet d\'Enseignement du Premier Cycle)'
      },
      {
        id: 'lycee1',
        name: '1st Year High School',
        localName: 'السنة الأولى باكالوريا',
        ageRange: [15, 16],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education']
      },
      {
        id: 'lycee2',
        name: '2nd Year High School',
        localName: 'السنة الثانية باكالوريا',
        ageRange: [16, 17],
        subjects: ['arabic', 'mathematics', 'islamic_studies', 'french', 'english', 'history', 'geography', 'physics', 'chemistry', 'biology', 'philosophy', 'physical_education'],
        isExamYear: true,
        examName: 'Baccalaureate'
      }
    ]
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    currency: 'CAD',
    language: 'English/French',
    categories: {
      primary: 'Elementary School',
      secondary: 'High School',
      higher: 'Post-Secondary'
    },
    levels: [
      {
        id: 'k',
        name: 'Kindergarten',
        localName: 'Kindergarten',
        ageRange: [5, 6],
        subjects: ['english', 'mathematics', 'science', 'art', 'physical_education', 'music']
      },
      {
        id: 'grade1',
        name: 'Grade 1',
        localName: 'Grade 1',
        ageRange: [6, 7],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music']
      },
      {
        id: 'grade2',
        name: 'Grade 2',
        localName: 'Grade 2',
        ageRange: [7, 8],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music']
      },
      {
        id: 'grade3',
        name: 'Grade 3',
        localName: 'Grade 3',
        ageRange: [8, 9],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french']
      },
      {
        id: 'grade4',
        name: 'Grade 4',
        localName: 'Grade 4',
        ageRange: [9, 10],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french']
      },
      {
        id: 'grade5',
        name: 'Grade 5',
        localName: 'Grade 5',
        ageRange: [10, 11],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french']
      },
      {
        id: 'grade6',
        name: 'Grade 6',
        localName: 'Grade 6',
        ageRange: [11, 12],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french']
      },
      {
        id: 'grade7',
        name: 'Grade 7',
        localName: 'Grade 7',
        ageRange: [12, 13],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french', 'technology']
      },
      {
        id: 'grade8',
        name: 'Grade 8',
        localName: 'Grade 8',
        ageRange: [13, 14],
        subjects: ['english', 'mathematics', 'science', 'social_studies', 'art', 'physical_education', 'music', 'french', 'technology']
      },
      {
        id: 'grade9',
        name: 'Grade 9',
        localName: 'Grade 9',
        ageRange: [14, 15],
        subjects: ['english', 'mathematics', 'biology', 'chemistry', 'physics', 'history', 'geography', 'art', 'physical_education', 'music', 'french', 'technology']
      },
      {
        id: 'grade10',
        name: 'Grade 10',
        localName: 'Grade 10',
        ageRange: [15, 16],
        subjects: ['english', 'mathematics', 'biology', 'chemistry', 'physics', 'history', 'geography', 'art', 'physical_education', 'music', 'french', 'technology']
      },
      {
        id: 'grade11',
        name: 'Grade 11',
        localName: 'Grade 11',
        ageRange: [16, 17],
        subjects: ['english', 'mathematics', 'biology', 'chemistry', 'physics', 'history', 'geography', 'art', 'physical_education', 'music', 'french', 'technology', 'economics']
      },
      {
        id: 'grade12',
        name: 'Grade 12',
        localName: 'Grade 12',
        ageRange: [17, 18],
        subjects: ['english', 'mathematics', 'biology', 'chemistry', 'physics', 'history', 'geography', 'art', 'physical_education', 'music', 'french', 'technology', 'economics'],
        isExamYear: true,
        examName: 'High School Diploma'
      }
    ]
  }
];

// Non-educational categories for professional/personal development
export const nonEducationalCategories = [
  {
    id: 'professional',
    name: 'Professional Development',
    icon: '💼',
    subcategories: [
      { id: 'leadership', name: 'Leadership & Management' },
      { id: 'skills', name: 'Technical Skills' },
      { id: 'certification', name: 'Professional Certifications' },
      { id: 'career', name: 'Career Development' },
      { id: 'entrepreneurship', name: 'Entrepreneurship' }
    ]
  },
  {
    id: 'personal',
    name: 'Personal Development',
    icon: '🚀',
    subcategories: [
      { id: 'wellness', name: 'Health & Wellness' },
      { id: 'creativity', name: 'Creative Skills' },
      { id: 'hobbies', name: 'Hobbies & Interests' },
      { id: 'lifestyle', name: 'Lifestyle & Productivity' },
      { id: 'relationships', name: 'Communication & Relationships' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Finance',
    icon: '📈',
    subcategories: [
      { id: 'marketing', name: 'Marketing & Sales' },
      { id: 'finance', name: 'Finance & Investment' },
      { id: 'operations', name: 'Business Operations' },
      { id: 'strategy', name: 'Business Strategy' },
      { id: 'ecommerce', name: 'E-commerce' }
    ]
  },
  {
    id: 'technology',
    name: 'Technology & IT',
    icon: '💻',
    subcategories: [
      { id: 'programming', name: 'Programming & Development' },
      { id: 'data', name: 'Data Science & Analytics' },
      { id: 'design', name: 'Design & UX/UI' },
      { id: 'cybersecurity', name: 'Cybersecurity' },
      { id: 'ai', name: 'Artificial Intelligence' }
    ]
  }
];

// Helper functions
export const getEducationSystemByCountry = (countryCode: string): EducationSystem | undefined => {
  return educationSystems.find(system => system.countryCode === countryCode);
};

export const getLevelsByCategory = (system: EducationSystem, category: 'primary' | 'secondary' | 'higher'): EducationLevel[] => {
  const ageRanges = {
    primary: [5, 12],
    secondary: [12, 18],
    higher: [18, 25]
  };
  
  const [minAge, maxAge] = ageRanges[category];
  return system.levels.filter(level => 
    level.ageRange[0] >= minAge && level.ageRange[1] <= maxAge
  );
};

export const getSubjectsByLevel = (system: EducationSystem, levelId: string): string[] => {
  const level = system.levels.find(l => l.id === levelId);
  return level ? level.subjects : [];
};

export const getAllCountries = (): { code: string; name: string; flag: string }[] => {
  return educationSystems.map(system => ({
    code: system.countryCode,
    name: system.country,
    flag: system.flag
  }));
};

export default educationSystems;