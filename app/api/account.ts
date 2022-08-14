import { Session, User } from '@supabase/supabase-js';

import { supabase } from '@app/lib/supabase';

interface IAccountAPI {
  signIn: (email: string) => Promise<User | null>;
  submitOTP: (
    email: string,
    token: string,
  ) => Promise<{ user: User | null; session: Session | null } | null>;
  signOut: () => Promise<void>;
}

// 1. Use signIn({ email: '' }) to send a code
// 2. Use verifyOTP({ token, type: 'magiclink' })

export const AccountAPI: IAccountAPI = {
  signIn: async (email: string) => {
    const { error, user } = await supabase.auth.signIn({ email });

    if (error) {
      throw new Error(`Error signing in with that email: ${error.message}`);
    }

    return user;
  },
  submitOTP: async (email: string, token: string) => {
    const { user, error, session } = await supabase.auth.verifyOTP({
      email,
      token,
      type: 'magiclink',
    });

    if (error) {
      throw new Error(`Error submitting OTP: ${error.message}`);
    }

    return { user, session };
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
};
