import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

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
    <View style={styles.announcementCard}>
      <View style={{ alignItems: "baseline" }}>
        <Text
          style={{
            backgroundColor: announcementCategoryColor,
            ...styles.announcementCategory,
          }}
        >
          {announcementCategory}
        </Text>
      </View>
      <Text style={styles.announcementText}>{announcementText}</Text>
      <Text style={styles.announcementTime}>{timeago(announcementTime)}</Text>
    </View>
  );
}
