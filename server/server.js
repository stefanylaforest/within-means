const express = require("express");
// const {
//   //handlers go here
// } = require("./handlers");

// const users = require("./data/users.json");

const PORT = 8000;

const app = express();
// endpoint below
//---------------
app.get("/hello", (req, res) => {
  res.send("hello stef");
});
//---------------
//endpoints ^

// this is the catch all endpoint.
app.get("/", (req, res) => {
  res.status(404).json({ status: 404, message: "an error occured" });
});

app.listen(PORT, () => {
  console.log("Listening on Port: 8000");
});
