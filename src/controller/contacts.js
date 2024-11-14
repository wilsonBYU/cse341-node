const { ObjectId } = require('mongodb');
const Db = require('../models/dbClient');
const db = new Db();

const DBNAME = 'cse341';
const CONTACTS = 'contacts';

const contactsController = {};

contactsController.getAll = async (req, res, next) => {
  try {
    const contacts = await db.get(DBNAME, CONTACTS);
    res.status(200).json(contacts);
  } catch(e) {
    next({code: 500, message: e.message})
  }
};

contactsController.get = async (req, res, next) => {
  try {
    const contact = await db.get(DBNAME, CONTACTS, { _id: new ObjectId(req.params.contact_id) });
    if (contact.length > 0) {
      res.status(200).json(contact);
    } else {
      throw({code: 400, message: "No contacts found with the given id"})
    }
  } catch(e){
    next({code: 400, message: e.message})
  }
};

contactsController.insert = async (req, res, next) => {
  const contact = req.body;
  try {
    const result = await db.post(DBNAME, CONTACTS, contact);
    const inserted = await db.get(DBNAME, CONTACTS, { _id: new ObjectId(result.insertedId) });
    console.log(result);
    res.status(201).json(inserted[0]);
  } catch (e) {
    next({code: 500, message: e.message})
  }
};

contactsController.update = async (req, res, next) => {
  try {
    const result = await db.put(
      DBNAME,
      CONTACTS,
      { _id: new ObjectId(req.params.contact_id) },
      req.body,
    );
    if (result.acknowledged) {
      console.log(result);
      res.status(204).json(result);
    } else {
      throw({code: 400, message: "There was an error updating the contact."})
    }
  } catch (e) {
    next({code: 500, message: e.message})
  }
};

contactsController.delete = async (req, res, next) => {
  try {
    const result = await db.delete(DBNAME, CONTACTS, { _id: new ObjectId(req.params.contact_id) });
    res.status(200).json(result);
  } catch (e) {
    next({code: 500, message: e.message});
  }
};

module.exports = contactsController;
