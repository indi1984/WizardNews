const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();
const PORT = 3000;

app.use(volleyball);
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Listening on port, ${PORT}`)
});
