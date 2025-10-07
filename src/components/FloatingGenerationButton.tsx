import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { GenerationQueue } from './GenerationQueue';
import { useGenerationQueue } from '../hooks/useGenerationQueue';

export const FloatingGenerationButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeCount } = useGenerationQueue();

  // Don't show the button if no active generations
  if (activeCount === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Clock className="w-6 h-6" />
          
          {/* Badge with count */}
          {activeCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {activeCount}
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            File de génération ({activeCount})
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </button>
      </div>

      {/* Generation Queue Modal */}
      <GenerationQueue 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
