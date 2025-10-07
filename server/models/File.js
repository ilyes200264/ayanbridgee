const { createClient } = require('@supabase/supabase-js');

class File {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || 'https://sxwqtnyruprfkvyilgxw.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
    this.bucketName = process.env.PDF_BUCKET_NAME || 'pdfs';
  }

  async upload(buffer, fileName, contentType = 'application/pdf') {
    try {
      const filePath = `pdfs/${fileName}`;
      
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(filePath, buffer, {
          contentType,
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return { 
        success: true, 
        data: {
          fileName,
          filePath,
          publicUrl: urlData.publicUrl,
          bucket: this.bucketName
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async list(options = {}) {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .list('pdfs', {
          limit: options.limit || 100,
          offset: options.offset || 0,
          sortBy: options.sortBy || { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const fileList = data?.map(file => ({
        fileName: file.name,
        size: file.metadata?.size || 0,
        lastModified: file.updated_at,
        key: `pdfs/${file.name}`
      })) || [];

      return { success: true, data: fileList };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getPublicUrl(fileName) {
    try {
      const filePath = `pdfs/${fileName}`;
      
      const { data } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return { 
        success: true, 
        data: {
          fileName,
          url: data.publicUrl,
          expiresIn: 'Public URL (no expiration)'
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(fileName) {
    try {
      const filePath = `pdfs/${fileName}`;
      
      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = File;
