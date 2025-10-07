import React from 'react';
import { X, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useGenerationQueue } from '../hooks/useGenerationQueue';

interface GenerationQueueProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerationQueue: React.FC<GenerationQueueProps> = ({ isOpen, onClose }) => {
  const { prompts, loading, error, calculateTimeRemaining, getStatusInfo, fetchPrompts } = useGenerationQueue();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Modal */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-secondary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-primary/20
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-text">File de génération</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
          >
            <X className="w-5 h-5 text-text/70 group-hover:text-text" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-secondary relative">
          {/* Scroll indicator at top */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-secondary to-transparent pointer-events-none z-10"></div>
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-text/70">Chargement...</span>
            </div>
          )}

          {error && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-error mr-2" />
                <span className="text-error">{error}</span>
              </div>
            </div>
          )}

          {!loading && !error && prompts.length === 0 && (
            <div className="text-center py-8">
              <div className="p-4 bg-primary/5 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary/60" />
              </div>
              <p className="text-text/70">Aucune génération en cours</p>
            </div>
          )}

          {!loading && !error && prompts.length > 0 && (
            <div className="space-y-4 pb-4">
              {prompts.map((prompt) => {
                const timeInfo = calculateTimeRemaining(prompt.created_at);
                const statusInfo = getStatusInfo(prompt.status, timeInfo);

                return (
                  <div key={prompt.id} className={`p-4 rounded-lg border bg-secondary/50 border-primary/20 hover:bg-secondary/70 transition-colors`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {statusInfo.icon}
                        </div>
                        <span className={`font-medium ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                      <span className="text-sm text-text/60">
                        {new Date(prompt.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-text/70 mb-1">Fichier:</p>
                      <p className="font-medium text-text truncate">
                        {prompt.pdf_original_name}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-text/70 mb-1">Prompt:</p>
                      <p className="text-sm text-text/80 line-clamp-2">
                        {prompt.prompt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-text/80">
                          {timeInfo.expired ? 'Terminé' : timeInfo.timeRemaining}
                        </span>
                      </div>
                      <div className="text-xs text-text/60">
                        {prompt.pdf_size > 0 ? `${(prompt.pdf_size / 1024 / 1024).toFixed(1)} MB` : ''}
                      </div>
                    </div>

                    {timeInfo.expired && prompt.status === 'pending' && (
                      <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                        <p className="text-sm text-success font-medium flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Génération terminée avec succès!
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Scroll indicator at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-secondary to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Footer */}
        <div className="border-t border-primary/20 p-4">
          <button
            onClick={fetchPrompts}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary-dark disabled:bg-primary/50 transition-colors font-medium"
          >
            {loading ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>
    </>
  );
};
