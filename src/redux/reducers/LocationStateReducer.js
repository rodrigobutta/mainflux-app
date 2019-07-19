import UUIDGenerator from 'react-native-uuid-generator';


const INITIAL_STATE = {  
  // byId: ['1', '2', '3'],
  // byHash: {
  //   '1': {id: '1', content: {title: 'item 1'}},
  //   '2': {id: '2', content: {title: 'item 2'}},
  //   '3': {id: '3', content: {title: 'item 3'}}
  // }
  byId: [],
  byHash: {}
};

// Actions
const ADD_LOCATION = 'LocationState/ADD_LOCATION';
const REMOVE_LOCATION = 'LocationState/REMOVE_LOCATION';
const UPDATE_LOCATION = 'LocationState/UPDATE_LOCATION';


// import axios from 'axios';
// import { API_URL } from '../../config/enviroment';


// Action creators

// export function addLocation(item) { 

//   return (dispatch, getState) => {

//     UUIDGenerator.getRandomUUID().then((uuid) => {
//       console.log(uuid);
      
//       dispatch({
//         type: ADD_LOCATION,
//         id: uuid,
//         payload: {
//           id: uuid,
//           content: item
//         }
//       });

//       Promise.resolve()

//     });

//   }

// }

export function addLocation(uuid, item) {
  return {
    type: ADD_LOCATION,
    id: uuid,
    payload: {
      id: uuid,
      content: item
    }
  };
}

export function removeLocation($id) {
  return {
    type: REMOVE_LOCATION,
    id: $id
  };
}

export function updateLocation($id,item) {
  
  return {
    type: UPDATE_LOCATION,
    id: $id,
    payload: {
      content: item
    }
  };
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



export default function LocationStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    case ADD_LOCATION:
      {
        return {
          byId: [ ...state.byId, action.id],
          byHash: {
            ...state.byHash,
            [action.id]: action.payload
          }
        }
      }

    case REMOVE_LOCATION:
      {

        // const { [action.id]: deletedValue, …newState_byHash } = state.byHash;
        // return { 
        //    byId: state.byId.filter(item => item !== action.id),      
        //    byHash: newState_byHash
        // }

        

        const prunedIds = state.byId.filter(item => {
          return item !== action.id // return all the items not matching the action.id
        })
        delete state.byHash[action.id] // delete the hash associated with the action.id
        
        return {
          byId: prunedIds,
          byHash: state.byHash
        }
      }

    case UPDATE_LOCATION:         
      {
        state.byHash[action.id] = {
          ...state.byHash[action.id],
          ...action.payload
        }
        return {
          ...state
        }
      }  
        
    default:
      return state;
  }


}



