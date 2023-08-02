const express = require("express");
const { validateUser } = require("../data/login");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const user = await validateUser(userName, password);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
