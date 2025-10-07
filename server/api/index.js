const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debug logging for Vercel
console.log('🚀 AyanBridge API Server Initializing...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Vercel:', process.env.VERCEL);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and setup routes with error handling
try {
  const healthRoutes = require('../routes/health');
  const filesRoutes = require('../routes/files');
  const promptsRoutes = require('../routes/prompts');
  const activeGenerationsRoutes = require('../routes/active-generations');
  const generationStatsRoutes = require('../routes/generation-stats');
  
  // Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/files', filesRoutes);
  app.use('/api/prompts', promptsRoutes);
  app.use('/api/active-generations', activeGenerationsRoutes);
  app.use('/api/generation-stats', generationStatsRoutes);
  
  console.log('✅ All routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
  // Add a fallback route for debugging
  app.get('/api/debug', (req, res) => {
    res.json({ error: 'Route loading failed', details: error.message });
  });
}

// Legacy endpoint for frontend compatibility
// Frontend calls /api/process-pdf but our route is /api/files
app.post('/api/process-pdf', (req, res, next) => {
  try {
    // Import the FileController and middleware directly
    const FileController = require('../controllers/FileController');
    const { upload, handleUploadError } = require('../middleware/upload');
    const fileController = new FileController();
    
    // Use the same middleware and controller as the files route
    upload.single('pdf')(req, res, (err) => {
      if (err) {
        return handleUploadError(err, req, res);
      }
      fileController.processPdf(req, res);
    });
  } catch (error) {
    console.error('Error in legacy endpoint:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint called');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: process.env.VERCEL
  });
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.json({
    message: 'AyanBridge API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercel: process.env.VERCEL,
    endpoints: [
      'GET /api/test (simple test)',
      'GET /api/health',
      'POST /api/files (or /api/process-pdf for legacy)',
      'GET /api/files',
      'GET /api/files/:fileName',
      'DELETE /api/files/:fileName',
      'GET /api/prompts',
      'GET /api/prompts/:id',
      'PATCH /api/prompts/:id/status',
      'GET /api/active-generations',
      'GET /api/generation-stats'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/files (or /api/process-pdf for legacy)',
      'GET /api/files',
      'GET /api/files/:fileName',
      'DELETE /api/files/:fileName',
      'GET /api/prompts',
      'GET /api/prompts/:id',
      'PATCH /api/prompts/:id/status',
      'GET /api/active-generations',
      'GET /api/generation-stats'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

// Export the app for Vercel serverless functions
module.exports = app;

// Also export as default for Vercel compatibility
module.exports.default = app;

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('🚀 AyanBridge API Server Started');
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📁 Upload endpoint: http://localhost:${PORT}/api/files`);
    console.log(`📁 Legacy upload: http://localhost:${PORT}/api/process-pdf`);
    console.log(`📋 Files list: http://localhost:${PORT}/api/files`);
    console.log(`📝 Prompts list: http://localhost:${PORT}/api/prompts`);
    console.log(`🔄 Active generations: http://localhost:${PORT}/api/active-generations`);
    console.log(`📊 Generation stats: http://localhost:${PORT}/api/generation-stats`);
    console.log('\n💡 Make sure to:');
    console.log('   1. Set SUPABASE_SERVICE_ROLE_KEY in your .env file');
    console.log('   2. Create the "prompts" table in your Supabase database');
    console.log('   3. Create the "pdfs" storage bucket in Supabase Storage');
    console.log('   4. Use PDF_BUCKET_NAME=pdfs in your .env file');
  });
}
