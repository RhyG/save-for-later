import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { IBookmark } from '@app/types';

export type RootStackParamList = {
  TabNavigator: undefined;
  HomeTab: undefined;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
  AccountTab: NavigatorScreenParams<AccountStackParamList>;
  CollectionsTab: NavigatorScreenParams<CollectionsStackParamList>;

  ManualBookmark: { screen: string; params: { collectionId: string | undefined } };
  EnterManualBookmarkScreen: { collectionId?: string };
  AddManualBookmarkScreen: { collectionId?: string; bookmark: Omit<IBookmark, 'id' | 'user_id'> };

  AddBookmark: undefined;
};

export type RootStackScreenProps<Name extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, Name>;

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type HomecreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeStackParamList, 'Collection'>,
  StackNavigationProp<RootStackParamList>
>;

export type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<SettingsStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<SettingsStackParamList, 'Collection'>,
  StackNavigationProp<RootStackParamList>
>;

export type AccountStackParamList = {
  Account: undefined;
};

export type AccountStackScreenProps<T extends keyof AccountStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<AccountStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type AccountcreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AccountStackParamList, 'Collection'>,
  StackNavigationProp<RootStackParamList>
>;

export type CollectionsStackParamList = {
  Collections: undefined;
  Collection: { id: string; name: string };
};

export type CollectionsStackScreenProps<T extends keyof CollectionsStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<CollectionsStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type CollectionScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<CollectionsStackParamList, 'Collection'>,
  StackNavigationProp<RootStackParamList>
>;

export type AddBookmarkScreenNavigationProp = CompositeNavigationProp<StackNavigationProp<RootStackParamList>>;

export type ManualBookmarkScreenNavigationProp = CompositeNavigationProp<StackNavigationProp<RootStackParamList>>;

export type EnterManualBookmarkScreenProp = CompositeNavigationProp<StackNavigationProp<RootStackParamList>>;

interface RootStackScreen<Name extends keyof RootStackParamList, Props = {}>
  extends React.FC<RootStackScreenProps<Name> & Props> {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
