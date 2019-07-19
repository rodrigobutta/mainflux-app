import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MainMenuBurguer extends React.Component<any, any>{     

  state = {
    active: false
  }
  
  
  _onBurguerClick = () => {

      this.setState({ active: !this.state.active })

      this.props.navigation.toggleDrawer()
  
  };


  render() {
    const { navigation } = this.props;
    const { active } = this.state;

    return (
      <View style={{paddingLeft:16}}>
        <Icon 
            name='ios-menu' 
            size={30} 
            color='#000' 
            onPress={this._onBurguerClick}
        />
      </View>
    );
  }
}
