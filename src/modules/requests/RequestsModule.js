import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text
} from 'react-native';

// presentational components
import BeerPreviewCard from './components/BeerPreviewCard';

// app theme
import { colors } from './config/theme';

// axios service
import axiosService from './utils/lib/axiosService';

import CommonStyles from "../../utils/CommonStyles";
import MainMenuBurguer from "../../modules/menu/MainMenuBurguer";


// screen height and width
const { width, height } = Dimensions.get('window');

export default class RequestsModule extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Solicitudes',
      headerLeft: (
        <MainMenuBurguer navigation={navigation} badge={1}  />        
      ),
    };
  }; 
  

  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    error: null,
    enableScrollViewScroll: true,
  };

  componentDidMount() {
    this._fetchAllBeers();
  }

  _fetchAllBeers = () => {
    const { page } = this.state;
    const URL = `/beers?page=${page}&per_page=10`;

    axiosService
      .request({
        url: URL,
        method: 'GET'
      })
      .then(response => {
        this.setState((prevState, nextProps) => ({
          data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
          loading: false,
          loadingMore: false,
          refreshing: false
        }));
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this._fetchAllBeers();
      }
    );
  };

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        this._fetchAllBeers();
      }
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: colors.veryLightPink
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  onEnableScroll= (value: boolean) => {
    this.setState({
      enableScrollViewScroll: value,
    });
  };


  render() {

    return !this.state.loading ? (

      // <View>
         
      //   <ScrollView
      //      scrollEnabled={this.state.enableScrollViewScroll}
      //   >
              
     
        <ScrollView>

          <View>
        
            <FlatList

              onTouchStart={() => {
                this.onEnableScroll( false );
              }}
              onMomentumScrollEnd={() => {
                this.onEnableScroll( true );
              }}


              contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                width: '100%'
              }}
              numColumns={2}
              data={this.state.data}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginTop: 25,
                    width: '50%'
                  }}
                >
                  <BeerPreviewCard name={item.name} imageUrl={item.image_url} />
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              // ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
              onRefresh={this._handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this._handleLoadMore}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
            />



          </View>

        </ScrollView>
         
    //  </View>
      
      ) : (
        <View>
          <Text style={{ alignSelf: 'center' }}>Loading beers</Text>
          <ActivityIndicator />
        </View>
      );


  }
}
