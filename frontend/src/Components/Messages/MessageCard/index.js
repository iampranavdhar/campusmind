import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <Text style={styles.messageText}>{messageText}</Text>
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
