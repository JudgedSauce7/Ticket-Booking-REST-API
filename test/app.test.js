const mongoose = require("mongoose");
const { db } = require("../models/ticket.model");
const app = require("../app");
require("dotenv/config");

function conn() {
  return new Promise((resolve, reject) => {
    console.log("Connecting");
    mongoose
      .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

module.exports = { conn };
