'use strict';

const mongoose = require('mongoose');
const { Person, Movie } = require('./models');

mongoose.connect('mongodb://localhost:27017/movies-referenced-data',
  { useNewUrlParser: true });

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'Connection error:'));

connection.once('open', () => {
  console.log('DB connection successful');

  const bradBird = Person.create({
    firstName: 'Brad',
    lastName: 'Bird',
  });

  const vinDiesel = Person.create({
    firstName: 'Vin',
    lastName: 'Diesel',
  });

  const eliMarienthal = Person.create({
    firstName: 'Eli',
    lastName: 'Marienthal',
  });

  const craigTNelson = Person.create({
    firstName: 'Craig T.',
    lastName: 'Nelson',
  });

  const hollyHunter = Person.create({
    firstName: 'Holly',
    lastName: 'Hunter',
  });

  Promise.all([bradBird, vinDiesel, eliMarienthal, craigTNelson, hollyHunter])
    .then((values) => {
      const theIronGiant = Movie.create({
        title: 'The Iron Giant',
        releaseYear: 1999,
        director: values[0]._id,
        actors: [
          values[1]._id,
          values[2]._id,
        ],
      });

      const theIncredibles = Movie.create({
        title: 'The Incredibles',
        releaseYear: 2004,
        director: values[0]._id,
        actors: [
          values[3]._id,
          values[4]._id,
        ],
      });

      return Promise.all([theIronGiant, theIncredibles]);
    })
    .then(() => {
      console.log('Movies created!');
      return Movie
        .find()
        .populate('director')
        .populate('actors')
        .exec();
    })
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      process.exit();
    });
});
