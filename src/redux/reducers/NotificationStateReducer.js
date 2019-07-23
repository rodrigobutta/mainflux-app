
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
      unid: $data.unid,
      data: $data
    }
  };

}

export function notificationDismissed($unid) {   
  return {
    type: DISMISSED,
    payload: {
      unid: $unid
    }
  };

}


export default function NotificationStateReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {

    case ARRIVED:
      {
        return {
          notifications: [ ...state.notifications, action.payload],          
        }
      }

    case DISMISSED:
      {
        return {
          notifications: state.notifications.filter(({ unid }) => unid !== action.payload.unid), 
        }
      }
  
    default:
      return state;
  }

}