const moment = require('moment');

const timeMiddleware = (req, res, next) => {
    console.log('middle ware is called');
    console.log('Time:', moment().format('HH:mm:ss a'));
  
    next();
  };
  const printingMiddleware = (req, res, next) => {
  console.log('middleware called...');
  next();
};

  module.exports={
    printTime:timeMiddleware,
    printnow:printingMiddleware,
  }