import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import GPACard from "../../Components/GPACard";
import { styles } from "./styles";

export default function SemDetails({ route }) {
  const { registeredCourses, semesterGPA } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.semDetails}>
        <GPACard gpaTitle={"SGPA"} gpa={semesterGPA} />
        <View style={styles.headingsBar}>
          <Text style={{ flex: 0.2, ...styles.headingsText }}>Code</Text>
          <Text style={{ flex: 0.4, ...styles.headingsText }}>Name</Text>
          <Text style={{ flex: 0.2, ...styles.headingsText }}>Credits</Text>
          <Text style={{ flex: 0.2, ...styles.headingsText }}>Grade</Text>
        </View>
        <View style={styles.tableRows}>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {registeredCourses.map((course, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={{ flex: 0.2, ...styles.tableRowText }}>
                  {course.CourseCode}
                </Text>
                <Text style={{ flex: 0.4, ...styles.tableRowText }}>
                  {course.CourseTitle}
                </Text>
                <Text style={{ flex: 0.2, ...styles.tableRowText }}>
                  {course.CourseCredits}
                </Text>
                <Text style={{ flex: 0.2, ...styles.tableRowText }}>
                  {course.CourseGrade}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
