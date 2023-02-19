import React from "react";
import { Pressable } from "react-native";
import { View, Text, TextInput } from "react-native";
import { ModalCard } from "../ModalCard";
import { styles } from "./styles";

export default function AddCourse({
  showAddCourseModal,
  setShowAddCourseModal,
  courseCode,
  setCourseCode,
  setCourseName,
  courseName,
  courseDescription,
  setCourseDescription,
  courseFacultyName,
  setCourseFacultyName,
  courseCredits,
  setCourseCredits,
  handleAddCourse,
}) {
  return (
    <ModalCard visible={showAddCourseModal}>
      <View style={styles.addCourseModalContainer}>
        <Text style={styles.selectedCategoryTitle}>~/Add Course/</Text>
        <TextInput
          style={styles.addCourseTextInput}
          placeholder="Course Code (e.g. CS 101)"
          value={courseCode}
          onChangeText={(text) => setCourseCode(text)}
        />
        <TextInput
          style={styles.addCourseTextInput}
          placeholder="Course Name (e.g. Introduction to Computer Science)"
          value={courseName}
          onChangeText={(text) => setCourseName(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.addCourseTextInput}
            textAlignVertical="top"
            placeholder="Faculty Name"
            value={courseFacultyName}
            onChangeText={(text) => setCourseFacultyName(text)}
          />
          <TextInput
            keyboardType="numeric"
            numberOfLines={4}
            style={styles.addCourseTextInput}
            textAlignVertical="top"
            placeholder="Course Credits"
            value={courseCredits}
            onChangeText={(text) => setCourseCredits(text)}
          />
        </View>

        <View style={styles.courseDescriptionInput}>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.courseDescriptionTextInput}
            textAlignVertical="top"
            placeholder="Course Description"
            value={courseDescription}
            onChangeText={(text) => setCourseDescription(text)}
          />
        </View>
        <View style={styles.addCourseModalButtons}>
          <Pressable
            onPress={() => setShowAddCourseModal(false)}
            style={styles.closeButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={() => handleAddCourse()}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </ModalCard>
  );
}
