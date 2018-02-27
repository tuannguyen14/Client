import React from "react";

import {
  ScrollView,
  StackNavigator,
  Platform,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Main from "./Screens/Main";
import DetailItem from "./Screens/DetailItem";
import ListOrderedItems from "./Screens/ListOrderedItems";
import MainDrawer from "./MainDrawer";

let { width, height } = Dimensions.get("window");

export const MainScreen = StackNavigator({
  MainScreen: {
    screen: Main
  },
  DetailItemScreen: {
    screen: DetailItem
  },
  ListOrderedItemsScreen: {
    screen: ListOrderedItems
  }
});

export const LoginAndRegister = StackNavigator({
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      header: null,
      drawerLockMode: "locked-closed"
    }
  },
  RegisterScreen: {
    screen: Register,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  }
});

export const Drawer = DrawerNavigator(
  {
    MainScreen: {
      screen: LoginAndRegister
    }
  },
  {
    drawerWidth: width * 0.85,
    drawerPosition: "left",
    contentComponent: props => <MainDrawer {...props} />,
    drawerBackgroundColor: "transparent"
  }
);
