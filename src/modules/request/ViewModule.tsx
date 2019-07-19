import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView  
} from 'react-native';
// import Camera from 'react-native-camera';

import CommonStyles from "../../utils/CommonStyles";


export default class ViewModule extends React.Component<any, any>{     
  
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }


  componentDidMount() {



  }


  render() {

    const { items } = this.state;
    
    return (

      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Vista de  Solicitud
          </Text>
            
       
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      padding: 15
  }
})