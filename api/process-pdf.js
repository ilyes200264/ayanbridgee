import { getSupabaseClient } from './_lib/supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse multipart form data
    const formData = await req.formData();
    const pdfFile = formData.get('pdf');
    const prompt = formData.get('prompt');

    if (!pdfFile) {
      res.status(400).json({ error: 'No PDF file uploaded' });
      return;
    }

    if (!prompt) {
      res.status(400).json({ error: 'No prompt provided' });
      return;
    }

    // Generate unique filename
    const fileExtension = pdfFile.name.split('.').pop();
    const fileName = `${uuidv4()}-${Date.now()}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const supabase = getSupabaseClient();
    const filePath = `pdfs/${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pdfs')
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      res.status(500).json({ error: 'Failed to upload PDF to storage', details: uploadError.message });
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath);

    // Save prompt to database
    const promptData = {
      id: uuidv4(),
      pdf_url: urlData.publicUrl,
      pdf_filename: fileName,
      pdf_original_name: pdfFile.name,
      pdf_size: pdfFile.size,
      prompt: prompt,
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    const { data: dbData, error: dbError } = await supabase
      .from('prompts')
      .insert([promptData])
      .select()
      .single();

    if (dbError) {
      console.error('Error saving prompt to database:', dbError);
      // Continue with response even if database save fails
    }

    res.json({
      success: true,
      message: 'PDF uploaded successfully',
      data: {
        fileName: fileName,
        originalName: pdfFile.name,
        size: pdfFile.size,
        prompt: prompt,
        url: urlData.publicUrl,
        uploadPath: filePath,
        bucket: 'pdfs',
        promptId: dbData?.id
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}
