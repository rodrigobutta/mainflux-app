import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import LoginView from './LoginView';

import * as AuthStateReducer from '../../redux/reducers/AuthStateReducer';

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      authStateActions: bindActionCreators(AuthStateReducer, dispatch)
    };
  }
)(LoginView);
