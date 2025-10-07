const express = require('express');
const PromptController = require('../controllers/PromptController');

const router = express.Router();
const promptController = new PromptController();

// GET /api/prompts - Get all prompts
router.get('/', (req, res) => promptController.getAllPrompts(req, res));

// GET /api/prompts/:id - Get single prompt
router.get('/:id', (req, res) => promptController.getPromptById(req, res));

// PATCH /api/prompts/:id/status - Update prompt status
router.patch('/:id/status', (req, res) => promptController.updatePromptStatus(req, res));

module.exports = router;
