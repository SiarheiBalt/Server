const { createReserveData } = require('./date.utils');

exports.instruments = [
  {
    dates: createReserveData(),
    name: 'Fender Stratocaster SRV',
    specifications: [
      'электро-гитара',
      'USA Corona California',
      '2005 года выпуска',
    ],
    image: '/instrumentImages/guitar.jpg',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Fender JazzBass',
    specifications: ['басс гитара', '4 струны', 'made in Japan'],
    image: '/instrumentImages/bassGuitar.jpg',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Gibson SG Standart',
    specifications: ['электро-гитара', 'USA 2006'],
    image: '/instrumentImages/gibsonSG.jpg',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Epiphone',
    specifications: ['акустическая гитара', 'made in Korea'],
    image: '/instrumentImages/acusticGuitar.jpg',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Yamaha',
    specifications: ['Барабаны'],
    image: '/instrumentImages/drums.jpg',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
];
