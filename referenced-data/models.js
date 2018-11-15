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
  director: { type: Schema.Types.ObjectId, ref: 'Person' },
  actors: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

const Person = mongoose.model('Person', PersonSchema);
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Person, Movie };
