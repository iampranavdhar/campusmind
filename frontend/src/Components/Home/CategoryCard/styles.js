import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  categoryCard: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    marginBottom: 10,
    flexBasis: "49%",
  },
  categoryName: {
    fontSize: 14,
    fontFamily: globals.normalText.fontFamily,
    color: "#000",
    marginTop: 10,
  },
});
