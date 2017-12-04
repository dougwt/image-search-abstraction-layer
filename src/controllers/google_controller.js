var superagent = require('superagent');
require('superagent-cache')(superagent);

require('dotenv').config();
const GOOGLE_ENGINE_ID = process.env.GOOGLE_ENGINE_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const GoogleController = {
  search: function(query, skip=0) {
    if (!GOOGLE_ENGINE_ID || !GOOGLE_API_KEY) {
      throw new Error('Invalid Google API credentials');
    }
    if(!query) {
      throw new Error('Invalid query');
    }
    if(skip < 0) {
      throw new Error('Invalid skip value');
    }

    const start = Number(skip) + 1;
    // console.log('query:', query);
    // console.log('start:', start);

    return new Promise((resolve, reject) => {
      superagent
        .get(`https://www.googleapis.com/customsearch/v1?cx=${GOOGLE_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}&q=${query}&start=${start}`)
        .end((err, response) => {
          if (err || response.body.error) {
            reject(err);
            return;
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
