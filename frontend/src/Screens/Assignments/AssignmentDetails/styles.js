import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  assignmentDetails: {
    paddingHorizontal: 20,
  },
  assignmentTitleDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  assignmentTitle: {
    fontSize: 15,
    fontFamily: globals.titleText.fontFamily,
  },
  assignmentSubjectCode: {
    fontSize: 15,
    fontFamily: globals.titleText.fontFamily,
    marginBottom: 10,
  },
  assignmentDescription: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    marginBottom: 25,
  },
  assignmentDues: {
    fontSize: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: globals.normalText.fontFamily,
    marginBottom: 25,
    marginTop: 5,
  },
  assignmentDueDate: {
    fontFamily: globals.normalText.fontFamily,
  },
  assignmentDueTime: {
    fontFamily: globals.normalText.fontFamily,
  },
  submissionDetailsText: {
    fontFamily: globals.titleText.fontFamily,
  },
  submissionDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 25,
  },
  uploadButton: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#0dc90a",
    borderRadius: 5,
    alignSelf: "center",
    marginRight: "auto",
    flexDirection: "row",
  },
  uploadButtonText: {
    color: "#0dc90a",
    fontFamily: globals.titleText.fontFamily,
    letterSpacing: 1,
    marginTop: 2,
  },
  submitButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0dc90a",
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontFamily: globals.titleText.fontFamily,
    letterSpacing: 1,
    marginTop: 2,
  },
});
