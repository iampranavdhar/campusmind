import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";
import {
  add_announcement,
  get_announcements,
} from "../../../redux/actions/announcementActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import { API_KEY } from "@env";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AdminAddAssignment() {
  const navigation = useNavigation();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(API_KEY);
    socket.current.emit("sendNotification", {
      message: "New Announcement Added",
    });
  }, [socket]);

  const categories = [
    { id: "1", label: "Exams", value: "Exams", color: "#9747F0" },
    { id: "2", label: "Assignment", value: "Assignment", color: "#FFB3B3" },
    { id: "3", label: "Project", value: "Project", color: "#53ABE8" },
    { id: "4", label: "Quiz", value: "Quiz", color: "#FFCD00" },
    { id: "5", label: "Other", value: "Other", color: "#FF8C00" },
  ];
  const [announcementCategory, setAnnouncementCategory] = useState(
    categories[0].value
  );
  const [announcement, setAnnouncement] = useState("");
  const [color, setColor] = useState(categories[0].color);

  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.announcement);

  useEffect(() => {
    categories.filter((category) => {
      if (category.value === announcementCategory) {
        setColor(category.color);
      }
    });
  }, [announcementCategory]);

  const handleAddAnnouncement = async () => {
    if (announcementCategory === "" || announcement === "") {
      alert("Please fill all the fields");
    } else {
      try {
        await add_announcement(dispatch, {
          org_id: userData.org_id,
          announcement_category: announcementCategory,
          announcement: announcement,
          color: color,
        });
        await get_announcements(dispatch, userData.org_id);
        navigation.navigate("Announcements");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

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
        ...styles.adminAddAnnouncement,
      }}
    >
      <View>
        <View style={styles.category}>
          <Text style={styles.lableText}>Category:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              ref={pickerRef}
              selectedValue={announcementCategory}
              onValueChange={(itemValue, itemIndex) =>
                setAnnouncementCategory(itemValue)
              }
            >
              {categories.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.announcementDetails}>
          <View>
            <Text style={styles.lableText}>Announcement</Text>
            <View style={styles.descriptionInput}>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.descriptionTextInput}
                textAlignVertical="top"
                placeholder="Assignment Description"
                onChangeText={(text) => setAnnouncement(text)}
                value={announcement}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddAnnouncement()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
