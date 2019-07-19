import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import firebase from "react-native-firebase";
import { GoogleSignin } from "react-native-google-signin";
import Spinner from "react-native-loading-spinner-overlay";

export default class GoogleLogin extends Component {
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
          source={require("../../../assets/google.png")}
        />
      );
    }
  };

  googleLogin = async () => {
    try {
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      this.setState({ spinner: true });
      const currentUser = await firebase
        .auth()
        .signInWithCredential(credential);
        
        this.setState({ spinner: false });

    } catch (error) {
      this.setState({ spinner: false });
      setTimeout(() => {
        alert(error.message);
      }, 200);
    }
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
          onPress={this.googleLogin}
        >
          <Text style={styles.facebookButtonTitle}>Continue with Google</Text>
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
    backgroundColor: "#F14031"
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
