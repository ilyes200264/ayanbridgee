import { getSupabaseClient } from '../../_lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      res.status(404).json({ error: 'Prompt not found', message: error.message });
      return;
    }
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}


