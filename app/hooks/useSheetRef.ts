import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';

export const useSheetRef = () => {
  const sheetRef = useRef<BottomSheetModal>();

  const present = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  // Return value is memoised to ensure they are memory safe when required as a dependency.
  return useMemo(() => ({ sheetRef, present, dismiss }), [dismiss, present]);
};
