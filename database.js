const mongoose = require("mongoose");

const mongoConnection =
  "mongodb+srv://admin:oceanflux@project.l7yrx7s.mongodb.net/";

let database = mongoose.connection;

database.on("connecting", () => {
  console.log("Connecting...");
  console.log(mongoose.connection.readyState);
});

database.on("connected", () => {
  console.log("Succesful Connection");
  console.log(mongoose.connection.readyState);
});

database.on("error", (err) => {
  console.error("ERROR!!", err);
});

mongoose.connect(mongoConnection);