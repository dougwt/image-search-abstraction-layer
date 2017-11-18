const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Search = mongoose.model('search');

describe('Search controller', () => {

  it('GET to /search/:query with a query returns results containing image urls', (done) => {
    const query = 'beach';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.body.length > 0);
        assert(response.body[0].url.startsWith('https://images.unsplash.com/'));
        done();
      });
  });

  xit('GET to /search/:query with a query returns results containing alt text', (done) => {
    const query = 'beach';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.body.length > 0);
        assert(response.body[0].text.length > 0);
        done();
      });
  });

  xit('GET to /search/:query with a query returns results containing page urls', (done) => {
    const query = 'beach';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.body.length > 0);
        assert(response.body[0].page.startsWith('http://unsplash.com/photos/'));
        done();
      });
  });

  xit('GET to /search/:query with an empty query string returns an error', (done) => {
    const query = '';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.status === 400);
        assert(response.body.error === 400);
        assert(response.body.message === 'Invalid query parameter');
        done();
      });
  });

  xit('GET to /search/:query with an obscure query string returns an empty result set', (done) => {
    const query = 'jlfalsjdalsjdalksjflkajjlfalsjdalsjdalksjflkaj';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.body.length === 0);
        done();
      });
  });

  xit('GET to /search/:query with a popular query string returns a result set containing 10 items', (done) => {
    const query = 'beach';
    request(app)
      .get(`/search/${query}`)
      .end((err, response) => {
        assert(response.body.length === 10);
        done();
      });
  });

  xit('GET to /search/:query with a popular query string and an offset returns additional results', (done) => {
    const query = 'beach';
    request(app)
      .get(`/search/${query}/offset=10`)
      .end((err, response) => {
        assert(response.body.length > 0);
        done();
      });
  });

  xit('GET to /search/:query inserts a document in the collection', (done) => {
    Search.count().then((count) => {
      const query = 'beach';
      request(app)
        .get(`/search/${query}`)
        .end(() => {
          Search.count().then((newCount) => {
            assert(newCount === count + 1);
            done();
          });
        });
      });
  });

  xit('GET to /latest returns a list of the most recent search queries', (done) => {
    Search.count().then((count) => {
      const query = 'beach';
      request(app)
        .get(`/search/${query}`)
        .end(() => {
          request(app)
            .get(`/latest`)
            .end((err, response) => {
              assert(response.body.length > 0);
              assert(response.body[0] === 'beach');
              done();
            });
        });
    });
  });

  xit('GET to /latest returns an empty list of the search queries when none have been submitted', (done) => {
    request(app)
      .get(`/latest`)
      .end((err, response) => {
        assert(response.body.length === 0);
        done();
      });
  });

});
