const express = require('express');
const router = express.Router();
const professionalsController = require('../controller/professionals');
const swaggerUi = require("swagger-ui-express")
const contactsSwaggerDocument = require("../../swaggerfiles/swagger-professionals.json")

router
  .use("/api-docs", function(req, res, next) {
    contactsSwaggerDocument.host = `${req.get("host")}/contacts`
    req.swaggerDoc = contactsSwaggerDocument
    next()
  }, swaggerUi.serveFiles(contactsSwaggerDocument, {}), swaggerUi.setup())
  .get('/', professionalsController.getProfessional)
  .get("*", function (req, res, next) {
    throw({code: 404, message: "The URL you are looking for do not exist"})
  })
module.exports = router;
