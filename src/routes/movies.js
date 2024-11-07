const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');

router.get('/', movieController.getMovies);

module.exports = router;
