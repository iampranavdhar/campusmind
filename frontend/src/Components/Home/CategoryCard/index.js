import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "../../Toast/Toast";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

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
      style={{ borderBottomColor: color, ...styles.categoryCard }}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={{ ...styles.categoryName }}>
        {cardTitle ? cardTitle : categoryName}
      </Text>
    </TouchableOpacity>
  );
}
