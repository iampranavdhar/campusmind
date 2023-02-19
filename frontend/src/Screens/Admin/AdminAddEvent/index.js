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
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { add_event, get_events } from "../../../redux/actions/eventActions";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AdminAddEvent() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventRegisterLink, setEventRegisterLink] = useState("");
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
          aspect: [16, 12],
          quality: 0.8,
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

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.event);

  const handleAddEvent = async () => {
    if (eventTitle === "" || eventDescription === "" || eventVenue === "") {
      alert("Please fill all the fields");
    } else {
      try {
        await add_event(dispatch, {
          org_id: userData.org_id,
          event_title: eventTitle,
          event_description: eventDescription,
          event_dateandtime: date,
          event_image: image,
          event_venue: eventVenue,
          event_register_link: eventRegisterLink,
        });
        await get_events(dispatch, userData.org_id);
        setEventTitle("");
        setEventDescription("");
        setEventVenue("");
        setDate(new Date());
        navigation.navigate("Events");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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
        ...styles.adminAddEvent,
        paddingBottom: height * 0.075,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.eventDetails}>
          {image ? (
            <View
              style={{
                borderRadius: 10,
                overflow: "hidden",
                marginVertical: 10,
              }}
            >
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  height: height * 0.3,
                  width: width,
                  objectFit: "cover",
                }}
              />
            </View>
          ) : (
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
            <Text style={styles.lableText}>Title: </Text>
            <View style={styles.titleInput}>
              <TextInput
                style={styles.titleTextInput}
                placeholder="Event Title"
                placeholderTextColor="#8d8d8d"
                autoCapitalize="none"
                autoCorrect={false}
                value={eventTitle}
                onChangeText={(text) => setEventTitle(text)}
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
                placeholder="Event Description"
                value={eventDescription}
                onChangeText={(text) => setEventDescription(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Venue: </Text>
            <View style={styles.titleInput}>
              <TextInput
                style={styles.titleTextInput}
                placeholder="Event Venue"
                placeholderTextColor="#8d8d8d"
                autoCapitalize="none"
                autoCorrect={false}
                value={eventVenue}
                onChangeText={(text) => setEventVenue(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Registration Link: </Text>
            <View style={styles.titleInput}>
              <TextInput
                style={styles.titleTextInput}
                placeholder="Event Registration Link"
                placeholderTextColor="#8d8d8d"
                autoCapitalize="none"
                autoCorrect={false}
                value={eventRegisterLink}
                onChangeText={(text) => setEventRegisterLink(text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Due Date and Time: </Text>
            <Text style={styles.dateandtimeText}>{`${moment(date).format(
              "MMM DD, YYYY || HH:mm"
            )}`}</Text>
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
                  value={date}
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
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddEvent()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
