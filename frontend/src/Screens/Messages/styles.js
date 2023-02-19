import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  messages: {
    paddingHorizontal: 20,
  },
  messagesTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  messagestopBarTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
    color: "#000",
  },
  addUser: {
    color: "#F24E1E",
    padding: 10,
    backgroundColor: "#F0E7E7",
    borderRadius: 10,
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#e9e9e9",
    borderColor: "#8d8d8d",
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },
  searchResults: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  searchResultChatCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#000",
  },
  searchChatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchChatImage: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
  },
  searchChatCardInfo: {
    marginLeft: 10,
    flex: 1,
  },
  searchChatCardUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchChatCardUsername: {
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
