import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { submit_assignment } from "../../../redux/actions/batchDetailActions";

export default function AssignmentDetails({ route }) {
  const { assignment } = route.params;
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [submissionFiles, setSubmissionFiles] = React.useState([]);

  const handleSubmission = async () => {
    await submit_assignment(dispatch, {
      assignment_id: assignment._id,
      user_id: user._id,
      submission_files: submissionFiles,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.assignmentDetails}>
        <View style={styles.assignmentTitleDetails}>
          <Text style={styles.assignmentSubjectCode}>
            {assignment.subject_code} - {assignment.subject_id.course_title}
          </Text>
          <Text style={styles.assignmentTitle}>
            {assignment?.assignment_title}
          </Text>
          <View style={styles.assignmentDues}>
            <Text style={styles.assignmentDueDate}>
              Due Date:{" "}
              {`${moment(assignment?.assignment_duedateandtime).format(
                "DD-MM-YYYY"
              )}`}
            </Text>
            <Text style={styles.assignmentDueTime}>
              Due Time:{" "}
              {`${moment(assignment?.assignment_duedateandtime).format(
                "hh:mm A"
              )}`}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: "gray",
          }}
        >
          Instructions:
        </Text>
        <Text style={styles.assignmentDescription}>
          {assignment?.assignment_description}
        </Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>UPLOAD</Text>
          <MaterialIcons name="file-upload" size={24} color="#0dc90a" />
        </TouchableOpacity>
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
        {assignment?.assignment_submissions.filter(
          (submission) => submission?.user_id === user?._id
        ).length === 0 && (
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
