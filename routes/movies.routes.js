// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", (req, res, next) => {
  Celebrity.find({})
    .then((allCelebrities) => {
      res.render("./movies/new-movie", { allCelebrities: allCelebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, celebrity } = req.body;
  Movie.create({ title, genre, plot, cast: celebrity }, { new: true })
    .then((dbPost) => {
      return Movie.findByIdAndUpdate(celebrity, {
        $push: { celebrity: dbPost._id },
      });
    })
    .then(res.redirect("/movies"))
    .catch((err) => {
      console.log(err);
      res.render("./movies/new-movie");
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((allMovies) => {
      res.render("./movies/movies", { allMovies: allMovies });
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((foundMovie) => {
      console.log(foundMovie);
      res.render("./movies/movie-details", { foundMovie });
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((deletedMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((foundMovie) => {
      Celebrity.find()
        .then((allCelebrities) => {
          res.render("./movies/edit-movie", { foundMovie, allCelebrities });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { title, genre, plot, celebrity } = req.body;
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, {
    title,
    genre,
    plot,
    cast: celebrity,
  })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
