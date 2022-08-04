import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmojiPicker from 'rn-emoji-keyboard';
import type { EmojiType } from 'rn-emoji-keyboard/src/types';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';

type Props = {
  updateCollection: ({
    newName,
    newIcon,
  }: {
    newName?: string;
    newIcon?: string;
  }) => void;
  collectionName: string;
  collectionIcon: string;
};

const bottomSheetStyle = { zIndex: 2 };

/* Renders the darkened backdrop behind the sheet */
const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
);

export const EditCollectionSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ updateCollection, collectionName, collectionIcon }, ref) => {
    const { colours } = useTheme();
    const { bottom: bottomInset } = useSafeAreaInsets();

    // TODO try a ref for the collection name value
    const [nameInputValue, setNameInputValue] = useState(collectionName);
    const [icon, setIcon] = useState<string>(collectionIcon);

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const collectionNameInputRef = useRef<typeof BottomSheetTextInput>();

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      const snapPoint = bottomInset > 0 ? '45%' : '48%';

      return [snapPoint];
    }, [bottomInset]);

    const onUpdateCollectionButtonPress = () => {
      updateCollection({ newName: nameInputValue, newIcon: icon });
    };

    const handlePick = (emoji: EmojiType) => {
      setIcon(emoji.emoji);
    };

    return (
      <>
        <BottomSheetModal
          index={0}
          snapPoints={snapPoints}
          ref={ref}
          enablePanDownToClose={true}
          style={bottomSheetStyle}
          backdropComponent={renderBackdrop}>
          <SheetContainer>
            <InputContainer isFocused={false}>
              <TextInput
                placeholder="Collection name"
                defaultValue={collectionName}
                onChangeText={setNameInputValue}
                // @ts-ignore this type is gross, not sure how to fix
                ref={collectionNameInputRef}
                placeholderTextColor={colours.grey100}
              />
            </InputContainer>
            <AddCollectionButton onPress={onUpdateCollectionButtonPress}>
              <Text color={colours.grey300}>Update collection</Text>
            </AddCollectionButton>
            <AddCollectionButton onPress={() => setEmojiPickerOpen(true)}>
              <Text color={colours.grey300}>Pick icon</Text>
            </AddCollectionButton>
            <Text>{icon}</Text>
          </SheetContainer>
        </BottomSheetModal>
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={emojiPickerOpen}
          onClose={() => setEmojiPickerOpen(false)}
        />
      </>
    );
  },
);

const SheetContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colours.purple100 : theme.colours.grey200};
  border-width: 2px;
`;

const TextInput = styled(BottomSheetTextInput)`
  padding: 10px;
`;

const AddCollectionButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
