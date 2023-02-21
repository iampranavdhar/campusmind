import React from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function OptionCard({ optionCardTitle }) {
  return (
    <TouchableOpacity style={styles.optionCard} activeOpacity={0.8}>
      <Text
        style={{
          ...styles.optionCardTitle,
          fontSize: width * 0.038,
        }}
      >
        {optionCardTitle}
      </Text>
      <MaterialIcons name="keyboard-arrow-right" size={20} />
    </TouchableOpacity>
  );
}
