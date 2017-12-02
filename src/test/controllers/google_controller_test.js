const assert = require('assert');
const GoogleController = require('../../controllers/google_controller');

describe('Google controller', () => {

  it('Search with a query returns a valid response with a startIndex of 1', (done) => {
    const query = 'beach';
    GoogleController.search(query)
      .then((results) => {
        assert(results.searchTerms === query);
        assert(results.startIndex === 1);
        assert(results.items.length === 10);
        done();
      })
      .catch(err => console.log(err));
  });

  it('Search with a query and skip parameter returns a valid response with the correct startIndex', (done) => {
    const query = 'beach';
    const skip = 10;
    const results = GoogleController.search(query, skip)
      .then((results) => {
        // console.log('RESULTS:', results);
        assert(results.searchTerms === query);
        assert(results.startIndex === 11);
        assert(results.items.length === 10);
        done();
      })
      .catch(err => console.log(err));
  });

  it('Search without a query returns throws an error', () => {
    const query = null;
    try {
      GoogleController.search(query)
    }
    catch(err) {
      assert(err.name === 'Error');
      assert(err.message === 'Invalid query');
    };
  });

  it('Search with an empty query returns throws an error', () => {
    const query = '';
    try {
      GoogleController.search(query)
    }
    catch(err) {
      assert(err.name === 'Error');
      assert(err.message === 'Invalid query');
    };
  });

  it('Search with a negative skip throws an error', () => {
    const query = 'popcorn';
    const skip = -1;
    try {
      GoogleController.search(query, skip)
    }
    catch(err) {
      assert(err.name === 'Error');
      assert(err.message === 'Invalid skip value');
    };
  });

});
