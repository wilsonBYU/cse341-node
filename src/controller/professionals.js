const Db = require("../models/dbClient");
const db = new Db();
const professionalsController = {}

professionalsController.getProfessional = async (req, res) => {
  const professionals = await db.query("professionals", "info")
  const single = professionals[(Math.floor(Math.random() * professionals.length))]
  res.status(200).json(single);
}

module.exports = professionalsController