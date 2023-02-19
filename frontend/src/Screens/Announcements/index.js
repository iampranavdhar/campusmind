import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AnnouncementCard from "../../Components/AnnouncementCard";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { get_announcements } from "../../redux/actions/announcementActions";
import globals from "../../../globalStyles/globals";
const { useSelector, useDispatch } = require("react-redux");

export default function Announcements() {
  const navigation = useNavigation();

  const { isAdmin, org_id } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const { announcementsData } = useSelector((state) => state.announcement);

  useEffect(() => {
    const getAllAnnouncements = async () => {
      await get_announcements(dispatch, org_id);
    };
    getAllAnnouncements();
  }, [org_id]);

  return (
    <View style={styles.announcements}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {announcementsData
          ?.slice(0)
          .reverse()
          .map((announcement, index) => {
            return (
              <AnnouncementCard
                key={index}
                announcementCategoryColor={announcement.color}
                announcementCategory={announcement.announcement_category}
                announcementText={announcement.announcement}
                announcementDate={announcement.createdAt}
                announcementTime={announcement.createdAt}
              />
            );
          })}
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <View
        style={{
          width: "auto",
          position: "absolute",
          bottom: 10,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={globals.floatingAddButton}
            onPress={() => navigation.navigate("AdminAddAnnouncement")}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
