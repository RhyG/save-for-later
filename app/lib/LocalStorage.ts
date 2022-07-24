import AsyncStorage from "@react-native-async-storage/async-storage";

interface ILocalStorage {
  cache: Record<string, unknown>;
  getItem: (
    key: string,
    defaultValue: string | Record<string, unknown>
  ) => Promise<string | Record<string, unknown>>;
  setItem: (
    key: string,
    defaultValue: string | Record<string, unknown>
  ) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  multiGet: (keys: string[]) => Promise<[string, string | null][]>;
  getAllKeys: () => Promise<string[]>;
  removeAllItems: () => Promise<void>;
}

const LocalStorage: ILocalStorage = {
  cache: {},
  getItem: async (key, defaultValue) => {
    let result;

    if (LocalStorage.cache[key]) {
      return LocalStorage.cache[key];
    }

    try {
      result = await AsyncStorage.getItem(key);

      if (result && result.startsWith("json:")) {
        result = JSON.parse(result.slice(5));
      }

      LocalStorage.cache[key] = result;
    } catch (error) {
      result = error;
    }

    return result || defaultValue;
  },
  setItem: async (key, value) => {
    try {
      // Hack to allow storing objects
      if (typeof value === "object") {
        await AsyncStorage.setItem(key, `json:${JSON.stringify(value)}`);
      } else {
        await AsyncStorage.setItem(key, value);
      }

      LocalStorage.cache[key] = value;
    } catch (error) {
      console.error("Error while setting key:", key);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      delete LocalStorage.cache[key];
    } catch (error) {
      console.error(`Error while removing storage key ${key}.`);
    }
  },
  multiGet: async (keys) => await AsyncStorage.multiGet(keys),
  getAllKeys: AsyncStorage.getAllKeys,
  removeAllItems: async () => {
    const keys = await LocalStorage.getAllKeys();

    for await (const key of keys) {
      console.log("Deleting", key);
      await LocalStorage.removeItem(key);
    }
  },
};

export default LocalStorage;
