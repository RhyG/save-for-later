import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import type { EmojiType } from 'rn-emoji-keyboard/src/types';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { Button } from '@app/components/buttons/Button';
import { BottomSheet } from '@app/components/sheets/BottomSheet';

type Props = {
  updateCollection: ({ newName, newIcon }: { newName?: string; newIcon?: string }) => void;
  collectionName: string;
  collectionIcon: string;
};

const customSnapPoints = ['35%'];

export const EditCollectionSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ updateCollection, collectionName, collectionIcon }, ref) => {
    const { colours } = useTheme();

    // TODO try a ref for the collection name value
    const [inputValue, setInputValue] = useState('');
    const [icon, setIcon] = useState<string>(collectionIcon);

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const collectionNameInputRef = useRef<typeof BottomSheetTextInput>();

    const onUpdateCollectionButtonPress = () => {
      updateCollection({ newName: inputValue, newIcon: icon });
    };

    const handlePick = (emoji: EmojiType) => {
      setIcon(emoji.emoji);
    };

    return (
      <>
        <BottomSheet sheetTitle={`Update ${collectionName}`} ref={ref} customSnapPoints={customSnapPoints}>
          <InputContainer isFocused={false}>
            <TextInput
              placeholder="Collection name"
              onChangeText={setInputValue}
              // @ts-ignore this type is gross, not sure how to fix
              ref={collectionNameInputRef}
              placeholderTextColor={colours.grey100}
            />
          </InputContainer>

          <ChooseIconButton onPress={() => setEmojiPickerOpen(true)}>
            <Text fontSize="xxxl">{collectionIcon}</Text>
          </ChooseIconButton>
          <Button
            title="Update collection"
            onPress={onUpdateCollectionButtonPress}
            containerStyle={{ marginTop: 'auto' }}
          />
        </BottomSheet>
        <EmojiPicker onEmojiSelected={handlePick} open={emojiPickerOpen} onClose={() => setEmojiPickerOpen(false)} />
      </>
    );
  },
);

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) => (isFocused ? theme.colours.purple100 : theme.colours.grey200)};
  border-width: 2px;
`;

const TextInput = styled(BottomSheetTextInput)`
  padding: 10px;
`;

const ChooseIconButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colours.grey000};
  border-radius: 50px;
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 20px;
`;
