const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');
const swaggerUi = require("swagger-ui-express")
const contactsSwaggerDocument = require("../../swaggerfiles/swagger-contacts.json")

router
  .get('/', contactsController.getAll)
  .post('/', contactsController.insert)
  .get('/:contact_id/', contactsController.get)
  .put('/:contact_id/', contactsController.update)
  .delete('/:contact_id', contactsController.delete)
  .use("/api-docs", function(req, res, next) {
    contactsSwaggerDocument.host = `${req.get("host")}/contacts`
    req.swaggerDoc = contactsSwaggerDocument
    next()
  }, swaggerUi.serveFiles(contactsSwaggerDocument, {}), swaggerUi.setup())
  .get("*", function (req, res, next) {
    throw({code: 404, message: "The URL you are looking for do not exist"})
  })
module.exports = router;
