import React from 'react';
import { getSubjectByKeywords, getSubjectById, type SubjectIconConfig } from '../../config/subjectIcons';

interface SubjectBadgeProps {
  // Option 1: Provide subject ID directly
  subjectId?: string;
  // Option 2: Auto-detect from content
  title?: string;
  description?: string;
  category?: string;
  // Option 3: Pass subject object directly
  subject?: SubjectIconConfig;
  // Styling options
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline' | 'minimal';
  showText?: boolean;
  className?: string;
}

const SubjectBadge: React.FC<SubjectBadgeProps> = ({
  subjectId,
  title = '',
  description = '',
  category = '',
  subject,
  size = 'medium',
  variant = 'filled',
  showText = true,
  className = ''
}) => {
  // Determine which subject to display
  let subjectConfig: SubjectIconConfig | null = null;
  
  if (subject) {
    subjectConfig = subject;
  } else if (subjectId) {
    subjectConfig = getSubjectById(subjectId);
  } else {
    subjectConfig = getSubjectByKeywords(title, description, category);
  }
  
  // Return null if no subject found
  if (!subjectConfig) {
    return null;
  }
  
  const Icon = subjectConfig.icon;
  
  // Size configurations with responsive breakpoints
  const sizeConfig = {
    small: {
      container: 'px-2 py-1 sm:px-2.5 sm:py-1.5',
      icon: 'w-3 h-3 sm:w-3.5 sm:h-3.5',
      text: 'text-xs',
      gap: 'gap-1 sm:gap-1.5'
    },
    medium: {
      container: 'px-3 py-1.5 sm:px-3.5 sm:py-2',
      icon: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      text: 'text-sm',
      gap: 'gap-2'
    },
    large: {
      container: 'px-4 py-2 sm:px-5 sm:py-2.5',
      icon: 'w-5 h-5 sm:w-6 sm:h-6',
      text: 'text-base',
      gap: 'gap-2 sm:gap-3'
    }
  };
  
  // Variant configurations
  const variantConfig = {
    filled: `${subjectConfig.bgColor || 'bg-gray-100'} ${subjectConfig.color || 'text-gray-600'} border border-transparent`,
    outline: `bg-transparent ${subjectConfig.color || 'text-gray-600'} border ${subjectConfig.color?.replace('text-', 'border-') || 'border-gray-600'}`,
    minimal: `bg-transparent ${subjectConfig.color || 'text-gray-600'} border-transparent`
  };
  
  const config = sizeConfig[size];
  
  return (
    <div
      className={`
        inline-flex items-center rounded-full font-medium transition-all duration-200 hover:scale-105 cursor-help
        ${config.container} 
        ${config.gap} 
        ${variantConfig[variant]}
        ${className}
      `}
      title={`${subjectConfig.name}: ${subjectConfig.description}`}
      role="img"
      aria-label={`Subject: ${subjectConfig.name}`}
    >
      <Icon 
        className={config.icon} 
        aria-hidden="true"
      />
      {showText && (
        <span className={`${config.text} font-medium truncate`}>
          {subjectConfig.name}
        </span>
      )}
    </div>
  );
};

export default SubjectBadge;