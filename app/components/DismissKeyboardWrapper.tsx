import React, { PropsWithChildren } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

export const DismissKeyboardWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
    <View style={{ flex: 1 }}>{children}</View>
  </TouchableWithoutFeedback>
);
