const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const MONGODB_KEY = process.env.MONGODB_KEY;

const app = express();

const userRoute = require("./routes/user");
const sauceRoute = require("./routes/sauce");

mongoose
  .connect(MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoute);
app.use("/api/sauce", sauceRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;