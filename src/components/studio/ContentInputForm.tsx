import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Upload, Edit, FileText, Sparkles } from 'lucide-react';

interface ContentData {
  type: 'text' | 'upload';
  text?: string;
  file?: File;
}

interface ContentInputFormProps {
  contentData: ContentData;
  onContentTypeChange: (type: 'text' | 'upload') => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onNext: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const ContentInputForm: React.FC<ContentInputFormProps> = ({
  contentData,
  onContentTypeChange,
  onTextChange,
  onFileChange,
  onBack,
  onNext,
  fileInputRef
}) => (
  <div className="min-h-screen bg-secondary p-8">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Provide Content for AI Generation</h1>
        <p className="text-white/70">Give our AI some content to work with - write directly or upload a document</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
            contentData.type === 'text' 
              ? 'border-primary bg-primary/10' 
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
          onClick={() => onContentTypeChange('text')}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Write Content</h3>
            <p className="text-white/70 text-sm">
              Write your ideas, outline, or existing content directly in the text area
            </p>
          </div>
          
          {contentData.type === 'text' && (
            <div>
              <textarea
                placeholder="Write your content ideas, outline, or existing text here. The AI will use this as a foundation to generate your complete ebook..."
                value={contentData.text || ''}
                onChange={onTextChange}
                rows={10}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary resize-none"
              />
            </div>
          )}
        </motion.div>

        <motion.div
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
            contentData.type === 'upload' 
              ? 'border-primary bg-primary/10' 
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
          onClick={() => onContentTypeChange('upload')}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Document</h3>
            <p className="text-white/70 text-sm">
              Upload an existing document that the AI can analyze and expand upon
            </p>
          </div>
          
          {contentData.type === 'upload' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={onFileChange}
                className="hidden"
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-colors cursor-pointer"
              >
                {contentData.file ? (
                  <div>
                    <FileText className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-white font-medium">{contentData.file.name}</p>
                    <p className="text-white/60 text-sm">{(contentData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-white/50 mx-auto mb-3" />
                    <p className="text-white/70">Click to upload a document</p>
                    <p className="text-white/50 text-sm">Supports TXT, DOC, DOCX, PDF</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={contentData.type === 'text' ? !contentData.text : !contentData.file}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate with AI
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default ContentInputForm; 