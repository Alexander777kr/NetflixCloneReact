const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const { prisma } = require("../db");
const bcrypt = require("bcrypt");

router.post("/signup", [
  check("email", "Please input a valid email").isEmail(),
  check("password", "Please input a password with a min length of 6").isLength({ min: 6 }),
  check("username", "Please input a username with a min length of 6").isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });

  }
  const { email, password, username } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (user) {
    return res.status(400).json({
      errors: [
        { msg: "This user already exists" }
      ]
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  });
  res.json({
    user: newUser
  });

});

module.exports = router;