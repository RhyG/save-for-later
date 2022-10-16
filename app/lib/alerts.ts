import { Alert } from 'react-native';

export const showDeleteAlert = (title: string, body: string, onPress: () => void) => {
  Alert.alert(title, body, [
    {
      text: 'Delete',
      onPress,
      style: 'destructive',
    },
    { text: 'Cancel', style: 'cancel' },
  ]);
};
