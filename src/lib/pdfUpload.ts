const API_BASE_URL = (() => {
  const envUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
  if (envUrl) return envUrl;
  if (import.meta.env.DEV) return 'http://localhost:3001/api';
  throw new Error('VITE_API_BASE_URL is not configured for production');
})();
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    fileName: string;
    originalName: string;
    size: number;
    prompt: string;
    url: string;
    uploadPath: string;
    bucket: string;
    promptId?: string;
  };
}

export interface PromptData {
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

export const uploadPDFWithPrompt = async (
  file: File, 
  prompt: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('prompt', prompt);

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/process-pdf`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Upload timeout - please try again');
    }
    throw error;
  }
};

export const getPrompts = async (): Promise<PromptData[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/prompts`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch prompts: ${response.status}`);
    }

    const data = await response.json();
    return data.data.prompts;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

export const getActiveGenerations = async (): Promise<{
  prompts: PromptData[];
  count: number;
  activeCount: number;
}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/active-generations`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch active generations: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

export const updatePromptStatus = async (id: string, status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<PromptData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/prompts/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to update prompt status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

export const getGenerationStats = async (): Promise<{
  total: number;
  last24Hours: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  active: number;
}> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/generation-stats`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch generation stats: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

export const getPrompt = async (id: string): Promise<PromptData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/prompts/${id}`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch prompt: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};