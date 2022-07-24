import NativeStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from '../AsyncStorage';

describe('AsyncStorage', () => {
  describe('.getItem', () => {
    it("Should return the default value if item doesn't exist in storage or cache", async () => {
      const item = await AsyncStorage.getItem('key', 'default_value');

      expect(item).toEqual('default_value');
    });

    it('Should get the item from the cache if it exists', async () => {
      const itemKey = 'ghjkm';
      const itemToStore = 'store_me';
      AsyncStorage.cache[itemKey] = itemToStore;

      const item = await AsyncStorage.getItem(itemKey, itemToStore);

      expect(item).toEqual(itemToStore);
    });
    it("Should get the item from storage if it doesn't exist in cache", async () => {
      const key = 'fgnhj';
      const itemInStorage = 'item_in_storage';

      jest.spyOn(NativeStorage, 'getItem').mockResolvedValueOnce(itemInStorage);

      const item = await AsyncStorage.getItem(key, 'default');

      expect(item).toEqual(itemInStorage);
    });
  });

  describe('.setItem', () => {
    it('Sets primitives in storage', () => {
      const itemKey = 'sdfvg';
      const itemToStore = 'store_me';

      AsyncStorage.setItem(itemKey, itemToStore);

      expect(NativeStorage.setItem).toHaveBeenCalledWith(itemKey, itemToStore);
    });

    it('Converts objects to JSON and sets them in storage', () => {
      const itemKey = 'qwecr';
      const itemToStore = { value: 'store_me' };

      AsyncStorage.setItem(itemKey, itemToStore);

      expect(NativeStorage.setItem).toHaveBeenCalledWith(
        itemKey,
        'json:{"value":"store_me"}',
      );
    });
  });

  describe('.removeItem', () => {
    it('Should remove an item from storage and cache', async () => {
      const itemKey = 'wmrtyu';
      const itemInStore = 'store_me';

      AsyncStorage.cache[itemKey] = itemInStore;
      AsyncStorage.setItem(itemKey, itemInStore);

      await AsyncStorage.removeItem(itemKey);

      expect(NativeStorage.removeItem).toHaveBeenCalledWith(itemKey);
    });
  });
});
