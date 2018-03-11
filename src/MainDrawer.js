//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform
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
      coverPhoto: global.userCoverPhoto,
      avatar: global.userAvatar,
      email: global.userEmail
    };
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
          source={{ uri: global.userCoverPhoto }}
          style={styles.coverPhoto}
        >
          <View style={styles.containerTextImage}>
            <ImageBackground
              source={{ uri: global.userAvatar }}
              style={styles.avatar}
            />
            <Text style={styles.text}>{global.userName}</Text>
            <Text style={[styles.text, { opacity: 0.8 }]}>
              {global.userEmail}
            </Text>
          </View>
        </ImageBackground>
        <Text>{this.state.name}</Text>
        <Text style={styles.header}>Thực đơn</Text>
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
  header: {
    fontSize: 21,
    fontWeight: "bold",
  },
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
  title: {
    marginLeft: "3%",
    marginTop: "1%",
    fontSize: 25,
    fontWeight: "bold"
  },
  containerItem: {
    marginLeft: "10%",
    marginTop: "1%",
    fontSize: 21
  },
  avatar: {
    margin: "3%",
    width: 60,
    height: 60,
    ...Platform.select({
      ios: {
        borderRadius: 30.5
      },
      android: {
        borderRadius: 55
      }
    })
  },
  coverPhoto: {
    width: "100%",
    height: 260
  },
  text: {
    backgroundColor: "transparent",
    marginLeft: "3%",
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  textHeader: {
    marginLeft: "3%",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: "3%",
    backgroundColor: "transparent"
  },
  containerTextImage: {
    marginTop: "30%"
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center"
  }
});

//make this component available to the app
export default MainDrawer;
