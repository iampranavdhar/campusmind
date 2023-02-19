import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  StyleSheet,
  Animated,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import globals from "../../../globalStyles/globals";
import { useNavigation } from "@react-navigation/native";
import { delete_event, get_events } from "../../redux/actions/eventActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const eventCardStyles = StyleSheet.create({
  description: {
    width: "95%",
    marginTop: 20,
    overflow: "hidden",
  },
  descriptionText: {
    fontSize: 16,
  },
});

export function EventCard({ event }) {
  const [showDescription, setShowDescription] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
    Animated.timing(animation, {
      toValue: showDescription ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const descriptionStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      // outputrange is the height of the description
      outputRange: [0, 200],
    }),
    opacity: animation,
  };

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state?.user?.userData?.isAdmin);

  const eventDelete = async () => {
    try {
      await delete_event(dispatch, event._id);
    } catch (error) {
      alert(error.message);
    }
  };

  // const shareEvent = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: `${event.event_title} | ${event.event_dateandtime} ${event.event_venue}`,
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <View style={styles.eventCard}>
      {isAdmin && (
        <TouchableOpacity
          style={styles.deleleteIcon}
          onPress={() => eventDelete()}
        >
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity style={styles.shareIcon} onPress={() => shareEvent()}>
        <Entypo name="share" size={24} color="black" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={toggleDescription} activeOpacity={0.9}>
        <View>
          <Image
            source={{
              uri: event.event_image,
            }}
            style={{
              height: height * 0.3,
              width: width,
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.eventData}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 5,
            borderBottomWidth: 2,
            borderBottomColor: "#e6e6e6",
          }}
        >
          <Text style={styles.eventTitle}>{event.event_title}</Text>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="users" size={24} color="black" />
            <Text style={{ fontSize: 12, marginLeft: 5 }}>
              {event.event_attendees_count}
            </Text>
          </View> */}
        </View>
        <View>
          <Text style={{ fontFamily: globals.normalText.fontFamily }}>
            {"Venue: "}
            {event.event_venue}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontFamily: globals.normalText.fontFamily }}>
            {"Date: "}
            {moment(event.event_dateandtime).format("MMMM Do YYYY")}
          </Text>
        </View>
        <Animated.View style={[eventCardStyles.description, descriptionStyle]}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: globals.normalText.fontFamily }}>
              {event.event_description}
            </Text>
            {event.event_register_link && (
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  event.event_register_link != "" &&
                    Linking.openURL(event.event_register_link);
                }}
              >
                <Text
                  style={{
                    fontFamily: globals.normalText.fontFamily,
                    ...styles.registerButtonText,
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export default function Events() {
  const navigation = useNavigation();
  const { isAdmin, org_id } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const { eventsData } = useSelector((state) => state.event);

  useEffect(() => {
    const getAllEvents = async () => {
      await get_events(dispatch, org_id);
    };
    getAllEvents();
  }, [org_id]);

  return (
    <View style={styles.events}>
      <ScrollView>
        {eventsData
          ?.slice(0)
          .reverse()
          .map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
      </ScrollView>
      <View
        style={{
          width: "auto",
          position: "absolute",
          bottom: 0,
          right: 15,
          backgroundColor: "transparent",
        }}
      >
        {isAdmin && (
          <TouchableOpacity
            style={{
              bottom: 10,
              ...globals.floatingAddButton,
            }}
            onPress={() => navigation.navigate("AdminAddEvent")}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
