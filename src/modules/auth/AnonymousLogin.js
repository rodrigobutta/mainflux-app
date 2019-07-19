import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import Constants from "../../utils/Constants";

export default class AnonymousLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  static navigationOptions = {
    tabBarLabel: <View />,
    tabBarIcon: ({ tintColor }) => {
      return (
        <Image
          style={{ width: 24, height: 24, marginTop: 5 }}
          source={require("../../../assets/anonymous.png")}
        />
      );
    }
  };

  _anonymousLogin = () => {
    this.setState({ spinner: true });
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        this.setState({ spinner: false });
        setTimeout(() => {
          alert(error.message);
        }, 200);
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={CommonStyles.spinnerTextStyle}
        />
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={this._anonymousLogin}
        >
          <Text style={styles.facebookButtonTitle}>Login Anonymously!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.colors.themeBGColor
  },
  facebookButton: {
    flexDirection: "row",
    height: 100,
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  },
  facebookButtonTitle: {
    marginTop: 5,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  }
});
