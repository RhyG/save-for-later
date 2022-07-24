import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { ILink } from '@app/models';
import { useLocalLinks } from '@app/store/localLinks';

type Props = {
  linkBeingEdited: ILink;
};

const bottomSheetStyle = { zIndex: 2 };

export const EditLinkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ linkBeingEdited }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets();
    const removeLink = useLocalLinks(state => state.removeLink);
    const { colours } = useTheme();

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

    const deleteLink = () => {
      removeLink(linkBeingEdited.id);
      // @ts-ignore types are hard
      ref?.current?.dismiss();
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
          <Text fontSize="lg" bold>
            {linkBeingEdited?.title ?? 'Oops!'}
          </Text>
          <Text marginTop={2} fontSize="md" secondary>
            {linkBeingEdited.description}
          </Text>
          <IconContainer>
            <Icon
              name="trash-2"
              color={colours.red}
              size={25}
              onPress={deleteLink}
            />
          </IconContainer>
        </SheetContainer>
      </BottomSheetModal>
    );
  },
);

const SheetContainer = styled.View`
  padding: 20px;
  padding-bottom: 30px;
  flex: 1;
`;

const IconContainer = styled.View`
  margin-top: auto;
`;
