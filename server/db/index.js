const db = require('./db');
const Drink = require('./models/Drink');

const syncAndSeed = async () => {
  await db.sync({ force: true });

  await Drink.create({
    name: 'Vodka Soda',
    alcoholic: 'Alcoholic',
    category: 'Regular Drink',
    imgUrl:
      'https://www.acouplecooks.com/wp-content/uploads/2021/03/Vodka-Soda-004.jpg',
    glass: 'highball',
    ingredients: ['vodka', 'soda water', 'lime'],
    measurements: ['1cl', '12oz', '1'],
    instructions: 'Mix vodka and soda water, garnish with lime.',
  });
};

module.exports = {
  db,
  Drink,
  syncAndSeed,
};
