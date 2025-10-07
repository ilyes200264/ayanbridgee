class HealthController {
  async healthCheck(req, res) {
    try {
      res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (error) {
      console.error('Error in health check:', error);
      res.status(500).json({
        error: 'Health check failed',
        message: error.message
      });
    }
  }
}

module.exports = HealthController;
