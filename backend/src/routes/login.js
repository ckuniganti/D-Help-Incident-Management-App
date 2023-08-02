const express = require("express");
const { validateUser } = require("../data/login");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const user = await validateUser(userName, password);
    if (user) {
      return res
        .status(201)
        .json({ message: "User Authenticated.", user: user });
    } else {
      return res.status(422).json({
        error: "Invalid Credential!",
        message: "Invalid UserName or Password!",
      });
    }
  } catch (error) {
    next(error);
    return res.status(422).json({
      error: "Invalid Credential!",
      message: "Invalid UserName or Password!",
    });
  }
});

module.exports = router;
