import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topBarImage: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
  },
  topBarUserInfo: {
    marginLeft: 10,
  },
  topBarUserInfoName: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
  },
  topBarUserInfoRollNumber: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
    color: "#7E7373",
  },
  chatroomBottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginTop: "auto",
  },
  bottomButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
