import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { styles } from "./styles";

const width = Dimensions.get("window").width;

export default function HolidayCard() {
  return (
    <View
      style={{
        width: width * 0.9,
        ...styles.holidayCard,
      }}
    >
      <Text style={styles.holidayText}>It's a holiday!</Text>
      <Text style={styles.holidayQuoteText}>
        Time to get into the holiday spirit
      </Text>
      <Image
        source={require("../../../assets/cycle_image.png")}
        style={styles.holidayImage}
      />
    </View>
  );
}
