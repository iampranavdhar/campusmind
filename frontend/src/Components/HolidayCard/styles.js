import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  holidayCard: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  holidayText: {
    fontSize: 17,
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
  },
  holidayQuoteText: {
    fontSize: 14,
    fontFamily: globals.normalText.fontFamily,
    color: "#000",
  },
  holidayImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
