import { fetchHolidays, getCachedHolidayData } from "../api/holiday.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getHolidayDetails = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  const monthYearKey = `${month}${year}`;

  const holidayData = getCachedHolidayData();
  // console.log(holidayData)

  let data = {};

  if (holidayData.hasOwnProperty(monthYearKey)) {
    // data = holidayData[monthYearKey];
  } else {
    
    // data = await fetchHolidays(month, year);
    // console.log("new fetch of holidays")
  }

  return res.status(200).json({
    success: true,
    data,
    message: "Holiday data fetch successfully",
  });
});
