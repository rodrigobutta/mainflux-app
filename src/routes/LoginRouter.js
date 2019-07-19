import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import EmailLogin from "../modules/auth/EmailLogin";
import PhoneLogin from "../modules/auth/PhoneLogin";
import FBLogin from "../modules/auth/FBLogin";
import GoogleLogin from "../modules/auth/GoogleLogin";
import AnonymousLogin from "../modules/auth/AnonymousLogin";

const LoginRouter = createAppContainer(
  createBottomTabNavigator(
    {
      EmailLogin: EmailLogin,
      PhoneLogin:PhoneLogin,
      FBLogin:FBLogin,
      GoogleLogin:GoogleLogin,
      AnonymousLogin:AnonymousLogin
    },
    {
      tabBarOptions: {
        activeBackgroundColor: "#ddd",
        inactiveBackgroundColor: "#fff"
      }
    }
  )
);

export default LoginRouter;
