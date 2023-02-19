import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  addTodoModalContainer: {
    width: "80%",
    height: "auto",
    minHeight: 300,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  selectedCategoryTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
    marginBottom: 15,
  },
  addTodoTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: "#8d8d8d",
    borderRadius: 10,
  },
  todoDescriptionInput: {
    height: 200,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  todoDescriptionTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: "#8d8d8d",
    borderRadius: 10,
    height: 200,
    textAlignVertical: "top",
  },
  addTodoModalButtons: {
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
