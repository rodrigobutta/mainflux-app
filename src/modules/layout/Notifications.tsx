import React from 'react'
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
} from "react-native"
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Overlay 
} from 'react-native-elements';


export default class Notifications extends React.Component<any, any>{     

  state = {
    active: false
  }
  
  
  _onBackdropClick = () => {

      this.setState({ active: false })

  };


  render() {    
    const { active } = this.state;

    return (
      <View style={{paddingLeft:16}}>
        
        <Overlay
            isVisible={active}
            onBackdropPress={this._onBackdropClick}
          >
          <Text>Hello from Overlay!</Text>
        </Overlay>

      </View>
    );
  }
}
