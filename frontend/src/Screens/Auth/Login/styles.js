import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  welcomeText: {
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
    width: 280,
    paddingLeft: 25,
    paddingTop: 20,
  },
  loginContainer: {
    flex: 1,
  },
  loginFields: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "relative",
  },
  loginTitle: {
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
    paddingBottom: 10,
  },
  inputField: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8d8d8d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginLeft: 10,
    fontFamily: globals.titleText.fontFamily,
    width: "90%",
    marginTop: 10,
    color: "#242424",
    paddingBottom: 10,
  },
  passwordResettext: {
    fontSize: 15,
    color: "#8d8d8d",
    fontFamily: globals.normalText.fontFamily,
  },
  loginButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#747dff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: globals.titleText.fontFamily,
  },
  registerText: {
    fontSize: 15,
    color: "#8d8d8d",
    fontFamily: globals.normalText.fontFamily,
    paddingTop: 10,
    alignSelf: "center",
  },
  appName: {
    paddingTop: 20,
    alignSelf: "center",
  },
  appNameText: {
    fontSize: 20,
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
  },
});
