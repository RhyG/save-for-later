import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';

type Props = React.PropsWithChildren<{
  sheetTitle?: string;
  customSnapPoints?: string[];
  alignHeader?: 'auto' | 'left' | 'center' | 'right' | 'justify';
}>;

const bottomSheetStyle = { zIndex: 2 };

/* Renders the darkened backdrop behind the sheet */
const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
);

export const BottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ sheetTitle, customSnapPoints, alignHeader, children }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets();

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      const snapPoint = bottomInset > 0 ? '45%' : '48%';

      const snapPointAdjustedForInset =
        bottomInset > 0 ? snapPoint + 3 : snapPoint;

      return [`${snapPointAdjustedForInset}%`];
    }, [bottomInset]);

    return (
      <>
        <BottomSheetModal
          index={0}
          snapPoints={customSnapPoints ?? snapPoints}
          ref={ref}
          enablePanDownToClose={true}
          style={bottomSheetStyle}
          backdropComponent={Backdrop}>
          <SheetContainer>
            {sheetTitle ? (
              <Text
                fontSize="lg"
                bold
                numberOfLines={2}
                marginBottom={2}
                align={alignHeader ?? 'left'}>
                {sheetTitle}
              </Text>
            ) : null}
            {children}
          </SheetContainer>
        </BottomSheetModal>
      </>
    );
  },
);

const SheetContainer = styled.View`
  padding: 10px 20px 30px 20px;
  flex: 1;
`;
