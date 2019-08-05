import React from "react";
import {  
  StyleSheet,  
  SafeAreaView,
  Button,  
  View,
  Text
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/layout/MainMenuBurguer";

import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export default class DocumentModule extends React.Component{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Documento',
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


  getLocalPath (url) {
    const filename = url.split('/').pop();
    // feel free to change main path according to your requirements
    return `${RNFS.DocumentDirectoryPath}/${filename}`;
  }

  onButton1Click = () => {
    console.log('doc click')

    const url = 'https://www.adobe.com/content/dam/Adobe/en/devnet/pdf/pdfs/PDF32000_2008.pdf';
    const localFile = this.getLocalPath(url);

    const options = {
      fromUrl: url,
      toFile: localFile
    };
    RNFS.downloadFile(options).promise
    .then(() => FileViewer.open(localFile))
    .then(() => {
      // success
    })
    .catch(error => {
      // error
    });
    
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Documento
          </Text>

          <Button onPress={this.onButton1Click} title={"Abrir Documento"} />
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
