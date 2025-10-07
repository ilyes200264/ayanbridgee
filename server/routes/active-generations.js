const express = require('express');
const PromptController = require('../controllers/PromptController');

const router = express.Router();
const promptController = new PromptController();

// GET /api/active-generations - Get active generations
router.get('/', (req, res) => promptController.getActiveGenerations(req, res));

module.exports = router;
