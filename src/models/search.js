const mongoose = require('mongoose');
const { Schema } = mongoose;

const SearchSchema = new Schema({
  query: {
    type: String,
    lowercase: true,
    unique: false,
    required: true
  },
  timestamp: {
    type : Date,
    default: Date.now
  }
});

const Search = mongoose.model('search', SearchSchema);
module.exports = Search;
