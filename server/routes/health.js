const express = require('express');
const HealthController = require('../controllers/HealthController');

const router = express.Router();
const healthController = new HealthController();

// GET /api/health - Health check
router.get('/', (req, res) => healthController.healthCheck(req, res));

module.exports = router;
