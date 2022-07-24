import React, { Dispatch } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

export type DisplayType = 'grid' | 'list';

type Props = {
  currentDisplayType: DisplayType;
  onToggleDisplayTypePress: Dispatch<DisplayType>;
};

export const ListDisplayToggleButton = ({
  currentDisplayType,
  onToggleDisplayTypePress,
}: Props) => {
  const { colours } = useTheme();

  return (
    <>
      {currentDisplayType === 'list' ? (
        <ButtonContainer onPress={() => onToggleDisplayTypePress('grid')}>
          <FeatherIcon
            name="grid"
            color={colours.grey400}
            size={25}
            style={{ marginLeft: 10 }}
          />
        </ButtonContainer>
      ) : (
        <ButtonContainer onPress={() => onToggleDisplayTypePress('list')}>
          <EntypoIcon
            name="list"
            color={colours.grey400}
            size={25}
            style={{ marginLeft: 10 }}
          />
        </ButtonContainer>
      )}
    </>
  );
};

const ButtonContainer = styled.TouchableOpacity``;
