const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/image_search_test', { useMongoClient: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { searches } = mongoose.connection.collections;
  searches.drop()
    // .then(() => searchs.createIndex({ query: 1, { unique: true }}))
    .then(() => done())
    .catch(() => done());
});

after(done => {
  mongoose.disconnect();
  done();
});
