import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

export default function FeeStatus() {
  return (
    <View style={styles.feeStatus}>
      <View style={styles.feeStatusCard}>
        <Text style={styles.acadYear}>2021-2022</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={styles.cardHeading}>Total</Text>
            <Text style={styles.feeCardText}>2,50,000</Text>
          </View>
          <View>
            <Text style={styles.cardHeading}>Pending</Text>
            <Text style={styles.feeCardText}>0</Text>
          </View>
        </View>
      </View>
      <Text style={styles.feeStatusTitle}>Previous Transactions</Text>
      <View style={styles.tableTopBar}>
        <Text style={{ flex: 0.075, ...styles.tableTopBarText }}>No</Text>
        <Text style={{ flex: 0.3, ...styles.tableTopBarText }}>Date</Text>
        <Text style={{ flex: 0.2, ...styles.tableTopBarText }}>Amount</Text>
        <Text style={{ flex: 0.25, ...styles.tableTopBarText }}>Status</Text>
        <Text style={{ flex: 0.15, ...styles.tableTopBarText }}>Action</Text>
      </View>
      <View style={styles.tableRows}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.tableRow}>
            <Text style={{ flex: 0.075, ...styles.tableRowText }}>1</Text>
            <Text style={{ flex: 0.3, ...styles.tableRowText }}>
              22-02-2020
            </Text>
            <Text style={{ flex: 0.2, ...styles.tableRowText }}>250000</Text>
            <Text style={{ flex: 0.25, ...styles.tableRowText }}>SUCCESS</Text>
            <FontAwesome
              name="download"
              size={20}
              color="black"
              style={{ flex: 0.15, marginHorizontal: 5 }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
