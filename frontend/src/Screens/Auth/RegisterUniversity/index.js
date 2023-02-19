import React from "react";
import { View, Text } from "react-native";

export default function RegisterUniversity() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* An Ui with contact details to contact the developer for registering their university */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Want to use it for your university?
      </Text>

      <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 40 }}>
        Contact Developer:
      </Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          N Sai Pranavdhar Reddy
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          nspreddy2002@gmail.com
        </Text>
      </View>
    </View>
  );
}
