import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !(serviceKey || anonKey)) {
    throw new Error('Missing SUPABASE_URL and key (SERVICE_ROLE or ANON) for API functions');
  }

  return createClient(url, serviceKey || anonKey);
}


