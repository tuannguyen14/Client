//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "../components/Responsive.js";

// create a component
class ListOrderedItems extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Các món đã chọn",
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
    headerRight: <TouchableOpacity />
  });

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={global.ListOrderedItems}
          renderItem={({ item }) => (
            <View style={styles.containerItems}>
              <View style={styles.items}>
                <ImageBackground
                  source={{ uri: item.item.image }}
                  style={styles.imageItem}
                />
                <View style={styles.containerText}>
                  <Text style={styles.name}>{item.item.name}</Text>
                  <Text style={styles.price}>{item.item.price} đ</Text>
                  <View style={styles.containerBinAndNumberOfItem}>
                    <TouchableOpacity>
                      <ImageBackground
                        source={require("../img/BinIcon.png")}
                        style={styles.imageBin}
                      />
                    </TouchableOpacity>
                    <View style={styles.containerNumberOfItem}>
                      <TouchableOpacity onPress={() => this.subtract()}>
                        <Text style={styles.subtract}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.numberOfItem}>
                        {item.numberOfItem}
                      </Text>
                      <TouchableOpacity onPress={() => this.plus()}>
                        <Text style={styles.plus}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerItems: {
    width: responsiveWidth(100),
    height: responsiveHeight(25),
    margin: 2,
    backgroundColor: "#F8DCB5",
    alignItems: "center",
    borderRadius: 8
  },
  items: {
    flexDirection: "row"
  },
  imageItem: {
    marginTop: "5%",
    marginRight: "1%",
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    display: "flex",
    justifyContent: "space-between"
  },
  price: {
    fontSize: 25,
    color: "#E91E63",
    marginRight: "35%",
    marginTop: "3%"
  },
  name: {
    marginRight: "35%"
  },
  containerText: {
    marginTop: "8%"
  },
  imageBin: {
    width: responsiveWidth(6),
    height: responsiveWidth(6)
  },
  subtract: {
    fontSize: 21
  },
  plus: {
    fontSize: 21
  },
  numberOfItem: {
    fontSize: 19,
    marginLeft: "6%",
    marginRight: "6%"
  },
  containerBinAndNumberOfItem: {
    flexDirection: "row",
    marginTop: "10%"
  },
  containerNumberOfItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default ListOrderedItems;
