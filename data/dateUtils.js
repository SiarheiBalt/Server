const { addDays, getYear, eachDayOfInterval, format } = require('date-fns');
const { ru } = require('date-fns/locale');

// import { addDays, getYear, eachDayOfInterval } from 'date-fns';
// import { format } from 'date-fns';
// import { ru } from 'date-fns/locale';
const today = new Date();
const twoMontsFromNow = addDays(today, 62);
const twoMonthsArray = eachDayOfInterval({
  start: today,
  end: twoMontsFromNow,
});

function getData(dateArray) {
  return dateArray.map((date) => {
    const month = date.getMonth();
    return {
      date: date.getDate(),
      dayofWeek: format(new Date(date), 'eeee', { locale: ru }),
      monthName: format(new Date(date), 'MMMM', { locale: ru }),
      month,
      year: getYear(date),
      reserveTime: [
        {
          hour: '10:00',
          isFree: false,
          customer: null,
        },
        {
          hour: '11:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '12:00',
          isFree: false,
          customer: null,
        },
        {
          hour: '13:00',
          isFree: false,
          customer: null,
        },
        {
          hour: '14:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '15:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '16:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '17:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '18:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '19:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '20:00',
          isFree: true,
          customer: null,
        },
        {
          hour: '21:00',
          isFree: true,
          customer: null,
        },
      ],
      id: Math.random().toString(36).substr(2, 9),
    };
  });
}

exports.createReserveData = () => {
  return getData(twoMonthsArray);
};
