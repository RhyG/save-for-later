import { createClient } from '@supabase/supabase-js';

import { StorageModule } from '@app/modules/AsyncStorage';

import { SUPABASE_API_KEY, SUPABASE_URL } from '../../env';

// const supabaseUrl = SUPABASE_URL
// const supabaseAnonKey = SUPABASE_API_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  localStorage: StorageModule,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
