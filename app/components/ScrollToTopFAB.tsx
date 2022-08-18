import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { BounceInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const FAB_VISIBLE_BOTTOM_VALUE = 20;
const FAB_HIDDEN_BOTTOM_VALUE = -180;

type Props = {
  onPress: () => void;
  buttonVisible: boolean;
};

export const ScrollToTopFAB = ({ onPress, buttonVisible }: Props) => {
  const style = useAnimatedStyle(() => {
    let value: number;

    if (buttonVisible) {
      value = withSpring(FAB_VISIBLE_BOTTOM_VALUE, { damping: 15 });
    } else {
      value = withSpring(FAB_HIDDEN_BOTTOM_VALUE, { damping: 15 });
    }

    return {
      bottom: value,
    };
  }, [buttonVisible]);

  return (
    <Animated.View entering={BounceInDown} style={[styles.buttonContainer, style]}>
      <ButtonContainer onPress={onPress}>
        <Icon name="chevron-up" color="#fff" size={30} />
      </ButtonContainer>
    </Animated.View>
  );
};

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colours.purple100};
  height: 50px;
  width: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  buttonContainer: { position: 'absolute', right: 20, zIndex: 0 },
});
