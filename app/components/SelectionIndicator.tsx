import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const SelectionIndicator = () => {
  return (
    <SelectionIndicatorContainer>
      <Icon name="check" color="#fff" size={15} />
    </SelectionIndicatorContainer>
  );
};

const SelectionIndicatorContainer = styled.View`
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colours.purple100};
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1.5px solid #fff;
`;
