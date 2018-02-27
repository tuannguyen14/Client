import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "../components/Responsive.js";

export default class DetailItem extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`,
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
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
      numberOfItem: 1
    };
  }
  subtract() {
    this.setState({
      numberOfItem: this.state.numberOfItem - 1
    });
  }
  plus() {
    this.setState({
      numberOfItem: this.state.numberOfItem + 1
    });
  }

  addItemToListOrder() {
    global.ListOrderedItems.push({
      item: this.state.item,
      numberOfItem: this.state.numberOfItem
    });
    this.refs.toast.show(
      "Thêm thành công " + this.state.item.name + " vào giỏ hàng"
    );
  }

  render() {
    return (
      <View style={styles.contrainer}>
        <View style={styles.containerAll}>
          <ImageBackground
            source={{ uri: this.state.item.image }}
            style={styles.image}
          />
          <Text> {this.state.item.name} </Text>
          <View style={styles.contrainerNumber}>
            <TouchableOpacity onPress={() => this.subtract()}>
              <Text style={styles.subtract}>-</Text>
            </TouchableOpacity>
            <Text style={styles.numberOfItem}>{this.state.numberOfItem}</Text>
            <TouchableOpacity onPress={() => this.plus()}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>{this.state.item.price} đ</Text>
          <TouchableOpacity
            onPress={() => this.addItemToListOrder()}
            style={styles.buttonConfirm}
          >
            <View style={styles.buttonConfirm}>
              <Text style={styles.textButtonConfirm}>Thêm vài giỏ</Text>
            </View>
          </TouchableOpacity>
          <Toast ref="toast" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  containerAll: {
    backgroundColor: "#F8DCB5",
    alignItems: "center",
    borderRadius: 8,
    width: responsiveWidth(100),
    height: responsiveHeight(100)
  },
  contrainerNumber: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: "5%",
    width: responsiveWidth(60),
    height: responsiveWidth(80)
  },
  price: {
    fontSize: 25,
    color: "#E91E63"
  },
  subtract: {
    fontSize: 21
  },
  plus: {
    fontSize: 21
  },
  numberOfItem: {
    fontSize: 19,
    marginLeft: "3%",
    marginRight: "3%"
  },
  buttonConfirm: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 15,
    backgroundColor: "#F74F4F",
    paddingLeft: "15%",
    paddingRight: "15%"
  },
  textButtonConfirm: {
    fontSize: 18,
    color: "#FFFFFF"
  },
  orderItemLogos: {
    width: 35,
    height: 35,
    marginRight: 15
  }
});
