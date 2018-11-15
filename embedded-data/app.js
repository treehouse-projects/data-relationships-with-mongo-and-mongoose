'use strict';

const mongoose = require('mongoose');
const Movie = require('./models');

mongoose.connect('mongodb://localhost:27017/movies-embedded-data',
  { useNewUrlParser: true });

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'Connection error:'));

connection.once('open', () => {
  console.log('DB connection successful');

  const theIronGiant = Movie.create({
    title: 'The Iron Giant',
    releaseYear: 1999,
    director: {
      firstName: 'Brad',
      lastName: 'Bird',
    },
    actors: [
      {
        firstName: 'Vin',
        lastName: 'Diesel',
      },
      {
        firstName: 'Eli',
        lastName: 'Marienthal',
      },
    ],
  });

  const theIncredibles = Movie.create({
    title: 'The Incredibles',
    releaseYear: 2004,
    director: {
      firstName: 'Brad',
      lastName: 'Bird',
    },
    actors: [
      {
        firstName: 'Craig T.',
        lastName: 'Nelson',
      },
      {
        firstName: 'Holly',
        lastName: 'Hunter',
      },
    ],
  });

  Promise.all([theIronGiant, theIncredibles])
    .then(() => {
      console.log('Movies created!');
      return Movie.find().exec();
    })
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      process.exit();
    });
});
