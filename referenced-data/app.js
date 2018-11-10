'use strict';

const mongoose = require('mongoose');
const { Person, Movie } = require('./models');

mongoose.connect('mongodb://localhost:27017/movies-referenced-data',
  { useNewUrlParser: true });

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'Connection error:'));

connection.once('open', () => {
  console.log('DB connection successful');

  const johnLasseter = Person.create({
    firstName: 'John',
    lastName: 'Lasseter',
  });

  const tomHanks = Person.create({
    firstName: 'Tom',
    lastName: 'Hanks',
  });

  const timAllen = Person.create({
    firstName: 'Tim',
    lastName: 'Allen',
  });

  Promise.all([johnLasseter, tomHanks, timAllen])
    .then((values) => {
      return Movie.create({
        title: 'Toy Story',
        yearRelease: 1995,
        director: values[0]._id,
        actors: [
          values[1]._id,
          values[2]._id,
        ],
      });
    })
    .then(() => {
      console.log('Movie created!');
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
