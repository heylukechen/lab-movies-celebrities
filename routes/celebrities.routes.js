// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase }, { new: true })
    .then((results) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("./celebrities/new-celebrity");
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((allCelebrities) => {
      res.render("./celebrities/celebrities", {
        allCelebrities: allCelebrities,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((foundCelebrity) => {
      res.render("./celebrities/celebrity-details", { foundCelebrity });
    })
    .catch((err) => console.log(err));
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((foundCelebrity) => {
      res.render("./celebrities/edit-celebrity", { foundCelebrity });
    })
    .catch((err) => console.log(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const id = req.params.id;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((err) => console.log(err));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => console.log(err));
});

module.exports = router;