import React from "react";

import {
  View,
  SafeAreaView,
  Button,
  Text
} from "react-native";

import CommonStyles from "../../utils/CommonStyles";
import firebase from "react-native-firebase";


// interface Props {
//   styleTags: any
// }

// interface State {
//   currentUser: null;
// }

export default class Edit extends React.Component<any, any>{    
// export default class Profile extends React.Component<Props, State>{  
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Editar Perfil',      
    };
  };

  


  componentDidMount() {
 
  }



  render() {
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

          <Text>editar perfil 2222 del usuario</Text>        
          <Button onPress={() => navigation.navigate('Profile')} title="Volver" />        

          


        </View>
      </SafeAreaView>
    );
  }
}
