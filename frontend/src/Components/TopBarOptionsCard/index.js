import React from "react";
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";

export default function TopBarOptionsCard() {
  return (
    <View style={styles.topBarOptionsCard}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentStyleContainer={styles.options}
      >
        <TouchableOpacity>
          <Text style={styles.option}>Opt1</Text>
        </TouchableOpacity>
        <Text style={styles.option}>Opt2</Text>
        <Text style={styles.option}>Opt3</Text>
        <Text style={styles.option}>Opt4</Text>
        <Text style={styles.option}>Opt5</Text>
        <Text style={styles.option}>Opt1</Text>
        <Text style={styles.option}>Opt1</Text>
        <Text style={styles.option}>Opt1</Text>
        <Text style={styles.option}>Opt1</Text>
        <Text style={styles.option}>Opt1</Text>
      </ScrollView>
    </View>
  );
}
