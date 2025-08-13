// import express
const express = require("express");

// import route
const router = require("./routes");

// import cors
const cors = require("cors");

// import body parser
const bodyParser = require("body-parser");

// create app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// use body parser application/json
app.use(bodyParser.json());

// set port
const port = 3000;

// set route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// define routes
app.use("/api", router);

// start app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
