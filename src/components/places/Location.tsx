import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  FlatList  
} from 'react-native';

import {
  Button,
  Overlay 
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionSheet from 'react-native-actionsheet';
import _ from 'lodash';
import UUIDGenerator from 'react-native-uuid-generator';

import CommonStyles from "../../utils/CommonStyles";
import * as LocationStateReducer from '../../redux/reducers/LocationStateReducer';
import { GooglePlacesAutocomplete } from '../../components/places/GooglePlacesAutocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class Location extends React.Component<any, any>{     
  constructor() {
    super();
    this.state = {     
      editModal: false,
      detailsModal: false,
      currentItemId: null,
      selectedItem: null,
      editedItem: null
    };
  }

  
  openEditModal = () => {    
    this.setState({ editModal: true })
  }

  exitEditModal = () => {  
    this.setState({ editModal: false })
  }

  openDetailsModal = (selectDirect = false) => {  

    const editedItem = this.props.location.byHash[this.state.currentItemId];

    this.setState(
      { 
        selectDirect: selectDirect,
        editedItem: editedItem,
        detailsModal: true
      },
      () => console.log('abro modal...')
    )

  }


  exitDetailsModal = () => {  

    this.setState({ 
      detailsModal: false ,
      editedItem: null
    })

  }
  
  
  saveLocationDetails = () => {
    console.log('saveLocationDetails')

    const {editedItem} = this.state;

    this.props.locationStateActions.updateLocation(editedItem.id, editedItem.content);

    this.exitDetailsModal();

    if(this.state.selectDirect){
        
      this.setState(
        { 
          selectDirect: false
        },
        () => this.selectItem(editedItem)
      )

    }

  }  


  detailsModalDoorChange = (value) => {  

    this.setState(prevState => ({
      editedItem: {
        ...prevState.editedItem,           // copy all other key-value pairs of editedItem object
        content: {                     // specific object of editedItem object
          ...prevState.editedItem.content,   // copy all pizza key-value pairs
          door: value
        }
      }
    }))
  
  }
  

  showItemActionSheet = (item) => {    

    this.setState(
      { 
        currentItemId: item.id
      },
      () => this.ActionSheet.show()
    )

  };


  selectItem = (item) => {    

    this.setState(
      { 
        selectedItem: item
      },
      () => this.exitEditModal()
    )
    
  };


  actionSheetItemOnPress = (index) => {    

    const {currentItemId} = this.state;

    switch (index) {
      case 0:
        this.props.locationStateActions.removeLocation(currentItemId);
        break;

      case 1:
        this.openDetailsModal();
        break;

      default:
        break;
    }

  };


  newAddressSelected = (place, geo, formattedName, details) => {    
    
    const item = {
      title: place.structured_formatting.main_text,
      subtitle: place.structured_formatting.secondary_text,
      address: place.description,
      place: {
        id: place.place_id ,
        formattedName: formattedName,
        ...details,
        ...geo
      }      
    }
    
    UUIDGenerator.getRandomUUID().then((uuid) => {

      this.props.locationStateActions.addLocation(uuid, item);

      this.setState(
        { 
          currentItemId: uuid
        },
        () => this.openDetailsModal(true)
      )

    });

  };


  _renderItem = ({item}) => (

    <TouchableOpacity
      accessibilityLabel={item.content.title}
      accessibilityRole="button"                        
      onPress={this.selectItem.bind(this, item)}
      onLongPress={this.showItemActionSheet.bind(this, item)}        
      delayLongPress={1000}
    >
      <View style={stylesList.row}>
        <View style={stylesList.row_cell_timeplace}>
          <Text style={stylesList.title}>{item.content.title}</Text>
          <Text style={stylesList.id}>{item.content.subtitle || ''}</Text>
        </View>
        <Icon size={32} name={'ios-arrow-forward'} />              
      </View>
    </TouchableOpacity>

  );


  render() {

    const {byHash} = this.props.location;
    const {editModal, detailsModal, editedItem, selectedItem} = this.state;
    // const editLocation = currentItemId ? this.props.location.byHash[currentItemId] : null;
    
    var optionArray = [
      'Eliminar',
      'Editar',
      'Cancelar'      
    ];

    return (  
      <View>
      
        {selectedItem ?
        <Button raised={false} type='outline' onPress={this.openEditModal} title={selectedItem.content.title} />
        :
        <Button raised={false} type='outline' onPress={this.openEditModal} title={"Seleccionar Dirección"} />
        }

        <Overlay isVisible={editModal}
            onBackdropPress={this.exitEditModal}         
        >

          <ScrollView 
                style={CommonStyles.scrollView} 
              >
           
              <FlatList
                  style={stylesList.container}
                  data={_.values(byHash)} 
                  renderItem={this._renderItem}
                  keyExtractor={(item) => item.id}                  
              />

              <View style={{ height: 30 }} />              

              <GooglePlacesAutocomplete                
                minLength={3} // minimum length of text to search                                
                returnKeyType={"search"}
                listViewDisplayed="false"                
                onPress={(place, geo, formattedName, details) => this.newAddressSelected(place, geo, formattedName, details)}                
                query={{
                  key: 'AIzaSyCwUBwK3A697kLrXT5FnFgbkCshtrpZTOo',
                  language: 'en', // language of the results
                  // types: 'geocode', // default: 'geocode' ---- (cities)
                }}
                styles={{              
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch                
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  // types: 'food',
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities                
              />

              <ActionSheet
                ref={o => (this.ActionSheet = o)}          
                title={'Agregar..'}          
                options={optionArray}          
                cancelButtonIndex={2}          
                // destructiveButtonIndex={1}
                onPress={this.actionSheetItemOnPress}
              />
              
              {/* <Button onPress={this.exitEditModal} title={"Cancelar"} /> */}

          </ScrollView>
        </Overlay>


        {editedItem && detailsModal &&
        <Overlay
          isVisible={detailsModal}
            // onBackdropPress={this.exitEditModal}            
        >
          <ScrollView style={CommonStyles.scrollView}>
            <View style={[styles.modalView]}>

              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                {editedItem.content.place.formattedName}
              </Text>

              <TextInput
                multiline={false}
                onChangeText={(value) => this.detailsModalDoorChange(value)}
                value={editedItem.content.door}
                style={[CommonStyles.textInput]}
              />

              <Button onPress={this.saveLocationDetails} title={"Aceptar"} />
              <View style={{ height: 30 }} />
              <Button onPress={this.exitDetailsModal} title={"Cancelar"} />

            </View>
          </ScrollView>
        </Overlay>
        }

        
      </View>
    );
  }

}


export default connect(
  state => ({
    auth: state.auth,
    location: state.location
  }),
  dispatch => {
    return {
      locationStateActions: bindActionCreators(LocationStateReducer, dispatch)      
    };
  }
)(Location);


const styles = StyleSheet.create({
  modalView: {    
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    backgroundColor: '#ffffff'
  }
});

const stylesList = StyleSheet.create({
  container: {
    marginTop: 14,
    alignSelf: "stretch",
  },
  row: {
    elevation: 1,
    borderRadius: 2,    
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    // marginLeft: 14,
    // marginRight: 14,
    marginTop: 0,
    marginBottom: 6,
  },
  row_cell_timeplace: {
    flex: 1,
    flexDirection: 'column',
  },
  row_cell_temp: {
    color: '#ffff00',
    paddingLeft: 16,
    flex: 0,
    fontSize: 16
  },
  id: {
    color: '#999999',
    textAlignVertical: 'bottom',
    includeFontPadding: false,
    flex: 0,
    fontSize: 12
  },
  title: {
    color: '#111111',
    textAlignVertical: 'top',
    includeFontPadding: false,
    flex: 0,
    fontSize: 16
  }
});