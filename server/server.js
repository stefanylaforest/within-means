"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  addUser,
  getUsers,
  authenticateUser,
  getSingleUser,
  updateStatus,
  editProfile,
  googleLogin,
  sendMessage,
  deleteMessage,
  addToFavorites,
  removeFromFavorites,
} = require("./handlers");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// // endpoint below
// //---------------

app.get("/hello", (req, res) => {
  res.json({
    message: "Hey there, nice seeing you here! This is a test from the server.",
  });
});

app.post("/api/register", addUser);
app.get("/api/users", getUsers);
app.post("/api/login", authenticateUser);
app.post("/api/googlelogin", googleLogin);
app.get("/api/users/:userId", getSingleUser);
app.patch("/api/users/:userId/update-status", updateStatus);
app.patch("/api/users/:userId/edit", editProfile);
app.patch("/api/users/:userId/message", sendMessage);
app.patch("/api/users/:userId/message/delete", deleteMessage);
app.patch("/api/users/:userId/save", addToFavorites);
app.patch("/api/users/:userId/save/remove", removeFromFavorites);

// //---------------
// //endpoints ^

// // this is the catch all endpoint.
// app.get("/", (req, res) => {
//   res.status(404).json({ status: 404, message: "an error occured" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
