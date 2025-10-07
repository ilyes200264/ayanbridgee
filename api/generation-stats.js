import { getSupabaseClient } from './_lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const supabase = getSupabaseClient();
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const { data: recent, error: e1 } = await supabase
      .from('prompts')
      .select('status, created_at')
      .gte('created_at', twentyFourHoursAgo.toISOString());
    if (e1) {
      const msg = (e1.message || '').toLowerCase();
      if (msg.includes('does not exist') || msg.includes('relation')) {
        res.json({ success: true, data: { total: 0, last24Hours: 0, pending: 0, processing: 0, completed: 0, failed: 0, active: 0 } });
        return;
      }
      throw e1;
    }

    const { data: all, error: e2 } = await supabase
      .from('prompts')
      .select('status');
    if (e2) throw e2;

    const stats = {
      total: all.length,
      last24Hours: recent.length,
      pending: all.filter(p => p.status === 'pending').length,
      processing: all.filter(p => p.status === 'processing').length,
      completed: all.filter(p => p.status === 'completed').length,
      failed: all.filter(p => p.status === 'failed').length,
      active: recent.filter(p => ['pending', 'processing'].includes(p.status)).length,
    };

    res.json({ success: true, data: stats });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}


