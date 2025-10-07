import { getSupabaseClient } from '../../_lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { status } = req.body || {};
    if (!status || !['pending', 'processing', 'completed', 'failed'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('prompts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      res.status(500).json({ error: 'Failed to update status', message: error.message });
      return;
    }
    res.json({ success: true, data, message: `Prompt status updated to ${status}` });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}


