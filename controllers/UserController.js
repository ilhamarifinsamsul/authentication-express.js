// import express
const express = require("express");

// import prisma
const prisma = require("../prisma/client");

// import validationResult
const { validationResult } = require("express-validator");

// import bcrypt
const bcrypt = require("bcryptjs");

// function findUsers
const findusers = async (req, res) => {
  try {
    // get all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    // send response
    res.status(200).send({
      success: true,
      message: "Get all Users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const createUser = async (req, res) => {
  // check validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// export findusers
module.exports = { findusers, createUser };
