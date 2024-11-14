const router = require("express").Router()

router
  .get("/", async (req, res) => res.status(200).send("This is the home screen"))
  .use("/movies", require("./movies"))
  .use("/contacts", require("./contacts"))
  .use("/professionals", require("./professionals"))

  module.exports = router