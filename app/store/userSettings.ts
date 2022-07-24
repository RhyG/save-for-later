import create from 'zustand';

import AsyncStorage from '@app/modules/AsyncStorage';

export type DisplayType = 'grid' | 'list';

export type SettingsKeys = 'darkMode' | 'defaultHomeToList';

export type SettingsValueTypes = boolean;

interface ISettingsState {
  settings: { [key in SettingsKeys]: SettingsValueTypes };
  updateSetting: (settingKey: SettingsKeys, value: SettingsValueTypes) => void;
}

const DEFAULT_SETTINGS = {
  darkMode: false,
  defaultHomeToList: false,
};

export const useUser5ettings = create<ISettingsState>(set => ({
  settings: DEFAULT_SETTINGS,
  updateSetting: async (
    settingKey: SettingsKeys,
    value: SettingsValueTypes,
  ) => {
    set(({ settings }) => {
      console.log(settingKey, value);
      const newSettings = {
        ...settings,
        [settingKey]: value,
      };

      AsyncStorage.setItem('settings', newSettings);

      return { settings: newSettings };
    });
  },
}));
