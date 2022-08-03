import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { supabase } from '@app/lib/supabase';
import { IBookmark } from '@app/types';

import { ChooseCollectionSheet } from './ChooseCollectionSheet';

type Props = {
  bookmarkBeingEdited: IBookmark;
};

const bottomSheetStyle = { zIndex: 2 };

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
);

export const EditBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ bookmarkBeingEdited }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { colours } = useTheme();

    const chooseCollectionRef = React.useRef();

    const {
      title,
      url,
      id: bookmarkId,
      preview_image,
      description,
    } = bookmarkBeingEdited;

    /* Renders the darkened backdrop behind the sheet */

    const deleteLink = () => {
      // @ts-ignore types are hard
      ref?.current?.dismiss();
    };

    const isSVG =
      preview_image?.slice(-5).includes('.svg') ||
      preview_image?.includes('image/svg');

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      // const snapPoint = bottomInset > 0 ? '45%' : '48%';

      const snapPoint = preview_image ? 45 : 25;

      const snapPointAdjustedForInset =
        bottomInset > 0 ? snapPoint + 3 : snapPoint;

      return [`${snapPointAdjustedForInset}%`];
    }, [bottomInset, preview_image]);

    const tempOnPress = async () => {
      const { data, error } = await supabase
        .from('collections')
        .update({ bookmarks: [bookmarkId] })
        .eq('id', 'e1988eb5-9e76-4428-be63-757708413349');

      console.log({ data, error });
    };

    return (
      <>
        <BottomSheetModal
          index={0}
          snapPoints={snapPoints}
          ref={ref}
          enablePanDownToClose={true}
          style={bottomSheetStyle}
          backdropComponent={Backdrop}>
          <SheetContainer>
            <LinkDetailsContainer>
              <Text fontSize="lg" bold numberOfLines={2}>
                {title ?? 'Oops!'}
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <Text marginTop={1} fontSize="md" secondary numberOfLines={1}>
                  {url}
                </Text>
              </TouchableOpacity>
              <Text marginTop={2} fontSize="md" secondary numberOfLines={4}>
                {description}
              </Text>

              <BottomRowContainer>
                <BottomRowGroup>
                  <TouchableOpacity
                    onPress={() => chooseCollectionRef?.current?.present()}>
                    <Icon
                      name="folder-plus"
                      color={colours.purple100}
                      size={28}
                    />
                  </TouchableOpacity>
                </BottomRowGroup>
                <BottomRowGroup>
                  <SelectContainer onPress={tempOnPress}>
                    <Text color={colours.purple100} bold>
                      SELECT
                    </Text>
                  </SelectContainer>
                  <TouchableOpacity onPress={deleteLink}>
                    <Icon
                      name="trash-2"
                      color={colours.red}
                      size={25}
                      style={{ marginLeft: 'auto' }}
                    />
                  </TouchableOpacity>
                </BottomRowGroup>
              </BottomRowContainer>
            </LinkDetailsContainer>
            {preview_image ? (
              <ImageContainer>
                {isSVG ? (
                  <SvgUri
                    uri="https://reactnavigation.org/img/spiro.svg"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  // <SvgXml xml={xml} width="100%" height="100%" />
                  <PreviewImage
                    source={{
                      uri: preview_image,
                    }}
                    accessibilityRole="image"
                    resizeMode="cover"
                  />
                )}
              </ImageContainer>
            ) : null}
          </SheetContainer>
        </BottomSheetModal>
        <ChooseCollectionSheet
          ref={chooseCollectionRef}
          bookmarkId={bookmarkId}
        />
      </>
    );
  },
);

const SheetContainer = styled.View`
  padding: 10px 20px 30px 20px;
  flex: 1;
`;

const BottomRowContainer = styled.View`
  margin-top: auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomRowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinkDetailsContainer = styled.View`
  flex: 2;
`;

const SelectContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #4c4f9520; /* TODO don't hardcode this */
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
`;

const ImageContainer = styled.View`
  flex: 1.5;
  height: 40px;
  margin-top: 10px;
`;

const PreviewImage = styled.Image`
  flex: 1.5;
  width: 100%;
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
