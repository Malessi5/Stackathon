const functions = require("firebase-functions");

const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./fskey.json");

app.use(cors({origin: true}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stackathon-eb2e6-default-rtdb.firebaseio.com",
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// app.use('/api', require('./api/drinks'));
app.use("/api", require("./api/drinksfb"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

exports.app = functions.https.onRequest(app);
