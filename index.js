// import express
const express = require("express");

// import cors
const cors = require("cors");

// import body parser
const bodyParser = require("body-parser");

// create app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// use body parser
app.use(bodyParser.json());

// set port
const port = 3000;

// set route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
