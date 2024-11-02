const express = require("express");
//const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const Db = require("./src/models/dbClient");
const db = new Db();

router.get("/", (req, res) => {
  res.send("This is the home screen!!");
});

//app.use(bodyParser.json());
app.use("/", router);
app.use("/movies", require("./src/routes/movies"))
app.use("/contacts", require("./src/routes/contacts"))
app.use("/professionals", require("./src/routes/professionals"))

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listenin at port " + (process.env.PORT || 3000));
});
