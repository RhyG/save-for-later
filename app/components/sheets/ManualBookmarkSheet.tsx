import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { getLinkPreview } from 'link-preview-js';
import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { generateBookmarkWithPreviewDetails } from '@app/lib/bookmarks';
import { supabase } from '@app/lib/supabase';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

import { BottomSheet } from './BottomSheet';

type Props = {
  addBookmarkToList: (bookmark: IBookmark) => void;
};

export const ManualBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ addBookmarkToList }, ref) => {
    const { colours } = useTheme();

    const session = useAuth(state => state.session);

    const [previewDetails, setPreviewDetails] = useState<IBookmark | null>();

    const urlInputRef = useRef<typeof BottomSheetTextInput>();

    const fetchPreviewDetails = useCallback(
      debounce(async (text: string) => {
        setPreviewDetails(null);

        const newPreviewDetails = (await getLinkPreview(
          text,
        )) as unknown as IBookmark;

        if (newPreviewDetails.title && newPreviewDetails.description) {
          setPreviewDetails(newPreviewDetails as unknown as IBookmark);
        }
      }, 200),
      [],
    );

    const onAddLinkButtonPress = async () => {
      if (previewDetails) {
        const newBookmark = generateBookmarkWithPreviewDetails(
          previewDetails,
          session?.user?.id,
        );

        if (newBookmark) {
          try {
            const { data, error } = await supabase
              .from('bookmarks')
              .insert([{ ...newBookmark }]);

            console.log('CREATED', { data, error });
            const savedBookmark = data[0];
            addBookmarkToList({ ...savedBookmark });
          } catch (error) {
            console.log({ error });
          }
        }
      }
    };

    return (
      <BottomSheet sheetTitle="Add a bookmark" ref={ref}>
        <InputContainer isFocused={false}>
          <TextInput
            placeholder="URL"
            onChangeText={fetchPreviewDetails}
            // @ts-ignore this type is gross, not sure how to fix
            ref={urlInputRef}
            placeholderTextColor={colours.grey100}
            autoComplete="off"
          />
        </InputContainer>
        {previewDetails ? (
          <>
            <Text>{previewDetails?.siteName ?? ''}</Text>
            <Text>{previewDetails?.title ?? ''}</Text>
            <Text>{previewDetails?.description ?? ''}</Text>
          </>
        ) : null}
        <AddLinkButton onPress={onAddLinkButtonPress}>
          <Text color={colours.grey300}>ADD LINK</Text>
        </AddLinkButton>
      </BottomSheet>
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

const AddLinkButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
