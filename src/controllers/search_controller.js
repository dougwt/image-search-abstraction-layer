const Search = require('../models/search');
const GoogleController = require('./google_controller');

module.exports = {

  search(req, res, next) {
    const query = decodeURIComponent(req.params[0]);
    const offset = req.query.offset || 0;
    // console.log('QUERY:', query);
    // console.log('OFFSET:', offset);
    if (!query) {
      res.status(400).json({
        error: 400,
        message: 'Invalid query parameter'
      });
      return;
    }

    // Fetch search results from Google API
    GoogleController.search(query, offset)
      .then(result => {
        // console.log('RESULT:', result);

        // Store query in local database
        Search.create({  query })
          .then(record => console.log(`Query '${query}' inserted into database`))
          .catch((error) => {
            console.log('ERROR:', error);
            next();
          });

        // Format response
        let results;
        if (result.items) {
          results = result.items.map((item) => {
            return {
              url: item.link,
              text: item.snippet,
              page: item.image.contextLink
            }
          });
        } else {
          results = [];
        }
        res.send(results);
      });
  }

};
