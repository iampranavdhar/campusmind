import React from "react";
import { View, Text, Dimensions } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { styles } from "./styles";

const width = Dimensions.get("window").width;

export default function GPACard({ gpaTitle, gpa }) {
  return (
    <View style={styles.gpaInfo}>
      <Text
        style={{
          ...styles.gpaTitle,
          fontSize: width * 0.04,
        }}
      >
        {gpaTitle}
      </Text>
      <ProgressCircle
        percent={(gpa / 10) * 100}
        radius={30}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
      >
        <Text
          style={{
            fontSize: width * 0.03,
          }}
        >
          {gpa}/10
        </Text>
      </ProgressCircle>
    </View>
  );
}
