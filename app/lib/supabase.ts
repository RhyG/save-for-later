import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { SUPABASE_API_KEY, SUPABASE_URL } from '../../env';

// const supabaseUrl = SUPABASE_URL
// const supabaseAnonKey = SUPABASE_API_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
