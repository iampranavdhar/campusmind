import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
  },
  chatCardInfo: {
    marginLeft: 10,
    flex: 1,
  },
  chatCardUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatCardUsername: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
  },
  chatCardLastMessageTime: {
    fontSize: 12,
    fontFamily: globals.normalText.fontFamily,
    color: "#7E7373",
  },
  chatCardLastMessageDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatCardLastMessage: {
    fontSize: 14,
    fontFamily: globals.normalText.fontFamily,
    color: "#7E7373",
  },
  messageViewIcon: {
    color: "#7E7373",
    fontSize: 18,
  },
});
