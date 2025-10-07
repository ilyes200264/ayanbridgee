import { useState, useCallback } from 'react';
import { uploadPDFWithPrompt } from '../lib/pdfUpload';

interface GenerationFlowState {
  isGenerating: boolean;
  progress: number;
  isComplete: boolean;
  showCompleteModal: boolean;
  promptId?: string;
  fileName?: string;
}

export const useGenerationFlow = () => {
  const [state, setState] = useState<GenerationFlowState>({
    isGenerating: false,
    progress: 0,
    isComplete: false,
    showCompleteModal: false,
    promptId: undefined,
    fileName: undefined
  });

  // Start generation process
  const startGeneration = useCallback(async (file: File, prompt: string) => {
    setState(prev => ({
      ...prev,
      isGenerating: true,
      progress: 0,
      isComplete: false,
      showCompleteModal: false
    }));

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => {
          if (prev.progress < 90) {
            return { ...prev, progress: prev.progress + Math.random() * 10 };
          }
          return prev;
        });
      }, 500);

      // Upload PDF and get prompt ID
      const result = await uploadPDFWithPrompt(file, prompt);
      
      // Complete progress
      clearInterval(progressInterval);
      setState(prev => ({
        ...prev,
        progress: 100,
        isGenerating: false,
        isComplete: true,
        showCompleteModal: true,
        promptId: result.data.promptId,
        fileName: result.data.originalName
      }));

    } catch (error) {
      console.error('Generation failed:', error);
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 0,
        isComplete: false,
        showCompleteModal: false
      }));
      throw error;
    }
  }, []);

  // Close complete modal
  const closeCompleteModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showCompleteModal: false
    }));
  }, []);

  // Reset generation state
  const resetGeneration = useCallback(() => {
    setState({
      isGenerating: false,
      progress: 0,
      isComplete: false,
      showCompleteModal: false,
      promptId: undefined,
      fileName: undefined
    });
  }, []);

  return {
    ...state,
    startGeneration,
    closeCompleteModal,
    resetGeneration
  };
};
