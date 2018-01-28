/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  FlatList
} from 'react-native';

import { firebaseApp } from "../api/Firebase";

export default class Main extends Component<{}> {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref();
    this.state = {
      listItems: []
    }
  };

  componentWillMount() {
    this.itemRef.on("child_added", snapshot => {
      // this.state.listItems.push({
      // catelogory: snapshot.key,
      // image: snapshot.val().imageUrl,
      // price: snapshot.val().price,
      // ingredient: snapshot.val().ingredient
      console.log(snapshot.val())
      // });
      console.log("aaa")
    });
  }

  render() {
    // const { navigate } = this.props.navigation;
    // const sectionData = [];
    // this.state.listItems.map((item, index) => {
    //   sectionData.push({ title: item.name })
    // })
    // console.log(this.state.listItems);
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
