import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,  
  SafeAreaView,
  TouchableHighlight,
  Button
} from "react-native";
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {store, persistor} from '../../redux/store';
import { API_URL } from '../../config/enviroment';
// import {setCategory, setCategories} from '../../redux/reducers/RequestStateReducer';
import * as RequestStateActions from '../../redux/reducers/RequestStateReducer';


import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/menu/MainMenuBurguer";
// import { navigationOption/utils/CommonStyles";
import Autocomplete from '../../components/autocomplete/Autocomplete';
import { SectionGrid } from 'react-native-super-grid';

import { notificationsInit, notificationsSubscribe, notificationsUnsubscribe } from "../../utils/Notifications";

class Home extends React.Component<any, any>{    
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Inicio',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />                
      )      
    };
  };

  constructor(props) {
    super(props);
    
    this.state = {
      categories: [],
      suggested: [],
      query: ''
    };

  }

  renderListItem (item) {
    return (
        <TouchableHighlight underlayColor="#fbd42c" key={`searchlist${item.id}`}>
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>{ item.name }</Text>
            </View>
        </TouchableHighlight>
    )
  }

  onCategoryClick = (item) => {
    console.log(item)

    this.props.requestStateActions.setCategory(item);

    this.props.navigation.navigate('RequestFormModule');

  }


  
  onTestClick = () => {
    console.log('test click')

    notificationsInit();

  }


  onTest2Click = () => {
    console.log('test2 click')

    notificationsSubscribe("test");

  }

  onTest3Click = () => {
    console.log('test3 click')

    notificationsUnsubscribe("hello");

  }


  componentDidMount() {


    // TODO hacer algun request con refresh needs

    var data = {};
        data.parentId = 1;

    axios
    .post(API_URL + '/folder/list', data)
    .then(response => {
      
      console.log(response.data.data);
              
      this.props.requestStateActions.setCategories(response.data.data);
      
      return true;
    })
    .catch(error => {

      console.log(error)

      this._logout;

    });




    const { categories } = this.props.request;

    console.log(categories);

    const suggested = [
      {
        title: 'Casa',
        data: categories.slice(0, 6),
      },
      {
        title: 'Autos y Motos',
        data: categories.slice(6, 12),
      },
      {
        title: 'Oficina',
        data: categories.slice(12, 20),
      }
    ];
    this.setState({ suggested });

  }


  render() {
    // const { currentUser } = firebase.auth();
    const { user } = this.props.auth;

    

    const { suggested } = this.state;

    const { categories } = this.props.request;

    return (
      <SafeAreaView style={CommonStyles.safeAreaContainer}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

          <View style={{ height: 30 }} />
          
          <Image
            source={require("../../../assets/app_logo.png")}
            style={{ height: 100, width: 100, marginBottom: 10 }}
          />

          {user&&
          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            Hola {user.name}!
          </Text>
          }

          <View style={{ height: 30 }} />


          <Button onPress={this.onTestClick} title={"Init"} />
          <Button onPress={this.onTest2Click} title={"Suscribe"} />
          <Button onPress={this.onTest3Click} title={"UnSuscribe"} />
          
          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            ¿Qué estás necesitando?
          </Text>
            
          <Autocomplete
              list={categories}
              renderListItem={(item) => this.renderListItem(item)}
              startSuggestingFrom={2}
              inputStyle={styles.searchInput}
              suggestBoxStyle={styles.suggestBox}
              suggestBoxMaxHeight={220}
              placeholder="plomero, destapar baño, .."
          />

          <View style={{ height: 30 }} />
          
          <SectionGrid
            itemDimension={150}
            // staticDimension={300}
            // fixed
            // spacing={20}
            sections={suggested}
            style={styles.gridView}
            renderItem={({ item, section, index }) => (

              <TouchableOpacity
                accessibilityLabel={item.name}
                accessibilityRole="button"                
                key={index}                
                onPress={this.onCategoryClick.bind(this, item)}
              >
                <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.color}</Text>
                </View>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
          />

        </View>
      </SafeAreaView>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//     request: state.request
//   };
// };
// export default connect(mapStateToProps)(Home);



export default connect(
  state => ({
    auth: state.auth,
    request: state.request
  }),
  dispatch => {
    return {      
      requestStateActions: bindActionCreators(RequestStateActions, dispatch)
    };
  }
)(Home);




const styles = StyleSheet.create({
  normalText: {
    fontSize: 15,
    marginBottom: 5
  },
  container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      padding: 15
  },
  searchInput: {
      height: 50,
      borderColor: '#f2f2f2',
      borderWidth: 1,
      paddingLeft: 10,
      backgroundColor: '#fff'
  },
  suggestBox: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 220,
},
  listItem: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      height: 55,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#e5e5e5',
  },
  listItemText: {
      fontSize: 20
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#cccccc',
    color: 'white',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 14
  },
})