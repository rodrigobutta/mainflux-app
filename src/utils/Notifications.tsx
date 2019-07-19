// Import module
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';



// PUSHER FIREBASE

// Initialize notifications
export const notificationsInit = () => {
    console.log('notifications init')


    // Set your app key and register for push
    RNPusherPushNotifications.setInstanceId("063823b2-17a8-4234-8ba8-92cd22f58b40");

    // Init interests after registration
    // RNPusherPushNotifications.on('registered', () => {
    //     notificationsSubscribe("hello");
    // });

    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);
};
  

// Handle notifications received
const handleNotification = notification => {
    
    console.log(notification);
  
    // iOS app specific handling
    if (Platform.OS === 'ios') {
    
      switch (notification.appState) {
        case 'inactive':
        // inactive: App came in foreground by clicking on notification.
        //           Use notification.userInfo for redirecting to specific view controller
        case 'background':
        // background: App is in background and notification is received.
        //             You can fetch required data here don't do anything with UI
        case 'active':
        // App is foreground and notification is received. Show a alert or something.
  
  
        default:
          break;
      }
    
    }
    else {
        console.log("android handled notification...");
    }
  
  
};
  


// Subscribe to an interest
export const notificationsSubscribe = interest => {
    console.log('notifications subscribe')
    console.log('interest ', interest)

    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.subscribe(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
};
  


// Unsubscribe from an interest
export const notificationsUnsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
      interest,
      (statusCode, response) => {
        console.log(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
};
  
  