const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
});

const Movie = mongooes.model("Movie", movieSchema);

module.exports = Movie;
