import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

import { useSelector } from "react-redux";
import globals from "../../../globalStyles/globals.js";
import { MaterialIcons } from "@expo/vector-icons";

const placementInfoCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    width: "100%",
    marginTop: 20,
    overflow: "hidden",
  },
  descriptionText: {
    fontSize: 16,
  },
});

export const PlacementInfoCard = ({ placement }) => {
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
      outputRange: [
        0,
        placement.description.length +
          placement.visiting_date.length +
          placement.visiting_time.length +
          placement.venue.length -
          50,
      ],
    }),
    opacity: animation,
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 10,
        elevation: 5,
      }}
      activeOpacity={0.8}
    >
      <TouchableOpacity onPress={toggleDescription}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {placement.year}
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: placement.logo }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              marginTop: 10,
              objectFit: "cover",
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 5,
              marginLeft: 10,
            }}
          >
            {placement.name}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[placementInfoCardStyles.description, descriptionStyle]}
      >
        <Text style={placementInfoCardStyles.descriptionText}>
          {placement.description}
        </Text>
        <Text
          style={{ ...placementInfoCardStyles.descriptionText, marginTop: 10 }}
        >
          Visiting Date: {placement.visiting_date}
        </Text>
        <Text style={placementInfoCardStyles.descriptionText}>
          Visiting Time: {placement.visiting_time}
        </Text>
        {/* Delelte Course and Edit Course Icon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 5,
              borderRadius: 10,
              marginRight: 15,
            }}
            activeOpacity={0.8}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function Placements() {
  const placementCompanies = [
    {
      year: "2021",
      name: "Google",
      logo: "https://img.freepik.com/free-icon/search_318-265146.jpg?w=360",
      job: "Software Engineer",
      description:
        "Google is seeking a highly motivated and talented software engineering fresher to join our team of experienced developers. As a software engineer, you will work on projects that have a direct impact on millions of users worldwide. You will be responsible for designing, developing, testing, and deploying high-quality software solutions that meet customer needs.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Google Office, Bangalore",
    },
    {
      year: "2021",
      name: "Microsoft",
      logo: "https://cdn1.iconfinder.com/data/icons/flat-and-simple-part-1/128/microsoft-512.png",
      job: "SDE1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Microsoft Office, Bangalore",
    },
    {
      year: "2021",
      name: "Amazon",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg",
      job: "SDE1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Amazon Office, Bangalore",
    },
    {
      year: "2021",
      name: "Meta",
      logo: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png",
      job: "Software Engineer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Facebook Office, Bangalore",
    },
    {
      year: "2021",
      name: "Apple",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-1977.png",
      job: "Software Engineer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Facebook Office, Bangalore",
    },
    {
      year: "2021",
      name: "Netflix",
      logo: "https://about.netflix.com/images/meta/netflix-symbol-black.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam mauris, eget aliquam nisl nisl eu nisl.",
      visiting_date: "11-05-2023",
      visiting_time: "10:00 AM",
      venue: "Facebook Office, Bangalore",
    },
  ];
  const { isAdmin } = useSelector((state) => state.user.userData);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        {placementCompanies?.map((placement, index) => (
          <PlacementInfoCard key={index} placement={placement} />
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
            onPress={() => setShowAddCourseModal(true)}
          >
            <MaterialIcons name="add" size={45} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
