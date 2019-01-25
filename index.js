'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const  { Queue }  = require('./Queue');
const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const catQueue = new Queue(); 
const dogQueue = new Queue(); 


const catData = [{
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  petType:'cat',
  story: 'Thrown on the street'
},{
  imageURL:'https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete',
  name: 'sparkles',
  sex: 'Female',
  age: 200,
  breed: 'Bengal',
  petType:'cat',
  story: 'will bring you dead animals'
},{
  imageURL:'https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete',
  name: 'sam',
  sex: 'Female',
  age: 7,
  breed: 'Bengal',
  petType:'cat',
  story: `doesn't get along with humans`
}];
const dogData = [{
  imageURL:'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retreiver',
  petType:'dog',
  story: 'Owner passed away'
}, {
  imageURL:'https://vignette.wikia.nocookie.net/creepypasta/images/b/bc/Smile-dog.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music',
  name: 'jason',
  sex: 'Male',
  age: 34,
  breed: 'huskey',
  petType:'dog',
  story: 'a lone wolf'
}, {
  imageURL:'https://vignette.wikia.nocookie.net/teamfourstar/images/b/b1/Smiling_Dog.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music',
  name: 'frodo',
  sex: 'Male',
  age: 21,
  breed: 'weiner dog',
  petType:'dog',
  story: `didn't make it to the volcano`
}];
catData.map(cat => catQueue.enqueue(cat));
dogData.map(dog => dogQueue.enqueue(dog));

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res, next) => {
  res.json(catQueue.peek());
});
app.get('/api/dog', (req, res, next) => {
  res.json(dogQueue.peek());
});

app.delete('/api/dog', (req, res, next) => {
  dogQueue.dequeue();
  res.sendStatus(204); 
}); 

app.delete('/api/cat', (req, res, next) => {
  catQueue.dequeue();
  res.sendStatus(204); 
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
