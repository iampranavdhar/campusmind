import moment from "moment";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AnnouncementCard({
  announcementCategory,
  announcementText,
  announcementTime,
  announcementCategoryColor,
}) {
  const timeago = (time) => {
    const now = new Date();
    const diff = (now.getTime() - new Date(time).getTime()) / 1000;
    if (diff < 60) {
      return "just now";
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minutes ago`;
    } else if (diff < 86400) {
      return new moment(time).format("MMM DD, YYYY hh:mm a");
    } else {
      return new moment(time).format("MMM DD, YYYY");
    }
  };

  return (
    <View
      style={{
        ...styles.announcementCard,
        width: width * 0.9,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ alignItems: "baseline" }}>
          <Text
            style={{
              backgroundColor: announcementCategoryColor,
              ...styles.announcementCategory,
              fontSize: width * 0.035,
            }}
          >
            {announcementCategory}
          </Text>
        </View>
        <Text
          style={{
            ...styles.announcementTime,
            fontSize: width * 0.03,
          }}
        >
          {timeago(announcementTime)}
        </Text>
      </View>
      <Text
        style={{
          ...styles.announcementText,
          fontSize: width * 0.035,
        }}
      >
        {announcementText}
      </Text>
    </View>
  );
}
