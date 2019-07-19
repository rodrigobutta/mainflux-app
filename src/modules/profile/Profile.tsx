import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,  
  SafeAreaView,
  Button
} from "react-native";

import CommonStyles from "../../utils/CommonStyles";
import firebase from "react-native-firebase";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

import MainMenuBurguer from "../../modules/menu/MainMenuBurguer";


export default class Profile extends React.Component<any, any>{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Perfil',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  };

  // <Button onPress={navigation.getParam('openMainMenu')} title="Menú" color="#f0f" />
  
  componentWillMount() {
    this.props.navigation.setParams({ openMainMenu: this._openMainMenu });
  }

  _openMainMenu = () => {
    this.props.navigation.openDrawer();
  };



  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    console.log("Profile Screen");
    console.log("====================================");
    console.log(currentUser);
    console.log("====================================");
  }

  _logout = async () => {
    await LoginManager.logOut();
    await GoogleSignin.signOut();
    firebase
      .auth()
      .signOut()
      .then();
  };

  _loginType = () => {
    const { currentUser } = firebase.auth();

    if (currentUser.isAnonymous) {
      return "Anonymous";
    }

    var loginType = "";
    switch (currentUser.providerData[0].providerId) {
      case firebase.auth.EmailAuthProvider.PROVIDER_ID:
        loginType = "Email";
        break;
      case firebase.auth.PhoneAuthProvider.PROVIDER_ID:
        loginType = "Phone";
        break;
      case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
        loginType = "Facebook";
        break;
      case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
        loginType = "Google";
        break;
    }

    return loginType;
  };





  render() {
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >



          



          <Image
            source={require("../../../assets/app_logo.png")}
            style={{ height: 100, width: 100, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Logueado!
          </Text>

          {currentUser&&
            <React.Fragment>
              <Image source={{ uri: currentUser.photoURL }} style={{ width: 50, height: 50, marginTop:10 }} />            
              <Text style={styles.normalText}>Name: {currentUser.displayName}</Text>
              <Text style={styles.normalText}>Email: {currentUser.email}</Text>
              <Text style={styles.normalText}>Login Type : {this._loginType()}</Text>
            </React.Fragment>            
          }
          

          <Button onPress={() => navigation.navigate('EditProfile')} title="Editar Perfil" />        

          <TouchableOpacity
            style={[CommonStyles.themeButton, { marginTop: 20 }]}
            onPress={this._logout}
          >
            <Text style={CommonStyles.themeButtonTitle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 15,
    marginBottom: 5
  }
});



