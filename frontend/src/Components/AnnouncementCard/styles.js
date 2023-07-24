import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  announcementCard: {
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "90%",
    minHeight: 80,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 10,
  },
  announcementCategory: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  announcementText: {
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
  },
  announcementTime: {
    fontSize: 12,
    fontFamily: globals.titleText.fontFamily,
    color: "#988F8F",
  },
});
