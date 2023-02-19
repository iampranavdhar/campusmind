import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleText: {
    fontFamily: "poppins-medium",
  },
  normalText: {
    fontFamily: "poppins-regular",
  },
  floatingAddButton: {
    backgroundColor: "#3f51b5",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
