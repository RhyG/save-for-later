import React, { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withDelay, withSpring } from 'react-native-reanimated';
import styled from 'styled-components/native';

import { ActionButton } from '@app/components/buttons/ActionButton';
import { SPRING_DAMPING_CONFIG } from '@app/config/animation';

const HIDDEN_BOTTOM_VALUE = -120;
const VISIBLE_BOTTOM_VALUE = 20;

type SelectionActionsProps = PropsWithChildren<{
  visible: boolean;
  onDeletePress: () => void;
  onCancelPress: () => void;
}>;

/**
 * This over-engineered component allows up to five floating buttons to be added to the bottom of the screen.
 * This composition is probably overkill, but I took it as a good opportunity to experiment with combining
 * a compositional component pattern with animated styles conditional to the individual children.
 */
const SelectionActions = ({ visible, children }: SelectionActionsProps) => {
  if (Children.count(children) > 5) {
    throw new Error("Calm ya farm mate 5 is enough children don't ya reckon?");
  }

  return (
    <Container>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          // casting because despite the guard TS doesn't know that child is a valid element
          return cloneElement(child as ReactElement<any>, {
            visible,
            index,
          });
        }

        return null;
      })}
    </Container>
  );
};

/**
 * TODO
 * I don't like making these types optional, look into how to omit them from component usage
 * but allow them to be used by `cloneElement`,
 */
type ActionItemProps = PropsWithChildren<{
  onPress: () => void;
  style?: ViewStyle;
  visible?: boolean;
  index?: number;
}>;

const ActionItem = ({ onPress, visible, index = 0, children }: ActionItemProps) => {
  const style = useAnimatedStyle(() => {
    const newBottomValue = visible ? VISIBLE_BOTTOM_VALUE : HIDDEN_BOTTOM_VALUE;

    return {
      bottom: withDelay(index * 80, withSpring(newBottomValue, SPRING_DAMPING_CONFIG)),
    };
  }, [visible]);

  return (
    <Animated.View style={[style, marginLeft]}>
      <ActionButton onPress={onPress}>{children}</ActionButton>
    </Animated.View>
  );
};

SelectionActions.Item = ActionItem;

export { SelectionActions };

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
