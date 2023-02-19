import { View, Text } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function CourseCard({ course }) {
  return (
    <View style={styles.courseCard}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.courseCodeText}>{course?.course_code}</Text>
          <Text style={styles.courseCodeText}>
            {course.course_credits} Credits
          </Text>
        </View>
        <Text style={styles.courseTitleText}>{course?.course_title}</Text>
      </View>
      <Text style={styles.courseInstructorText}>
        By {course?.course_faculty}
      </Text>
    </View>
  );
}
