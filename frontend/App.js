import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./Navigator";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import { persistor } from "./src/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";

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
          <StatusBar barStyle="dark-content" />
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
