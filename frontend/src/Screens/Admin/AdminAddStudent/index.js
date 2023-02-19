import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import { styles } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  get_branches,
  get_sections,
} from "../../../redux/actions/batchDetailActions";
import { add_member } from "../../../redux/actions/membersActions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AdminAddStudent() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.event);
  const { branchesData, sectionsData } = useSelector((state) => state.batch);

  const [studentName, setStudentName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentIdentity, setStudentIdentity] = useState("");
  const [studentImage, setStudentImage] = useState("");
  const [studentGender, setStudentGender] = useState("Male");
  const [studentAddress, setStudentAddress] = useState("");
  const [studentMobile, setStudentMobile] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentSectionName, setStudentSectionName] = useState(
    sectionsData?.length > 0 ? sectionsData[0].section_name : ""
  );
  const [studentBranchName, setStudentBranchName] = useState(
    branchesData?.length > 0 ? branchesData[0]?.branch_name : ""
  );

  const [roleStatus, setRoleStatus] = useState(false);
  const [studentDob, setStudentDob] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const pickImageFromGallery = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, We need gallery access to perform this!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [10, 12],
          quality: 1,
        });

        if (!result.cancelled) {
          const uri = result.uri;
          const name = result.uri.split("/").pop();
          const source = {
            uri,
            type: `image/${uri.split(".")[uri.split(".").length - 1]}`,
            name,
          };
          const cloud_url = await cloudinaryUpload(source);
          setImage(cloud_url);
        }
      }
    }
  };

  const cloudinaryUpload = async (photo) => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "stuniverse");
    formData.append("cloud_name", "dbkrowqox");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbkrowqox/image/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const jsonRes = await res.json();
    if (res.status !== 200) {
      alert("Error uploading image");
      return;
    }
    setImage(jsonRes?.secure_url);
    return jsonRes?.secure_url;
  };

  const genderOptions = [
    { id: "1", label: "Male", value: "Male" },
    { id: "2", label: "Female", value: "Female" },
    { id: "3", label: "Other", value: "Other" },
  ];

  const roleOptions = [
    { id: "1", label: "Student", value: false },
    { id: "2", label: "Admin", value: true },
  ];

  useEffect(() => {
    const get_all_branches = async () => {
      await get_branches(dispatch, userData.org_id);
      setBranchId(branchesData[0]._id);
    };
    get_all_branches();
  }, [userData]);

  useEffect(() => {
    const get_all_sections = async () => {
      await get_sections(dispatch, {
        branch_id: branchId,
      });
      setSectionId(sectionsData[0]?.value);
    };
    get_all_sections();
  }, [branchId]);

  const handleAddStudent = async () => {
    try {
      console.log(
        {
          org_id: userData.org_id,
          profile_image: image,
          user_full_name: studentName,
          email: studentEmail,
          password: studentPassword,
          mobile: studentMobile,
          user_identity: studentIdentity,
          dob: studentDob,
          gender: studentGender,
          address: studentAddress,
          batch_details: {
            branch_name: studentBranchName,
            section_name: studentSectionName,
            branch_id: branchId,
            section_id: sectionId,
          },
          isAdmin: roleStatus,
        },
        "admin_stu"
      );
      await add_member(dispatch, {
        org_id: userData.org_id,
        profile_image: image,
        user_full_name: studentName,
        email: studentEmail,
        password: studentPassword,
        mobile: studentMobile,
        user_identity: studentIdentity,
        dob: studentDob,
        gender: studentGender,
        address: studentAddress,
        batch_details: {
          branch_name: studentBranchName,
          section_name: studentSectionName,
          branch_id: branchId,
          section_id: sectionId,
        },
        isAdmin: roleStatus,
      });
      navigation.navigate("AdminAllMembers", { screen: "Home" });
    } catch (err) {
      console.log(err);
    }
  };

  const pickerRef = useRef();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || studentDob;
    setShow(Platform.OS === "ios");
    setStudentDob(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View
      style={{
        width: width,
        height: height * 0.93,
        ...styles.adminAddStudent,
        paddingBottom: height * 0.075,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.studentDetails}>
          {image ? (
            <View
              style={{
                borderRadius: 10,
                overflow: "hidden",
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  height: height * 0.3,
                  width: width * 0.5,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
              />
            </View>
          ) : (
            // a dotted border with a camera icon inside it
            <View
              style={{
                height: height * 0.3,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "lightgray",
                borderStyle: "dashed",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => pickImageFromGallery()}>
                <View
                  style={{
                    height: height * 0.1,
                    width: width * 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderStyle: "dashed",
                  }}
                >
                  <Ionicons name="camera" size={30} color="lightgray" />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "lightgray",
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <Text style={styles.lableText}>Name: </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="John Doe"
                placeholderTextColor="lightgray"
                autoCapitalize="none"
                autoCorrect={false}
                value={studentName}
                onChangeText={(text) => setStudentName(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Identity: </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="AM.EN.U4DES400"
                placeholderTextColor="lightgray"
                autoCapitalize="none"
                autoCorrect={false}
                value={studentIdentity}
                onChangeText={(text) => setStudentIdentity(text)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{ marginRight: 0, marginTop: 0, ...styles.lableText }}
              >
                Gender
              </Text>
              <View
                style={{
                  borderRadius: 15,
                }}
              >
                <Picker
                  ref={pickerRef}
                  selectedValue={studentGender}
                  onValueChange={(itemValue, itemIndex) =>
                    setStudentGender(itemValue)
                  }
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 15,
                    height: 50,
                    width: width * 0.4,
                  }}
                >
                  {genderOptions.map((item, index) => (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={index}
                      style={styles.pickerItem}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View>
              <Text
                style={{ marginRight: 0, marginTop: 0, ...styles.lableText }}
              >
                Date of Birth:{" "}
              </Text>
              <View style={styles.pickButtons}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.dobPickButton}
                >
                  <Text>{`${moment(studentDob).format("MMM DD, YYYY")}`}</Text>
                  <Ionicons name="calendar" size={30} color="lightgray" />
                </TouchableOpacity>
              </View>
              <View style={styles.picker}>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={studentDob}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{ marginRight: 0, marginTop: 0, ...styles.lableText }}
              >
                Branch
              </Text>
              <View
                style={{
                  borderRadius: 15,
                }}
              >
                <Picker
                  ref={pickerRef}
                  selectedValue={branchId}
                  onValueChange={(itemValue, itemIndex) => {
                    setBranchId(itemValue);
                    setStudentBranchName(branchesData[itemIndex]?.branch_name);
                  }}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 15,
                    height: 50,
                    width: width * 0.4,
                  }}
                >
                  {branchesData?.map((item, index) => (
                    <Picker.Item
                      label={item.branch_name}
                      value={item._id}
                      key={index}
                      style={styles.pickerItem}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{ marginRight: 0, marginTop: 0, ...styles.lableText }}
              >
                Section
              </Text>
              <View
                style={{
                  borderRadius: 15,
                }}
              >
                <Picker
                  ref={pickerRef}
                  selectedValue={sectionId}
                  onValueChange={(itemValue, itemIndex) => {
                    setSectionId(itemValue),
                      setStudentSectionName(
                        sectionsData[itemIndex]?.section_name
                      );
                  }}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 15,
                    height: 50,
                    width: width * 0.4,
                  }}
                >
                  {sectionsData?.map((item, index) => (
                    <Picker.Item
                      label={item.section_name}
                      value={item._id}
                      key={index}
                      style={styles.pickerItem}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Mobile: </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="9874561230"
                keyboardType="numeric"
                placeholderTextColor="lightgray"
                autoCapitalize="none"
                autoCorrect={false}
                value={studentMobile}
                onChangeText={(text) => setStudentMobile(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Email: </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="johndoe@gmail.com"
                placeholderTextColor="lightgray"
                autoCapitalize="none"
                autoCorrect={false}
                value={studentEmail}
                onChangeText={(text) => setStudentEmail(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Password: </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="lightgray"
                autoCapitalize="none"
                autoCorrect={false}
                value={studentPassword}
                onChangeText={(text) => setStudentPassword(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Address: </Text>
            <View style={styles.descriptionInput}>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.descriptionTextInput}
                textAlignVertical="top"
                placeholder="House No : 1, Road No : 1, Block No : 1, Sector : 1, District : 1, City : 1, Country : 1"
                value={studentAddress}
                onChangeText={(text) => setStudentAddress(text)}
              />
            </View>
          </View>
          <View
            style={{
              marginBottom: 15,
            }}
          >
            <Text style={{ marginRight: 0, marginTop: 0, ...styles.lableText }}>
              Role:
            </Text>
            <View
              style={{
                borderRadius: 15,
              }}
            >
              <Picker
                ref={pickerRef}
                selectedValue={roleStatus}
                onValueChange={(itemValue, itemIndex) =>
                  setRoleStatus(itemValue)
                }
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 15,
                  height: 50,
                  width: width * 0.4,
                }}
              >
                {roleOptions.map((item, index) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickImageFromGallery()}
          >
            <Text style={styles.uploadButtonText}>IMAGE</Text>
            <FontAwesome5 name="upload" size={18} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddStudent()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
