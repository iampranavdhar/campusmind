import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionCard from "../../Components/OptionCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const user = useSelector((state) => state.user.userData);
  const pushNotificationToken = useSelector(
    (state) => state.user.userPushNotificationToken
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.profile}>
        <View style={styles.profileTopBar}>
          <Text style={styles.profileTitle}>Profile</Text>
          <TouchableOpacity
            onPress={() => logout(dispatch, user, pushNotificationToken)}
          >
            <MaterialCommunityIcons
              style={styles.logOutIcon}
              name="logout"
              size={30}
            />
          </TouchableOpacity>
        </View>
        <ScrollView verticle showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={styles.userImage}
              source={{
                uri:
                  user?.profile_image === "" || null
                    ? "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1525891879-379720-warren-wong-242286-unsplashjpg.jpg"
                    : user?.profile_image,
              }}
              resizeMode={"cover"} // cover or contain its upto you view look
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text style={styles.userName}>{user?.user_full_name}</Text>
              <Text style={styles.userBranch}>{user?.user_branch}</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="star-box"
                  style={styles.rollNumberIcon}
                />
                <Text style={styles.userInfoTitle}>Roll Number</Text>
              </View>
              <Text style={styles.userInfoSubTitle}>{user?.user_identity}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="call" size={15} style={styles.phoneIcon} />
                <Text style={styles.userInfoTitle}>Phone Number</Text>
              </View>
              <Text style={styles.userInfoSubTitle}>+91-{user?.mobile}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.push("Marks And Cgpa")}>
              <OptionCard optionCardTitle={"CGPA & Marks"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push("Registered Courses")}
            >
              <OptionCard optionCardTitle={"Registered Courses"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("Fee Status")}>
              <OptionCard optionCardTitle={"Fee Status"} />
            </TouchableOpacity>
          </View>
          <View style={styles.emptyDiv}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
