import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import ClassCard from "../../Components/Home/ClassCard";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import CategoryCard from "../../Components/Home/CategoryCard";
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
import HolidayCard from "../../Components/HolidayCard";
import { useSelector, useDispatch } from "react-redux";
import { get_timetable } from "../../redux/actions/batchDetailActions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  add_push_notification_token,
  logout,
} from "../../redux/actions/userActions";
import {
  GetFCMToken,
  NotificationListener,
} from "../../utils/pushNotificationHelper";

const width = Dimensions.get("window").width;

export default function Home({ navigation }) {
  const [greetingText, setGreetingText] = useState("");
  const [todaysTimetable, setTodaysTimetable] = useState([]);
  const dispatch = useDispatch();

  // For Scrolling to the ongoing class
  const ongoingClassRef = useRef(null);
  const [ongoingClassCardNumber, setOngoingClassCardNumber] = useState(0);

  useEffect(() => {
    if (ongoingClassRef.current) {
      ongoingClassRef.current.scrollTo({
        x: ongoingClassCardNumber * width * 0.6,
        y: 0,
        animated: true,
      });
    }
  }, [ongoingClassCardNumber]);

  const user = useSelector((state) => state.user.userData);
  const pushNotificationToken = useSelector(
    (state) => state.user.userPushNotificationToken
  );
  const timeTableData = useSelector((state) => state.batch.timetableData);

  useEffect(() => {
    GetFCMToken(user);
    NotificationListener();
  }, []);

  useEffect(() => {
    if (moment().hour() >= 0 && moment().hour() < 12) {
      setGreetingText("Good Morning");
    } else if (moment().hour() >= 12 && moment().hour() < 16) {
      setGreetingText("Good Afternoon");
    } else if (moment().hour() >= 16 && moment().hour() <= 24) {
      setGreetingText("Good Evening");
    }
  }, []);

  useEffect(() => {
    get_timetable(dispatch, {
      section_id: user?.batch_details?.section_id,
    });
  }, []);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const holidays = [
    {
      date: "06-01-2022",
      reason: "Today is a holiday",
    },
  ];

  useEffect(() => {
    if (timeTableData) {
      setTodaysTimetable(
        timeTableData.filter((item) => item.day === days[moment().day()])[0]
      );
    }
  }, [timeTableData]);

  return (
    <SafeAreaView>
      <View style={styles.home}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => !user?.isAdmin && navigation?.navigate("Profile")}
          >
            <Image
              style={styles.userImage}
              source={{
                uri:
                  user?.profile_image === "" || null
                    ? "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg"
                    : user?.profile_image,
              }}
              onPress={() => navigation?.navigate("ProfileScreen")}
            />
          </TouchableOpacity>
          {user?.isAdmin ? (
            <TouchableOpacity
              onPress={() => logout(dispatch, user, pushNotificationToken)}
            >
              <MaterialCommunityIcons
                style={styles.logOutIcon}
                name="logout"
                size={30}
              />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name="notifications"
              size={30}
              color="#242424"
              onPress={() => navigation.navigate("Announcements")}
            />
          )}
        </View>
        <ScrollView verticle showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeMessage}>
            <Text
              style={{
                ...styles.welcomeMessageNameText,
                fontSize: width * 0.05,
              }}
            >
              {user?.isAdmin
                ? "Welcome to Admin Portal"
                : `Hi! ${user?.user_full_name}`}
            </Text>
            {user?.isAdmin && (
              <Text style={styles.welcomeMessageNameText}>
                {user?.user_full_name}
              </Text>
            )}
            <Text style={styles.welcomeMessageGreetingText}>
              {greetingText}
            </Text>
          </View>
          {user?.isAdmin ? null : (
            <View style={styles.schedule}>
              <Text
                style={{
                  ...styles.scheduleTitle,
                  fontSize: width * 0.025,
                }}
              >
                TODAY'S SCHEDULE
              </Text>
              <Text
                style={{
                  ...styles.scheduleDate,
                  fontSize: width * 0.04,
                }}
              >
                {days[new Date().getDay()]},{" "}
                {new moment(moment()).format("MMM DD, YYYY")}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.classCards}
                ref={ongoingClassRef}
              >
                {holidays
                  .map((holiday) => holiday.date)
                  .includes(moment().format("DD-MM-YYYY")) ? (
                  <HolidayCard />
                ) : todaysTimetable?.day_classes?.length !== 0 &&
                  todaysTimetable !== undefined ? (
                  todaysTimetable?.day_classes?.map((classDetails, index) => (
                    <ClassCard
                      key={index}
                      classDetails={classDetails}
                      cardNumber={index + 1}
                      setOngoingClassCardNumber={setOngoingClassCardNumber}
                    />
                  ))
                ) : (
                  <HolidayCard />
                )}
              </ScrollView>
            </View>
          )}
          <View style={styles.categories}>
            <CategoryCard
              icon={<FontAwesome5 name="book-open" size={30} color="#E376AE" />}
              categoryName={
                user?.isAdmin ? "AdminAllBatchesScreen" : "All Assignments"
              }
              cardTitle={"Assignments"}
              color={"#E376AE"}
            />
            <CategoryCard
              icon={<Ionicons name="notifications" size={30} color="#9747FF" />}
              categoryName={"Announcements"}
              color={"#9747FF"}
            />
            <CategoryCard
              icon={
                <MaterialIcon
                  name="event-available"
                  size={30}
                  color="#699BF7"
                />
              }
              categoryName={"Events"}
              color={"#699BF7"}
            />
            <CategoryCard
              icon={<Feather name="user-check" size={30} color="#FFD233" />}
              categoryName={"Attendance"}
              color={"#FFD233"}
              comingSoon={true}
            />
            {user?.isAdmin && (
              <CategoryCard
                icon={<Entypo name="add-user" size={30} color="#4ECB71" />}
                categoryName={user?.isAdmin ? "AdminAddStudent" : null}
                cardTitle={"Add Member"}
                color={"#4ECB71"}
              />
            )}
            {user?.isAdmin && (
              <CategoryCard
                icon={<Entypo name="users" size={30} color="#F24E1E" />}
                categoryName={user?.isAdmin ? "AdminAllMembers" : null}
                cardTitle={"All Members"}
                color={"#F24E1E"}
              />
            )}
            {user?.isAdmin && (
              <CategoryCard
                icon={<Entypo name="users" size={30} color="cyan" />}
                categoryName={user?.isAdmin ? "AdminAllCoursesScreen" : null}
                cardTitle={"Courses"}
                color={"cyan"}
              />
            )}
            {user?.isAdmin && (
              <CategoryCard
                icon={<Entypo name="users" size={30} color="gray" />}
                categoryName={user?.isAdmin ? "AdminGraduationYears" : null}
                cardTitle={"Sems"}
                color={"gray"}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.placementsBanner}
            onPress={() => navigation.navigate("Placements")}
          >
            <Image
              style={styles.placementsBannerImage}
              source={require("../../../assets/placementsImage.webp")}
            />
            <View style={styles.placementsBannerOverlay}></View>
            <Text style={styles.placementsBannerText}>Placements</Text>
            <Ionicons
              name="ios-arrow-forward"
              size={25}
              color="white"
              style={styles.placementsBannerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.galleryBanner}
            onPress={() => navigation.navigate("Gallery")}
          >
            <Image
              style={styles.galleryBannerImage}
              source={require("../../../assets/gallery_image.webp")}
            />
            <View style={styles.galleryBannerOverlay}></View>
            <Text style={styles.galleryBannerText}>Gallery</Text>
            <Ionicons
              name="ios-arrow-forward"
              size={25}
              color="white"
              style={styles.galleryBannerIcon}
            />
          </TouchableOpacity>
          <View style={styles.emptyContainer}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
