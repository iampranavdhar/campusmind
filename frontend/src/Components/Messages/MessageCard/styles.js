import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  messageCard: {
    maxWidth: "70%",
    minWidth: "20%",
    alignItems: "baseline",
    flexBasis: "auto",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 15,
    paddingBottom: 10,
    fontFamily: globals.normalText.fontFamily,
    color: "#000000",
  },
  messageTime: {
    fontSize: 9,
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  messageViewIcon: {
    color: "#7E7373",
    fontSize: 12,
  },
});
