import React from 'react';
import { FloatingGenerationButton } from './FloatingGenerationButton';
import { GenerationCompleteModal } from './GenerationCompleteModal';
import { useGenerationFlow } from '../hooks/useGenerationFlow';

interface GenerationIntegrationProps {
  children: React.ReactNode;
}

export const GenerationIntegration: React.FC<GenerationIntegrationProps> = ({ children }) => {
  const {
    isGenerating,
    progress,
    showCompleteModal,
    promptId,
    fileName,
    startGeneration,
    closeCompleteModal
  } = useGenerationFlow();

  return (
    <>
      {children}
      
      {/* Floating Generation Button - Always visible when there are active generations */}
      <FloatingGenerationButton />
      
      {/* Generation Complete Modal */}
      <GenerationCompleteModal
        isOpen={showCompleteModal}
        onClose={closeCompleteModal}
        promptId={promptId}
        fileName={fileName}
      />
    </>
  );
};

// Export the hook for use in other components
export { useGenerationFlow };
