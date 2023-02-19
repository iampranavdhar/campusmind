import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  sectionCard: {
    width: "48%",
    height: 100,
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 20,
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  sectionCardText: {
    fontFamily: globals.titleText.fontFamily,
    color: "#988F8F",
    fontSize: 30,
  },

  sections: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
