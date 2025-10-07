import React from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import type { EbookDetails } from '../../dashboard/AIStudio';

interface EbookDetailsFormProps {
  ebookDetails: EbookDetails;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAudienceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChaptersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onNext: () => void;
}

const EbookDetailsForm: React.FC<EbookDetailsFormProps> = ({
  ebookDetails,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onAudienceChange,
  onChaptersChange,
  onPagesChange,
  onBack,
  onNext
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
        <h1 className="text-3xl font-bold text-white mb-2">Tell Us About Your Ebook</h1>
        <p className="text-white/70">Provide some details so our AI can create the perfect content for you</p>
      </div>

      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Ebook Title</label>
            <input
              type="text"
              placeholder="e.g., The Ultimate Guide to Digital Marketing"
              value={ebookDetails.title}
              onChange={onTitleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              placeholder="Describe what your ebook will cover, who it's for, and what readers will learn..."
              value={ebookDetails.description}
              onChange={onDescriptionChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>
 

       
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
            disabled={!ebookDetails.title || !ebookDetails.description  }
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EbookDetailsForm; 