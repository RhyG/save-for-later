import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '../Text';
import { useToastContext } from '../providers/ToastProvider';

export const ErrorToast = () => {
  const { font } = useTheme();

  const { visible, dismissErrorToast } = useToastContext();
  const timeout = useRef<NodeJS.Timeout>();

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(visible ? 50 : -100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [visible]);

  useEffect(() => {
    if (visible) {
      timeout.current = setTimeout(() => {
        dismissErrorToast();
      }, 3500);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [dismissErrorToast, visible]);

  // TODO don't render the toast when visible is false

  return (
    <ToastRoot onPress={dismissErrorToast}>
      <ToastContainer style={style}>
        <Icon name="alert-circle" size={24} color="#fff" />
        <Text marginLeft={2} color={font.colour.primary} fontSize="lg" bold>
          An error has occurred.
        </Text>
      </ToastContainer>
    </ToastRoot>
  );
};

const width = Dimensions.get('window').width;

const ToastRoot = styled.TouchableOpacity`
  position: absolute;
  width: ${width - 20}px;
  align-self: center;
  align-items: center;
  border-radius: 40px;
  bottom: 0px;
`;

const ToastContainer = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colours.red};
  border-radius: ${({ theme }) => theme.borderRadius};
  flex-direction: row;
  align-items: center;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;
