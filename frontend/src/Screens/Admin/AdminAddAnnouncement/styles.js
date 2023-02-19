import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  adminAddAnnouncement: {
    paddingHorizontal: 20,
    position: "relative",
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  pickerContainer: {
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lableText: {
    fontFamily: globals.titleText.fontFamily,
    fontSize: 18,
    color: "#000",
    marginRight: 10,
    marginTop: 10,
  },
  announcementDetails: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionInput: {
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8d8d8d",
    height: 150,
  },
  descriptionTextInput: {
    fontFamily: globals.normalText.fontFamily,
    color: "#000",
    height: 150,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  bottomButtons: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#00CA4E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: globals.titleText.fontFamily,
    fontSize: 22,
    color: "#fff",
  },
});