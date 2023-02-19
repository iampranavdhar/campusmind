import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  assignments: {
    width: "100%",
    height: "100%",
  },
  topBarOptionsCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 100,
  },
  option: {
    marginRight: 10,
    fontFamily: globals.titleText.fontFamily,
    color: "#988F8F",
  },
  assignmentCard: {
    width: "90%",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  assignmentCardCode: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  assignmentCardCode: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  assignmentCardCodeText: {
    fontFamily: globals.normalText.fontFamily,
    color: "#fff",
  },
  assignmentCardBodyText: {
    fontFamily: globals.normalText.fontFamily,
    fontSize: 15,
    color: "#000",
    marginLeft: 10,
  },
  selectedOption: {
    color: "#747dff",
    fontFamily: globals.titleText.fontFamily,
  },
});
