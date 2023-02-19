import { ToastAndroid, Platform } from "react-native";

function Toast(message) {
  if (Platform.OS == "android") {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      300
    );
  } else {
    alert(message);
  }
}

export default Toast;
