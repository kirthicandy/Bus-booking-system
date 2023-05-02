
const express = require("express");

const router = express.Router();
const info = require("../model/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_Secretkey = "Thisisasecretkeyforjwttoken";

/**
 * @swagger
 * components:
 *   schemas:
 *     info:
 *       type: object
 *       required:
 *         - username
 *       
 *         - email
 *         - password
 *         - age
 *         - gender    
 *       properties:
 *         id: 
 *           type: string
 *           
 *         username:
 *           type: string
 *          
 *         number:
 *           type: number
 *        
 *         email:
 *           type: string
 *          
 *         password:
 *           type: string
 *           
 *         age:
 *           type: string
 *        
 *         gender:
 *           type: string
 *           
 *       
 */

/**
 * @swagger
 * tags:
 *   name: User Details
 * /info:
 *   get:
 *     summary: Get api for userinfo
 *     tags: [User Details]
 *     responses:
 *       200:
 *         description: List all user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/info'
 */





router.get("/", async (req, res) => {
  try {
    const detail = await info.find();
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email, number, gender, age } = req.body;

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
      gender,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
/**
 *@swagger
 * /info/login:
 *   post:
 *     summary: Post api get the user detail by passing token in body
 *     tags: [User Details]
 *     parameters: []
 *     requestBody: 
 *       
 *       content: 
 *     
 *          "application/json": 
 *             schema: 
 *               type: object
 *               properties:
 *                 email: 
 *                   type: string
 *                 password:
 *                   type: string
 *                
 *         
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *
 */
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
/**
 *@swagger
 * /info/userData:
 *   post:
 *     summary: Post api get the user detail by passing token in body
 *     tags: [User Details]
 *     parameters: []
 *     requestBody: 
 *       
 *       content: 
 *     
 *          "application/json": 
 *             schema: 
 *               type: object
 *               properties:
 *                 token: 
 *                   type: string
 *                
 *         
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *
 */
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
      return res.send({ status: "error", data: "token expired", error });
    }

    const useremail = user.email;
    info
      .findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
/**
 *@swagger
 * /info/:id:
 *   post:
 *     summary: Post api find the detail by passing id at body
 *     tags: [User Details]
 *     parameters:
 *         - in: body
 *           name: id
 *           required: true
 *           description: ID required
 *           schema: 
 *             type: string
 *         
 *     responses:
 *       200:
 *         description: List all user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/info'
 *        
 */
router.post("/:id", async (req, res) => {
  const { id } = req.body;
  try {
    const detail = await info.findById(id);
    res.json(detail);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
