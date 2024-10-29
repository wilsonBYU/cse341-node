const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the home screen!!");
});

router.get("/home", (req, res) => {
  res.send("Hello world, this is profile router with node");
});

router.get("/login", (req, res) => {
  res.send("Hello world, this is login router");
});

router.get("/logout", (req, res) => {
  res.send("Hello world, this is logout router");
});

app.use(bodyParser.json());
app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listenin at port " + (process.env.PORT || 3000));
});
