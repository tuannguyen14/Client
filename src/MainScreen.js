import React, { Component } from "react";
import { View, Text } from "react-native";
import { Drawer } from "./MainRoot";

console.disableYellowBox = true;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    global.ListOrderedItems = [];
  }
  render() {
    return <Drawer />;
  }
}
