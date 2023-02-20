import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/Screens/Auth/Login";
import ResetPass from "./src/Screens/Auth/ResetPass";
import Home from "./src/Screens/Home";
import Profile from "./src/Screens/Profile";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Announcements from "./src/Screens/Announcements";
import globals from "./globalStyles/globals";
import Assignments from "./src/Screens/Assignments/AllAssignements";
import AssignmentDetails from "./src/Screens/Assignments/AssignmentDetails";
import Attendance from "./src/Screens/Attendance";
import Events from "./src/Screens/Events";
import Messages from "./src/Screens/Messages";
import Todo from "./src/Screens/Todo";
import Chatroom from "./src/Screens/Chatroom";
import MarksAndCgpa from "./src/Screens/MarksAndCgpa";
import FeeStatus from "./src/Screens/FeeStatus";
import RegisteredCourses from "./src/Screens/RegisteredCourses";
import SemDetails from "./src/Screens/SemDetails";
import RegisterUniversity from "./src/Screens/Auth/RegisterUniversity";
import AdminAllBatchesScreen from "./src/Screens/Admin/AdminAllBatchesScreen";
import AdminAllSectionsScreen from "./src/Screens/Admin/AdminAllSectionsScreen";
import AdminAddAssignment from "./src/Screens/Admin/AdminAddAssignment";
import AdminAddEvent from "./src/Screens/Admin/AdminAddEvent";
import AdminAddAnnouncement from "./src/Screens/Admin/AdminAddAnnouncement";
import AdminAllCoursesScreen from "./src/Screens/Admin/AdminAllCoursesScreen";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import AdminAddStudent from "./src/Screens/Admin/AdminAddStudent";
import AdminAllMembers from "./src/Screens/Admin/AdminAllMembers";
import AdminGraduationYears from "./src/Screens/Admin/AdminSems";
import Gallery from "./src/Screens/Gallery";
import Placements from "./src/Screens/Placements";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const TodoStack = createStackNavigator();

const headerStyle = {
  headerShown: true,
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#747dff",
    height: 85,
  },
  headerTitleStyle: {
    fontFamily: globals.titleText.fontFamily,
    marginRight: "auto",
  },
  headerTitleAlign: "center",
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MessagesStack.Screen name="Messages" component={Messages} />
    </MessagesStack.Navigator>
  );
};

const TodoStackScreen = () => {
  return (
    <TodoStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TodoStack.Screen name="Todo" component={Todo} />
    </TodoStack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          borderRadius: 2,
          overflow: "hidden",
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="ios-home-outline"
                size={20}
                color={focused ? "#747dff" : "#545051"}
              />
              <Text style={{ color: focused ? "#747dff" : "#545051" }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="MessagesScreen"
        component={MessagesStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="message-processing-outline"
                size={20}
                color={focused ? "#747dff" : "#545051"}
              />
              <Text style={{ color: focused ? "#747dff" : "#545051" }}>
                Messages
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="TodoScreen"
        component={TodoStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="clipboard-outline"
                size={20}
                color={focused ? "#747dff" : "#545051"}
              />
              <Text style={{ color: focused ? "#747dff" : "#545051" }}>
                Todo
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome5
                name="user"
                size={20}
                color={focused ? "#747dff" : "#545051"}
              />
              <Text style={{ color: focused ? "#747dff" : "#545051" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Navigator = () => {
  const user = useSelector((state) => state.user.userData);
  const { isLoading } = useSelector((state) => state.user);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#747dff" />
    </View>
  ) : (
    <NavigationContainer>
      {user ? (
        <MainStack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user?.isAdmin ? (
            <MainStack.Screen name="MainTabs" component={MainTabs} />
          ) : (
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Ionicons
                      name="ios-home-outline"
                      size={20}
                      color={focused ? "#747dff" : "#545051"}
                    />
                    <Text style={{ color: focused ? "#747dff" : "#545051" }}>
                      Home
                    </Text>
                  </View>
                ),
              }}
            />
          )}
          <MainStack.Screen
            name="Marks And Cgpa"
            component={MarksAndCgpa}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Fee Status"
            component={FeeStatus}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Registered Courses"
            component={RegisteredCourses}
            options={headerStyle}
          />
          <MainStack.Screen name="Sem Details" component={SemDetails} />
          <MainStack.Screen name="Chatroom" component={Chatroom} />
          <MainStack.Screen
            name="Announcements"
            component={Announcements}
            options={headerStyle}
          />
          <MainStack.Screen
            name="AdminAddAnnouncement"
            component={AdminAddAnnouncement}
            options={{ title: "Add Announcement", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminAllBatchesScreen"
            component={AdminAllBatchesScreen}
            options={{ title: "Batches", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminAllCoursesScreen"
            component={AdminAllCoursesScreen}
            options={{ title: "All Courses", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminAllSectionsScreen"
            component={AdminAllSectionsScreen}
            options={{ title: "All Sections", ...headerStyle }}
          />
          <MainStack.Screen
            name="All Assignments"
            component={Assignments}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Assignment Details"
            component={AssignmentDetails}
            options={headerStyle}
          />
          <MainStack.Screen
            name="AdminAddAssignment"
            component={AdminAddAssignment}
            options={{ title: "Add Assignment", ...headerStyle }}
          />
          <MainStack.Screen
            name="Attendance"
            component={Attendance}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Events"
            component={Events}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Gallery"
            component={Gallery}
            options={headerStyle}
          />
          <MainStack.Screen
            name="Placements"
            component={Placements}
            options={headerStyle}
          />
          <MainStack.Screen
            name="AdminAddEvent"
            component={AdminAddEvent}
            options={{ title: "Add Event", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminAddStudent"
            component={AdminAddStudent}
            options={{ title: "Add Student", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminGraduationYears"
            component={AdminGraduationYears}
            options={{ title: "Sem Details", ...headerStyle }}
          />
          <MainStack.Screen
            name="AdminAllMembers"
            component={AdminAllMembers}
            options={{
              title: "All Members",
              ...headerStyle,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.navigate("AdminAllMembers")}
                >
                  <Ionicons name="arrow-back" size={24} color="#545051" />
                </TouchableOpacity>
              ),
            }}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ResetPass" component={ResetPass} />
          <AuthStack.Screen
            name="RegisterUniversity"
            component={RegisterUniversity}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
