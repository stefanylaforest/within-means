"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  addUser,
  getUsers,
  authenticateUser,
  getSingleUser,
  updateStatus,
  editProfile,
  googleLogin,
} = require("./handlers");

// // const users = require("./data/users.json");

const PORT = process.env.PORT || 8001;

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static("public"));

// // endpoint below
// //---------------

app.get("/hello", (req, res) => {
  res.json({ message: "Hello Stef, this is a test from server!" });
});

app.post("/api/register", addUser);
app.get("/api/users", getUsers);
// app.patch("/api/:userId/users", saveToFavorites);
app.post("/api/login", authenticateUser);
app.post("/api/googlelogin", googleLogin);
app.get("/api/users/:userId", getSingleUser);
app.patch("/api/users/:userId/update-status", updateStatus);
app.patch("/api/users/:userId/edit", editProfile);

// //---------------
// //endpoints ^

// // this is the catch all endpoint.
// app.get("/", (req, res) => {
//   res.status(404).json({ status: 404, message: "an error occured" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
