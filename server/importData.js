"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
var assert = require("assert");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async () => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("WithinMeans");
  const result = await db
    .collection("users")
    .insertMany(require("./data/users"));
  client.close();
};

dbFunction();
