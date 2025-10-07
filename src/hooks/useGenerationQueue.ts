import { useState, useEffect, useCallback } from 'react';
import { getPrompts, getActiveGenerations } from '../lib/pdfUpload';

interface PromptData {
  id: string;
  pdf_url: string;
  pdf_filename: string;
  pdf_original_name: string;
  pdf_size: number;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

interface TimeRemaining {
  expired: boolean;
  timeRemaining: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useGenerationQueue = () => {
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  // Calculate time remaining for a prompt
  const calculateTimeRemaining = useCallback((createdAt: string): TimeRemaining => {
    const created = new Date(createdAt);
    const now = new Date();
    const elapsed = now.getTime() - created.getTime();
    const remaining = 24 * 60 * 60 * 1000 - elapsed; // 24 hours in milliseconds

    if (remaining <= 0) {
      return { 
        expired: true, 
        timeRemaining: '0h 0m 0s',
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return {
      expired: false,
      timeRemaining: `${hours}h ${minutes}m ${seconds}s`,
      hours,
      minutes,
      seconds
    };
  }, []);

  // Fetch prompts from database
  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the optimized active generations endpoint
      const data = await getActiveGenerations();
      setPrompts(data.prompts);
      setActiveCount(data.activeCount);
    } catch (err) {
      setError('Failed to load generation queue');
      console.error('Error fetching prompts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get status info for a prompt
  const getStatusInfo = useCallback((status: string, timeInfo: TimeRemaining) => {
    if (timeInfo.expired) {
      return {
        icon: '✅',
        text: 'Génération terminée',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20'
      };
    }

    switch (status) {
      case 'completed':
        return {
          icon: '✅',
          text: 'Terminé',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'processing':
        return {
          icon: '🔄',
          text: 'En cours...',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
      case 'failed':
        return {
          icon: '❌',
          text: 'Échec',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      default:
        return {
          icon: '⏳',
          text: 'En attente',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
    }
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    fetchPrompts();
    const interval = setInterval(fetchPrompts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPrompts]);

  return {
    prompts,
    loading,
    error,
    activeCount,
    calculateTimeRemaining,
    getStatusInfo,
    fetchPrompts
  };
};
