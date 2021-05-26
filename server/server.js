"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { addUser, getUsers } = require("./handlers");

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

app.post("/users", addUser);
app.get("/users", getUsers);

// //---------------
// //endpoints ^

// // this is the catch all endpoint.
// app.get("/", (req, res) => {
//   res.status(404).json({ status: 404, message: "an error occured" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
