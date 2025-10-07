const File = require('../models/File');
const Prompt = require('../models/Prompt');
const { v4: uuidv4 } = require('uuid');

class FileController {
  constructor() {
    this.fileModel = new File();
    this.promptModel = new Prompt();
  }

  async processPdf(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      if (!req.body.prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
      }

      // Generate unique filename
      const fileExtension = req.file.originalname.split('.').pop();
      const fileName = `${uuidv4()}-${Date.now()}.${fileExtension}`;

      // Upload file to storage
      const uploadResult = await this.fileModel.upload(
        req.file.buffer,
        fileName,
        'application/pdf'
      );

      if (!uploadResult.success) {
        return res.status(500).json({
          error: 'Failed to upload PDF to storage',
          details: uploadResult.error
        });
      }

      // Save prompt to database
      const promptData = {
        id: uuidv4(),
        pdf_url: uploadResult.data.publicUrl,
        pdf_filename: fileName,
        pdf_original_name: req.file.originalname,
        pdf_size: req.file.size,
        prompt: req.body.prompt,
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      const promptResult = await this.promptModel.create(promptData);

      if (!promptResult.success) {
        console.error('Error saving prompt to database:', promptResult.error);
        // Continue with response even if database save fails
      }

      res.json({
        success: true,
        message: 'PDF uploaded successfully',
        data: {
          fileName: fileName,
          originalName: req.file.originalname,
          size: req.file.size,
          prompt: req.body.prompt,
          url: uploadResult.data.publicUrl,
          uploadPath: uploadResult.data.filePath,
          bucket: uploadResult.data.bucket,
          promptId: promptResult.data?.id
        }
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async listFiles(req, res) {
    try {
      const result = await this.fileModel.list();

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to list files',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: {
          files: result.data,
          count: result.data.length
        }
      });
    } catch (error) {
      console.error('Error listing files:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async getFileInfo(req, res) {
    try {
      const { fileName } = req.params;

      const result = await this.fileModel.getPublicUrl(fileName);

      if (!result.success) {
        return res.status(404).json({
          error: 'File not found',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error getting file info:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async deleteFile(req, res) {
    try {
      const { fileName } = req.params;

      const result = await this.fileModel.delete(fileName);

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to delete file',
          message: result.error
        });
      }

      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
}

module.exports = FileController;
