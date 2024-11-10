const { ObjectId } = require('mongodb');
const Db = require('../models/dbClient');
const db = new Db();

const DBNAME = 'cse341';
const CONTACTS = 'contacts';

const contactsController = {};

contactsController.getAll = async (req, res) => {
  const contacts = await db.get(DBNAME, CONTACTS);
  res.status(200).json(contacts);
};

contactsController.get = async (req, res) => {
  const contact = await db.get(DBNAME, CONTACTS, { _id: new ObjectId(req.params.contact_id) });
  if (contact.length > 0) {
    res.status(200).json(contact);
  } else {
    res.status(400).json([{ error: 'No contact found with the given id' }]);
  }
};

contactsController.insert = async (req, res) => {
  const contact = req.body;
  try {
    const result = await db.post(DBNAME, CONTACTS, contact);
    const inserted = await db.get(DBNAME, CONTACTS, { _id: new ObjectId(result.insertedId) });
    console.log(result);
    res.status(201).json(inserted[0]);
  } catch (e) {
    res.status(500).json(e);
  }
};

contactsController.update = async (req, res) => {
  try {
    const result = await db.put(
      DBNAME,
      CONTACTS,
      { _id: new ObjectId.createFromHexString(req.params.contact_id) },
      req.body,
    );
    if (result.acknowledged) {
      console.log(result);
      res.status(204).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

contactsController.delete = async (req, res) => {
  try {
    const result = await db.delete(DBNAME, CONTACTS, { _id: new ObjectId(req.params.contact_id) });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = contactsController;
