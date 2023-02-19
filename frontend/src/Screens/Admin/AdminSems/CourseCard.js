import { View, Text } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function CourseCard({ course }) {
  // const [course, setCourse] = useState({});

  // useEffect(() => {
  //   const fetchCourseDetails = async () => {
  //     const response = await axios.get(
  //       API_KEY+"api/courses/getcourse/",
  //       {
  //         params: {
  //           course_id: course_id,
  //         },
  //       }
  //     );
  //     setCourse(response.data);
  //   };
  //   fetchCourseDetails();
  // }, []);

  return (
    <View style={styles.courseCard}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.courseCodeText}>{course.course_code}</Text>
          <Text style={styles.courseCodeText}>
            {course.course_credits} Credits
          </Text>
        </View>
        <Text style={styles.courseTitleText}>{course.course_title}</Text>
      </View>
      <Text style={styles.courseInstructorText}>
        By {course.course_faculty}
      </Text>
    </View>
  );
}
