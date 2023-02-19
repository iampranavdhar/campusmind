import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { get_all_sems_details } from "../../../redux/actions/semActions";
import { useSelector, useDispatch } from "react-redux";
import OptionCard from "../../../Components/OptionCard";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CourseCard from "./CourseCard";

export default function AdminGraduationYears() {
  const navigation = useNavigation();
  const [graduationYears, setGraduationYears] = useState([]);
  const [branches, setBranches] = useState([]);

  const { isAdmin, org_id } = useSelector((state) => state.user.userData);
  const { allSemsData } = useSelector((state) => state.sem);
  const dispatch = useDispatch();

  const [selectedGraduationYear, setSelectedGraduationYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  useEffect(() => {
    const fetchAllSemsDetails = async () => {
      await get_all_sems_details(dispatch, {
        org_id: org_id,
      });
    };
    fetchAllSemsDetails();
  }, [org_id]);

  const fetchBranchDetails = async (branch_id) => {
    const response = await axios.get(
      `http://10.113.7.212:5001/api/batchDetails/getbranch/${branch_id}`
    );
    // set the state of the branches with the response data and the resulting array will be unique
    setBranches((prevBranches) => [
      ...prevBranches,
      {
        branch_id: response.data._id,
        branch_name: response.data.branch_name,
      },
    ]);
  };

  useEffect(() => {
    if (allSemsData) {
      const graduationYears = allSemsData.map((sem) => sem.graduation_year);
      setGraduationYears([...new Set(graduationYears)]);

      const branches = allSemsData.map((sem) => sem.branch_id);
      const uniqueBranches = [...new Set(branches)];

      if (uniqueBranches) {
        const branchDetails = uniqueBranches.map((branch) => {
          fetchBranchDetails(branch);
        });
      }
    }
  }, [allSemsData]);

  selectedBranch &&
    selectedGraduationYear &&
    selectedSem &&
    console.log(
      allSemsData.map((sem) => {
        if (
          sem.graduation_year === selectedGraduationYear &&
          sem.branch_id === selectedBranch &&
          sem.sem_id === selectedSem
        ) {
          return sem.courses.map((course) => {
            return <CourseCard course={course} />;
          });
        }
      })
    );

  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 20,
      }}
    >
      {!selectedGraduationYear ? (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            Select Graduation Year
          </Text>
          {graduationYears.map((graduationYear, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedGraduationYear(graduationYear);
              }}
            >
              <OptionCard optionCardTitle={graduationYear} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        branches &&
        !selectedBranch && (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              Select Branch
            </Text>
            {branches
              .filter(
                (branch, index, self) =>
                  index ===
                  self.findIndex((t) => t.branch_id === branch.branch_id)
              )
              .map((branch, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedBranch(branch.branch_id);
                  }}
                >
                  <OptionCard optionCardTitle={branch.branch_name} />
                </TouchableOpacity>
              ))}
          </View>
        )
      )}
      {selectedGraduationYear && selectedBranch && !selectedSem && (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            Select Semester
          </Text>
          {allSemsData.map((sem, index) => {
            if (
              sem.graduation_year === selectedGraduationYear &&
              sem.branch_id === selectedBranch
            ) {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedSem(sem.sem_no);
                  }}
                >
                  <OptionCard optionCardTitle={sem.sem_no} />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}
      {selectedBranch && selectedGraduationYear && selectedSem && (
        <View style={{ flex: 1 }}>
          {allSemsData.map((sem, index) => {
            if (
              sem.graduation_year === selectedGraduationYear &&
              sem.branch_id === selectedBranch &&
              sem.sem_no === selectedSem
            ) {
              return sem.sem_courses.map((course, index) => (
                <CourseCard course={course} />
              ));
            }
          })}
        </View>
      )}
    </ScrollView>
  );
}
