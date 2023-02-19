import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "98%",
    backgroundColor: "#E9E9E9",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 3,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  optionCardTitle: {
    fontSize: 16,
    fontFamily: globals.normalText.fontFamily,
  },
  arrowIcon: {
    color: "#000000",
  },
});
