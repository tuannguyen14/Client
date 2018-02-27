//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { firebaseApp } from "./api/Firebase";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "./components/Responsive.js";
// create a component
class MainDrawer extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref();
    this.state = {
      allCatelogy: ["Coffee", "Smoothies", "Itanlian Soda"],
      coverPhoto: "",
      avatar: "",
      name: ""
    };
  }

  componentDidMount() {
    this.setState({
      coverPhoto: global.userCoverPhoto,
      avatar: global.userAvatar,
      name: global.userName,
      email: global.userEmail,
      id: global.userId
    });
  }

  signOut() {
    firebaseApp
      .auth()
      .signOut()
      .then(
        () => {
          user = null;
          global.userId = null;
          this.props.navigation.navigate("LoginScreen");
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.coverPhoto }}
          style={styles.coverPhoto}
        >
          <View style={styles.containerTextImage}>
            <ImageBackground
              source={{ uri: this.state.avatar }}
              style={styles.avatar}
            />
            <Text style={styles.text}>{this.state.name}</Text>
            <Text style={[styles.text, { opacity: 0.8 }]}>
              {this.state.email}
            </Text>
          </View>
        </ImageBackground>
        <Text>{this.state.name}</Text>
        <FlatList
          style={styles.scrollView}
          data={this.state.allCatelogy}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MainScreen", {
                  child: item
                })
              }
            >
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          )}
        />
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
  },
  coverPhoto: {
    width: responsiveWidth(50),
    height: responsiveHeight(50)
  },
  avatar: {
    width: responsiveWidth(50),
    height: responsiveHeight(50)
  }
});

//make this component available to the app
export default MainDrawer;
