// import express
const express = require("express");

// import validationResult
const { validationResult } = require("express-validator");

// import prisma
const prisma = require("../prisma/client");

// import bcrypt
const bcrypt = require("bcryptjs");

// import jwt
const jwt = require("jsonwebtoken");

// function login
const login = async (req, res) => {
  // check validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    // find user
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    // users not found
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    //   compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // invalid password
    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    //   generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // destructure to remove password from user object
    const { password, ...userWithoutPassword } = user;

    // return response
    res.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

// export login
module.exports = { login };
