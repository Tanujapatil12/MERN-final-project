const express = require('express');
const movieRouter = express.Router();

const {addMovie, getAllMovie, getMovieById} = require('../controllers/movie-controller');

movieRouter.post("/add", addMovie)
movieRouter.get("/", getAllMovie)
movieRouter.get("/:id", getMovieById)

module.exports = movieRouter