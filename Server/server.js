const express = require("express");
const users = require("./API/module.js");
const { join } = require("path");

const app = express();
app.use(express.json());
app.use(users);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Listening on port 3000"));
