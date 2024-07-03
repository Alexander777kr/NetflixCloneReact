const router = require("express").Router();
const { prisma } = require("../db");
const checkAuth = require("../middleware");
const fetchSubscription = require('../services/fetchSubscription');

router.get("/movies/list", checkAuth, async (req, res) => {
  const subscription = await fetchSubscription(req.user.email);

  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; no plan"
        }
      ]
    });
  }

  const offset = parseInt(req.query.offset);
  const count = await prisma.movie.count();
  const movies = await prisma.movie.findMany({
    take: 12,
    skip: offset,
  });
  return res.json({ movies, count });
});

router.get("/movie/:id", checkAuth, async (req, res) => {

  const subscription = await fetchSubscription(req.user.email);

  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; no plan"
        }
      ]
    });
  }

  const id = req.params.id;
  const movie = await prisma.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (movie.title === 'South Park' && subscription.name === 'Basic Plan') {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; need premium plan"
        }
      ]
    });
  }
  return res.send(movie);
});

module.exports = router;