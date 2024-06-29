const express = require("express");
const movies = require("./movies.json");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/movies/list", (req, res) => {
  return res.send(movies);
});

app.listen(8081, () => {
  console.log("Now listening on PORT 8081");
});