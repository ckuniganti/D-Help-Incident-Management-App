const bodyParser = require("body-parser");
const express = require("express");
const userRoutes = require("./src/routes/user");

const loginRoutes = require("./src/routes/login");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`BackEnd Server running on port ${port}`);
});
