"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
var assert = require("assert");
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const addUser = async (req, res) => {
//   const client = await MongoClient(MONGO_URI, options);
//   await client.connect();
//   const db = client.db("WithinMeans");
//   const result = await db.collection("users").insertOne(req.body);
//   assert.equal(1, result.insertedCount);
//   res.status(201).json({ status: 201, data: req.body });
//   client.close();
// };

const addUser = async (req, res) => {
  const { _id, name, email } = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("WithinMeans");
  const checkIfUserExists = await db
    .collection("users")
    .findOne({ email: email });
  if (checkIfUserExists) {
    res.status(404).json({
      status: 404,
      message: `${email} is already in use. Please sign in.`,
    });
  } else {
    const result = await db.collection("users").insertOne({
      _id: uuidv4(),
      name: name,
      email: email,
      title: null,
      skills: null,
      avatar: null,
      website: null,
      bio: null,
      status: null,
      saved: null,
      swaps: null,
      rating: null,
      messages: null,
    });
    assert.equal(1, result.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
    client.close();
  }
};

const getUsers = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("WithinMeans");
    const users = await db.collection("users").find().toArray();
    res.status(200).json({
      status: 200,
      message: "All Users",
      data: users,
    });
    client.close();
  } catch {
    res.status(404).json({
      status: 404,
      message: "Error :(",
    });
  }
};

module.exports = {
  addUser,
  getUsers,
};
