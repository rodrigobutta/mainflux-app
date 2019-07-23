import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,  
  SafeAreaView,
  Button,
  Alert
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/layout/MainMenuBurguer";

import Geolocation from '@react-native-community/geolocation';

export default class GeolocationModule extends React.Component{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Geo',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  };

  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    watchID: null,
  }

  // watchID: ?number = null;

  // <Button onPress={navigation.getParam('openMainMenu')} title="Menú" color="#f0f" />

  _openMainMenu = () => {
    this.props.navigation.openDrawer();
  };


  componentWillUnmount() {
    this.props.navigation.setParams({ openMainMenu: this._openMainMenu });


    if(this.state.watchID != null){
      Geolocation.clearWatch(this.state.watchID);
    }

    
  }
  componentDidMount() {

    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    
    var watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });

    this.setState({watchID});

  }



  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Coordenadas
          </Text>

          <Text>
            <Text style={styles.title}>Inicial: </Text>
              {this.state.initialPosition}
          </Text>
          <Text>
            <Text style={styles.title}>Actual: </Text>
            {this.state.lastPosition}
          </Text>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 15,
    marginBottom: 5
  },
  title: {
    fontWeight: '500',
  },
});



