const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./db/db.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api/drinks'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const init = () => {
  db.sync().then(function () {
    const port = process.env.PORT || 3000;
    app.listen(port, function () {
      console.log(`Server listening on port ${port}`);
    });
  });
};
init();
