import { StyleSheet } from "react-native";
import Constants from "./Constants";

const CommonStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Constants.colors.themeBGColor,
  },
  page: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollView: {    
    width: "100%"
  },
  textInput: {
    marginTop: 20,
    width: "90%",
    height: 40,
    borderColor: Constants.colors.borderColor,
    borderWidth: 2,
    borderRadius: 3,
    paddingLeft: 10,
    color:Constants.colors.textColor,
    fontSize:16
  },
  field: {
    marginBottom: 20,
    width: "90%"    
  },
  textArea: {
    marginTop: 20,
    width: "90%",    
    borderColor: Constants.colors.borderColor,
    borderWidth: 2,
    borderRadius: 3,
    paddingLeft: 10,
    color:Constants.colors.textColor,
    fontSize:16
  },
  area: {
    marginTop: 20,
    width: "90%",
    borderColor: Constants.colors.borderColor,
    borderWidth: 2,
    borderRadius: 3,            
  },
  icon: {
    width: 24,
    height: 24
  },
  menuBar: {
    backgroundColor: Constants.colors.themeBGColor,
    height: 50,
    justifyContent: "center"
  },
  menuButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },
  themeButton: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.colors.buttonBGColor,
    borderColor: Constants.colors.borderColor,
    borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constants.colors.textColor
  },
  spinnerTextStyle: {
    color: "#555"
  }
});

export default CommonStyles;