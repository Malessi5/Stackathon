const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
//const db = require('./db/db.js');
const firebase = require('firebase');
var admin = require('firebase-admin');
var serviceAccount = require('./fskey.json');

var config = {
  apiKey: 'AIzaSyCP1kFkQA7CTuzI1sbYFNFU8eGAMVnZ4q0',
  authDomain: 'stackathon-eb2e6.firebaseapp.com',
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: 'https://stackathon-eb2e6-default-rtdb.firebaseio.com/',
  storageBucket: 'stackathon-eb2e6.appspot.com',
};

var firebaseConfig = {
  apiKey: 'AIzaSyCP1kFkQA7CTuzI1sbYFNFU8eGAMVnZ4q0',
  authDomain: 'stackathon-eb2e6.firebaseapp.com',
  projectId: 'stackathon-eb2e6',
  storageBucket: 'stackathon-eb2e6.appspot.com',
  messagingSenderId: '872333344695',
  appId: '1:872333344695:web:73fdea630fa9c3f7ef3232',
  measurementId: 'G-JXW4552NQ7',
};

// // Get a reference to the database service
// const db = firebase.initializeApp(config);

//admin.initializeApp(functions.config().firebase);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stackathon-eb2e6-default-rtdb.firebaseio.com',
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api', require('./api/drinks'));
app.use('/api', require('./api/drinksfb'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});

// const init = () => {
//   db.sync().then(function () {
//     const port = process.env.PORT || 3000;
//     app.listen(port, function () {
//       console.log(`Server listening on port ${port}`);
//     });
//   });
// };
// init();

// module.exports.db = db.database();
