'use strict';

const mongoose = require('mongoose');
const Movie = require('./models');

mongoose.connect('mongodb://localhost:27017/movies-embedded-data',
  { useNewUrlParser: true });

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'Connection error:'));

connection.once('open', () => {
  console.log('DB connection successful');

  Movie.create({
    title: 'Toy Story',
    yearRelease: 1995,
    director: {
      firstName: 'John',
      lastName: 'Lasseter',
    },
    actors: [
      {
        firstName: 'Tom',
        lastName: 'Hanks',
      },
      {
        firstName: 'Tim',
        lastName: 'Allen',
      },
    ],
  }).then(() => {
    console.log('Movie created!');
    process.exit();
  });
});
