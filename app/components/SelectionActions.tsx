import React, { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement } from 'react';
import Animated, { useAnimatedStyle, withDelay, withSpring } from 'react-native-reanimated';
import styled from 'styled-components/native';

import { ActionButton } from '@app/components/buttons/ActionButton';
import { SPRING_DAMPING_CONFIG } from '@app/config/animation';

const HIDDEN_BOTTOM_VALUE = -120;
const VISIBLE_BOTTOM_VALUE = 20;
const ANIM_TIMING_INCREMENT = 60;

type BottomValues = typeof HIDDEN_BOTTOM_VALUE | typeof VISIBLE_BOTTOM_VALUE;

type SelectionActionsProps = PropsWithChildren<{
  /**
   * Visibility state of the component.
   */
  visible: boolean;
}>;

/**
 * This over-engineered component allows up to five floating buttons to be added to the bottom of the screen.
 * This composition is probably overkill, but I took it as a good opportunity to experiment with combining
 * a compositional component pattern with animated styles conditional to the individual children.
 */
export const SelectionActions = ({ visible, children }: SelectionActionsProps) => {
  if (Children.count(children) > 5) {
    throw new Error("Calm ya farm mate 5 is enough children don't ya reckon?");
  }

  return (
    <Container>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          // casting because despite the guard TS doesn't know that child is a valid element.
          return cloneElement(child as ReactElement<{ bottomValue: BottomValues; index: number }>, {
            bottomValue: visible ? VISIBLE_BOTTOM_VALUE : HIDDEN_BOTTOM_VALUE,
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
  /**
   * Function to call on button press.
   */
  onPress: () => void;
  /**
   * Absolute position from the bottom of the screen.
   */
  bottomValue?: BottomValues;
  /**
   * Index of the child in the parent component.
   * Used to determine the delay of the animation.
   *
   * @defaultValue 0 - no delay, mainly to satisfy TS.
   */
  index?: number;
}>;

const ActionItem = ({ onPress, bottomValue = VISIBLE_BOTTOM_VALUE, index = 0, children }: ActionItemProps) => {
  const style = useAnimatedStyle(() => {
    return {
      bottom: withDelay(index * ANIM_TIMING_INCREMENT, withSpring(bottomValue, SPRING_DAMPING_CONFIG)),
    };
  }, [bottomValue]);

  return (
    <Animated.View style={[style, marginLeft]} pointerEvents="auto">
      <ActionButton onPress={onPress}>{children}</ActionButton>
    </Animated.View>
  );
};

SelectionActions.Item = ActionItem;

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
