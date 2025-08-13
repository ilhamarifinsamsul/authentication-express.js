// import express
const express = require("express");

// import prisma
const prisma = require("../prisma/client");

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

// export findusers
module.exports = { findusers };
