import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import GPACard from "../../Components/GPACard";
import { styles } from "./styles";

const width = Dimensions.get("window").width;

export default function SemDetails({ route }) {
  const { registeredCourses, semesterGPA } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.semDetails}>
        <GPACard gpaTitle={"SGPA"} gpa={semesterGPA} />
        <View style={styles.headingsBar}>
          <Text
            style={{
              flex: 0.2,
              ...styles.headingsText,
              fontSize: width * 0.03,
            }}
          >
            Code
          </Text>
          <Text
            style={{
              flex: 0.4,
              ...styles.headingsText,
              fontSize: width * 0.03,
            }}
          >
            Name
          </Text>
          <Text
            style={{
              flex: 0.2,
              ...styles.headingsText,
              fontSize: width * 0.03,
            }}
          >
            Credits
          </Text>
          <Text
            style={{
              flex: 0.2,
              ...styles.headingsText,
              fontSize: width * 0.03,
            }}
          >
            Grade
          </Text>
        </View>
        <View style={styles.tableRows}>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {registeredCourses.map((course, index) => (
              <View key={index} style={styles.tableRow}>
                <Text
                  style={{
                    flex: 0.2,
                    ...styles.tableRowText,
                    fontSize: width * 0.03,
                  }}
                >
                  {course?.CourseCode}
                </Text>
                <Text
                  style={{
                    flex: 0.4,
                    ...styles.tableRowText,
                    fontSize: width * 0.03,
                  }}
                >
                  {course?.CourseTitle}
                </Text>
                <Text
                  style={{
                    flex: 0.2,
                    ...styles.tableRowText,
                    fontSize: width * 0.03,
                  }}
                >
                  {course?.CourseCredits}
                </Text>
                <Text
                  style={{
                    flex: 0.2,
                    ...styles.tableRowText,
                    fontSize: width * 0.03,
                  }}
                >
                  {course?.CourseGrade}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
