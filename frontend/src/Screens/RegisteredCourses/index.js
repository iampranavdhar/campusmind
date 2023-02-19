import React from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./styles";

export default function RegisteredCourses() {
  const acad = {
    name: "Pranavdhar",
    email: "pranav@gmail.com ",
    phone: "9888888888",
    address: "Madurawada, Vizag",
    dob: "22/05/2002",
    degree: "B.Tech",
    From: "2020",
    To: "2024",
    branch: "CSE",
    CGPA: "9.1",
    SemDetails: [
      {
        Semester: "Semester 1",
        SemesterStatus: "Completed",
        FeeStatus: "Paid",
        SemesterCredits: "24",
        SemesterGPA: "9.1",
        SemesterStartDate: "01/01/2020",
        SemesterEndDate: "31/01/2021",
        RegisteredCourses: [
          {
            CourseCode: "CSE-101",
            CourseTitle: "Introduction to Computer Science",
            CourseCredits: "3",
            CourseGrade: "A",
            CourseInstructor: "Dr. N Sudhakar",
            courseRegistrationStatus: "Registered",
          },
          {
            CourseCode: "CSE-102",
            CourseTitle: "Comp Sys Fundamentals",
            CourseCredits: "3",
            CourseGrade: "A",
            CourseInstructor: "Dr. Ravi Varma",
          },
        ],
      },
      {
        Semester: "Semester 2",
        SemesterStatus: "Completed",
        FeeStatus: "Paid",
        SemesterCredits: "24",
        SemesterGPA: "9.2",
        SemesterStartDate: "01/01/2020",
        SemesterEndDate: "31/01/2021",
        RegisteredCourses: [
          {
            CourseCode: "CSE-201",
            CourseTitle: "Introduction to Computer Science",
            CourseCredits: "3",
            CourseGrade: "A",
            CourseInstructor: "Dr. N Sudhakar",
            courseRegistrationStatus: "Registered",
          },
          {
            CourseCode: "CSE-202",
            CourseTitle: "Comp Sys Fundamentals",
            CourseCredits: "3",
            CourseGrade: "A",
            CourseInstructor: "Dr. Ravi Varma",
          },
        ],
      },
    ],
  };

  return (
    <View style={styles.registeredCourses}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {acad?.SemDetails?.reverse()?.map((sem, index) => (
          <View key={index}>
            <Text style={styles.semTitle}>{sem?.Semester}</Text>
            {sem?.RegisteredCourses?.map((course, index) => {
              return (
                <View key={index} style={styles.courseCard}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.courseCodeText}>
                        {course?.CourseCode}
                      </Text>
                      <Text style={styles.courseCodeText}>
                        {course?.CourseCredits} Credits
                      </Text>
                    </View>
                    <Text style={styles.courseTitleText}>
                      {course?.CourseTitle}
                    </Text>
                  </View>
                  <Text style={styles.courseInstructorText}>
                    By {course?.CourseInstructor}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
        <View style={{ width: 100, height: 120 }}></View>
      </ScrollView>
    </View>
  );
}
