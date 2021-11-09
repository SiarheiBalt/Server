exports.addReserveToNewDates = (dates, dayId, reserveTime, userId) => {
  const newDates = dates.map((day) => {
    if (dayId === day.id) {
      day.reserveTime = day.reserveTime.map((hourInfo) => {
        const hour = hourInfo.hour;
        const findHour = reserveTime.some((el) => el === hour);
        if (findHour) {
          hourInfo.isFree = false; //резервирую время
          hourInfo.customer = { userId };
        }
        return hourInfo;
      });
    }
    return day;
  });
  return newDates;
};
