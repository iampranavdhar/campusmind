import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  todo: {
    paddingHorizontal: 20,
  },
  todoTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    alignItems: "center",
  },
  todoTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
  },
  todoSubtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: globals.normalText.fontFamily,
  },
  todoIcon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F0E7E7",
    color: "#F24E1E",
    borderRadius: 10,
    overflow: "hidden",
  },
  todoCategoryCard: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
  },
  numberOfTasksText: {
    fontSize: 14,
    fontFamily: globals.normalText.fontFamily,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: globals.titleText.fontFamily,
  },
  progressBar: {
    height: 5,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#8d8d8d",
    borderWidth: 0.25,
    borderRadius: 5,
  },
  todoTaskCard: {
    width: "92%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    height: "auto",
  },
  taskText: {
    fontSize: 12,
    fontFamily: globals.normalText.fontFamily,
  },
  wrapper: {
    width: "100%",
    height: 500,
    backgroundColor: "red",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  todoTaskButton: {
    width: "auto",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F24E1E",
    marginRight: 5,
  },

  todoTaskButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: globals.normalText.fontFamily,
  },
});
