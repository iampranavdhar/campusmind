import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  // Event Card
  deleleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 500,
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  shareIcon: {
    position: "absolute",
    top: 200,
    right: 5,
    zIndex: 500,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  eventCard: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  eventImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventData: {
    padding: 10,
    width: "100%",
  },
  eventTitle: {
    fontSize: 16,
    width: "80%",
    fontFamily: globals.titleText.fontFamily,
    color: "#242424",
  },
  registerButton: {
    backgroundColor: "#232323",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // Events Page
  events: {
    flex: 1,
    flexDirection: "column",
  },
});
