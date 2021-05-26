"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
var assert = require("assert");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("WithinMeans");
  const result = await db.collection("users").insertOne(req.body);
  assert.equal(1, result.insertedCount);
  res.status(201).json({ status: 201, data: req.body });
  client.close();
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
