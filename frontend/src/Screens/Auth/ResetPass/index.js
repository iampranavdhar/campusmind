import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Login() {
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View style={{ width: width, height: height }}>
            <View>
              <Text style={styles.welcomeText}>Forgot Password</Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: width * 0.8,
                  height: height * 0.3,
                }}
                source={require("../../../../assets/images/resetpass.png")}
              />
            </View>
            <View style={styles.inputFields}>
              <View style={styles.inputField}>
                <FontAwesome name="phone" size={24} color="#8d8d8d" />
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={mobile}
                  onChangeText={(text) => setMobile(text)}
                  placeholder="Register Mobile Number"
                />
              </View>
              <View style={styles.inputField}>
                <Entypo name="key" size={24} color="#8d8d8d" />
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                  style={styles.textInput}
                  placeholder="Password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputField}>
                <Entypo name="key" size={24} color="#8d8d8d" />
                <TextInput
                  value={confirmPassword}
                  style={styles.textInput}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                />
              </View>
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.appName}>
                <Text style={styles.appNameText}>Campus Mind</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
