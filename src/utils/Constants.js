var { EventEmitter } = require("fbemitter");

module.exports = {
  alertTitle: "Mainflux",  
  emitter: new EventEmitter(),
  logoutListener: "logoutListener",
  colors: {
    themeBGColor: "#ffffff",
    buttonBGColor: "#ccc",
    borderColor: "#999",
    textColor: "#111"
  },
  keyLoginNav: {
    keyStack: "Stack",
    keySignUp: "SignUp"
  },
  /// Common Functions
  debugLog: log => {
    console.log("\n====================>");
    console.log(log);  
  }
};
