import {
  QueryClient,
  QueryClientProvider as RCQueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

export const QueryClientProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => (
  <RCQueryClientProvider client={queryClient}>{children}</RCQueryClientProvider>
);
