import { getSupabaseClient } from '../_lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      const msg = (error.message || '').toLowerCase();
      // Gracefully handle missing table
      if (msg.includes('does not exist') || msg.includes('relation')) {
        res.json({ success: true, data: { prompts: [], count: 0 } });
        return;
      }
      res.status(500).json({ error: 'Failed to fetch prompts', message: error.message });
      return;
    }

    res.json({ success: true, data: { prompts: data, count: data.length } });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}


