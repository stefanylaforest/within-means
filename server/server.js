const express = require("express");
const morgan = require("morgan");
// const {
//   //handlers go here
// } = require("./handlers");

// const users = require("./data/users.json");

// const PORT = 8001;
const PORT = process.env.PORT || 8001;

const app = express();
// endpoint below
//---------------
app.get("/hello", (req, res) => {
  res.send("hello stef, this is me, server");
});
//---------------
//endpoints ^

// this is the catch all endpoint.
app.get("/", (req, res) => {
  res.status(404).json({ status: 404, message: "an error occured" });
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
