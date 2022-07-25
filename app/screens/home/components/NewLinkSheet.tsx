import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import shortid from 'shortid';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { useLocalLinks } from '@app/store/localLinks';

type Props = {
  linkDetails: any;
  loadingLinkDetails: boolean;
};

const bottomSheetStyle = { zIndex: 2 };

export const NewLinkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ linkDetails, loadingLinkDetails }, ref) => {
    const { colours } = useTheme();
    const { bottom: bottomInset } = useSafeAreaInsets();

    const addLink = useLocalLinks(state => state.addLink);

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      const snapPoint = bottomInset > 0 ? '45%' : '48%';

      return [snapPoint];
    }, [bottomInset]);

    /* Renders the darkened backdrop behind the sheet */
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      ),
      [],
    );

    const onAddLinkButtonPress = () => {
      if (linkDetails) {
        addLink({ ...linkDetails, id: shortid.generate() });
        ref?.current?.dismiss();
      }
    };

    return (
      <BottomSheetModal
        index={0}
        snapPoints={snapPoints}
        ref={ref}
        enablePanDownToClose={true}
        style={bottomSheetStyle}
        backdropComponent={renderBackdrop}>
        <SheetContainer>
          {linkDetails ? (
            <>
              <Text>{linkDetails?.siteName ?? 'SITE NAME MISSING'}</Text>
              <Text>{linkDetails?.title ?? 'TITLE MISSING'}</Text>
              <Text>{linkDetails?.description ?? 'DESCRIPTION MISSING'}</Text>
            </>
          ) : null}
          <AddLinkButton onPress={onAddLinkButtonPress}>
            <Text color={colours.grey300}>ADD LINK</Text>
          </AddLinkButton>
        </SheetContainer>
      </BottomSheetModal>
    );
  },
);

const SheetContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const AddLinkButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
