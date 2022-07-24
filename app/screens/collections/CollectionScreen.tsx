import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { CollectionsStackParamList } from '@app/navigation/types';

type Props = NativeStackScreenProps<
  CollectionsStackParamList,
  'Collection'
> & {};

export const CollectionScreen = ({ route }: Props) => {
  const collectionId = route.params.collectionId;

  return (
    <BaseScreen>
      <Text>Showing collection for {collectionId}</Text>
    </BaseScreen>
  );
};
