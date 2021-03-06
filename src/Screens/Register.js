//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { firebaseApp } from "../api/Firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { DURATION } from "react-native-easy-toast";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

const radio_props = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" }
];

class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      alignSelf: "center",
      marginRight: "19%",
      color: "#FFFFFF"
    },
    headerTintColor: "#FFFFFF",
    title: "Đăng ký",
    headerStyle: {
      backgroundColor: "#F74F4F"
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      sex: "Nam",
      visible: false
    };
    this.itemRef = firebaseApp.database().ref("Users");
  }

  confirmRegister() {
    this.setState({
      visible: !this.state.visible
    });
    let pathAvatar = "";
    if (this.state.sex == "Nam") {
      pathAvatar =
        "https://firebasestorage.googleapis.com/v0/b/eiu-chatting-c99ce.appspot.com/o/Users%2FAnonymous%2FMale.png?alt=media&token=d28967b7-690e-45e0-8dfa-3c23d2540517";
    } else {
      pathAvatar =
        "https://firebasestorage.googleapis.com/v0/b/eiu-chatting-c99ce.appspot.com/o/Users%2FAnonymous%2FFemale.png?alt=media&token=62a8790b-b444-47ef-9f0c-44a2bca42019";
    }
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        const user = firebaseApp.auth().currentUser;
        this.itemRef
          .child(user.uid)
          .child("Information")
          .set({
            Name: this.state.name,
            Email: this.state.email,
            Password: this.state.password,
            Sex: this.state.sex,
            Avatar: pathAvatar,
            ID: user.uid,
            CoverPhoto:
              "https://firebasestorage.googleapis.com/v0/b/eiu-chatting-c99ce.appspot.com/o/Users%2FAnonymous%2FCoverPhoto.jpg?alt=media&token=7d9930c2-4809-4fe8-b4ac-28625a1c4ec8",
            Sex: this.state.sex
          });
        this.refs.toast.show("Đăng ký thành công"),
          this.setState({
            visible: false
          });
        this.props.navigation.navigate("LoginScreen");
      })
      .catch(error => {
        this.setState(
          {
            visible: false
          },
          this.refs.toast.show("Đăng ký thất bại!")
        );
      });
    // }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../img/backgroundLogin.png")}
          style={styles.backgroundImage}
        >
          <Spinner
            visible={this.state.visible}
            textContent={"Đang xử lý..."}
            textStyle={{ color: "#FFF" }}
          />
          <View style={styles.layout}>
            <TextInput
              style={styles.textInput}
              placeholder="Họ và tên"
              placeholderTextColor="rgba(255,255,255,255)"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              returnKeyType="next"
              onSubmitEditing={() => this.emailInput.focus()}
              ref="nameRef"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,255)"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              ref={input => (this.emailInput = input)}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              placeholderTextColor="rgba(255,255,255,255)"
              secureTextEntry
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              ref={input => (this.passwordInput = input)}
              returnKeyType="next"
              onSubmitEditing={() => this.rePasswordInput.focus()}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="rgba(255,255,255,255)"
              secureTextEntry
              autoCorrect={false}
              onChangeText={rePassword => this.setState({ rePassword })}
              value={this.state.rePassword}
              ref={input => (this.rePasswordInput = input)}
              returnKeyType="next"
              onSubmitEditing={() => this.phoneNumberInput.focus()}
            />
            <View style={styles.radio}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                buttonColor={"#FFFFFF"}
                labelStyle={{
                  marginLeft: "15%",
                  backgroundColor: "transparent"
                }}
                onPress={value => {
                  this.setState({ sex: value });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.button_register}
              onPress={() => this.confirmRegister()}
            >
              <Text style={styles.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <Toast ref="toast" />
        </ImageBackground>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  layout: {
    marginTop: "10%"
  },
  textInput: {
    fontSize: 17,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.65)",
    marginBottom: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 5,
    paddingHorizontal: "3%",
    color: "rgba(255, 255, 255, 0.77)"
  },
  touchable: {
    padding: "3%"
  },
  button_register: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(247, 79, 79, 70)",
    height: 45,
    borderRadius: 15,
    marginLeft: "10%",
    marginRight: "10%"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: null,
    height: null
  },
  textRegister: {
    fontSize: 18,
    color: "#FFFFFF"
  },
  radio: {
    marginLeft: "27%",
    marginRight: "27%",
    marginBottom: "6%",
    marginTop: "3%"
  }
});

//make this component available to the app
export default Register;
