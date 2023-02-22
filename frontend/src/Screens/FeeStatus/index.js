import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "../../Components/Toast/Toast";

const width = Dimensions.get("window").width;

export default function FeeStatus() {
  return (
    <View style={styles.feeStatus}>
      <View style={styles.feeStatusCard}>
        <Text
          style={{
            ...styles.acadYear,
            fontSize: width * 0.035,
          }}
        >
          2021-2022
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            fontSize: width * 0.03,
          }}
        >
          <View>
            <Text
              style={{
                ...styles.cardHeading,
                fontSize: width * 0.04,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                ...styles.feeCardText,
                fontSize: width * 0.06,
              }}
            >
              2,50,000
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.cardHeading,
                fontSize: width * 0.04,
              }}
            >
              Pending
            </Text>
            <Text
              style={{
                ...styles.feeCardText,
                fontSize: width * 0.06,
              }}
            >
              0
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.feeStatusTitle}>Previous Transactions</Text>
      <View style={styles.tableTopBar}>
        <Text
          style={{
            flex: 0.35,
            ...styles.tableTopBarText,
            fontSize: width * 0.03,
          }}
        >
          Date
        </Text>
        <Text
          style={{
            flex: 0.25,
            ...styles.tableTopBarText,
            fontSize: width * 0.03,
          }}
        >
          Amount
        </Text>
        <Text
          style={{
            flex: 0.25,
            ...styles.tableTopBarText,
            fontSize: width * 0.03,
          }}
        >
          Status
        </Text>
        <Text
          style={{
            flex: 0.15,
            ...styles.tableTopBarText,
            fontSize: width * 0.03,
          }}
        >
          Action
        </Text>
      </View>
      <View style={styles.tableRows}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.tableRow}>
            <Text
              style={{
                flex: 0.35,
                ...styles.tableRowText,
                fontSize: width * 0.03,
              }}
            >
              22/02/2020
            </Text>
            <Text
              style={{
                flex: 0.25,
                ...styles.tableRowText,
                fontSize: width * 0.03,
              }}
            >
              250000
            </Text>
            <Text
              style={{
                flex: 0.25,
                ...styles.tableRowText,
                fontSize: width * 0.03,
              }}
            >
              SUCCESS
            </Text>
            <FontAwesome
              name="download"
              size={20}
              color="black"
              style={{
                flex: 0.15,
                marginHorizontal: 5,
              }}
              onPress={() => {
                Toast("Coming Soon");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
