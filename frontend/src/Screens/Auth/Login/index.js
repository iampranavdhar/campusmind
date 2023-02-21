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
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/actions/userActions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

  const handleLogin = () => {
    login(dispatch, { email, password });
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{ width: width, height: height }}
            onPress={Keyboard.dismiss}
          >
            <View>
              <Text
                style={{
                  ...styles.welcomeText,
                  fontSize: width * 0.07,
                }}
              >
                Hello Again!, Welcome Back
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: width * 0.5,
                  height: height * 0.3,
                }}
                source={require("../../../../assets/images/login.png")}
              />
            </View>
            <View
              style={{
                ...styles.loginFields,
                height: height * 0.55,
                width: width,
              }}
            >
              <Text
                style={{
                  ...styles.loginTitle,
                  fontSize: width * 0.05,
                }}
              >
                Login
              </Text>
              <View style={styles.inputField}>
                <MaterialIcons name="email" size={24} color="#8d8d8d" />
                <TextInput
                  style={{
                    ...styles.textInput,
                    fontSize: width * 0.04,
                  }}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputField}>
                <Entypo name="key" size={24} color="#8d8d8d" />
                <TextInput
                  style={{
                    ...styles.textInput,
                    fontSize: width * 0.04,
                  }}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: "red",
                    fontSize: width * 0.04,
                  }}
                >
                  {isError ? "Invalid Email or Password" : ""}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPass")}
              >
                <Text
                  style={{
                    ...styles.passwordResettext,
                    fontSize: width * 0.035,
                  }}
                >
                  Forget or Reset Password ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.loginButton,
                  width: width * 0.9,
                  height: height * 0.06,
                }}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterUniversity")}
              >
                <Text
                  style={{
                    ...styles.registerText,
                    fontSize: width * 0.033,
                  }}
                >
                  Register Your University?{" "}
                </Text>
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
