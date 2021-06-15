"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
var assert = require("assert");
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;
const { CLIENT_ID } = process.env;
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const googleClient = new OAuth2Client(process.env.CLIENT_ID);

let client;
const initMongo = async () => {
  client = await MongoClient(MONGO_URI, options);
  client.connect();
};

initMongo();

const addUser = async (req, res) => {
  const { email } = req.body;
  const db = client.db("WithinMeans");
  const chosenPassword = await bcrypt.hash(req.body.password, saltRounds);
  const checkIfUserExists = await db
    .collection("users")
    .findOne({ email: email });
  if (checkIfUserExists) {
    res.status(401).json({
      status: 401,
      message: `${email} is already in use. Please sign in.`,
    });
  } else {
    const newUser = await db.collection("users").insertOne({
      _id: uuidv4(),
      name: null,
      email: email,
      password: chosenPassword,
      title: null,
      skills: [],
      avatar: "/images/profile-pics/no-photo-selected.png",
      website: null,
      bio: null,
      status: null,
      statusDate: null,
      saved: [],
      swaps: null,
      rating: null,
      inbox: [],
    });
    assert.strictEqual(1, newUser.insertedCount);
    const grabNewUser = await db.collection("users").findOne({ email: email });
    res
      .status(201)
      .json({ status: 201, message: `welcome ${email}`, data: grabNewUser });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  const db = client.db("WithinMeans");
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email_verified, name, email, picture } = ticket.getPayload();

  if (email_verified) {
    const user = await db.collection("users").findOne({ email: email });
    if (user) {
      res.status(200).json({
        status: 200,
        message: `welcome back ${name}`,
        data: user,
      });
    } else {
      const newPassword = bcrypt.hash(email + uuidv4(), saltRounds);
      const newUser = db.collection("users").insertOne({
        _id: uuidv4(),
        name: name,
        email: email,
        password: newPassword,
        title: null,
        skills: [],
        avatar: picture,
        website: null,
        bio: null,
        status: null,
        statusDate: null,
        saved: [],
        swaps: null,
        rating: null,
        inbox: [],
      });
      assert.strictEqual(1, newUser.insertedCount);
      res
        .status(201)
        .json({ status: 201, message: `welcome ${name}`, data: newUser });

      // console.log("res", ticket.getPayload());
    }
  }
};

const authenticateUser = async (req, res) => {
  try {
    const db = client.db("WithinMeans");
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "no account to this email",
        data: user,
      });
    }
    if (user) {
      const checkForMatchingPw = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (checkForMatchingPw) {
        res.status(200).json({
          status: 200,
          message: "User Authentication Successful",
          data: user,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Incorrect Email or Password",
        });
      }
    }
  } catch (error) {
    res.status(500).send("internal server error :(");
  }
};

const getUsers = async (req, res) => {
  try {
    const db = client.db("WithinMeans");
    const users = await db.collection("users").find().toArray();
    res.status(200).json({
      status: 200,
      message: "All Users",
      data: users,
    });
  } catch {
    res.status(404).json({
      status: 404,
      message: "Error :(",
    });
  }
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const user = await db.collection("users").findOne({ _id: userId });
  if (user) {
    res
      .status(200)
      .json({ status: 200, message: `user ${userId} found`, data: user });
  } else {
    res.status(404).json({ status: 404, message: `user ${userId} not found` });
  }
};

const updateStatus = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const updateRequest = req.body;

  let updatedProfile = await db.collection("users").findOneAndUpdate(
    { _id: userId },
    {
      $set: updateRequest,
    }
  );
  const user = await db.collection("users").findOne({ _id: userId });
  res.status(200).json({ status: 200, message: `profile update`, data: user });
};

const editProfile = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const updateRequest = req.body;

  let updatedProfile = await db.collection("users").findOneAndUpdate(
    { _id: userId },
    {
      $set: updateRequest,
    }
  );
  const user = await db.collection("users").findOne({ _id: userId });
  res.status(200).json({ status: 200, message: `profile update`, data: user });
};

const sendMessage = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const updateRequest = req.body;
  let updatedProfile = await db.collection("users").findOneAndUpdate(
    { _id: userId },
    {
      $push: updateRequest,
    }
  );
  const user = await db.collection("users").findOne({ _id: userId });
  res.status(200).json({ status: 200, message: `message sent`, data: user });
};

const addToFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const db = client.db("WithinMeans");
    const updateRequest = req.body;
    console.time("update");
    let updatedProfile = await db.collection("users").findOneAndUpdate(
      { _id: userId },
      {
        $push: updateRequest,
      }
    );
    console.timeEnd("update");
    console.time("getUser");
    const user = await db.collection("users").findOne({ _id: userId });
    console.timeEnd("getUser");
    res.status(200).json({ status: 200, message: `message sent`, data: user });
  } catch (error) {
    res.status(500).send("internal server error :(");
  }
};

const deleteMessage = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const updateRequest = req.body;
  let updatedProfile = await db.collection("users").updateOne(
    { _id: userId },
    {
      $pull: updateRequest,
    }
  );
  const updatedUser = await db.collection("users").findOne({ _id: userId });
  res
    .status(200)
    .json({ status: 200, message: `message deleted`, data: updatedUser });
};

const removeFromFavorites = async (req, res) => {
  const { userId } = req.params;
  const db = client.db("WithinMeans");
  const updateRequest = req.body;
  let updatedProfile = await db.collection("users").findOneAndUpdate(
    { _id: userId },
    {
      $pull: updateRequest,
    }
  );
  const user = await db.collection("users").findOne({ _id: userId });

  res.status(200).json({ status: 200, message: `message deleted`, data: user });
};

module.exports = {
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
};
