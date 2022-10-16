import React from 'react';
import Animated, { useAnimatedStyle, withDelay, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Text } from '@app/components/Text';
import { ActionButton } from '@app/components/buttons/ActionButton';
import { SPRING_DAMPING_CONFIG } from '@app/config/animation';

const FAB_HIDDEN_BOTTOM_VALUE = -180;
const FAB_VISIBLE_BOTTOM_VALUE = 20;

type Props = {
  visible: boolean;
  onDeletePress: () => Promise<void>;
  onCancelPress: () => void;
};

export const SelectionActions = ({ visible, onDeletePress, onCancelPress }: Props) => {
  const deleteButton = useAnimatedStyle(() => {
    let value: number;

    const newBottomValue = visible ? FAB_VISIBLE_BOTTOM_VALUE : FAB_HIDDEN_BOTTOM_VALUE;
    value = withSpring(newBottomValue, SPRING_DAMPING_CONFIG);

    return {
      bottom: value,
    };
  }, [visible]);

  const cancelButton = useAnimatedStyle(() => {
    let value: number;

    const newBottomValue = visible ? FAB_VISIBLE_BOTTOM_VALUE : FAB_HIDDEN_BOTTOM_VALUE;
    value = withDelay(100, withSpring(newBottomValue, SPRING_DAMPING_CONFIG));

    return {
      bottom: value,
    };
  }, [visible]);

  return (
    <Container>
      <Animated.View style={[deleteButton]}>
        <ActionButton onPress={onDeletePress}>
          <Icon name="trash-2" color="#fff" size={25} />
        </ActionButton>
      </Animated.View>

      <Animated.View style={[cancelButton, marginLeft]}>
        <ActionButton onPress={onCancelPress}>
          <Text fontSize="lg" bold color="#fff">
            Cancel
          </Text>
        </ActionButton>
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
