import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';
import shortid from 'shortid';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { BottomSheet } from '@app/components/sheets/BottomSheet';
import { useLocalLinks } from '@app/store/localLinks';

type Props = {
  linkDetails: any;
  loadingLinkDetails: boolean;
};

export const NewBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ linkDetails, loadingLinkDetails }, ref) => {
    const { colours } = useTheme();

    const addLink = useLocalLinks(state => state.addLink);

    const onAddLinkButtonPress = () => {
      if (linkDetails) {
        addLink({ ...linkDetails, id: shortid.generate() });
        ref?.current?.dismiss();
      }
    };

    return (
      <BottomSheet ref={ref} sheetTitle="New bookmark">
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
      </BottomSheet>
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
