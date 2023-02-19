import express from "express";
import Chatroom from "../models/Chat/ChatRoom.js";
import Message from "../models/Chat/Message.js";
import User from "../models/User.js";

const router = express.Router();

/* Creating a Chatroom by members userId's */
router.post("/createroom", async (req, res) => {
  const newChatroom = new Chatroom({
    org_id: req.body.org_id,
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedChatroom = await newChatroom.save();
    res.status(200).json(savedChatroom);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Getting Chatrooms of a Particular user based on UserId*/
router.post("/getchatrooms", async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({
      org_id: req.body.org_id,
      members: { $in: [req.body.user_id] },
    })
      .populate("messages")
      .populate("members");
    res.status(200).json(chatrooms);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get the chatroom details based on the chatroom id
router.post("/getchatroomdetails", async (req, res) => {
  try {
    const chatroom = await Chatroom.findOne({
      _id: req.body.chatroom_id,
    }).populate("messages");
    res.status(200).json(chatroom);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get chatroom based on the org_id and members
router.post("/getchatroom", async (req, res) => {
  try {
    const chatroom = await Chatroom.findOne({
      org_id: req.body.org_id,
      members: { $all: [req.body.sender_id, req.body.receiver_id] },
    })
      .populate("messages")
      .populate("members");
    if (chatroom) {
      res.status(200).json(chatroom);
    } else {
      const newChatroom = new Chatroom({
        org_id: req.body.org_id,
        members: [req.body.sender_id, req.body.receiver_id],
      });
      try {
        const savedChatroom = await newChatroom.save();
        res.status(200).json(savedChatroom);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/createmessage", async (req, res) => {
  const newMessage = await new Message({
    chatroomId: req.body.chatroomId,
    senderId: req.body.senderId,
    text: req.body.text,
  });
  try {
    const savedMessage = await newMessage.save();
    await Chatroom.findOneAndUpdate(
      {
        _id: req.body.chatroomId,
      },
      {
        $push: {
          messages: savedMessage._id,
        },
      }
    );

    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/updatemessage", async (req, res) => {
  try {
    const upadatedMessage = await Message.findOneAndUpdate(
      {
        _id: req.body.message_id,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );
    res.status(200).json(upadatedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Get Messages based on the conversationId */
router.get("/getmessages/:chatroomId", async (req, res) => {
  try {
    const messages = await Message.find({
      chatroomId: req.params.chatroomId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get the reciver details based on the user id and org id
router.post("/getreceiverdetails", async (req, res) => {
  try {
    const response = await User.findOne({
      org_id: req.body.org_id,
      _id: req.body.receiver_id,
    });
    res.status(200).json({
      profile_image: response?.profile_image ? response?.profile_image : "",
      user_full_name: response?.user_full_name ? response?.user_full_name : "",
      user_identity: response?.user_identity ? response?.user_identity : "",
      email: response?.email ? response?.email : "",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const response = await User.find({
      org_id: req.body.org_id,
    });
    const newData = response.map((item) => {
      return {
        _id: item._id,
        profile_image: item?.profile_image ? item?.profile_image : "",
        user_full_name: item?.user_full_name ? item?.user_full_name : "",
        user_identity: item?.user_identity ? item?.user_identity : "",
        email: item?.email ? item?.email : "",
      };
    });
    res.status(200).json(newData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
