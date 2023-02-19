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
        <KeyboardAvoidingView>
          <View style={{ width: width, height: height }}>
            <View>
              <Text style={styles.welcomeText}>Hello Again!, Welcome Back</Text>
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
            <View style={styles.loginFields}>
              <Text style={styles.loginTitle}>Login</Text>
              <View style={styles.inputField}>
                <MaterialIcons name="email" size={24} color="#8d8d8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputField}>
                <Entypo name="key" size={24} color="#8d8d8d" />
                <TextInput
                  style={styles.textInput}
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
                    fontSize: 12,
                    marginTop: 10,
                  }}
                >
                  {isError ? "Invalid Email or Password" : ""}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPass")}
              >
                <Text style={styles.passwordResettext}>
                  Forget or Reset Password ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterUniversity")}
              >
                <Text style={styles.registerText}>
                  Register Your University?{" "}
                </Text>
              </TouchableOpacity>
              <View style={styles.appName}>
                <Text style={styles.appNameText}>Stuuniverse</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
