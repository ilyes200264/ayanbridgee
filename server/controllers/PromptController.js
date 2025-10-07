const Prompt = require('../models/Prompt');

class PromptController {
  constructor() {
    this.promptModel = new Prompt();
  }

  async getAllPrompts(req, res) {
    try {
      const options = {
        orderBy: { column: 'created_at', ascending: false }
      };

      const result = await this.promptModel.findAll(options);

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to fetch prompts',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: {
          prompts: result.data,
          count: result.data.length
        }
      });
    } catch (error) {
      console.error('Error in getAllPrompts:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async getPromptById(req, res) {
    try {
      const { id } = req.params;

      const result = await this.promptModel.findById(id);

      if (!result.success) {
        return res.status(404).json({
          error: 'Prompt not found',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error in getPromptById:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async updatePromptStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || !['pending', 'processing', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({
          error: 'Invalid status. Must be one of: pending, processing, completed, failed'
        });
      }

      const result = await this.promptModel.updateStatus(id, status);

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to update prompt status',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: result.data,
        message: `Prompt status updated to ${status}`
      });
    } catch (error) {
      console.error('Error in updatePromptStatus:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async getActiveGenerations(req, res) {
    try {
      const result = await this.promptModel.findActiveGenerations();

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to fetch active generations',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: {
          prompts: result.data,
          count: result.data.length,
          activeCount: result.data.filter(p => !p.expired).length
        }
      });
    } catch (error) {
      console.error('Error in getActiveGenerations:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async getGenerationStats(req, res) {
    try {
      const result = await this.promptModel.getStats();

      if (!result.success) {
        return res.status(500).json({
          error: 'Failed to fetch generation statistics',
          message: result.error
        });
      }

      res.json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error in getGenerationStats:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
}

module.exports = PromptController;
