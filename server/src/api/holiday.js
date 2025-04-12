const cachedHolidayData = {};

export const fetchHolidays = async (month, year) => {
  const API_KEY = process.env.HOLIDAYS_KEY;
  console.log("holiday kye", API_KEY)
  // console.log(year, month);

  const country = "IN"; // Country Code for India
  const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}&month=${month}`;

  try {
    const monthYearKey = `${month}${year}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data.response.holidays);
    cachedHolidayData[monthYearKey] = data.response.holidays;

    return data.response.holidays;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
};

export const getCachedHolidayData = () => {
  return cachedHolidayData;
};
