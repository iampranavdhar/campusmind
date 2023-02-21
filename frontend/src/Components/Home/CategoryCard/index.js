import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Toast from "../../Toast/Toast";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CategoryCard({
  icon,
  categoryName,
  color,
  cardTitle,
  comingSoon,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        comingSoon ? Toast("Comming Soon") : navigation?.push(categoryName)
      }
      style={{
        borderBottomColor: color,

        ...styles.categoryCard,
        width: width * 0.4,
      }}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={{ ...styles.categoryName, fontSize: width * 0.034 }}>
        {cardTitle ? cardTitle : categoryName}
      </Text>
    </TouchableOpacity>
  );
}
