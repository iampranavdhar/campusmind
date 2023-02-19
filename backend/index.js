import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import orgRoutes from "./routes/org.js";
import todoRoutes from "./routes/todo.js";
import batchDetailsRoutes from "./routes/batchDetails.js";
import eventRoutes from "./routes/events.js";
import announcementRoutes from "./routes/announcements.js";
import courseRoutes from "./routes/course.js";
import semDetailsRoutes from "./routes/semDetails.js";
import chatRoutes from "./routes/chat.js";
import notificationRoutes from "./routes/pushNotifications.js";
import galleryRoutes from "./routes/gallery.js";
import http from "http";
import { Server } from "socket.io";
import { collectAlLAssignmentsOnDate } from "./utils/getAssignmentsByDate.js";
import cron from "node-cron";
import { sendNotificationToAllUsersInClass } from "./utils/sendNotification.js";
import DaysNotifications from "./models/DaysNotfications.js";

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Socket.io Setup */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("One User Got Connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("One User Got Disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/batchDetails", batchDetailsRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/semdetails", semDetailsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pushNotifications", notificationRoutes);
app.use("/api/gallery", galleryRoutes);

/* MongoDB connection */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

const collectAssignmentsOnDate = async () => {
  const date = new Date();
  const assignments = await collectAlLAssignmentsOnDate(date);
  await DaysNotifications.deleteMany({});
  const days_notfications = new DaysNotifications({
    notifications: assignments,
    expires: 84600,
  });
  await days_notfications.save();
  console.log(
    `Assignments Collected-${
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    }-${days_notfications.notifications.length} Notifications`
  );
};

cron.schedule("0 4 * * *", async () => {
  await collectAssignmentsOnDate();
});

cron.schedule("*/30 * * * * *", async () => {
  console.log("Cron Job Running For Assignment Reminder");

  const notifis = await DaysNotifications.find({});
  const days_notfications = notifis[0].notifications;

  for (let i = 0; i < days_notfications.length; i++) {
    const assignment = days_notfications[i];
    const assignmentDueDate = new Date(assignment?.assignment_duedateandtime);
    const difference = assignmentDueDate - new Date();
    const hours = Math.floor(difference / (1000 * 60 * 60));
    if (hours <= 1) {
      if (
        await sendNotificationToAllUsersInClass({
          org_id: assignment?.org_id,
          section_id: assignment?.section_id,
          title: "Assignment Due",
          body: `Assignment ${assignment?.assignment_title} is due in 1 hour`,
        })
      ) {
        console.log("Notification Sent");
        days_notfications.splice(i, 1);
        await DaysNotifications.updateOne(
          { _id: notifis[0]._id },
          { $set: { notifications: days_notfications } }
        );
      } else {
        console.log("Notification Not Sent");
      }
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to CampusMind");
});

/* Port Listening In */
server.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
