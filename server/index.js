const express = require("express");
const cors = require("cors");
const { prisma } = require("./db");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));

app.listen(8081, () => {
  console.log("Now listening on PORT 8081");
});