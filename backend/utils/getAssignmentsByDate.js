import Assignment from "../models/BatchDetails/Assignment.js";

export const collectAlLAssignmentsOnDate = async (date) => {
  const assignments = await Assignment.find({});
  const filteredAssignments = assignments.filter((assignment) => {
    const assignmentDueDate = new Date(assignment?.assignment_duedateandtime);
    return (
      assignmentDueDate.getDate() === date.getDate() &&
      assignmentDueDate.getMonth() === date.getMonth() &&
      assignmentDueDate.getFullYear() === date.getFullYear() &&
      assignmentDueDate.getHours() >= date.getHours() &&
      assignmentDueDate.getMinutes() >= date.getMinutes()
    );
  });
  return filteredAssignments;
};
