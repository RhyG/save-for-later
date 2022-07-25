import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri, SvgXml } from 'react-native-svg';
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

    const image = linkBeingEdited.images[0];

    const isSVG =
      image?.slice(-5).includes('.svg') || image?.includes('image/svg');

    console.log(image);

    /* The bottom sheet is slightly higher on phones with a bottom bar */
    const snapPoints = useMemo(() => {
      // const snapPoint = bottomInset > 0 ? '45%' : '48%';

      const snapPoint = image ? 45 : 25;

      const snapPointAdjustedForInset =
        bottomInset > 0 ? snapPoint + 3 : snapPoint;

      return [`${snapPointAdjustedForInset}%`];
    }, [bottomInset, image]);

    return (
      <BottomSheetModal
        index={0}
        snapPoints={snapPoints}
        ref={ref}
        enablePanDownToClose={true}
        style={bottomSheetStyle}
        backdropComponent={renderBackdrop}>
        <SheetContainer>
          <LinkDetailsContainer>
            <Text fontSize="lg" bold numberOfLines={2}>
              {linkBeingEdited?.title ?? 'Oops!'}
            </Text>
            <Text marginTop={1} fontSize="md" secondary numberOfLines={1}>
              {linkBeingEdited.url}
            </Text>
            <Text marginTop={2} fontSize="md" secondary numberOfLines={4}>
              {linkBeingEdited.description}
            </Text>

            <BottomRowContainer>
              <BottomRowGroup>
                <Icon name="eye" color={colours.grey400} size={25} />
                <Text marginLeft={2} color={colours.grey300} fontSize="md">
                  {linkBeingEdited?.numberOfOpens ?? 0}
                </Text>
              </BottomRowGroup>
              <BottomRowGroup>
                <SelectContainer>
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
          {Boolean(image) ? (
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
                    uri: linkBeingEdited.images[0],
                  }}
                  accessibilityRole="image"
                  resizeMode="cover"
                />
              )}
            </ImageContainer>
          ) : null}
        </SheetContainer>
      </BottomSheetModal>
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
  background-color: #4c4f9520;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  /* background-color: ${({ theme }) => theme.colours.purple100}; */
`;

const ImageContainer = styled.View`
  flex: 1.5;
  height: 40px;
  margin-top: 10px;
`;

const PreviewImage = styled.Image`
  flex: 1.5;
  width: 100%;
  /* height: 50px; */
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
