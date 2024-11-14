const express = require("express");
const app = express();
const cors = require("cors")
const globalErrorHandler = require("./src/utilities/errorHandler")


//Middlewares
app
  .use(cors())
  .use(express.json())
  .use("/", require("./src/routes/index"))
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .use(globalErrorHandler)

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listenin at port " + (process.env.PORT || 3000));
});
