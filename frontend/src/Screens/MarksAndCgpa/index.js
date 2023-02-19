import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OptionCard from "../../Components/OptionCard";
import ProgressCircle from "react-native-progress-circle";
import { BarChart } from "react-native-gifted-charts";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GPACard from "../../Components/GPACard";
import { useNavigation } from "@react-navigation/native";

export default function MarksAndCgpa() {
  const navigation = useNavigation();
  const barColors = [
    "#FFB3B3",
    "#FFDF8C",
    "#FF809E",
    "#8CFF90",
    "#8CE3FF",
    "#FAC4FF",
    "#F27551",
    "#E376AE",
  ];

  const barData = [
    { value: 9.1, label: "Sem1" },
    { value: 8, label: "Sem2" },
    { value: 9.5, label: "Sem3" },
    { value: 9.0, label: "Sem4" },
  ];

  barData.map((item, index) => {
    item.frontColor = barColors[index];
  });

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
    CGPA: 9.1,
    SemDetails: [
      {
        Semester: "Semester 1",
        SemesterStatus: "Completed",
        FeeStatus: "Paid",
        SemesterCredits: 24,
        SemesterGPA: 9.0,
        SemesterStartDate: "01/01/2020",
        SemesterEndDate: "31/01/2021",
        RegisteredCourses: [
          {
            CourseCode: "CSE-101",
            CourseTitle: "Introduction to Computer Science",
            CourseCredits: 3,
            CourseGrade: "A",
            CourseInstructor: "Dr. N Sudhakar",
            courseRegistrationStatus: "Registered",
          },
          {
            CourseCode: "CSE-102",
            CourseTitle: "Comp Sys Fundamentals",
            CourseCredits: 3,
            CourseGrade: "A",
            CourseInstructor: "Dr. Ravi Varma",
          },
        ],
      },
      {
        Semester: "Semester 2",
        SemesterStatus: "Completed",
        FeeStatus: "Paid",
        SemesterCredits: 24,
        SemesterGPA: 9.2,
        SemesterStartDate: "01/01/2020",
        SemesterEndDate: "31/01/2021",
        RegisteredCourses: [
          {
            CourseCode: "CSE-201",
            CourseTitle: "Introduction to Computer Science",
            CourseCredits: 3,
            CourseGrade: "A",
            CourseInstructor: "Dr. N Sudhakar",
            courseRegistrationStatus: "Registered",
          },
          {
            CourseCode: "CSE-202",
            CourseTitle: "Comp Sys Fundamentals",
            CourseCredits: 3,
            CourseGrade: "A",
            CourseInstructor: "Dr. Ravi Varma",
          },
        ],
      },
    ],
  };

  return (
    <View style={styles.marksAndCgpa}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <GPACard gpaTitle={"CGPA"} gpa={acad.CGPA} />
        <View style={styles.barChart}>
          <BarChart
            data={barData}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: "gray" }}
            xAxisTextStyle={{ color: "gray" }}
            noOfSections={3}
            maxValue={10}
          />
        </View>
        <View>
          {acad.SemDetails.filter(
            (item) => item.SemesterStatus === "Completed"
          ).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Sem Details", {
                  semesterGPA: item.SemesterGPA,
                  registeredCourses: item.RegisteredCourses,
                })
              }
            >
              <OptionCard optionCardTitle={item.Semester} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.emptyBox}></View>
      </ScrollView>
    </View>
  );
}
