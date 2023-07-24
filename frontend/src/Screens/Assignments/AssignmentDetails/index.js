import React from "react";
import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { submit_assignment } from "../../../redux/actions/batchDetailActions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AssignmentDetails({ route }) {
  const { assignment } = route.params;
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [submissionFiles, setSubmissionFiles] = React.useState([]);

  const handleSubmission = async () => {
    if (moment(assignment?.assignment_duedateandtime).isBefore(moment())) {
      await submit_assignment(dispatch, {
        assignment_id: assignment._id,
        user_id: user._id,
        submission_files: submissionFiles,
      });
    }
  };

  console.log(assignment, "assignmentDetails");

  return (
    <SafeAreaView>
      <View style={styles.assignmentDetails}>
        <View style={styles.assignmentTitleDetails}>
          <Text style={styles.assignmentSubjectCode}>
            {assignment.subject_code} - {assignment.subject_id.course_title}
          </Text>
          <Text
            style={{
              ...styles.assignmentTitle,
              fontSize: width * 0.045,
            }}
          >
            {assignment?.assignment_title}
          </Text>
          <View style={styles.assignmentDues}>
            <Text
              style={{
                ...styles.assignmentDueDate,
                fontSize: width * 0.028,
              }}
            >
              Due Date:{" "}
              {`${moment(assignment?.assignment_duedateandtime).format(
                "DD-MM-YYYY"
              )}`}
            </Text>
            <Text
              style={{
                ...styles.assignmentDueTime,
                fontSize: width * 0.028,
              }}
            >
              Due Time:{" "}
              {`${moment(assignment?.assignment_duedateandtime).format(
                "hh:mm A"
              )}`}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: width * 0.035,
            color: "gray",
          }}
        >
          Instructions:
        </Text>
        <Text
          style={{
            ...styles.assignmentDescription,
            fontSize: width * 0.035,
          }}
        >
          {assignment?.assignment_description}
        </Text>
        {!moment(assignment?.assignment_duedateandtime).isBefore(moment()) && (
          <TouchableOpacity
            style={{
              ...styles.uploadButton,
              width: width * 0.3,
              height: height * 0.05,
              paddingVertical: height * 0.007,
            }}
          >
            <Text style={styles.uploadButtonText}>UPLOAD</Text>
            <MaterialIcons name="file-upload" size={24} color="#0dc90a" />
          </TouchableOpacity>
        )}
        {assignment?.assignment_submissions?.map((submission) => {
          if (submission?.user_id === user?._id) {
            return (
              <View style={styles.submissionDetails}>
                <Text style={styles.submissionDetailsText}>
                  Submitted on:{" "}
                  {`${moment(submission.submission_dateandtime).format(
                    "DD-MM-YYYY"
                  )}`}
                </Text>
                <Text style={styles.submissionDetailsText}>
                  Submitted at:{" "}
                  {`${moment(submission.submission_dateandtime).format(
                    "hh:mm A"
                  )}`}
                </Text>
              </View>
            );
          }
        })}
        {assignment?.assignment_submissions?.filter(
          (submission) => submission?.user_id === user?._id
        ).length === 0 &&
          !moment(assignment?.assignment_duedateandtime).isBefore(moment()) && (
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSubmission}
            >
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          )}
      </View>
    </SafeAreaView>
  );
}
