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
              formData = {{
                user_name: 'Rodri',
                password: 'rrrr'
              }}
            />

          <Button onPress={this.onButton1Click} title={"Aceptar"} />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({   
  wrapper: {
    flex: 1,
    marginTop: 0,
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
  {
    type: 'switch',
    name: 'tyc',        
    label: 'Checcckbox',
  },  
  {
    type: 'select',
    name: 'project',
    label: 'Proyecto',
    objectType: true,
    labelKey: 'name', // For Below example
    primaryKey: 'id',  // For Below example
    options: [
      {
        id: 1,
        name: 'CAR',
      },
      {
        id: 2,
        name: 'BIKE',
      },
      {
        id: 3,
        name: 'BICYCLE',
      },
    ]
  },
  {
    type: 'date',
    name: 'fecha',        
    label: 'Fecha',
    mode: 'date'
  },  
];

