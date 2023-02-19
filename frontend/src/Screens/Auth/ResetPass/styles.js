import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
    width: 280,
    paddingLeft: 25,
    paddingTop: 20,
  },
  inputFields: {
    width: "100%",
    height: "100%",
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
  inputField: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8d8d8d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: globals.titleText.fontFamily,
    width: "90%",
    marginTop: 5,
  },
  submitButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#747dff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: globals.titleText.fontFamily,
  },
  appName: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  appNameText: {
    fontSize: 20,
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
  },
});
