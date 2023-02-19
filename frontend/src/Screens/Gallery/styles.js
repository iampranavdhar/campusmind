import { StyleSheet } from "react-native";
import globals from "../../../globalStyles/globals";

export const styles = StyleSheet.create({
  deleleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 500,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCard: {
    marginHorizontal: 15,
    marginVertical: 10,
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
  galleryImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  galleryImages: {
    flex: 1,
    flexDirection: "column",
  },
});
