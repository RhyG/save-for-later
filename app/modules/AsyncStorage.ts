import AsyncStorage from '@react-native-async-storage/async-storage';

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
  multGet: () => Promise<any>;
}

const StorageModule: IStorageModule = {
  cache: {},
  getItem: async (key: string, defaultValue: string | number | Record<string, unknown>) => {
    let result;

    if (StorageModule.cache[key]) {
      return StorageModule.cache[key];
    }

    try {
      result = await AsyncStorage.getItem(key);

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
        await AsyncStorage.setItem(key, `json:${JSON.stringify(value)}`);
      } else {
        await AsyncStorage.setItem(key, value);
      }

      StorageModule.cache[key] = value;
    } catch (error) {}
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
      delete StorageModule.cache[key];
    } catch (error) {}
  },
  multiGet: async keys => await AsyncStorage.multiGet(keys),
  getAllKeys: AsyncStorage.getAllKeys,
  removeAllItems: async () => {
    const keys = await AsyncStorage.getAllKeys();

    for await (const key of keys) {
      console.log('Deleting', key);
      await AsyncStorage.removeItem(key);
    }
  },
};

export default StorageModule;
