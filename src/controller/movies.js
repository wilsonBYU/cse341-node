const Db = require('../models/dbClient');
const db = new Db();
const movieController = {}
const DBNAME = 'sample_mflix'
const MOVIES = 'movies'

movieController.getMovies = async (req,res) => {
  const movies = await db.get(DBNAME, MOVIES, {genres: 'Drama'}, 10)
  res.status(200).json(movies);
}

module.exports = movieController