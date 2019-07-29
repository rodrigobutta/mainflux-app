import React from "react";
import {  
  StyleSheet,  
  SafeAreaView,
  Button,
  Alert
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/layout/MainMenuBurguer";

import { View, Text, Picker } from 'native-base';
import GenerateForm from "../../components/Form";
import theme from '../../components/Form/theme';

export default class FormModule extends React.Component{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Form',
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
    
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);

  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.wrapper}>
        <View>

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Formulario
          </Text>

          <GenerateForm
              style={styles.form}
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={fields}
              theme = {theme}
            />


            <Picker
              note
              mode="dropdown"
              style={{ width: 200 }}              
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>

          <Button onPress={this.onButton1Click} title={"Aceptar"} />

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({   
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
});

const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'picker',
    name: 'country',
    mode: 'dialog',
    label: 'Select Country',
    defaultValue: 'INDIA',
    options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
  },
];

