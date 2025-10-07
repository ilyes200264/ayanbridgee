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

    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .in('status', ['pending', 'processing'])
      .gte('created_at', twentyFourHoursAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('does not exist') || msg.includes('relation')) {
        res.json({ success: true, data: { prompts: [], count: 0, activeCount: 0 } });
        return;
      }
      res.status(500).json({ error: 'Failed to fetch active generations', message: error.message });
      return;
    }

    const promptsWithTime = (data || []).map((prompt) => {
      const created = new Date(prompt.created_at);
      const elapsed = now.getTime() - created.getTime();
      const remaining = 24 * 60 * 60 * 1000 - elapsed;
      const expired = remaining <= 0;
      const hours = Math.floor(Math.max(remaining, 0) / (1000 * 60 * 60));
      const minutes = Math.floor((Math.max(remaining, 0) % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((Math.max(remaining, 0) % (1000 * 60)) / 1000);
      const timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
      return { ...prompt, timeRemaining, expired, hours, minutes, seconds };
    });

    res.json({ success: true, data: { prompts: promptsWithTime, count: promptsWithTime.length, activeCount: promptsWithTime.filter(p => !p.expired).length } });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
}


