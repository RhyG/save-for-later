import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import type { EmojiType } from 'rn-emoji-keyboard/src/types';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { BottomSheet } from '@app/components/sheets/BottomSheet';

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

export const EditCollectionSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ updateCollection, collectionName, collectionIcon }, ref) => {
    const { colours } = useTheme();

    // TODO try a ref for the collection name value
    const [nameInputValue, setNameInputValue] = useState(collectionName);
    const [icon, setIcon] = useState<string>(collectionIcon);

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const collectionNameInputRef = useRef<typeof BottomSheetTextInput>();

    const onUpdateCollectionButtonPress = () => {
      updateCollection({ newName: nameInputValue, newIcon: icon });
    };

    const handlePick = (emoji: EmojiType) => {
      setIcon(emoji.emoji);
    };

    return (
      <>
        <BottomSheet sheetTitle="Edit Collection" ref={ref}>
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
        </BottomSheet>
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={emojiPickerOpen}
          onClose={() => setEmojiPickerOpen(false)}
        />
      </>
    );
  },
);

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
