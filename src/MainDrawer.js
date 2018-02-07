//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { firebaseApp } from "./api/Firebase";

// create a component
class MainDrawer extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref();
    this.state = {
      allCatelogy: ["Coffee", "Smoothies", "Itanlian Soda"]
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.state.allCatelogy.map(item => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MainScreen", {
                  child: item
                })
              }
            >
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  scrollView: {
    marginTop: "3%"
  },
  item: {
    fontSize: 18,
    marginLeft: "5%"
  }
});

//make this component available to the app
export default MainDrawer;
