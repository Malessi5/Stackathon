const router = require('express').Router();
const Drink = require('../db/models/Drink');

router.get('/drinks', async (req, res, next) => {
  try {
    const drinks = await Drink.findAll();
    res.json(drinks);
  } catch (error) {
    next(error);
  }
});

router.post('/drinks', async (req, res, next) => {
  try {
    const newDrink = await Drink.create(req.body);
    res.json(newDrink);
  } catch (error) {
    next(error);
  }
});

router.delete('/drinks/:id', async (req, res, next) => {
  try {
    const drink = await Drink.findByPk(req.params.id);
    const removed = await drink.destroy();
    res.json(removed);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
