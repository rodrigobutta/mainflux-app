
const INITIAL_STATE = {
  token: null,
  expires: null,
  user: null
};

// Actions
const SET_TOKEN = 'AuthState/SET_TOKEN';
const RESET_TOKEN = 'AuthState/RESET_TOKEN';
const SET_USER = 'AuthState/SET_USER';
const RESET_USER = 'AuthState/RESET_USER';


// import axios from 'axios';
// import { API_URL } from '../../config/enviroment';


// Action creators

export function setToken($token,$expires) { 
  
  // savePersistedToken($token);

  return {
    type: SET_TOKEN,
    payload: {
        token: $token,
        expires: $expires
    }
  };

}

export function resetToken() {
  return {type: RESET_TOKEN};
}

export function setUser($info) {
  
  return {
    type: SET_USER,
    payload: {
        info: $info        
    }
  };
}

export function resetUser() {
  return {type: RESET_USER};
}


// export function getUserInfo(someValue) {
//   return (dispatch, getState) => {
//       dispatch({type : "REQUEST_STARTED"});

//     axios
//     .get(API_URL + '/auth/user')    
//     .then(
//       response => dispatch({type : "REQUEST_SUCCEEDED", payload : response})
//     )
//     .catch(
//       error => dispatch({type : "REQUEST_FAILED", error : error})
//     )

//   };
// }



export default function AuthStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    case SET_TOKEN:
      return { ...state, 
              token: action.payload.token,
              expires: action.payload.expires
            };

    case RESET_TOKEN:
      return INITIAL_STATE;

    case SET_USER:         
      return { ...state, 
        user: action.payload.info      
      };

    case RESET_USER:
      return INITIAL_STATE;

        
    default:
      return state;
  }
}



