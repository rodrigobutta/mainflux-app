import React from "react";
import {  
  StyleSheet,  
  SafeAreaView,
  Button,
  Alert,
  View,
  Text
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/layout/MainMenuBurguer";

import CacheImage from "../../components/cacheImage/CacheImage";


export default class CacheModule extends React.Component{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'cache',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  };

  state = {
  }

  _openMainMenu = () => {
    this.props.navigation.openDrawer();
  };

  componentWillUnmount() {
    this.props.navigation.setParams({ openMainMenu: this._openMainMenu });
  
  }

  componentDidMount() {


  }

  onButton1Click = () => {
    console.log('list click')
    
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Cache
          </Text>

          <CacheImage uri="https://www.ecured.cu/images/thumb/a/a7/Jorge_guinzburg.jpg/260px-Jorge_guinzburg.jpg" style={{width: 150, height: 150}} />
        
          <Button onPress={this.onButton1Click} title={"Boton1"} />
        </View>
      </SafeAreaView>      
    );
  }
}

const styles = StyleSheet.create({   
  wrapper: {
    flex: 1,
    marginTop: 0,
  },
});
