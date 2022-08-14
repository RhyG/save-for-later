import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from '@tanstack/react-query';
import { focusManager } from '@tanstack/react-query';
import React, { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

export const QueryClientProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  useEffect(() => {
    focusManager.setEventListener(handleFocus => {
      const subscription = AppState.addEventListener('change', state => {
        handleFocus(state === 'active');
      });

      return () => {
        subscription.remove();
      };
    });
  }, []);

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
};
