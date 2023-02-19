import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./Navigator";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store/store";
import { persistor } from "./src/redux/store/store";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { API_KEY } from "@env";

const getFonts = () => {
  return Font.loadAsync({
    "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "roboto-light": require("./assets/fonts/RobotoSlab-Light.ttf"),
    "roboto-regular": require("./assets/fonts/RobotoSlab-Regular.ttf"),
    "roboto-medium": require("./assets/fonts/RobotoSlab-Medium.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
