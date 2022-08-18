import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import { QueryClientProvider } from '@app/components/providers/QueryClientProvider';
import { ThemeProvider } from '@app/components/providers/ThemeProvider';
import { supabase } from '@app/lib/supabase';
import AsyncStorage from '@app/modules/AsyncStorage';
import Navigator from '@app/navigation/index';
import { useAuth } from '@app/store/auth';
import { DEFAULT_SETTINGS, useUser5ettings } from '@app/store/userSettings';

// Fetch local links from storage on app mount
(async () => {
  const settings = await AsyncStorage.getItem<typeof DEFAULT_SETTINGS>('settings', DEFAULT_SETTINGS);

  useUser5ettings.getState().updateSettings(settings);
})();

export default function App() {
  const setSession = useAuth(state => state.setSession);

  useEffect(() => {
    // We love the sesh, so we get the sesh straight away.
    const sesh = supabase.auth.session();

    setSession(sesh);

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AUTH STATE CHANGED:', { sesh });
      setSession(session);
    });
  }, [setSession]);

  return (
    <QueryClientProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <Navigator />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
