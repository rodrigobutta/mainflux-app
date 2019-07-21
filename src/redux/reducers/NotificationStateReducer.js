
const INITIAL_STATE = {  
  notifications: []
};

// Actions
const ARRIVED = 'NotificationState/ARRIVED';


export function notificationArrived($data) {   
  return {
    type: ARRIVED,
    payload: {
      data: $data
    }
  };

}


export default function NotificationStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    

    case ARRIVED:
      return { ...state, 
        notifications: action.payload.data
      };
  
    default:
      return state;
  }

}