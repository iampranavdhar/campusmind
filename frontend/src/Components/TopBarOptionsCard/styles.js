import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  topBarOptionsCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 20,
    position: "absolute",
    top: -20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  options:{
    flexDirection: "row",
    justifyContent: "space-around",
  },
  option:{
      marginRight: 10,
      fontFamily: globals.titleText.fontFamily,
      color: "#988F8F",
  }
});
