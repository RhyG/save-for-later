import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

/* Hook used to set the title in the header */
export const useHeaderTitle = (headerTitle: string) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, headerTitle]);
};
