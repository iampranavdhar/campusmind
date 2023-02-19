import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "../../Components/Messages/MessageCard";
import { styles } from "./styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import globals from "../../../globalStyles/globals";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { io } from "socket.io-client";
import Toast from "../../Components/Toast/Toast";
import { API_KEY } from "@env";
const width = Dimensions.get("window").width;

export default function Chatroom({ route }) {
  const { username, rollNumber, userImage, chatroomId } = route.params;
  const user = useSelector((state) => state.user.userData);

  const [chatroomDetails, setChatroomDetails] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const getChatroomDetails = async () => {
      const data = {
        chatroom_id: chatroomId,
      };
      try {
        const res = await axios(
          {
            method: "POST",
            url: API_KEY + "api/chat/getchatroomdetails",
            data: data,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setChatroomDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatroomDetails();
  }, [chatroomId]);

  useEffect(() => {
    socket.current = io(API_KEY + "");
    socket.current.on("getMessage", (data) => {
      setChatroomDetails((prev) => {
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              senderId: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            },
          ],
        };
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user, chatroomId, socket]);

  /* Posting a Message */
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessageText === "") return;

    const receiverId = chatroomDetails.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessageText,
    });

    try {
      const res = await axios(
        {
          method: "POST",
          url: API_KEY + "api/chat/createmessage",
          data: {
            chatroomId: chatroomId,
            senderId: user._id,
            text: newMessageText,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setChatroomDetails((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, res.data],
        };
      });
      setNewMessageText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/images/chatroom_bg4.jpg")}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 80,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image source={{ uri: userImage }} style={styles.topBarImage} />
          <View style={styles.topBarUserInfo}>
            <Text style={styles.topBarUserInfoName}>{username}</Text>
            <Text style={styles.topBarUserInfoRollNumber}>{rollNumber}</Text>
          </View>
        </View>
        <View
          style={{
            height: "75%",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 15,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {chatroomDetails?.messages.map((message) => {
              return (
                <MessageCard
                  key={message._id}
                  messageText={message.text}
                  messageTime={moment(message.createdAt).format("hh:mm A")}
                  messageSent={message.senderId == user._id}
                />
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "#8d8d8d",
              marginHorizontal: 5,
              marginLeft: 25,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity>
              <Entypo name="emoji-happy" size={24} color="gray" />
            </TouchableOpacity>
            <TextInput
              placeholder="Type a message"
              onChangeText={(text) => setNewMessageText(text)}
              value={newMessageText}
              style={{
                height: 40,
                width: width - 150,
                paddingHorizontal: 5,
                paddingTop: 2,
                fontFamily: globals.normalText.fontFamily,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Toast("Comming Soon");
              }}
            >
              <Entypo name="attachment" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "lightgreen",
              borderRadius: 15,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginRight: 15,
            }}
            onPress={handleMessageSubmit}
          >
            <Ionicons name="send" color="green" size={25} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
