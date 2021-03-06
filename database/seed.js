const faker = require('faker');
const Stocks = require('./Stocks.js');
const db = require('./index.js');

const generateRandomStockPrice = () => (Math.random() * 999).toFixed(2);

const generateRandomRating = () => (Math.random() * 99).toFixed(0);

const generateRandomPriceChange = () => (Math.random() * 8).toFixed(2);


const buyOrSell = () => {
  const arr = ['buy', 'sell'];
  return arr[Math.round(Math.random())];
};

const sampleGenerator = () => {
  const stocks = [];
  for (let i = 1; i <= 100; i++) {
    const obj = {};
    obj.id = i;
    obj.name = faker.company.companyName();
    obj.rating = generateRandomRating();
    obj.ratingBlurb = obj.rating + '% of analysts agree this stock is a ' + buyOrSell();
    obj.price = generateRandomStockPrice();
    obj.priceChange = generateRandomPriceChange();
    stocks.push(obj);
  }
  return stocks;
};


const insertSampleStocks = () => {
  Stocks.create(sampleGenerator())
    .then(() => db.disconnect());
};

insertSampleStocks();
