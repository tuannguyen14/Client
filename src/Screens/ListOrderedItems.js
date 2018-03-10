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

import { firebaseApp } from "../api/Firebase";

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
    this.state = {
      ListOrdered: global.ListOrderedItems
    };
    this.itemRef = firebaseApp.database().ref();
  }

  submit() {
    global.ListOrderedItems.forEach(item => {
      this.itemRef
        .child("Ordered")
        .child(item.item.name)
        .set({
          Image: item.item.image,
          NumberOfItem: item.numberOfItem,
          Date: new Date().getTime(),
          Price: parseInt(item.item.price.replace(".", ""))
        });
    });
    this.refs.toast.show("Đặt hàng thành công");
  }

  // deleteItem(index) {
  //   if (this.state.ListOrdered.length == 1) {
  //     this.state.ListOrdered = [];
  //   } else {
  //     this.setState({
  //       ListOrdered: this.deleteByValue(this.state.ListOrdered, index)
  //     });
  //   }
  //   if (this.state.ListOrdered.length == 1) {
  //     global.ListOrderedItems = [];
  //   } else {
  //     global.ListOrderedItems = this.deleteByValue(
  //       global.ListOrderedItems,
  //       index
  //     );
  //   }
  // }

  deleteByValue(array, index) {
    delete array[index];
    return array;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ListOrdered}
          extraData={this.state}
          renderItem={({ item, index }) => (
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
                    {/* <TouchableOpacity onPress={() => this.deleteItem(index)}>
                      <ImageBackground
                        source={require("../img/BinIcon.png")}
                        style={styles.imageBin}
                      />
                    </TouchableOpacity> */}
                    <View style={styles.containerNumberOfItem}>
                      <Text style={styles.numberOfItem}>
                        x{item.numberOfItem}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() => this.submit()}
          style={styles.containerButton}
        >
          <View style={styles.button}>
            <Text style={styles.button_login}>Đặt hàng</Text>
          </View>
        </TouchableOpacity>
        <Toast ref="toast" />
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(247, 79, 79, 70)",
    height: 45,
    borderRadius: 15
  },
  containerButton: {
    marginBottom: "3%"
  }
});

//make this component available to the app
export default ListOrderedItems;
