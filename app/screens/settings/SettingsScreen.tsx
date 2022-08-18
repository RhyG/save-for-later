import React, { useCallback } from 'react';
import styled from 'styled-components/native';

import { SettingsKeys, SettingsValueTypes, useUser5ettings } from '@app/store/userSettings';

import { SettingsRow } from './components/SettingsRow';

// type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings'> & {};

export const SettingsScreen = () => {
  const { darkMode, defaultHomeToRow } = useUser5ettings(state => state.settings);
  const updateSetting = useUser5ettings(state => state.updateSetting);

  const toggleSetting = useCallback(
    (key: SettingsKeys, value: SettingsValueTypes) => {
      updateSetting(key, value);
    },
    [updateSetting],
  );

  return (
    <Container scrollEnabled={false}>
      <SettingsRow
        title="Dark mode"
        subtitle="Have you ever wanted to look so far as to go when you be how do like more?"
        value={darkMode}
        onToggle={toggleSetting}
        settingsKey="darkMode"
      />
      <SettingsRow
        title="Default home layout to row"
        subtitle="Default the home bookmark list to show rows."
        value={defaultHomeToRow}
        onToggle={toggleSetting}
        settingsKey="defaultHomeToRow"
      />
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fafbfc;
  padding: 10px;
`;
