const { createClient } = require('@supabase/supabase-js');

class Prompt {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || 'https://sxwqtnyruprfkvyilgxw.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
  }

  async create(promptData) {
    try {
      const { data, error } = await this.supabase
        .from('prompts')
        .insert([promptData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll(options = {}) {
    try {
      let query = this.supabase
        .from('prompts')
        .select('*');

      if (options.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id) {
    try {
      const { data, error } = await this.supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateStatus(id, status) {
    try {
      const { data, error } = await this.supabase
        .from('prompts')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findActiveGenerations() {
    try {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const { data, error } = await this.supabase
        .from('prompts')
        .select('*')
        .in('status', ['pending', 'processing'])
        .gte('created_at', twentyFourHoursAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate time remaining for each prompt
      const promptsWithTimeRemaining = data.map(prompt => {
        const created = new Date(prompt.created_at);
        const elapsed = now.getTime() - created.getTime();
        const remaining = 24 * 60 * 60 * 1000 - elapsed;

        let timeRemaining = '0h 0m 0s';
        let expired = false;

        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          expired = true;
        }

        return {
          ...prompt,
          timeRemaining,
          expired,
          hours: Math.floor(remaining / (1000 * 60 * 60)),
          minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((remaining % (1000 * 60)) / 1000)
        };
      });

      return { success: true, data: promptsWithTimeRemaining };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStats() {
    try {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Get recent prompts (last 24 hours)
      const { data: recentPrompts, error: recentError } = await this.supabase
        .from('prompts')
        .select('status, created_at')
        .gte('created_at', twentyFourHoursAgo.toISOString());

      if (recentError) throw recentError;

      // Get all prompts for total stats
      const { data: allPrompts, error: allError } = await this.supabase
        .from('prompts')
        .select('status');

      if (allError) throw allError;

      const stats = {
        total: allPrompts.length,
        last24Hours: recentPrompts.length,
        pending: allPrompts.filter(p => p.status === 'pending').length,
        processing: allPrompts.filter(p => p.status === 'processing').length,
        completed: allPrompts.filter(p => p.status === 'completed').length,
        failed: allPrompts.filter(p => p.status === 'failed').length,
        active: recentPrompts.filter(p => ['pending', 'processing'].includes(p.status)).length
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Prompt;
