const Db = require('../models/dbClient');
const db = new Db();
const professionalsController = {};

const DBNAME = 'professionals';
const INFO = 'info';

professionalsController.getProfessional = async (req, res) => {
  const professionals = await db.get(DBNAME, INFO);
  const single = professionals[Math.floor(Math.random() * professionals.length)];
  res.status(200).json(single);
};

module.exports = professionalsController;
