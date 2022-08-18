import React from 'react';
import styled from 'styled-components/native';

type Props = React.PropsWithChildren<{
  noPadding?: boolean;
}>;

export const BaseScreen = ({ children, noPadding }: Props): JSX.Element => {
  return <BaseScreenContainer noPadding={noPadding}>{children}</BaseScreenContainer>;
};

const BaseScreenContainer = styled.View<{ noPadding?: boolean }>`
  flex: 1;
  padding: ${props => (props.noPadding ? 0 : 10)}px;
  /* background-color: #f9fcff; */
`;
