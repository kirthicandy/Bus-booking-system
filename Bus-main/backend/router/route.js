const express = require("express");
const router = express.Router();
const info = require("../model/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_Secretkey = "Thisisasecretkeyforjwttoken"

router.get("/", async (req, res) => {
  try {
    const detail = await info.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});
router.post("/register", async (req, res) => {
  const { username, password, email, number,gender,age} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await info.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await info.create({
      username,
      number,
      email,
      password: encryptedPassword,
      age,
      gender
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await info.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_Secretkey, {
      expiresIn: "4d",
    });

    if (res.status(200)) {
      return res.json({ status: "ok", token: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_Secretkey, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" ,error});
    }

    const useremail = user.email;
    info.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});
router.post("/:id",async(req,res)=>{
  const{id} = req.body
  try {
    const detail = await info.findById(id);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
})


module.exports = router;
