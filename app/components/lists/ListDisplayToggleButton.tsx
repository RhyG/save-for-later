import React, { Dispatch } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

export type DisplayType = 'grid' | 'row';

type Props = {
  currentDisplayType: DisplayType;
  onToggleDisplayTypePress: Dispatch<DisplayType>;
};

const ICON_STYLES = { marginLeft: 10 };

export const ListDisplayToggleButton = ({
  currentDisplayType,
  onToggleDisplayTypePress,
}: Props) => {
  const { colours } = useTheme();

  return (
    <>
      {currentDisplayType === 'row' ? (
        <ButtonContainer onPress={() => onToggleDisplayTypePress('grid')}>
          <FeatherIcon
            name="grid"
            color={colours.grey400}
            size={25}
            style={ICON_STYLES}
          />
        </ButtonContainer>
      ) : (
        <ButtonContainer onPress={() => onToggleDisplayTypePress('row')}>
          <EntypoIcon
            name="list"
            color={colours.grey400}
            size={25}
            style={ICON_STYLES}
          />
        </ButtonContainer>
      )}
    </>
  );
};

const ButtonContainer = styled.TouchableOpacity``;
