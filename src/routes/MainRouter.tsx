import React from "react";
import {  
  Text,  
  ScrollView, 
  StatusBar,
  Button
} from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  SafeAreaView,
} from 'react-navigation';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { fromLeft, fromRight, zoomIn, zoomOut } from 'react-navigation-transitions';

import MainMenuContents from "../modules/layout/MainMenu";
import HomeModule from "../modules/home/Home";
import ProfileModule from "../modules/profile/Profile";
import EditProfileModule from "../modules/profile/Edit";
import AgendaModule from '../modules/agenda/agenda';
import RequestInitModule from "../modules/request/InitModule";
import RequestFormModule from "../modules/request/FormModule";
import RequestViewModule from "../modules/request/ViewModule";
import RequestsModule from "../modules/requests/RequestsModule";

import GeoModule from "../modules/test/GeolocationModule";
import FileModule from "../modules/test/FileModule";
import FormModule from "../modules/test/FormModule";
import CacheModule from "../modules/test/CacheModule";




// TESTS

const TestWrapper = ({
  navigation,
  banner,
}: {
  navigation: NavigationScreenProp<NavigationState>;
  banner: string;
}) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' }}>      
      <Button onPress={() => navigation.openDrawer()} title="Menú" />      
      <Button onPress={() => navigation.navigate('GeoModule')} title="Geo" />
      <Button onPress={() => navigation.navigate('FileModule')} title="File" />      
      <Button onPress={() => navigation.navigate('FormModule')} title="Form" />      
      <Button onPress={() => navigation.navigate('CacheModule')} title="Cache" />      
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const TestScreen = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationState>;
}) => <TestWrapper banner={'Tests Screen'} navigation={navigation} />;

// FIN TESTS




const ProfileStack = createStackNavigator(
  {
    Profile: { screen: ProfileModule },
    EditProfile: { screen: EditProfileModule }    
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Text>XX</Text>
      ),
      drawerLabel: 'tu Perfil',
    },
  }
);


const DashboardStack = createStackNavigator(
  {
    HomeModule: { screen: HomeModule },
    TestScreen: { screen: TestScreen },
    GeoModule: { screen: GeoModule } ,
    FileModule: { screen: FileModule }    ,
    FormModule: { screen: FormModule },
    CacheModule: { screen: CacheModule }
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Text>XX</Text>
      ),
      drawerLabel: 'Dashboard'
    },
  }
);


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'RequestInitModule'
    && nextScene.route.routeName === 'RequestFormModule') {
    return zoomIn();
  } else if (prevScene
    && prevScene.route.routeName === 'RequestFormModule'
    && nextScene.route.routeName === 'RequestInitModule') {
    return zoomOut();
  } else if (
    // prevScene
    // && prevScene.route.routeName === 'Dashboard'
    // && 
    nextScene.route.routeName === 'RequestInitModule') {
    return zoomIn();
  }

  return fromRight();

}



const RequestStack = createStackNavigator(
  {
    // HomeModule: { screen: HomeModule },
    RequestInitModule: { screen: RequestInitModule },
    RequestViewModule: { screen: RequestViewModule },
    RequestFormModule: { screen: RequestFormModule },
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Text>XX</Text>
      ),
      drawerLabel: 'Pedidoddd'
    },
    transitionConfig: (nav) => handleCustomTransition(nav)
  }
);




const RequestsStack = createStackNavigator(
  {
    RequestsModule: { screen: RequestsModule }    
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Text>XX</Text>
      ),
      drawerLabel: 'Lista de pedidos'
    },
    transitionConfig: (nav) => handleCustomTransition(nav)
  }
);


// export const navigationOptionsHeader=({navigation})=>{
  
//   return {    
//     headerRight: (
//       <Button
//         onPress={() => navigation.toggleDrawer()}
//         title="Info"
//         color="#222"
//       />
//     )
//   };

// }


export const MainNavigation = createDrawerNavigator(
  {
    Dashboard: {
      path: '/dashboard',
      screen: DashboardStack,
      // screen: HomeModule,
    },
    Tests: {
      path: '/tests',
      screen: TestScreen,
    },
    Profile: {
      path: '/profile',
      screen: ProfileStack,
    },
    Request: {
      path: '/request',
      screen: RequestStack,
    },    
    Agenda: {
      path: '/agenda',
      screen: AgendaModule,
    },
    Requests: {
      path: '/requests',
      screen: RequestsStack,
    },    
  },

  {
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    initialRouteName: 'Dashboard',
    drawerPosition: 'left',
    contentComponent: MainMenuContents,
    // navigationOptions: {     
    //   headerLayoutPreset: 'center'
    // },
    // defaultNavigationOptions: {
    //   headerTitleStyle: { alignSelf: 'center' },
    // },
    // navigationOptions: navigationOptionsHeader
  }
);



export default MainRouter = createAppContainer(MainNavigation);