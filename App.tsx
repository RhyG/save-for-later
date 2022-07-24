import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from '@app/components/providers/ThemeProvider';
import { ILink } from '@app/models';
import AsyncStorage from '@app/modules/AsyncStorage';
import Navigator from '@app/navigation/index';
import { useLocalLinks } from '@app/store/localLinks';

// Fetch local links from storage on app mount
(async () => {
  const storedLinks = await AsyncStorage.getItem<{ links: ILink[] }>('links', {
    links: [],
  });

  useLocalLinks.getState().setLocalLinks(storedLinks.links);
})();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <Navigator />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
