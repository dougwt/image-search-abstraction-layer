const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const SearchController = require('./controllers/search_controller');
const app = express();

mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'test') {
//   const MONGO_CONNECTION = process.env.MONGO_CONNECTION || 'mongodb://localhost/image_search';
//   mongoose.connect(MONGO_CONNECTION, { useMongoClient: true }, (error) => {
//     if (error) throw error;
//   });
// }

// Middleware
// app.use(function(req, res, next) {
//   console.log('Request URL:', decodeURIComponent(req.url));
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/*', SearchController.search);
// app.get('/latest', SearchController.latest);

module.exports = app;
