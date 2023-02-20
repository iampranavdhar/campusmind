import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  placementCompanyCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  placementCompanyNameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
