// import express
const express = require("express");

// import prisma
const prisma = require("../prisma/client");

// import bcrypt
const bcrypt = require("bcryptjs");

// import validationResult
const { validationResult } = require("express-validator");

// function register
const register = async (req, res) => {
  // check validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  //   hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //   insert data
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.status(201).send({
      success: true,
      message: "Register created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export register
module.exports = { register };
