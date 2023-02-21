import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ClassCard({ classDetails }) {
  const [completedClass, setCompletedClass] = useState(false);
  const [ongoingClass, setOngoingClass] = useState(false);
  const [upcomingClass, setUpcomingClass] = useState(false);

  useEffect(() => {
    const ct = new Date();

    const startTime = `${classDetails.start_time}:00`;
    const endTime = `${classDetails.end_time}:00`;

    const s = startTime.split(":");
    const st = new Date(
      ct.getFullYear(),
      ct.getMonth(),
      ct.getDate(),
      parseInt(s[0]),
      parseInt(s[1]),
      parseInt(s[2])
    );

    const e = endTime.split(":");
    const et = new Date(
      ct.getFullYear(),
      ct.getMonth(),
      ct.getDate(),
      parseInt(e[0]),
      parseInt(e[1]),
      parseInt(e[2])
    );

    if (st < ct && ct < et) {
      setOngoingClass(true);
    } else if (ct > et) {
      setCompletedClass(true);
    } else if (ct < st) {
      setUpcomingClass(true);
    }
  });

  return (
    <View
      style={{
        ...styles.classCard,
        backgroundColor:
          classDetails?.class_name === "Lunch Break" ? "#F5F5F5" : "#e9e9e9",
        width: width * 0.6,
      }}
    >
      <View style={styles.classTimings}>
        <FontAwesome5 name="clock" size={18} color="#988F8F" solid />
        <Text
          style={{
            ...styles.classTimingsText,
            fontSize: width * 0.03,
          }}
        >
          {classDetails?.start_time} - {classDetails?.end_time}
        </Text>
      </View>
      <Text
        style={{
          ...styles.className,
          fontSize: width * 0.04,
        }}
      >
        {classDetails?.class_name.length > 20
          ? classDetails?.class_name.slice(0, 20) + "..."
          : classDetails?.class_name}
      </Text>
      <View style={styles.classStatus}>
        {classDetails?.class_name === "Lunch Break" ? null : (
          <>
            <FontAwesome5
              name="dot-circle"
              size={15}
              color={
                ongoingClass
                  ? "#FF605C"
                  : completedClass
                  ? "#FFB82E"
                  : upcomingClass
                  ? "#4F8BFF"
                  : "black"
              }
              solid
            />
            <Text
              style={{
                ...styles.classStatusText,
                color: ongoingClass
                  ? "#FF605C"
                  : completedClass
                  ? "#FFB82E"
                  : upcomingClass
                  ? "#4F8BFF"
                  : "black",
                fontSize: width * 0.03,
              }}
            >
              {ongoingClass ? "Ongoing Class" : null}
              {completedClass ? "Class Completed" : null}
              {upcomingClass ? "Upcomming Class" : null}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
