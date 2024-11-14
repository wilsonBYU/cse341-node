const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');
const swaggerUi = require("swagger-ui-express")
const contactsSwaggerDocument = require("../../swaggerfiles/swagger-movies.json")

router
  .get('/', movieController.getMovies)
  .use("/api-docs", function(req, res, next) {
    contactsSwaggerDocument.host = `${req.get("host")}/contacts`
    req.swaggerDoc = contactsSwaggerDocument
    next()
  }, swaggerUi.serveFiles(contactsSwaggerDocument, {}), swaggerUi.setup())
  .get("*", function (req, res, next) {
    throw({code: 404, message: "The URL you are looking for do not exist"})
  })
module.exports = router;
