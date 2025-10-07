import React, { useState } from 'react';
import { useGenerationFlow } from '../hooks/useGenerationFlow';
import { GenerationCompleteModal } from './GenerationCompleteModal';

export const GenerationTestPage: React.FC = () => {
  const { startGeneration, isGenerating, progress, showCompleteModal, closeCompleteModal } = useGenerationFlow();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleStartGeneration = async () => {
    if (!selectedFile || !prompt.trim()) {
      alert('Please select a PDF file and enter a prompt');
      return;
    }

    try {
      await startGeneration(selectedFile, prompt);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Test Generation Queue
          </h1>

          {/* File Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Processing Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to do with this PDF..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Generation Progress</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStartGeneration}
            disabled={!selectedFile || !prompt.trim() || isGenerating}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isGenerating ? 'Generating...' : 'Start Generation'}
          </button>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">How to test:</h3>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Select a PDF file</li>
              <li>2. Enter a prompt</li>
              <li>3. Click "Start Generation"</li>
              <li>4. Watch the progress bar</li>
              <li>5. When complete, a modal will appear</li>
              <li>6. Look for the floating button in the bottom-right corner</li>
              <li>7. Click the floating button to see the generation queue</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Generation Complete Modal */}
      <GenerationCompleteModal
        isOpen={showCompleteModal}
        onClose={closeCompleteModal}
        promptId="test-prompt-id"
        fileName={selectedFile?.name}
      />
    </div>
  );
};
