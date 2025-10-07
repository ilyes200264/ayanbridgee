const express = require('express');
const PromptController = require('../controllers/PromptController');

const router = express.Router();
const promptController = new PromptController();

// GET /api/generation-stats - Get generation statistics
router.get('/', (req, res) => promptController.getGenerationStats(req, res));

module.exports = router;
