import React from 'react'
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,  
  TextInput,
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from "react-native"
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Overlay 
} from 'react-native-elements';

import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import CommonStyles from "../../utils/CommonStyles";
import * as NotificationStateReducer from '../../redux/reducers/NotificationStateReducer';


class Notifications extends React.Component<any, any>{     

  state = {
    active: false
  }
    
  _onBackdropClick = () => {

      this.setState({ active: false })

  };

  _dismissNotification = (item) => {    

    console.log(item)

    this.props.notificationStateActions.notificationDismissed(item.unid);
    
  };

  _renderNotification = ({item}) => (
    <TouchableOpacity
      accessibilityLabel={item.data.title}
      accessibilityRole="button"                        
      onPress={this._dismissNotification.bind(this, item)}      
      delayLongPress={1000}
    >
      <View style={stylesList.row}>
        <View style={stylesList.row_cell_timeplace}>
          <Text style={stylesList.title}>{item.data.text}</Text>
          <Text style={stylesList.id}>{item.unid || ''}</Text>
        </View>
        <Icon size={32} name={'ios-close'} />              
      </View>
    </TouchableOpacity>
  );


  render() {    
    const { active } = this.state;
    const { notifications } = this.props.notification;

    return (
      <View style={{paddingLeft:16}}>
        
        <Overlay
            isVisible={active}
            onBackdropPress={this._onBackdropClick}
          >
          <Text>Hello from Overlay!</Text>
        </Overlay>

        <ScrollView 
                style={CommonStyles.scrollView} 
              >
           
              <FlatList
                  style={stylesList.container}
                  data={notifications} 
                  renderItem={this._renderNotification}
                  keyExtractor={(item) => item.unid}                  
              />

            

          </ScrollView>

      </View>
    );
  }
}



export default connect(
  state => ({
    notification: state.notification
  }),
  dispatch => {
    return {
      notificationStateActions: bindActionCreators(NotificationStateReducer, dispatch)      
    };
  }
)(Notifications);


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