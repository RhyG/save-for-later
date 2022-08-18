import React, { useReducer, useState } from 'react';
import { Dimensions, LayoutChangeEvent, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colours } from '@app/config/themes';

import { Text } from '../Text';

const { height, width } = Dimensions.get('window');

export type SortType = 'newest' | 'oldest';

type Coordinates = { x: number; y: number };

export const SortListButton = () => {
  const [buttonPosition, setButtonPosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const [menuVisible, toggleIsMenuVisible] = useReducer(prev => !prev, false);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { x, y } = nativeEvent.layout;

    setButtonPosition({ x, y });
  };

  return (
    <>
      <TouchableOpacity onPress={toggleIsMenuVisible} onLayout={handleLayout}>
        <MaterialIconsIcon name="sort" color={colours.grey400} size={25} style={styles.sortIcon} />
      </TouchableOpacity>
      {menuVisible ? (
        <>
          {/* <Overlay /> */}
          <PopupMenu buttonPosition={buttonPosition}>
            <Text>Newest</Text>
            <Text>Oldest</Text>
          </PopupMenu>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  sortIcon: { marginLeft: 10 },
});

const PopupMenu = styled.View<{ buttonPosition: Coordinates }>`
  position: absolute;
  top: ${props => props.buttonPosition.y + 20}px;
  left: ${props => props.buttonPosition.x - 40}px;
  background-color: #fff;
  padding: 10px;
  z-index: 20;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: red;
  height: ${height}px;
  width: ${width}px;
`;
