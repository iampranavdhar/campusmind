import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  memberCard: {
    marginHorizontal: 15,
    marginVertical: 10,
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
  memberData: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 5,
    width: "100%",
  },
  memberDetails: {
    padding: 10,
  },

  memberButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  memberButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 100,
    backgroundColor: "#4338CA",
    color: "#fff",
    marginHorizontal: 5,
    borderRadius: 5,
  },

  // Events Page
  members: {
    flex: 1,
    flexDirection: "column",
  },
});
