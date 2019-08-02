import React from "react";
import {  
  StyleSheet,  
  SafeAreaView,
  Button,
  Alert,
  View,
  Text,  
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/layout/MainMenuBurguer";

import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import markerIcon from '../../../assets/marker.png';

// no se usa porque se pone el key8 en el Manifest meta
import { GOOGLE_API_KEY } from '../../config/enviroment';

import GoogleMapStyle from './mapStyle.json';


const { width, height } = Dimensions.get('window');

let ASPECT_RATIO = width / height;
let LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


export default class MapModule extends React.Component{     
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'map',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  };

  state = {
    region: {
      latitude: -34.6027551,
      longitude: -58.4332646,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    markers: [],
  };


  constructor(props) {
    super(props);

    this.onMapPress = this.onMapPress.bind(this);
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

  
  onMapPress(e) {

    console.log(e.nativeEvent.coordinate)


    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
          description: 'descccccccc',
          title: 'nombre del marker'
        },
      ],
    });


  }



  render() {
    const { navigation } = this.props;

    return (
      
      <View style={styles.container}>

          {/* <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Mapa
          </Text> */}
         
          {/* <Button onPress={this.onButton1Click} title={"Boton1"} /> */}

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.region}
            onPress={this.onMapPress}
            customMapStyle={GoogleMapStyle}
          >
            {this.state.markers.map(marker => (
              <Marker
                title={marker.title}
                image={markerIcon}
                key={marker.key}
                description={marker.description}
                coordinate={marker.coordinate}
              />
            ))}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ markers: [] })}
              style={styles.bubble}
            >
              <Text>Borrar marcadores</Text>
            </TouchableOpacity>
          </View>

          
        </View>
       
    );
  }
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});