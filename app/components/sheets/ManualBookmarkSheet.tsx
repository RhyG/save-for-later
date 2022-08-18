import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { getLinkPreview } from 'link-preview-js';
import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { generateBookmarkWithPreviewDetails } from '@app/lib/bookmarks';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

import { Button } from '../buttons/Button';
import { BottomSheet } from './BottomSheet';

type Props = {
  addNewBookmark: (bookmark: Omit<IBookmark, 'id'>) => void;
};

export const ManualBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(({ addNewBookmark }, ref) => {
  const { colours } = useTheme();

  const session = useAuth(state => state.session);

  const [previewDetails, setPreviewDetails] = useState<IBookmark | null>();

  const urlInputRef = useRef<typeof BottomSheetTextInput>();

  const fetchPreviewDetails = useCallback(
    debounce(async (text: string) => {
      setPreviewDetails(null);

      const newPreviewDetails = (await getLinkPreview(text)) as unknown as IBookmark;

      if (newPreviewDetails.title && newPreviewDetails.description) {
        setPreviewDetails(newPreviewDetails as unknown as IBookmark);
      }
    }, 200),
    [],
  );

  const onAddLinkButtonPress = async () => {
    if (previewDetails) {
      const newBookmark = generateBookmarkWithPreviewDetails(previewDetails, session?.user?.id);

      if (newBookmark) {
        addNewBookmark({ ...newBookmark });
      }
    }
  };

  return (
    <BottomSheet sheetTitle="Add a bookmark" ref={ref}>
      <InputContainer isFocused={false}>
        <TextInput
          placeholder="Bookmark URL"
          onChangeText={fetchPreviewDetails}
          // @ts-ignore this type is gross, not sure how to fix
          ref={urlInputRef}
          placeholderTextColor={colours.grey100}
          autoComplete="off"
          autoCorrect={false}
        />
      </InputContainer>
      {previewDetails ? (
        <>
          <Text>{previewDetails?.siteName ?? ''}</Text>
          <Text>{previewDetails?.title ?? ''}</Text>
          <Text>{previewDetails?.description ?? ''}</Text>
        </>
      ) : null}
      <Button onPress={onAddLinkButtonPress} title="Save bookmark" containerStyle={buttonContainerStyle} />
    </BottomSheet>
  );
});

const InputContainer = styled.View<{ isFocused: boolean }>`
  border-radius: 10px;
  border-color: ${({ theme, isFocused }) => (isFocused ? theme.colours.purple100 : theme.colours.grey200)};
  border-width: 2px;
`;

const TextInput = styled(BottomSheetTextInput)`
  padding: 10px;
`;

const buttonContainerStyle = { marginTop: 'auto' };
