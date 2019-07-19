
import {applyMiddleware, createStore, compose} from 'redux';
import { persistStore } from 'redux-persist'
import middleware from './middleware';
import rootReducer from './reducer';


const enhancers = [
  applyMiddleware(...middleware),
  // reduxLoop.install()
];


/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (
	__DEV__ &&
	typeof (window) !== 'undefined' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	) || compose;
/* eslint-enable no-undef */
const enhancer = composeEnhancers(...enhancers);

const initialState = {}  


export const store = createStore(
  rootReducer,
  initialState,
  enhancer
);


// export const persistor = persistStore(store).purge();

export const persistor = persistStore(store);
