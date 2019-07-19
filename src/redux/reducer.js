// import {
//   createReduxContainer,
//   createReactNavigationReduxMiddleware,
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';
// import { Provider, connect } from 'react-redux';

import { combineReducers } from 'redux'
import { persistReducer, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import AuthStateReducer from './reducers/AuthStateReducer';
import LocationStateReducer from './reducers/LocationStateReducer';
import RequestStateReducer from './reducers/RequestStateReducer';

// import {MainNavigation } from '../utils/MainReducer';

const persistConfig = {
  key: 'root',
  timeout: 0,
  storage,
  // whitelist: [
  //   'token','expires'
  // ]
  blacklist: ["ui", "router"]
}

// const navReducer = createNavigationReducer(MainNavigation);

const reducers = {
  // nav: navReducer,
  // session: SessionStateReducer,
  auth: persistReducer(persistConfig, AuthStateReducer),
  request: persistReducer(persistConfig, RequestStateReducer),
  location: persistReducer(persistConfig, LocationStateReducer),
};


// const reducers = {
//   auth: persistConfig, AuthStateReducer,
//   request: persistConfig, RequestStateReducer,
//   location: persistConfig, LocationStateReducer
// };

// const persistCombinedReducers = persistCombineReducers(persistConfig, reducers);
// export default persistCombinedReducers;

export default combineReducers(
  reducers
);