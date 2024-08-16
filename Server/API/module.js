const { Router } = require("express");
const jwt = require("jsonwebtoken");
const keyGen = require("uuid");
const strgJSON = require("./users.json");
const userRouters = Router();

//Authenticator creation and locking
const U_AUTHER = {
  header: {
    type: "jwt",
    alg: "HS246",
  },
  generator: async function () {
    const key = keyGen.v4();
    return key;
  },
};
Object.freeze(U_AUTHER);
//
userRouters.get("/api/users", (req, res) => {
  res.json(strgJSON);
});
userRouters.get("/api/users/:name", (req, res) => {
  const { name } = req.params;
  const user = strgJSON.find((user) => user.name === name);
  if (user) res.status(200).json({ found: user });
  else res.status(404).json({ message: "User Not Found in DB" });
});
userRouters.post("/api/users", (req, res) => {
  async function auth() {
    const key = await U_AUTHER.generator();
    const signed = jwt.sign(req.body, key);
    if (signed) {
      const sucessfullToken = jwt.verify(signed, key, { complete: true });
      if (sucessfullToken) {
        strgJSON.push(sucessfullToken);
        console.log(sucessfullToken);
      } else console.log("Token Verification Failed");
    } else res.status(403).json({ message: "Forbidden" });
  }
  auth();
});
module.exports = userRouters;
