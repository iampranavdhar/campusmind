import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionCard from "../../Components/OptionCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
              size={25}
            />
          </TouchableOpacity>
        </View>
        <ScrollView verticle showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={{
                ...styles.userImage,
                width: width * 0.4,
                height: width * 0.4,
              }}
              source={{
                uri:
                  user?.profile_image === "" || null
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    : user?.profile_image,
              }}
              resizeMode={"cover"} // cover or contain its upto you view look
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  ...styles.userName,
                  fontSize: width * 0.045,
                }}
              >
                {user?.user_full_name}
              </Text>
              <Text
                style={{
                  ...styles.userBranch,
                  fontSize: width * 0.035,
                }}
              >
                {user?.batch_details.branch_name}-
                {user?.batch_details.section_name}
              </Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="star-box"
                  style={styles.rollNumberIcon}
                  size={25}
                />
                <Text
                  style={{
                    ...styles.userInfoTitle,
                    fontSize: width * 0.035,
                  }}
                >
                  Roll Number
                </Text>
              </View>
              <Text
                style={{
                  ...styles.userInfoSubTitle,
                  fontSize: width * 0.03,
                }}
              >
                {user?.user_identity}
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="call" size={13} style={styles.phoneIcon} />
                <Text
                  style={{
                    ...styles.userInfoTitle,
                    fontSize: width * 0.035,
                  }}
                >
                  Phone Number
                </Text>
              </View>
              <Text
                style={{
                  ...styles.userInfoSubTitle,
                  fontSize: width * 0.03,
                }}
              >
                +91-{user?.mobile}
              </Text>
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
