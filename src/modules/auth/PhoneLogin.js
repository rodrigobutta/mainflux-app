import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet
} from "react-native";
import firebase from "react-native-firebase";
import CommonStyles from "../../utils/CommonStyles";
import Spinner from "react-native-loading-spinner-overlay";

export default class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      confirmResult: null,
      verificationCode: "",
      spinner: false
    };
  }

  static navigationOptions = {
    tabBarLabel: <View />,
    tabBarIcon: ({ tintColor }) => {
      return (
        <Image
          style={{ width: 24, height: 24, marginTop: 5 }}
          source={require("../../../assets/phone.png")}
        />
      );
    }
  };

  _validatePhone = () => {
    var re = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return re.test(this.state.phone);
  };

  _handleSendCode = () => {
    // Request to send OTP
    if (this._validatePhone()) {
      this.setState({ spinner: true });
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({ spinner: false });
          this.setState({ confirmResult });
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
    } else {
      alert("Invalid Phone Number");
    }
  };

  _changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: "" });
  };

  _handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state;
    if (verificationCode.length == 6) {
      this.setState({ spinner: true });
      confirmResult
        .confirm(verificationCode)
        .then()
        .catch(error => {
          this.setState({ spinner: false });
          alert(error.message);
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        });
    } else {
      alert("Please enter 6 digit OTP");
    }
  };

  _renderConfirmationCodeView = () => {
    return (
      <View style={{ width: "100%", alignItems:'center', marginTop:50 }}>
        <TextInput
          style={CommonStyles.textInput}
          placeholder="Verification code"
          placeholderTextColor="#eee"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={verificationCode => {
            this.setState({ verificationCode });
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[CommonStyles.themeButton, { marginTop: 20 }]}
          onPress={this._handleVerifyCode}
        >
          <Text style={CommonStyles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaContainer, {backgroundColor:'#28AA78'}]}>
        <Spinner
          visible={this.state.spinner}
          textStyle={CommonStyles.spinnerTextStyle}
        />
        <View style={styles.page}>
          <TextInput
            style={CommonStyles.textInput}
            placeholder="Phone Number with country code"
            placeholderTextColor="#eee"
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={phone => {
              this.setState({ phone });
            }}
            maxLength={15}
            editable={this.state.confirmResult ? false : true}
          />

          <TouchableOpacity
            style={[CommonStyles.themeButton, { marginTop: 20 }]}
            onPress={
              this.state.confirmResult
                ? this._changePhoneNumber
                : this._handleSendCode
            }
          >
            <Text style={CommonStyles.themeButtonTitle}>
              {this.state.confirmResult ? "Change Phone Number" : "Send Code"}
            </Text>
          </TouchableOpacity>

          {this.state.confirmResult ? this._renderConfirmationCodeView() : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
