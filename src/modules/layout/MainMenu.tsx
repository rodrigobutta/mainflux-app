import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
} from "react-native"
import { connect} from 'react-redux';
import firebase from "react-native-firebase";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

import Profile from './Profile'
import MainMenuItem from './MainMenuItem'
import Notifications from './Notifications'


const menuData = [
    {icon: "ios-home", label:"Inicio", screen:'Dashboard', key:'menu_dashboard'},
    {icon: "ios-person", label:"Perfil", screen: 'Profile', key:'menu_profile'},  
    {icon: "ios-megaphone", label:"Request", screen: 'Request', key:'menu_request'},      
    {icon: "ios-happy", label:"Requests", screen: 'Requests', key:'menu_requests'},      
    {icon: "ios-egg", label:"Tests", screen: 'Tests', key:'menu_tests'},  
  ]
  
class MainMenu extends Component {


  _logout = async () => {
    await LoginManager.logOut();
    await GoogleSignin.signOut();
    firebase
      .auth()
      .signOut()
      .then();
  };


  render() {

    const { user } = this.props.auth;

    return (
      <View style={styles.container}>
        
        {user&&
        <Profile avatar={user.avatar} username={user.name} email={user.email} />
        }
        
        <FlatList
            data={menuData} 
            keyExtractor={(item) => item.key}
            renderItem={ ({item}) => 
                <MainMenuItem navigation={this.props.navigation} screen={item.screen} icon={item.icon} label={item.label}  />
            } 
        />

        <Notifications />

        <Button title={'Cerrar sesión'} onPress={this._logout}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(255,255,255,0.43)'
  },
  menuItem: {
    flexDirection:'row'
  },
  menuItemText: {
    fontSize:15,
    fontWeight:'300',
    margin:15,
  }
})

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(MainMenu);
