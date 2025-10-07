import { useState, useCallback } from 'react';
import { pdfUploadService, UploadResponse, FilesListResponse } from '../lib/pdfUpload';

interface UsePDFUploadReturn {
  uploadPDF: (file: File, prompt: string) => Promise<UploadResponse>;
  listFiles: () => Promise<FilesListResponse>;
  checkHealth: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  files: any[];
}

export const usePDFUpload = (): UsePDFUploadReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const uploadPDF = useCallback(async (file: File, prompt: string): Promise<UploadResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate file
      const validation = pdfUploadService.validatePDFFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Upload file
      const result = await pdfUploadService.uploadPDF(file, prompt);
      
      setSuccess(`PDF "${file.name}" uploaded successfully!`);
      setFiles(prev => [...prev, result.data]);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listFiles = useCallback(async (): Promise<FilesListResponse> => {
    setLoading(true);
    setError(null);

    try {
      const result = await pdfUploadService.listFiles();
      setFiles(result.data.files);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to list files';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkHealth = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await pdfUploadService.checkHealth();
      setSuccess(`Server is healthy: ${result.message}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Health check failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadPDF,
    listFiles,
    checkHealth,
    loading,
    error,
    success,
    files
  };
};

