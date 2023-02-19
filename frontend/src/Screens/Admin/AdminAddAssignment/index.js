import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import { styles } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import {
  add_assignment,
  get_assignments,
} from "../../../redux/actions/batchDetailActions";
import { useDispatch, useSelector } from "react-redux";
import { get_courses } from "../../../redux/actions/courseActions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AdminAddAssignment({ route, navigation }) {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentSubjectCode, setAssignmentSubjectCode] = useState("");
  const [assignmentSubjectId, setAssignmentSubjectId] = useState("");
  const [assignmentSubjectCodeColor, setAssignmentSubjectCodeColor] =
    useState("#00BFFF");
  const [assignmentDueDateandTime, setAssignmentDueDateAndTime] = useState(
    new Date()
  );

  const user = useSelector((state) => state.user.userData);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || assignmentDueDateandTime;
    setShow(Platform.OS === "ios");
    setAssignmentDueDateAndTime(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { coursesData, isLoading } = useSelector((state) => state.course);
  const [subjectCodes, setSubjectCodes] = useState([]);

  let colors = [
    "#00BFFF",
    "#FFB3B3",
    "#9747F0",
    "#FFCD00",
    "#FF8C00",
    "#00FF00",
  ];

  const pickerRef = useRef();

  const dispatch = useDispatch();
  const { section_id } = route.params;

  useEffect(() => {
    const fetchCourses = async () => {
      await get_courses(dispatch, user?.org_id);
    };
    fetchCourses();
  }, [user?.org_id]);

  useEffect(() => {
    setSubjectCodes(
      coursesData?.map((course) => {
        return {
          id: course._id,
          label: course.course_code,
          value: course._id,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      })
    );
    setAssignmentSubjectCode(coursesData[0]?.course_code);
    setAssignmentSubjectId(coursesData[0]?._id);
  }, [coursesData]);

  useEffect(() => {
    subjectCodes.map((subjectCode) => {
      if (subjectCode.label === assignmentSubjectCode) {
        setAssignmentSubjectCodeColor(subjectCode.color);
      }
    });
  }, [assignmentSubjectCode]);

  const addAssignment = async () => {
    try {
      if (
        assignmentTitle === "" ||
        assignmentDescription === "" ||
        assignmentSubjectCode === "" ||
        assignmentDueDateandTime === ""
      ) {
        alert("Please fill all the fields");
      } else {
        await add_assignment(dispatch, {
          org_id: user.org_id,
          section_id: section_id,
          subject_code: assignmentSubjectCode,
          subject_id: assignmentSubjectId,
          assignment_title: assignmentTitle,
          assignment_description: assignmentDescription,
          assignment_duedateandtime: assignmentDueDateandTime,
          color: assignmentSubjectCodeColor,
        });
        setAssignmentTitle("");
        setAssignmentDescription("");
        setAssignmentSubjectCode("");
        setAssignmentSubjectCodeColor("");
        setAssignmentDueDateAndTime(new Date());
        await get_assignments(dispatch, {
          section_id: section_id,
        });
        navigation.navigate("All Assignments", {
          section_id: section_id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        width: width,
        height: height * 0.93,
        ...styles.adminAddAssignment,
      }}
    >
      <View>
        <View style={styles.subjectCode}>
          <Text style={styles.lableText}>Subject Code:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              ref={pickerRef}
              selectedValue={assignmentSubjectId}
              onValueChange={(itemValue, itemIndex) => {
                setAssignmentSubjectCode(subjectCodes[itemIndex].label);
                setAssignmentSubjectId(itemValue);
              }}
            >
              {subjectCodes.map((item, index) => (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.assignmentDetails}>
          <View>
            <Text style={styles.lableText}>Title: </Text>
            <View style={styles.titleInput}>
              <TextInput
                style={styles.titleTextInput}
                placeholder="Assignment Title"
                placeholderTextColor="#8d8d8d"
                autoCapitalize="none"
                autoCorrect={false}
                value={assignmentTitle}
                onChangeText={(text) => setAssignmentTitle(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Description: </Text>
            <View style={styles.descriptionInput}>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.descriptionTextInput}
                textAlignVertical="top"
                placeholder="Assignment Description"
                value={assignmentDescription}
                onChangeText={(text) => setAssignmentDescription(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Due Date and Time: </Text>
            <Text style={styles.dateandtimeText}>{`${moment(
              assignmentDueDateandTime
            ).format("MMM DD, YYYY || HH:mm")}`}</Text>
            <View style={styles.pickButtons}>
              <TouchableOpacity
                onPress={showDatepicker}
                style={styles.pickButton}
              >
                <Text style={styles.pickButtonText}>Pick Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showTimepicker}
                style={styles.pickButton}
              >
                <Text style={styles.pickButtonText}>Pick Time</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.picker}>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={assignmentDueDateandTime}
                  minimumDate={new Date()}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addAssignment()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
