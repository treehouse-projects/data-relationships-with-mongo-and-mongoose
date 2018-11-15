'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const PersonSchema = new Schema({
  firstName: String,
  lastName: String,
});

const MovieSchema = new Schema({
  title: String,
  releaseYear: Number,
  director: PersonSchema,
  actors: [PersonSchema],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
