import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";

import firebase from "react-native-firebase";
import CommonStyles from "../../utils/CommonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { IndicatorViewPager, PagerTitleIndicator } from "rn-viewpager";

const windowWidth = Dimensions.get("window").width;
export default class EmailLogin extends Component {
  constructor(props) {
    super(props);

    // firebase.auth.EmailAuthProvider
    this.state = {
      loginEmail: "rbutta@gmail.com",
      loginPassword: "rbutta",
      signUpFullName: "",
      signUpEmail: "",
      signUpPassword: "",
      spinner: false
    };
  }

  static navigationOptions = {
    tabBarLabel: <View />,
    tabBarIcon: ({ tintColor }) => {
      return (
        <Image
          style={{ width: 24, height: 24, marginTop: 5 }}
          source={require("../../../assets/email.png")}
        />
      );
    }
  };

  _handleLogin = () => {

    const { loginEmail, loginPassword } = this.state;
    
    if (this._validateLogin()) {
    
      this.setState({ spinner: true });
    
      firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPassword)
        .then(firebaseUser => {
          console.log(firebaseUser)
          this.setState({ spinner: false });
        })
        .catch(error => {
          this.setState({ spinner: false });
          setTimeout(() => {
            alert(error.message);
          }, 200);
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        });
    }

  };

  _validateLogin = () => {
    const { loginEmail, loginPassword } = this.state;
    if (!this._validateEmail(loginEmail)) {
      alert("Please enter valid email");
      return false;
    }

    if (loginPassword.trim() === "") {
      alert("Please enter password");
      return false;
    }

    if (loginPassword.trim().length < 6) {
      alert("Length of the password should be at least 6");
      return false;
    }

    return true;
  };

  _handleSignUp = () => {
    const { signUpFullName, signUpEmail, signUpPassword } = this.state;
    if (this._validateSignUp()) {
      global.fullNameTemp = signUpFullName;
      this.setState({ spinner: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then()
        .catch(error => {
          this.setState({ spinner: false });
          setTimeout(() => {
            alert(error.message);
          }, 200);
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        });
    }
  };

  _validateSignUp = () => {
    const { signUpFullName, signUpEmail, signUpPassword } = this.state;
    if (signUpFullName.trim() === "") {
      alert("Please enter full name");
      return false;
    }

    if (!this._validateEmail(signUpEmail)) {
      alert("Please enter valid email");
      return false;
    }

    if (signUpPassword.trim() === "") {
      alert("Please enter password");
      return false;
    }

    if (signUpPassword.trim().length < 6) {
      alert("Length of the password should be at least 6");
      return false;
    }

    return true;
  };

  _validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  _renderLoginPage = () => {
    return (
      <View style={styles.page}>
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          value={this.state.loginEmail}
          onChangeText={loginEmail => {
            this.setState({ loginEmail });
          }}
          maxLength={30}
        />
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Contraseña"
          placeholderTextColor="#aaaaaa"
          value={this.state.loginPassword}
          onChangeText={loginPassword => {
            this.setState({ loginPassword });
          }}
          maxLength={15}
          secureTextEntry
        />
        <TouchableOpacity
          style={[CommonStyles.themeButton, { marginTop: 20 }]}
          onPress={this._handleLogin}
        >
          <Text style={CommonStyles.themeButtonTitle}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderSignUpPage = () => {
    return (
      <View style={styles.page}>
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Nombre"
          placeholderTextColor="#aaaaaa"
          value={this.state.signUpFullName}
          onChangeText={signUpFullName => {
            this.setState({ signUpFullName });
          }}
          maxLength={30}
        />
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          value={this.state.signUpEmail}
          onChangeText={signUpEmail => {
            this.setState({ signUpEmail });
          }}
          maxLength={30}
        />
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Clave"
          placeholderTextColor="#aaaaaa"
          value={this.state.signUpPassword}
          onChangeText={signUpPassword => {
            this.setState({ signUpPassword });
          }}
          maxLength={15}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={[CommonStyles.themeButton, { marginTop: 20 }]}
          onPress={this._handleSignUp}
        >
          <Text style={CommonStyles.themeButtonTitle}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderTitleIndicator() {
    return (
      <PagerTitleIndicator
        style={styles.indicatorContainer}
        trackScroll={true}
        itemTextStyle={styles.indicatorText}
        itemStyle={{ width: windowWidth / 2 - 20 }}
        selectedItemStyle={{ width: windowWidth / 2 - 20 }}
        selectedItemTextStyle={styles.indicatorSelectedText}
        selectedBorderStyle={styles.selectedBorderStyle}
        titles={["Ingresá", "Registrate"]}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaContainer, {backgroundColor:'#ffffff'}]}>
        <Spinner
          visible={this.state.spinner}
          textStyle={CommonStyles.spinnerTextStyle}
        />
        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderTitleIndicator()}
          >
            {this._renderLoginPage()}
            {this._renderSignUpPage()}
          </IndicatorViewPager>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  indicatorContainer: {
    height: 50,
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: "#bf0811"
  },
  indicatorText: {
    fontSize: 14,
    color: "#aaaaaa"
  },
  indicatorSelectedText: {
    fontSize: 14,
    color: "#ffffff"
  },
  selectedBorderStyle: {
    height: 3,
    backgroundColor: "white"
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
