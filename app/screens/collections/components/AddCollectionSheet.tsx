import {
  BottomSheetBackdrop,
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
  addCollection: (name: string, collectionIcon: string) => void;
};

const bottomSheetStyle = { zIndex: 2 };

export const AddCollectionSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ addCollection }, ref) => {
    const { colours } = useTheme();
    const { bottom: bottomInset } = useSafeAreaInsets();

    const [inputValue, setInputValue] = useState('');
    const [collectionIcon, setCollectionIcon] = useState<string>('');

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const collectionNameInputRef = useRef<typeof BottomSheetTextInput>();

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      const snapPoint = bottomInset > 0 ? '45%' : '48%';

      return [snapPoint];
    }, [bottomInset]);

    /* Renders the darkened backdrop behind the sheet */
    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
        />
      ),
      [],
    );

    const onAddCollectionButtonPress = () => {
      addCollection(inputValue, collectionIcon);
    };

    const handlePick = (emoji: EmojiType) => {
      setCollectionIcon(emoji.emoji);
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
                onChangeText={setInputValue}
                // @ts-ignore this type is gross, not sure how to fix
                ref={collectionNameInputRef}
                placeholderTextColor={colours.grey100}
              />
            </InputContainer>
            <AddCollectionButton onPress={onAddCollectionButtonPress}>
              <Text color={colours.grey300}>Add collection</Text>
            </AddCollectionButton>
            <AddCollectionButton onPress={() => setEmojiPickerOpen(true)}>
              <Text color={colours.grey300}>Pick icon</Text>
            </AddCollectionButton>
            <Text>{collectionIcon}</Text>
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
