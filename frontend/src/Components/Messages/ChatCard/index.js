import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function ChatCard({
  islastMessageSenderYou,
  messageViewed,
  chatroomDetails,
  isSearchResult,
}) {
  const user = useSelector((state) => state.user.userData);
  const navigation = useNavigation();
  const [receiverId, setReceiverId] = useState(null);
  const [receiverDetails, setReceiverDetails] = useState(null);

  useEffect(() => {
    if (chatroomDetails) {
      chatroomDetails?.members?.map((member) => {
        if (member !== user?._id) {
          setReceiverId(member);
        }
      });
    }
  }, [chatroomDetails]);

  useEffect(() => {
    setReceiverDetails(
      chatroomDetails?.members?.filter((member) => member?._id !== user?._id)[0]
    );
  }, [receiverId]);

  return (
    <TouchableOpacity
      style={styles.chatCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("Chatroom", {
          username: `${receiverDetails?.user_full_name}`,
          rollNumber: `${receiverDetails?.user_identity}`,
          userImage: receiverDetails?.profile_image,
          chatroomId: chatroomDetails?._id,
        })
      }
    >
      <View>
        <Image
          style={styles.chatImage}
          source={{
            uri: `${
              receiverDetails?.profile_image
                ? receiverDetails?.profile_image
                : "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1525891879-379720-warren-wong-242286-unsplashjpg.jpg"
            }`,
          }}
          resizeMode={"cover"}
        ></Image>
      </View>
      <View style={styles.chatCardInfo}>
        {!isSearchResult && (
          <View style={styles.chatCardUserInfo}>
            <Text style={styles.chatCardUsername}>
              {receiverDetails?.user_full_name.length > 15
                ? receiverDetails?.user_full_name.substring(0, 15) + "..."
                : receiverDetails?.user_full_name}
            </Text>
            <Text style={styles.chatCardLastMessageTime}>
              {moment(
                chatroomDetails?.messages[chatroomDetails?.messages?.length - 1]
                  ?.createdAt
              )?.format("hh:mm A")}
            </Text>
          </View>
        )}
        <View style={styles.chatCardLastMessageDetails}>
          <Text style={styles.chatCardLastMessage}>
            {!isSearchResult && chatroomDetails?.messages
              ? chatroomDetails?.messages[chatroomDetails?.messages?.length - 1]
                  ?.text?.length > 20
                ? chatroomDetails?.messages[
                    chatroomDetails?.messages?.length - 1
                  ].text.substring(0, 20) + "..."
                : chatroomDetails?.messages[
                    chatroomDetails?.messages?.length - 1
                  ]?.text
              : ""}
          </Text>
          {!isSearchResult && islastMessageSenderYou && messageViewed ? (
            <Ionicons
              name="checkmark-done-sharp"
              size={25}
              style={styles.messageViewIcon}
              color="black"
            />
          ) : (
            <Ionicons
              name="checkmark-sharp"
              size={25}
              style={styles.messageViewIcon}
              color="black"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
