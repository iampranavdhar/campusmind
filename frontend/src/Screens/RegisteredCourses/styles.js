import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  registeredCourses: {
    paddingHorizontal: 20,
  },
  semTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
    marginVertical: 10,
  },
  courseCard: {
    height: 180,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "#1d3557",
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseCodeText: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  courseTitleText: {
    fontSize: 18,
    fontFamily: globals.titleText.fontFamily,
    color: "#fff",
    marginTop: 5,
  },
  courseInstructorText: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    color: "#fff",
  },
});
