import React from 'react';
import { CheckCircle, Clock, X } from 'lucide-react';

interface GenerationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptId?: string;
  fileName?: string;
}

export const GenerationCompleteModal: React.FC<GenerationCompleteModalProps> = ({
  isOpen,
  onClose,
  promptId,
  fileName
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Génération lancée!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Votre cours est en cours de génération
              </h3>
              <p className="text-gray-600">
                Nous traitons votre demande et vous serez notifié dès que c'est prêt.
              </p>
            </div>

            {fileName && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Fichier traité:</p>
                <p className="font-medium text-gray-800 truncate">{fileName}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">
                    Temps d'attente estimé
                  </h4>
                  <p className="text-sm text-blue-700">
                    La génération prend généralement 24 heures. Vous pouvez suivre le progrès 
                    avec le bouton flottant en bas à droite.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Compris, merci!
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Vous recevrez une notification par email une fois la génération terminée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
