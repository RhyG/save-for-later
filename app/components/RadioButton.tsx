import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { Text } from './Text';

type RadioButtonProps = {
  /**
   * Current toggle state of the button
   */
  selected: boolean;
  /**
   * Function to run on press of the radio button
   */
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const RadioButton = ({
  selected,
  onPress,
  containerStyle,
}: RadioButtonProps) => {
  const { colours } = useTheme();

  return (
    <RadioOuter onPress={onPress} style={containerStyle} selected={selected}>
      {selected && (
        <Icon
          testID="radio-button-check-icon"
          name="check"
          color="#fff"
          size={20}
        />
      )}
    </RadioOuter>
  );
};

const RadioOuter = styled.TouchableOpacity<{ selected: boolean }>`
  border-color: ${({ theme }) => theme.colours.purple100};
  border-width: 2px;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  padding-top: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colours.purple100 : '#fff'};
`;
