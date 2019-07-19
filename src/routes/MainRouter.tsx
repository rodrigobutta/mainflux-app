import React from "react";
import {  
  Text,  
  ScrollView, 
  StatusBar
} from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  SafeAreaView,
} from 'react-navigation';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { fromLeft, fromRight, zoomIn, zoomOut } from 'react-navigation-transitions';

import MainMenuContents from "../modules/menu/MainMenu";
import HomeModule from "../modules/home/Home";
import ProfileModule from "../modules/profile/Profile";
import EditProfileModule from "../modules/profile/Edit";
import AgendaModule from '../modules/agenda/agenda';
import RequestInitModule from "../modules/request/InitModule";
import RequestFormModule from "../modules/request/FormModule";
import RequestViewModule from "../modules/request/ViewModule";
import RequestsModule from "../modules/requests/RequestsModule";


const SubScreenWrapper = ({
  navigation,
  banner,
}: {
  navigation: NavigationScreenProp<NavigationState>;
  banner: string;
}) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' }}>      
      <Button onPress={() => navigation.openDrawer()} title="Menú" />
      <Button onPress={() => navigation.navigate('Dashboard2')} title="Directo Dashboard 2" />
      <Button onPress={() => navigation.navigate('Index')} title="Volver" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);




const Dashboard2Screen = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationState>;
}) => <SubScreenWrapper banner={'Dashboard 2 Screen'} navigation={navigation} />;


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
    Dashboard2: { screen: Dashboard2Screen },
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