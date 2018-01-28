import React from "react";

import {
    ScrollView,
    StackNavigator,
    Platform,
    TabNavigator,
    DrawerNavigator
} from "react-navigation";

import Main from "./Screens/Main";
import DetailItem from "./Screens/DetailItem";

export const MainScreen = StackNavigator({
    MainScreen: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    DetailItemScreen: {
        screen: DetailItem,
        navigationOptions: {
            header: null
        }
    }
});