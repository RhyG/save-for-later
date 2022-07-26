import { Session } from '@supabase/supabase-js';
import create from 'zustand';

interface IAuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useAuth = create<IAuthState>(set => ({
  session: null,
  setSession: (session: Session | null) => {
    set(() => ({
      session,
    }));
  },
}));
