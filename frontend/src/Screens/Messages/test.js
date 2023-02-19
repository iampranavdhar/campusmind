import React, { useEffect, useRef, useState } from "react";
import Message from "../Components/Message.js";
import SidebarChat from "../Components/SidebarChat.js";
import EmptyChatRoom from "../Components/EmptyChatRoom";
import { API_KEY } from "@env";
import axios from "axios";
import { io } from "socket.io-client";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function Home() {
  const [chatroomtiles, setChatroomtiles] = useState([]);
  const [currentchat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [amigo, setAmigo] = useState();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const scrollRef = useRef();
  const socket = useRef();

  /* Making Messages Realtime */

  useEffect(() => {
    socket.current = io(API_KEY + "");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender_id: data.senderId,
        receiver_id: data.receiverId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user, chatroomtiles, currentchat, socket]);

  /* Fetching the Chat Tiles */

  useEffect(() => {
    const getChatroomtiles = async () => {
      try {
        const res = await axios.get(
          API_KEY + "api/chat/getchatrooms/" + user._id
        );
        setChatroomtiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatroomtiles();
  }, [user?._id]);

  /* Fetching ChatRoom Messages */
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          API_KEY + "api/messages/" + currentchat?._id
        );
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentchat, API_URL]);

  /* Scroll to the recent message */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Emoji Picker */
  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage(newMessage + emoji);
  };
  const [pick, setPick] = useState(false);
  const openPicker = () => {
    setPick(!pick);
  };

  /* Posting a Message */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendingMessage = {
      chatroomId: currentchat._id,
      senderId: user._id,
      text: newMessage,
    };

    const receiverId = currentchat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios.post(
        API_URL + "api/messages/",
        sendingMessage
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    setPick(false);
  };

  /* Logout */
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  /* AddChat Toggle Setup */
  const [addtoggle, setAddtoggle] = useState(false);
  const addchatToggler = () => {
    addtoggle === false ? setAddtoggle(true) : setAddtoggle(false);
  };

  /* Profile Page Toggle Setup */
  const [profiletoggle, setProfiletoggle] = useState(false);
  const profiletoggler = () => {
    profiletoggle === false ? setProfiletoggle(true) : setProfiletoggle(false);
  };

  return (
    <div className="home">
      <div className="home-components">
        <div className={open ? "sidebar active" : "sidebar"}>
          <div className="sidebar-chatoptions">
            {chatroomtiles.map((chatroomtile) => (
              <div
                key={chatroomtile?._id}
                onClick={() => {
                  setCurrentchat(chatroomtile);
                  setOpen(false);
                }}
              >
                <SidebarChat chatroomtile={chatroomtile} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Chatroom */}
        <div className="chatroom">
          {currentchat ? (
            <>
              <div className="chatroom-header">
                <div className="chatroom-chatinfo">
                  <img
                    className="amigo-profilepic"
                    src={
                      amigo?.photo
                        ? API_URL + "photo/" + amigo?.photo
                        : "assets/noavatar.jpg"
                    }
                    alt=""
                  />

                  <div className="chatroom-chatinfo-right">
                    <div className="chatroom-chatinfo-name">
                      <p>{amigo?.username}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="chatroom-messages-container"
                onClick={() => {
                  setPick(false);
                }}
              >
                {messages.map((message) => (
                  <div key={message?._id} ref={scrollRef}>
                    <Message
                      message={message}
                      own={message?.senderId === user._id}
                    />
                  </div>
                ))}
              </div>
              <div
                className={pick ? "emoji-picker-open" : "emoji-picker-close"}
              >
                <Picker onSelect={addEmoji} emojiSize={25} />
              </div>
              <div className="chatroom-footer">
                <div className="chatroom-footer-lefticons">
                  <IconButton onClick={openPicker}>
                    <InsertEmoticonIcon />
                  </IconButton>
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                </div>
                <form>
                  <input
                    className="message-input"
                    type="text"
                    name="message-input"
                    placeholder="Type a message"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                    required
                  />
                  <button
                    className="input-button"
                    onClick={newMessage ? handleSubmit : null}
                  >
                    {" "}
                    Send a Message{" "}
                  </button>
                </form>
                <div
                  className="chatroom-footer-righticon"
                  onClick={newMessage ? handleSubmit : null}
                >
                  <IconButton>
                    <SendIcon className="send-icon" />
                  </IconButton>
                </div>
              </div>
            </>
          ) : (
            <EmptyChatRoom />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
