import { StyleSheet } from "react-native";
import globals from "../../../../globalStyles/globals";

export const styles = StyleSheet.create({
  classCard: {
    width: 260,
    height: 120,
    borderRadius: 10,
    marginLeft: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
  },
  classTimings: {
    flexDirection: "row",
    alignItems: "center",
  },
  classTimingsText: {
    fontSize: 12,
    marginLeft: 5,
    paddingTop: 2,
    fontFamily: `${globals.titleText.fontFamily}`,
    color: "#988F8F",
  },
  className: {
    fontSize: 16,
    fontFamily: `${globals.titleText.fontFamily}`,
  },
  classStatus: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  classStatusText: {
    fontSize: 12,
    fontFamily: `${globals.titleText.fontFamily}`,
    alignItems: "center",
    marginTop: 2,
    marginLeft: 5,
    color: "#988F8F",
  },
});
