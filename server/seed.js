const db = require('./db/db');
const Drink = require('./db/models/Drink');

const seed = async () => {
  await db.sync({ force: true });
  try {
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
  } catch (error) {
    console.log(error);
  }
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
