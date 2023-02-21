import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MessageCard({
  messageSent,
  isMessageViewed,
  messageText,
  messageTime,
}) {
  return (
    <View
      style={{
        backgroundColor: messageSent ? "#F7D5D2" : "#FAE4D3",
        alignSelf: messageSent ? "flex-end" : "flex-start",
        ...styles.messageCard,
      }}
    >
      <Text
        style={{
          ...styles.messageText,
          fontSize: width * 0.035,
        }}
      >
        {messageText}
      </Text>
      <Text style={styles.messageTime}>
        {messageTime}
        {messageSent &&
          (isMessageViewed ? (
            <Ionicons
              name="checkmark-done-sharp"
              size={25}
              style={styles.messageViewIcon}
              color="black"
            />
          ) : (
            <Ionicons
              name="checkmark-sharp"
              size={25}
              style={styles.messageViewIcon}
              color="black"
            />
          ))}
      </Text>
    </View>
  );
}
