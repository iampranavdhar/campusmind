import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import globals from "../../../../globalStyles/globals";
import { MaterialIcons } from "@expo/vector-icons";
import AddCourse from "../../../Modals/AddCourse";
import {
  add_course,
  delete_course,
  get_courses,
} from "../../../redux/actions/courseActions";

const courseCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    width: "100%",
    marginTop: 20,
    overflow: "hidden",
  },
  descriptionText: {
    fontSize: 16,
  },
});

export const CourseCard = ({ course }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
    Animated.timing(animation, {
      toValue: showDescription ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const descriptionStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 120],
    }),
    opacity: animation,
  };

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state?.user?.userData?.isAdmin);

  const handleDelete = async () => {
    if (isAdmin) {
      await delete_course(dispatch, {
        course_id: course._id,
        org_id: course.org_id,
      });
    } else {
      alert("You are not authorized to delete this course");
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingBottom: 0,
        margin: 10,
        elevation: 5,
      }}
      activeOpacity={0.8}
    >
      <TouchableOpacity onPress={toggleDescription}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {course.course_code}
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          {course.course_title}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[courseCardStyles.description, descriptionStyle]}>
        <Text style={courseCardStyles.descriptionText}>
          {course.course_description}
        </Text>
        {/* Delelte Course and Edit Course Icon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 5,
              borderRadius: 10,
              marginRight: 15,
            }}
            activeOpacity={0.8}
            onPress={() => handleDelete()}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function AdminAllCoursesScreen() {
  const dispatch = useDispatch();
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const { isAdmin, org_id } = useSelector((state) => state.user.userData);

  const { coursesData, isLoading } = useSelector((state) => state.course);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseFacultyName, setCourseFacultyName] = useState("");
  const [courseCredits, setCourseCredits] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      await get_courses(dispatch, org_id);
    };
    fetchCourses();
  }, [org_id]);

  const handleAddCourse = async () => {
    await add_course(dispatch, {
      course_code: courseCode,
      course_title: courseName,
      course_description: courseDescription,
      org_id: org_id,
      course_faculty: courseFacultyName,
      course_credits: courseCredits,
    });
    setCourseCode("");
    setCourseName("");
    setCourseDescription("");
    setShowAddCourseModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        {showAddCourseModal && (
          <AddCourse
            showAddCourseModal={showAddCourseModal}
            setShowAddCourseModal={setShowAddCourseModal}
            courseCode={courseCode}
            setCourseCode={setCourseCode}
            courseName={courseName}
            setCourseName={setCourseName}
            courseDescription={courseDescription}
            setCourseDescription={setCourseDescription}
            courseFacultyName={courseFacultyName}
            setCourseFacultyName={setCourseFacultyName}
            courseCredits={courseCredits}
            setCourseCredits={setCourseCredits}
            handleAddCourse={handleAddCourse}
          />
        )}
        {coursesData?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </ScrollView>
      <View
        style={{
          width: "auto",
          position: "absolute",
          bottom: 0,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={{
              bottom: 10,
              ...globals.floatingAddButton,
            }}
            onPress={() => setShowAddCourseModal(true)}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
