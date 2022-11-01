import React from 'react';
import styled from 'styled-components/native';

type Props = React.PropsWithChildren<{
  noPadding?: boolean;
  noScroll?: boolean;
}>;

export const BaseScreen = ({ children, noPadding, noScroll }: Props): JSX.Element => {
  if (noScroll) {
    return (
      <SafeAreaContainer>
        <BaseScreenContainer noPadding={noPadding}>{children}</BaseScreenContainer>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer>
      <ScrollViewContainer contentContainerStyle={scrollViewContentContainerStyle}>{children}</ScrollViewContainer>
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
`;

const BaseScreenContainer = styled.View<{ noPadding?: boolean }>`
  flex: 1;
  padding: ${props => (props.noPadding ? 0 : 10)}px;
`;

const ScrollViewContainer = styled.ScrollView<{ noPadding?: boolean }>`
  padding: ${props => (props.noPadding ? 0 : 10)}px;
`;

const scrollViewContentContainerStyle = { flex: 1 };
