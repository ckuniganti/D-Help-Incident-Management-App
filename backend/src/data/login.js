const express = require("express");

const { getUserData } = require("./user");

async function validateUser(userName, password) {
  const user = await getUserData(userName);
  if (user.password === password) {
    console.log("login Successful!!");
    return user;
  } else {
    console.log("login failed!!");
    return undefined;
  }
}

exports.validateUser = validateUser;
