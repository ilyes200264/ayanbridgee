const express = require('express');
const FileController = require('../controllers/FileController');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();
const fileController = new FileController();

// POST /api/files - Upload and process PDF
router.post('/', upload.single('pdf'), handleUploadError, (req, res) => 
  fileController.processPdf(req, res)
);


// GET /api/files - List all files
router.get('/', (req, res) => fileController.listFiles(req, res));

// GET /api/files/:fileName - Get file info
router.get('/:fileName', (req, res) => fileController.getFileInfo(req, res));

// DELETE /api/files/:fileName - Delete file
router.delete('/:fileName', (req, res) => fileController.deleteFile(req, res));

module.exports = router;
