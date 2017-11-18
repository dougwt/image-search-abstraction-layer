const mongoose = require('mongoose');
const { Schema } = mongoose;

const SearchSchema = new Schema({
  query: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
});

const Search = mongoose.model('search', SearchSchema);
module.exports = Search;
