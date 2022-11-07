import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLinkPreview } from 'link-preview-js';
import React, { useState } from 'react';

import { BaseScreen } from '@app/components/BaseScreen';
import { Text } from '@app/components/Text';
import { TextInput } from '@app/components/TextInput';
import { Button } from '@app/components/buttons/Button';
import { useToastContext } from '@app/components/providers/ToastProvider';
import { useHeaderTitle } from '@app/hooks/useHeaderTitle';
import { generateBookmarkWithPreviewDetails } from '@app/lib/bookmarks';
import { validateURL } from '@app/lib/validation';
import { RootStackParamList } from '@app/navigation/types';
import { IBookmark } from '@app/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EnterManualBookmarkScreen'>;

export const EnterManualBookmarkScreen = ({ navigation }: Props) => {
  useHeaderTitle('Save a bookmark');

  const { showErrorToast } = useToastContext();

  const [inputValue, setInputValue] = useState('');

  const onSearchBookmarkPress = async () => {
    if (!validateURL(inputValue)) {
      return;
    }

    try {
      const preview = (await getLinkPreview(inputValue)) as unknown as IBookmark;

      if (!preview) {
        // TODO Inform user no preview found - maybe ask if they want to save anyway?
        throw new Error('No preview found');
      }

      const newBookmark = generateBookmarkWithPreviewDetails(preview);

      if (!newBookmark) {
        // TODO Inform user error occurred
        throw new Error('Unable to create bookmarj');
      }

      navigation.navigate('AddManualBookmarkScreen', { bookmark: newBookmark });
    } catch (error) {
      console.error(error);
      showErrorToast();
    }
  };

  return (
    <BaseScreen noScroll>
      <Text marginBottom={2}>Enter the URL you want to save</Text>
      <TextInput
        placeholder="https://example.com"
        onChangeText={setInputValue}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onSubmitEditing={onSearchBookmarkPress}
      />
      <Button title="Search" onPress={onSearchBookmarkPress} containerStyle={{ marginTop: 'auto' }} />
    </BaseScreen>
  );
};
