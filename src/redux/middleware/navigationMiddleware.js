
import {
  createReactNavigationReduxMiddleware,  
} from 'react-navigation-redux-helpers';


export default navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);