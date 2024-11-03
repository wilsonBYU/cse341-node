const Db = require("../models/dbClient");
const db = new Db();
const contactsController = {}

contactsController.getAllContacts = async (req, res) => {
  const contacts = await db.query("cse341", "contacts")
  res.status(200).json(contacts);
}

contactsController.getContact = async (req, res) => {
  const contact = await db.query("cse341", "contacts", {_id : req.params.contact_id})
  if (contact.length > 0) {
    res.status(200).json(contact)
  } else {
    res.status(400).json([{error: "No contact found with the given id"}])
  }
}

module.exports = contactsController