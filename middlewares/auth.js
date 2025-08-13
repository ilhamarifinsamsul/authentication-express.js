// import express
const express = require("express");

// import jwt
const jwt = require("jsonwebtoken");

// verify token
const verifyToken = (req, res, next) => {
  // get token
  const token = req.headers["authorization"];

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

// export verify token
module.exports = verifyToken;
