import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';

const FAB_HIDDEN_BOTTOM_VALUE = -180;
const FAB_VISIBLE_BOTTOM_VALUE = 20;
const ELASTICITY = 1.05;

type Props = {
  visible: boolean;
  onDeletePress: () => Promise<void>;
  onCancelPress: () => void;
};

export const SelectionActions = ({ visible, onDeletePress, onCancelPress }: Props) => {
  const deleteButton = useAnimatedStyle(() => {
    let value: number;

    const config = {
      duration: 300,
      easing: Easing.elastic(ELASTICITY),
    };

    if (visible) {
      value = withTiming(FAB_VISIBLE_BOTTOM_VALUE, config);
    } else {
      value = withTiming(FAB_HIDDEN_BOTTOM_VALUE, config);
    }

    return {
      bottom: value,
    };
  }, [visible]);

  const cancelButton = useAnimatedStyle(() => {
    let value: number;

    const config = {
      duration: 400,
      easing: Easing.elastic(ELASTICITY),
    };

    if (visible) {
      value = withTiming(FAB_VISIBLE_BOTTOM_VALUE, config);
    } else {
      value = withTiming(FAB_HIDDEN_BOTTOM_VALUE, config);
    }

    return {
      bottom: value,
    };
  }, [visible]);

  return (
    <Container>
      <Animated.View style={[deleteButton]}>
        <ActionContainer onPress={onDeletePress}>
          <Icon name="trash-2" color="#fff" size={25} />
        </ActionContainer>
      </Animated.View>

      <Animated.View style={[cancelButton, marginLeft]}>
        <ActionContainer onPress={onCancelPress}>
          <Text fontSize="lg" bold color="#fff">
            Cancel
          </Text>
        </ActionContainer>
      </Animated.View>
    </Container>
  );
};

const marginLeft = { marginLeft: 10 };

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ActionContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colours.purple100};
  padding: 10px 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  min-width: 50px;
`;
