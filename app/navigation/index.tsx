import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { useTheme } from 'styled-components/native';

import { AccountScreen } from '@app/screens/account';
import { AddBookmarkScreen, ManualBookmarkScreen } from '@app/screens/add-bookmark';
import { CollectionsScreen } from '@app/screens/collections';
import { CollectionScreen } from '@app/screens/collections';
import { HomeScreen } from '@app/screens/home';
import { SettingsScreen } from '@app/screens/settings';

import {
  AccountStackParamList,
  CollectionsStackParamList,
  HomeStackParamList,
  RootStackParamList,
  SettingsStackParamList,
} from './types';

const screenOptions = {
  contentStyle: { backgroundColor: '#fff' },
  headerStyle: { backgroundColor: '#fff' },
  headerShadowVisible: false,
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="AddBookmarkScreen" component={AddBookmarkScreen} options={screenOptions} />
      <RootStack.Screen name="ManualBookmarkScreen" component={ManualBookmarkScreen} options={screenOptions} />
    </RootStack.Navigator>
  );
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={screenOptions} />
    </HomeStack.Navigator>
  );
};

const CollectionsStack = createNativeStackNavigator<CollectionsStackParamList>();
const CollectionsStackScreen = () => {
  return (
    <CollectionsStack.Navigator>
      <CollectionsStack.Screen name="Collections" component={CollectionsScreen} options={screenOptions} />
      <CollectionsStack.Screen name="Collection" component={CollectionScreen} options={screenOptions} />
    </CollectionsStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ ...screenOptions, headerShadowVisible: true }}
      />
    </SettingsStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator<AccountStackParamList>();
const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} options={screenOptions} />
    </AccountStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabNavigator = () => {
  const { colours } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={() => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <OcticonsIcon name="home" color={focused ? colours.purple100 : colours.grey300} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="CollectionsTab"
        component={CollectionsStackScreen}
        options={() => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <FeatherIcon name="folder" color={focused ? colours.purple100 : colours.grey300} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStackScreen}
        options={() => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <FeatherIcon name="user" color={focused ? colours.purple100 : colours.grey300} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={() => ({
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <IonIcon name="settings-outline" color={focused ? colours.purple100 : colours.grey300} size={25} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
