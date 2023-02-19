import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  semCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "98%",
    backgroundColor: "#E9E9E9",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 2,
  },
  marksAndCgpa: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  barChart: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 40,
    paddingRight: 20,
  },
  emptyBox:{
    width: "100%",
    height:120,
  }
});
