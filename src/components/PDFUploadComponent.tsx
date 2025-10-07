import React, { useState, useRef } from 'react';
import { usePDFUpload } from '../hooks/usePDFUpload';

interface PDFUploadComponentProps {
  onUploadSuccess?: (result: any) => void;
  className?: string;
}

export const PDFUploadComponent: React.FC<PDFUploadComponentProps> = ({
  onUploadSuccess,
  className = ''
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadPDF, loading, error, success, files, listFiles } = usePDFUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !prompt.trim()) {
      alert('Please select a PDF file and enter a prompt');
      return;
    }

    try {
      const result = await uploadPDF(selectedFile, prompt);
      onUploadSuccess?.(result);
      
      // Reset form
      setSelectedFile(null);
      setPrompt('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleListFiles = async () => {
    try {
      await listFiles();
    } catch (error) {
      console.error('Failed to list files:', error);
    }
  };

  return (
    <div className={`pdf-upload-component ${className}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">PDF Upload to Supabase</h2>
        
        {/* File Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select PDF File
          </label>
          <input
            ref={fileInputRef}
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
        <div className="mb-4">
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

        {/* Upload Button */}
        <div className="mb-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !prompt.trim() || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ {success}
          </div>
        )}

        {/* File List Button */}
        <div className="mb-4">
          <button
            onClick={handleListFiles}
            disabled={loading}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'List Uploaded Files'}
          </button>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Uploaded Files ({files.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{file.fileName}</p>
                      <p className="text-sm text-gray-600">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-gray-500">
                        Modified: {new Date(file.lastModified).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={`${(import.meta.env.VITE_API_BASE_URL as string) || (import.meta.env.DEV ? 'http://localhost:3001/api' : '')}/file/${file.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUploadComponent;

