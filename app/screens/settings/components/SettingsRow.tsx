import React from 'react';
import { Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { Text } from '@app/components/Text';
import { SettingsKeys, SettingsValueTypes } from '@app/store/userSettings';

type Props = {
  title: string;
  value: boolean;
  subtitle?: string;
  onToggle: (key: SettingsKeys, value: SettingsValueTypes) => void;
  settingsKey: SettingsKeys;
};

const _SettingsRow = ({
  value,
  title,
  subtitle,
  onToggle,
  settingsKey,
}: Props) => {
  const { colours } = useTheme();

  return (
    <SettingsRowContainer>
      <TextContainer>
        <Text bold marginBottom={1}>
          {title}
        </Text>
        {subtitle ? <Text color={colours.grey300}>{subtitle}</Text> : null}
      </TextContainer>
      <SwitchContainer>
        <Switch
          trackColor={{ false: colours.grey100, true: colours.purple100 }}
          thumbColor="#fff"
          ios_backgroundColor={colours.grey300}
          onValueChange={() => onToggle(settingsKey, !value)}
          value={value}
        />
      </SwitchContainer>
    </SettingsRowContainer>
  );
};

export const SettingsRow = React.memo(_SettingsRow);

const SwitchContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const TextContainer = styled.View`
  flex: 3;
`;

const SettingsRowContainer = styled.View`
  /* flex: 1; */
  background-color: #fff;
  margin-bottom: 10px;
  padding: 20px;
  flex-direction: row;
  border-radius: 10px;
`;
