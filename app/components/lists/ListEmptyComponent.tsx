import React from 'react';
import styled from 'styled-components/native';

import { Text } from '../Text';

export const ListEmptyComponent = () => {
  return (
    <Container>
      <Text>I am empty!</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;
