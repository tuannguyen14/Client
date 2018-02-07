import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "../components/Responsive.js";

export default class DetailItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      image: this.props.navigation.state.params.image,
      price: this.props.navigation.state.params.price,
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

  render() {
    return (
      <View style={styles.contrainer}>
        <ImageBackground
          source={{ uri: this.state.image }}
          style={{
            width: responsiveWidth(23),
            height: responsiveWidth(18)
          }}
        />
        <Text> {this.state.title} </Text>
        <View style={styles.contrainerNumber}>
          <TouchableOpacity onPress={() => this.subtract()}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text>{this.state.numberOfItem}</Text>
          <TouchableOpacity onPress={() => this.plus()}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => confirm()}
          style={styles.buttonConfirm}
        >
          <Text>Đặt món</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  contrainerNumber: {
    flexDirection: "row"
  }
});
