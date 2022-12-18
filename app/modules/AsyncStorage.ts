import { MMKVLoader } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

interface IStorageModule {
  /**
   * A quick access cache to help reduce read time of the storage.
   */
  cache: Record<string, string | number | Record<string, unknown>>;
  /**
   * Gets an item from storage.
   * @typeParam TItem - Type of item corresponding to key.
   * @param {string} key - key of the item to be retrieved.
   * @param {string | number | Record<string, unknown>} defaultValue - default to return if no item found.
   */
  getItem: <TItem extends unknown>(
    key: string,
    defaultValue: string | number | Record<string, unknown>,
  ) => Promise<TItem>;
  /**
   * Stores an item in storage.
   * @param {string} key - key of the item to be stored.
   * @param {string | Record<string, unknown>} value - value of item to be stored.
   */
  setItem: (key: string, value: string | Record<string, unknown>) => Promise<void>;
  /**
   * Removes an item from storage.
   * @param {string} key - key of the item to be removed.
   */
  removeItem: (key: string) => Promise<void>;
}

const StorageModule: IStorageModule = {
  cache: {},
  getItem: async (key: string, defaultValue: string | number | Record<string, unknown>) => {
    let result;

    if (StorageModule.cache[key]) {
      return StorageModule.cache[key];
    }

    try {
      result = await MMKV.getStringAsync(key);

      if (result && result.startsWith('json:')) {
        result = JSON.parse(result.split('json:')[1]);
      }

      StorageModule.cache[key] = result;
    } catch (error) {
      result = error;
    }

    return result || defaultValue;
  },
  setItem: async (key, value) => {
    try {
      if (typeof value === 'object') {
        await MMKV.setStringAsync(key, `json:${JSON.stringify(value)}`);
      } else {
        await MMKV.setStringAsync(key, value);
      }

      StorageModule.cache[key] = value;
    } catch (error) {}
  },
  removeItem: async key => {
    try {
      MMKV.removeItem(key);
      delete StorageModule.cache[key];
    } catch (error) {}
  },
};

export { StorageModule };
