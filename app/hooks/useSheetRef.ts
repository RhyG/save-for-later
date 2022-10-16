import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';

const noop = () => {};

export const useSheetRef = () => {
  const sheetRef = useRef<BottomSheetModal | null>(null);

  const present = useCallback(() => {
    sheetRef.current?.present() ?? noop();
  }, []);

  const dismiss = useCallback(() => {
    sheetRef.current?.close() ?? noop();
  }, []);

  // Return value is memoised to ensure they are memory safe when required as a dependency.
  return useMemo(() => ({ sheetRef, present, dismiss }), [dismiss, present]);
};
