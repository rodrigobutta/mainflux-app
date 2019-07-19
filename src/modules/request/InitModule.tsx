import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,  
  SafeAreaView,
  Button
} from "react-native";

import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/menu/MainMenuBurguer";


export default class InitModule extends React.Component<any, any>{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Solicitiar',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  };

  componentDidMount() {
   
  }

  render() {
    const { navigation } = this.props;


    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Solicitar servicio
          </Text>

          <Button onPress={() => navigation.navigate('RequestFormModule')} title="Nueva solicitud" />
          
            

          
        </View>
      </SafeAreaView>
    );
  }
}




const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});