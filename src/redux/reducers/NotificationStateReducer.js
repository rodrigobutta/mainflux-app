
const INITIAL_STATE = {  
  notifications: []
};

// Actions
const ARRIVED = 'NotificationState/ARRIVED';
const DISMISSED = 'NotificationState/DISMISSED';


export function notificationArrived($data) {   
  return {
    type: ARRIVED,
    payload: {
      uuid: "123123123",
      data: $data
    }
  };

}


export function notificationDismissed($data) {   
  return {
    type: DISMISSED,
    payload: {
      uuid: "123123123"
    }
  };

}


export default function NotificationStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    

    // case ARRIVED:
    //   return { ...state, 
    //     notifications: action.payload.data
    //   };

    case ARRIVED:
      {
        return {
          notifications: [ ...state.notifications, action.payload],          
        }
      }

    // case DISMISSED:
    //   {

    //     const prunedIds = state.byId.filter(item => {
    //       return item !== action.id // return all the items not matching the action.id
    //     })
    //     delete state.byHash[action.id] // delete the hash associated with the action.id
        
    //     return {
    //       byId: prunedIds,
    //       byHash: state.byHash
    //     }
    //   }
  
    default:
      return state;
  }

}