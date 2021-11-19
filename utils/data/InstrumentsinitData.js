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
    image: 'https://disk.yandex.by/i/mvtXaAiENqUJfA',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Fender JazzBass',
    specifications: ['басс гитара', '4 струны', 'made in Japan'],
    image: 'https://disk.yandex.by/i/0LkgcpWL2oSAzA',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Gibson SG Standart',
    specifications: ['электро-гитара', 'USA 2006'],
    image: 'https://disk.yandex.by/i/aIKUiXfObr2r-Q',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Epiphone',
    specifications: ['акустическая гитара', 'made in Korea'],
    image: 'https://disk.yandex.by/i/Vb4jM1OZXpDVSQ',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
  {
    dates: createReserveData(),
    name: 'Yamaha',
    specifications: ['Барабаны'],
    image: 'https://disk.yandex.by/i/52xDpwhmHDvA6A',
    instrumentId: Math.random().toString(36).substr(2, 9),
  },
];
