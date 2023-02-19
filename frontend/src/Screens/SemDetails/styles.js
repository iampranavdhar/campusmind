import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  semDetails: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headingsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    // box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headingsText: {
    fontSize: 14,
    fontFamily: globals.titleText.fontFamily,
  },
  tableRows: {
    maxHeight: "70%",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
  },
  tableRowText: {
    fontSize: 14,
    fontFamily: globals.normalText.fontFamily,
  },
});
