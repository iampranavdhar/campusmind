import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatCard from "../../Components/Messages/ChatCard";
import { styles } from "./styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_KEY } from "@env";
import { get_chat_data } from "../../redux/actions/userActions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const SearchResultChatCard = ({ chatCard }) => {
  const user = useSelector((state) => state.user.userData);
  const navigation = useNavigation();

  const handleSearchResultClick = async (chatCard) => {
    const data = {
      org_id: user?.org_id,
      sender_id: chatCard?._id,
      receiver_id: user?._id,
    };

    try {
      const res = await axios(
        {
          method: "POST",
          url: API_KEY + "api/chat/getchatroom",
          data: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        const receiverDetails = await res.data.members.filter(
          (member) => member._id !== user._id
        )[0];
        if (receiverDetails) {
          navigation.push("Chatroom", {
            username: receiverDetails?.user_full_name,
            rollNumber: receiverDetails?.user_identity,
            userImage: receiverDetails?.profile_image,
            chatroomId: res.data._id,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.searchChatCard}
      activeOpacity={0.8}
      onPress={() => handleSearchResultClick(chatCard)}
    >
      <View>
        <Image
          style={styles.searchChatImage}
          source={{
            uri: chatCard?.profile_image,
          }}
          resizeMode={"cover"}
        ></Image>
      </View>
      <View style={styles.searchChatCardInfo}>
        <View style={styles.searchChatCardUserInfo}>
          <Text
            style={{
              ...styles.searchChatCardUsername,
              fontSize: width * 0.04,
            }}
          >
            {chatCard?.user_full_name.length > 22
              ? chatCard?.user_full_name.substring(0, 22) + "..."
              : chatCard?.user_full_name}
          </Text>
        </View>
        <View style={styles.searchChatCardUserDetails}>
          <Text
            style={{
              ...styles.searchChatCardUserIdentity,
              fontSize: width * 0.03,
            }}
          >
            {chatCard?.user_identity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Messages() {
  const [searchChatName, setSearchChatName] = useState("");
  const user = useSelector((state) => state.user.userData);
  const chatCards = useSelector((state) => state.user.chatData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getChatroomtiles = async () => {
      const data = {
        org_id: user?.org_id,
        user_id: user?._id,
      };
      await get_chat_data(dispatch, data);
      setIsLoading(false);
    };
    getChatroomtiles();
  }, [user?._id]);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = {
        org_id: user?.org_id,
      };
      try {
        console.log(data);
        const res = await axios(
          {
            method: "POST",
            url: API_KEY + "api/chat/getallusers",
            data: data,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAllUsers(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, [user]);

  return (
    <SafeAreaView>
      <View style={styles.messages}>
        <View style={styles.messagesTopBar}>
          <Text
            style={{
              ...styles.messagestopBarTitle,
              fontSize: width * 0.05,
            }}
          >
            Chats
          </Text>
          <TouchableOpacity>
            <Entypo name="add-user" size={20} style={styles.addUser} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Ionicons
            name="ios-search"
            size={20}
            style={styles.searchIcon}
            color="black"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSearchChatName(text)}
            value={searchChatName}
            placeholder="Search for Chats"
          />
        </View>
        {isLoading ? (
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView
            verticle
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 400 }}
          >
            {searchChatName === "" ||
            searchChatName === null ||
            searchChatName === undefined ? (
              chatCards?.map((chatCard, index) => (
                <ChatCard
                  islastMessageSenderYou={true}
                  messageViewed={true}
                  chatroomDetails={chatCard}
                  isSearchResult={false}
                  setisLoading={setIsLoading}
                  key={index}
                />
              ))
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 15,
                  }}
                >
                  All Users
                </Text>
                {allUsers
                  ?.filter((chatCard) => {
                    if (
                      (chatCard?.user_full_name
                        ?.toLowerCase()
                        ?.includes(searchChatName.toLowerCase()) ||
                        chatCard?.user_identity
                          ?.toLowerCase()
                          ?.includes(searchChatName.toLowerCase())) &&
                      chatCard?._id !== user?._id
                    ) {
                      return chatCard;
                    }
                  })
                  ?.map((chatCard, index) => (
                    <SearchResultChatCard chatCard={chatCard} key={index} />
                  ))}
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
