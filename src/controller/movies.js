const Db = require("../models/dbClient");
const db = new Db();
const movieController = {}

movieController.getMovies = async (req,res) => {
  const movies = await db.query("sample_mflix","movies", {genres: "Drama"}, limit=10)
  res.send(JSON.stringify(movies));
}

module.exports = movieController