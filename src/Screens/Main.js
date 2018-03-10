/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from "react-native";

import { firebaseApp } from "../api/Firebase";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "../components/Responsive";

import ListItem from "../components/ListItem";

export default class Main extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: "Shop",
    tabBarVisible: false,
    headerTitleStyle: {
      textAlign: "center",
      color: "#FFFFFF",
      alignSelf: "center"
    },
    headerTintColor: "#FFFFFF",
    headerStyle: {
      backgroundColor: "#F74F4F"
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate("ListOrderedItemsScreen")}
      >
        <ImageBackground
          source={require("../img/ListOrderLogo.png")}
          style={styles.orderItemLogos}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
        <ImageBackground
          source={require("../img/NavigatorLogo.png")}
          style={styles.navigatorLogo}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref();
    this.state = {
      listItems: [],
      child:
        this.props.navigation.state.params == undefined
          ? "Smoothies"
          : this.props.navigation.state.params.child
    };
  }

  componentWillMount() {
    let arrayTempItem = [];
    this.itemRef.child("Drink").on("child_added", snapshot => {
      if (this.state.child == snapshot.val().category) {
        const tempPrice = this.convertMoney(snapshot.val().price + "");
        arrayTempItem.push({
          name: snapshot.key,
          image: snapshot.val().imageUrl,
          price: tempPrice,
        });
      }
      this.setState({
        listItems: arrayTempItem
      });
    });
  }

  convertMoney(n) {
    let rx = /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(w) {
      while (rx.test(w)) {
        w = w.replace(rx, "$1.$2");
      }
      return w;
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          numColumns={2}
          data={this.state.listItems}
          extraData={this.state}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("DetailItemScreen", {
                  item: item
                })
              }
            >
              <View style={styles.item}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={{
                    width: responsiveWidth(33),
                    height: responsiveWidth(50)
                  }}
                />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price} đ</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  flatlist: {},
  item: {
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    margin: 2,
    backgroundColor: "#F8DCB5",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center"
  },
  name: {},
  price: {
    fontSize: 25,
    color: "#E91E63"
  },
  orderItemLogos: {
    width: 35,
    height: 35,
    marginRight: 15
  },
  navigatorLogo: {
    width: 35,
    height: 35,
    marginLeft: 15
  }
});
