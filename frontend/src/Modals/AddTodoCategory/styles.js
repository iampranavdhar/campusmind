import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  addCategoryModalContainer: {
    width: "80%",
    height: "auto",
    minHeight: 300,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  addCategoryTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#8d8d8d",
    borderRadius: 10,
  },
  colorPreferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 150,
    padding: 5,
  },
  selectedColorOption: {
    borderWidth: 2,
  },
  addCategoryModalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: "40%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FF605C",
    marginBottom: 10,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: "40%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#00CA4E",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: globals.titleText.fontFamily,
    color: "#FFF",
  },
});
