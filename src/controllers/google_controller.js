var superagent = require('superagent');
require('superagent-cache')(superagent);

const GOOGLE_ENGINE_ID = require('../config').GOOGLE_ENGINE_ID;
const GOOGLE_API_KEY = require('../config').GOOGLE_API_KEY;

const GoogleController = {
  search: function(query, skip=0) {
    if (!GOOGLE_ENGINE_ID || !GOOGLE_API_KEY) {
      throw 'Invalid Google API credentials';
    }

    if(!query) {
      throw new Error('Invalid query');
    }
    if(skip < 0) {
      throw new Error('Invalid skip value');
    }

    return new Promise((resolve, reject) => {
      superagent
        .get(`https://www.googleapis.com/customsearch/v1?cx=${GOOGLE_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}&q=${query}&start=${skip + 1}`)
        .end((err, response) => {
          if (err) {
            reject(err);
          }
          // console.log('RESPONSE:', response.body);
          resolve({
            searchTerms: response.body.queries.request[0].searchTerms,
            startIndex: response.body.queries.request[0].startIndex,
            items: response.body.items
          });
        })
    });
  }
};

module.exports = GoogleController;
