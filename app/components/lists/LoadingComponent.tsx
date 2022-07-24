import React from 'react';
import styled from 'styled-components/native';

import { Text } from '../Text';

export const LoadingComponent = () => {
  return (
    <Container>
      <Text>I am loading!</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
