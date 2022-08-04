import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { getLinkPreview } from 'link-preview-js';
import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { supabase } from '@app/lib/supabase';
import { useAuth } from '@app/store/auth';
import { IBookmark } from '@app/types';

type Props = {
  addBookmarkToList: (bookmark: IBookmark) => void;
};

const bottomSheetStyle = { zIndex: 2 };

export const ManualBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ addBookmarkToList }, ref) => {
    const { colours } = useTheme();
    const { bottom: bottomInset } = useSafeAreaInsets();

    const session = useAuth(state => state.session);

    const [previewDetails, setPreviewDetails] = useState<IBookmark | null>();

    const urlInputRef = useRef<typeof BottomSheetTextInput>();

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
        // addLink({ ...previewDetails, id: uuid.v4() });

        const { title, description, url, images } = previewDetails;

        const toSave = {
          title,
          description,
          url,
          preview_image: images[0] ?? '',
          number_of_opens: 0,
          collections: [],
          user_id: session?.user?.id,
        };

        try {
          const { data, error } = await supabase
            .from('bookmarks')
            .insert([{ ...toSave }]);

          console.log('CREATED', { data, error });
          const newBookmark = data[0];
          addBookmarkToList({ ...newBookmark });
        } catch (error) {
          console.log({ error });
        }
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
          <InputContainer isFocused={false}>
            <TextInput
              placeholder="URL"
              onChangeText={fetchPreviewDetails}
              // @ts-ignore this type is gross, not sure how to fix
              ref={urlInputRef}
              placeholderTextColor={colours.grey100}
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
        </SheetContainer>
      </BottomSheetModal>
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

const AddLinkButton = styled.TouchableOpacity`
  margin-top: 10px;
`;