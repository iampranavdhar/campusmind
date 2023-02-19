import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { get_assignments } from "../../../redux/actions/batchDetailActions";
import globals from "../../../../globalStyles/globals";
import { useNavigation } from "@react-navigation/native";
const { useSelector, useDispatch } = require("react-redux");

export const AssignmentCard = ({
  subjectCode,
  assignmentTitle,
  subjectCodeColor,
  assignmentDetails,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.assignmentCard}
      onPress={() =>
        navigation.push("Assignment Details", {
          assignment: assignmentDetails,
        })
      }
    >
      <View
        style={{
          backgroundColor: subjectCodeColor,
          ...styles.assignmentCardCode,
        }}
      >
        <Text style={styles.assignmentCardCodeText}>{subjectCode}</Text>
      </View>
      <View style={styles.assignmentCardBody}>
        <Text style={styles.assignmentCardBodyText}>{assignmentTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Assignments({ route }) {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const isAdmin = useSelector((state) => state?.user?.userData?.isAdmin);
  const { assignmentsData } = useSelector((state) => state.batch);
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  const section_id = isAdmin
    ? route?.params?.section_id
    : user?.batch_details?.section_id;

  useEffect(() => {
    get_assignments(dispatch, {
      section_id: section_id,
    });
  }, [section_id]);

  return (
    <View style={styles.assignments}>
      <View style={styles.topBarOptionsCard}>
        <TouchableOpacity onPress={() => setSelectedStatus("Pending")}>
          <Text
            style={
              selectedStatus === "Pending"
                ? styles.selectedOption
                : styles.option
            }
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={
              selectedStatus === "Completed"
                ? styles.selectedOption
                : styles.option
            }
            onPress={() => setSelectedStatus("Completed")}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {assignmentsData
          ?.filter((assignment) => {
            if (selectedStatus === "Pending") {
              return (
                new Date(assignment?.assignment_duedateandtime) > new Date() &&
                assignment?.assignment_submissions
                  .map((submission) => submission?.user_id)
                  .indexOf(user._id) === -1
              );
            } else if (selectedStatus === "Completed") {
              return (
                new Date(assignment?.assignment_duedateandtime) < new Date() ||
                assignment?.assignment_submissions
                  .map((submission) => submission?.user_id)
                  .indexOf(user._id) !== -1
              );
            }
          })
          .map((assignment, index) => (
            <AssignmentCard
              subjectCode={assignment?.subject_code}
              assignmentTitle={assignment?.assignment_title}
              subjectCodeColor={assignment?.color}
              assignmentDetails={assignment}
              key={index}
            />
          ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={globals.floatingAddButton}
            onPress={() =>
              navigation.navigate("AdminAddAssignment", {
                section_id: route.params?.section_id,
              })
            }
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
