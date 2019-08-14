import React from "react";
import { 
    View, 
    StatusBar, 
    Text, 
    Image ,
    AppState
} from "react-native";
import firebase from "react-native-firebase";
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from "react-native-fbsdk";
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';
import { ThemeProvider } from 'react-native-elements';

import LoginRouter from "./routes/LoginRouter";
import MainRouter from "./routes/MainRouter";

import {store, persistor} from './redux/store';
import { API_URL } from './config/enviroment';
import {setToken, setUser, resetToken, resetUser} from './redux/reducers/AuthStateReducer';

import {notificationArrived} from './redux/reducers/NotificationStateReducer';
import Pusher from 'pusher-js/react-native';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';


// PUSHER

// TODO solo DEBUG
Pusher.logToConsole = true;

var pusher = new Pusher('37f473229fafa68fdaa3', {
  cluster: 'us2',
  forceTLS: true,
  activityTimeout: 119999 // evitar warning  https://github.com/pusher/pusher-js/issues/239 y https://github.com/facebook/react-native/issues/12981
});

var channel = pusher.subscribe('app-notifications');

channel.bind('newNotification', function(data) {
  
 	console.log(data);

  store.dispatch(notificationArrived(data));

});

// FINPUSHER


// PUSHER FIREBASE (con BACKGROUND
// TODO Ver que hay registration en JAVA)
// https://github.com/b8ne/react-native-pusher-push-notifications
// PUSHER BEAMS

		// Initialize notifications
		export const init = () => {
				// Set your app key and register for push
				RNPusherPushNotifications.setInstanceId("952075ad-7c0f-4a00-bcd4-490c5313679e"); // esto viene de https://dash.pusher.com/beams/

				// Init interests after registration
				RNPusherPushNotifications.on('registered', () => {
						subscribe("hello");
				});

				// Setup notification listeners
				RNPusherPushNotifications.on('notification', handleNotification);
		};

		// Handle notifications received
		const handleNotification = notification => {
				
				console.log(notification);

				// iOS app specific handling
				if (Platform.OS === 'ios') {
				
						switch (notification.appState) {
								case 'inactive':
								// inactive: App came in foreground by clicking on notification.
								//           Use notification.userInfo for redirecting to specific view controller
								case 'background':
								// background: App is in background and notification is received.
								//             You can fetch required data here don't do anything with UI
								case 'active':
								// App is foreground and notification is received. Show a alert or something.


								default:
										break;
						}
				
				}
				else {
								console.log("android handled notification...");
				}


		};

		// Subscribe to an interest
		const subscribe = interest => {
				// Note that only Android devices will respond to success/error callbacks
				RNPusherPushNotifications.subscribe(
						interest,
						(statusCode, response) => {
								console.error(statusCode, response);
						},
						() => {
								console.log('Success');
						}
				);
		};

		// Unsubscribe from an interest
		const unsubscribe = interest => {
				RNPusherPushNotifications.unsubscribe(
						interest,
						(statusCode, response) => {
								console.log(statusCode, response);
						},
						() => {
								console.log('Success');
						}
				);
		};


// FIN PUSHER FIREBASE




class MainApp extends React.Component {  

  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      isLogin: null,
      isLoaded: false
    };

  

    StatusBar.setBarStyle("light-content", true); // Set Statusbar Light Content for iOS

    store.subscribe(() => { // When state will be updated when store changes      
      
      const state = store.getState(store);
      // console.log('state.auth: ', state.auth);

      
      const user = state.auth.user; 

      if(this._isMounted){
        
        if(user){
          this.setState({ isLogin: true });
        }
        else{
          this.setState({ isLogin: false });
        }

      }
      
  
    });

  }



  componentDidMount() {
    this._isMounted = true; 
    
    AppState.addEventListener("change", this._handleAppStateChange);

  }

  componentWillUnmount() {
    this._isMounted = false;

    AppState.addEventListener("change", this._handleAppStateChange);

  }


  // state can be active for foreground and inactive when transitioning between background and foreground
  _handleAppStateChange = (nextAppState) => {     
    if (nextAppState === 'background') {      
       console.log('App is in background!')     
    }
    else{
      console.log('App is in foreground!')     
    }
  }



  _coreAuth = (user) => {
    console.log('_coreAuth')

    let self = this;
        
    user.getIdToken().then(function(idToken) {  // <------ Check this line
      // console.log("app-js _coreAuth");
      // console.log(idToken)

      var data = {};
        data.token = idToken;
        data.uid = user.uid;
        data.email = user.email;
        data.emailVerified = user.emailVerified;
        data.name = user.displayName;
        data.phone = user.phoneNumber;
        data.photourl = user.photoURL;
        data.provider = user.providerData[0].providerId;
    
        // fuerzo el token a null porque si viene un token viejo por notrefrssh entonces el servicio me lo rechaza con "This token has an invalid issuer"
      let axiosConfig = {
        headers: {
            'authorization': '',
            "Access-Control-Allow-Origin": "*",
        }
      };

      axios
      .post(API_URL + '/auth/firebase/login', data, axiosConfig)
      .then(response => {
        // console.log(response);
          
        store.dispatch(setToken(response.data.access_token, response.data.expires_at));
        store.dispatch(setUser(response.data.user));

        // lo fuerzo para que pase de pantalla
        self.setState({ isLogin: true });

        return true;
      })
      .catch(error => {

        console.log(error)

        this._logout;

      });

    });

  };


  _logout = async () => {
    console.log('logout');

    await LoginManager.logOut();
    await GoogleSignin.signOut();
    firebase
      .auth()
      .signOut()
      .then();
  };


  componentWillMount() {

    this.loadAssets();

    GoogleSignin.configure();


    firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged', user)

      if (user) {
        if (global.fullNameTemp) { // *** parece que fuera solo si viene del registro sign up manual          
          user.updateProfile({
            displayName: global.fullNameTemp
          }).then(() => {
            global.fullNameTemp = null;            
            this._coreAuth(user);
          });
        } else {          
          this._coreAuth(user);
        }
      } else {
        store.dispatch(resetToken());
        store.dispatch(resetUser());
      }

    });


  }


  loadAssets = async () => {
    // await Font.loadAsync({
    //   fontawesome: require('./assets/fonts/fontawesome.ttf'),
    //   icomoon: require('./assets/fonts/icomoon.ttf'),
    //   'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    // });
    // this.setState({ isLoaded: true });

    // setTimeout(() => {

      this.setState({
        isLoaded: true
      });

    // }, 1000);

  };

  renderLoading = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/app_logo.png")}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );

  renderApp = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
            {this.state.isLogin ? <MainRouter /> : <LoginRouter />}          
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );

  render = () => (this.state.isLoaded && this.state.isLogin != null ? this.renderApp() : this.renderLoading());

}


export default MainApp;