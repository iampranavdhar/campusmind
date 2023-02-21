import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: 20,
  },
  profileTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  profileTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
  },
  logOutIcon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F0E7E7",
    color: "#F24E1E",
    borderRadius: 10,
    overflow: "hidden",
  },
  userImage: {
    borderRadius: 1500 / 2,
    overflow: "hidden",
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 30,
  },
  userName: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
    textAlign: "center",
  },
  userBranch: {
    fontSize: 15,
    fontFamily: globals.normalText.fontFamily,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "98%",
    backgroundColor: "#E9E9E9",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  phoneIcon: {
    color: "#FFF",
    padding: 5,
    backgroundColor: "#9a51df",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  rollNumberIcon: {
    color: "#ef994b",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  userInfoTitle: {
    fontSize: 15,
    fontFamily: globals.titleText.fontFamily,
  },
  userInfoSubTitle: {
    marginLeft: 25,
    color: "#988F8F",
  },
  emptyDiv: {
    height: 250,
    width: "100%",
  },
});
