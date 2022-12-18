import { createClient } from '@supabase/supabase-js';
import { MMKVLoader } from 'react-native-mmkv-storage';

import { SUPABASE_API_KEY, SUPABASE_URL } from '../../env';

// const supabaseUrl = SUPABASE_URL
// const supabaseAnonKey = SUPABASE_API_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  localStorage: MMKVLoader as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
