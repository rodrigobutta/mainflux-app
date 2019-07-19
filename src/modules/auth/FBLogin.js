import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native";

import CommonStyles from "../../utils/CommonStyles";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "react-native-firebase";

export default class FBLogin extends Component {
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
          source={require("../../../assets/facebook.png")}
        />
      );
    }
  };

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        console.log("====================================");
        console.log("User canceled login");
        console.log("====================================");
        return;
        // throw new Error("User cancelled request");
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        console.log("====================================");
        console.log("Something went wrong obtaining the users access token");
        console.log("====================================");
        return;
        // throw new Error(
        //   "Something went wrong obtaining the users access token"
        // );
      }

      this.setState({ spinner: true });

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
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
          onPress={this.facebookLogin}
        >
          <Text style={styles.facebookButtonTitle}>Continue with Facebook</Text>
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
    backgroundColor: "#315283"
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
