import React from "react";

import {
  ScrollView,
  StackNavigator,
  Platform,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

import Main from "./Screens/Main";
import DetailItem from "./Screens/DetailItem";
import MainDrawer from "./MainDrawer";

let { width, height } = Dimensions.get("window");

export const MainScreen = StackNavigator({
  MainScreen: {
    screen: Main
  },
  DetailItemScreen: {
    screen: DetailItem
  }
});

export const Drawer = DrawerNavigator(
  {
    MainScreen: {
      screen: MainScreen
    }
  },
  {
    drawerWidth: width * 0.85,
    drawerPosition: "left",
    contentComponent: props => <MainDrawer {...props} />,
    drawerBackgroundColor: "transparent"
  }
);
