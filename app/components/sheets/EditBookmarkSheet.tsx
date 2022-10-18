import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { useSheetRef } from '@app/hooks/useSheetRef';
import { IBookmark } from '@app/types';

import { useSelectionsContext } from '../providers/SelectionProvider';
import { BottomSheet } from './BottomSheet';
import { ChooseCollectionSheet } from './ChooseCollectionSheet';

type CommonProps = {
  bookmarkBeingEdited: IBookmark;
  deleteBookmark: (id: string) => Promise<void>;
  onSelectButtonPressed: (id: string) => void;
};

type ConditionalProps = {
  bookmarkInCollection: boolean;
  removeBookmarkFromCollection: (id: string) => Promise<void>;
};

type Props = CommonProps & ConditionalProps;

export const EditBookmarkSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ bookmarkBeingEdited, deleteBookmark, bookmarkInCollection, removeBookmarkFromCollection }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { colours } = useTheme();

    const chooseCollectionRef = useSheetRef();

    const { title, url, id: bookmarkId, preview_image, description } = bookmarkBeingEdited;

    const { updateSelections } = useSelectionsContext();

    const onDeleteButtonPress = () => {
      deleteBookmark(bookmarkId);
      ref?.current?.dismiss();
    };

    const onSelectButtonPress = () => {
      updateSelections(bookmarkId);
      ref?.current?.dismiss();
    };

    const isSVG = preview_image?.slice(-5).includes('.svg') || preview_image?.includes('image/svg');

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      // const snapPoint = bottomInset > 0 ? '45%' : '48%';

      const snapPoint = preview_image ? 45 : 25;

      const snapPointAdjustedForInset = bottomInset > 0 ? snapPoint + 3 : snapPoint;

      return [`${snapPointAdjustedForInset}%`];
    }, [bottomInset, preview_image]);

    return (
      <>
        <BottomSheet ref={ref} sheetTitle={title} customSnapPoints={snapPoints}>
          <LinkDetailsContainer>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
              <Text fontSize="md" secondary numberOfLines={1}>
                {url}
              </Text>
            </TouchableOpacity>
            <Text marginTop={2} fontSize="md" secondary numberOfLines={4}>
              {description}
            </Text>

            <BottomRowContainer>
              <BottomRowGroup>
                <TouchableOpacity
                  onPress={() => {
                    if (bookmarkInCollection) {
                      removeBookmarkFromCollection(bookmarkId);
                    } else {
                      chooseCollectionRef?.present();
                    }
                  }}>
                  <Icon
                    name={bookmarkInCollection ? 'folder-minus' : 'folder-plus'}
                    color={colours.purple100}
                    size={28}
                  />
                </TouchableOpacity>
              </BottomRowGroup>
              <BottomRowGroup>
                <SelectContainer onPress={onSelectButtonPress}>
                  <Text color={colours.purple100} bold>
                    SELECT
                  </Text>
                </SelectContainer>
                <TouchableOpacity onPress={onDeleteButtonPress}>
                  <Icon name="trash-2" color={colours.red} size={25} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              </BottomRowGroup>
            </BottomRowContainer>
          </LinkDetailsContainer>
          {preview_image ? (
            <ImageContainer>
              {isSVG ? (
                <SvgUri uri="https://reactnavigation.org/img/spiro.svg" width="100%" height="100%" />
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
        </BottomSheet>
        <ChooseCollectionSheet ref={chooseCollectionRef.sheetRef} bookmarkId={bookmarkId} />
      </>
    );
  },
);

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
  flex: 2.2;
  margin-top: 10px;
`;

const PreviewImage = styled.Image`
  flex: 1.5;
  width: 100%;
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
