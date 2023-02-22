import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  feeStatus: {
    paddingHorizontal: 20,
  },
  feeStatusCard: {
    width: "100%",
    backgroundColor: "#F24E1E",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-around",
  },
  acadYear: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    color: "#fff",
  },
  cardHeading: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    color: "#fff",
  },
  feeCardText: {
    fontSize: 30,
    fontFamily: globals.titleText.fontFamily,
    color: "#fff",
  },
  feeStatusTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
  },
  tableTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableTopBarText: {
    fontSize: 14,
    fontFamily: globals.titleText.fontFamily,
  },
  tableRows: {
    maxHeight: "50%",
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
