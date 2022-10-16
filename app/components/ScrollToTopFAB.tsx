import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { BounceInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import { ActionButton } from './buttons/ActionButton';

const FAB_VISIBLE_BOTTOM_VALUE = 20;
const FAB_HIDDEN_BOTTOM_VALUE = -180;
const SPRING_CONFIG = { damping: 15 };

type Props = {
  onPress: () => void;
  buttonVisible: boolean;
};

export const ScrollToTopFAB = ({ onPress, buttonVisible }: Props) => {
  const style = useAnimatedStyle(() => {
    let value: number;

    if (buttonVisible) {
      value = withSpring(FAB_VISIBLE_BOTTOM_VALUE, SPRING_CONFIG);
    } else {
      value = withSpring(FAB_HIDDEN_BOTTOM_VALUE, SPRING_CONFIG);
    }

    return {
      bottom: value,
    };
  }, [buttonVisible]);

  return (
    <Animated.View entering={BounceInDown} style={[styles.buttonContainer, style]}>
      <ActionButton onPress={onPress}>
        <Icon name="chevron-up" color="#fff" size={30} />
      </ActionButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { position: 'absolute', right: 20, zIndex: 0 },
});
