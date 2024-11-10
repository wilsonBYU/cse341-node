const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const contactsSwaggerDocument = require("./swaggerfiles/swagger-contacts.json")


app.use(cors())

router.use("/contacts/api-docs", function(req, res, next) {
  contactsSwaggerDocument.host = `${req.get("host")}/contacts`
  req.swaggerDoc = contactsSwaggerDocument
  next()
}, swaggerUi.serveFiles(contactsSwaggerDocument, {}), swaggerUi.setup())

router.get("/", (req, res) => {
  res.send("This is the home screen!!");
});

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.use(express.json());
app.use("/", router);
app.use("/movies", require("./src/routes/movies"))
app.use("/contacts", require("./src/routes/contacts"))
app.use("/professionals", require("./src/routes/professionals"))

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listenin at port " + (process.env.PORT || 3000));
});
