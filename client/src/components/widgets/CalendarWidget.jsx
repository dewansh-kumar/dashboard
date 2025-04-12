import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getHolidayDetails } from "../../service/restApi";

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [selectedMonthHolidays, setSelectedMonthHolidays] = useState(new Map());

  // const fetchHolidays = async (month, year) => {
  //   const API_KEY = import.meta.env.VITE_HOLIDAYS;

  //   // console.log(year, month);

  //   const country = "IN"; // Country Code for India
  //   const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}&month=${month}`;

  //   try {
  //     const monthYearKey = `${month}${year}`;
  //     if (holidays[monthYearKey]) {
  //       return;
  //     }
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     console.log(data.response.holidays);
  //     if (!holidays[monthYearKey]) {
  //       setHolidays((prev) => ({
  //         ...prev,
  //         [monthYearKey]: data.response.holidays,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching holidays:", error);
  //     return [];
  //   }
  // };

  const generateDays = () => {
    const days = [];
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Get the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Calculate the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const lastDateOF5ThRow = 7 - firstDay + 28;

    // Add empty days for the first week if needed
    for (let i = 1; i <= firstDay; i++) {
      // console.log(lastDateOF5ThRow + i)
      if (lastDateOF5ThRow + i > daysInMonth) {
        days.push({ day: null });
      } else {
        days.push({ day: lastDateOF5ThRow + i });
      }
    }

    // Add days of the month
    for (let day = 1; day <= lastDateOF5ThRow; day++) {
      if (day <= daysInMonth) days.push({ day });
      else days.push({ day: null });
    }

    return days;
  };

  const getMonthAndYear = () => {
    const fullMonth = date.toLocaleString("en-IN", { month: "long" });
    const currentYear = date.getFullYear();
    return { fullMonth, currentYear };
  };

  const isCurrentDay = (day) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return (
      day === currentDay &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  };

  const getSelectedMonthHolidays = async () => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthYearKey = `${month}${year}`;
    let holidayArray = [];

    if (holidays.hasOwnProperty(monthYearKey)) {
      holidayArray = holidays[monthYearKey];
    } else {
      const response = await getHolidayDetails(month, year);
      holidayArray = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setHolidays((previous) => ({
        ...previous,
        [monthYearKey]: holidayArray,
      }));
    }

    const holidayMap = new Map();

    holidayArray.forEach((holiday) => {
      const holidayDate = new Date(holiday.date.iso);
      holidayMap.set(holidayDate.getDate(), holiday.name);
    });

    setSelectedMonthHolidays(holidayMap);
  };

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  useEffect(() => {
    // fetchHolidays(date.getMonth() + 1, date.getFullYear());
  }, [date]);

  useEffect(() => {
    getSelectedMonthHolidays();
  }, [date]);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg w-full  mx-auto bg-background min-h-[250px]">
      <div className="space-y-2 h-[10%]">
        <div className="text-center flex justify-between">
          <h2 className="font-semibold">Calendar</h2>
          <h2 className="font-semibold text-lightTextColor">
            {getMonthAndYear().fullMonth} {getMonthAndYear().currentYear}
          </h2>
        </div>

        <div>
          <hr className="border-lightTextColor" />
        </div>
      </div>

      <div className="">
        <div className="flex justify-around items-center my-2">
          <ChevronLeft
            className="cursor-pointer hover:text-lightTextColor"
            onClick={goToPreviousMonth}
          />
          <ChevronRight
            className="cursor-pointer hover:text-lightTextColor"
            onClick={goToNextMonth}
          />
        </div>

        {/* Days of the week headers */}
        <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-lightTextColor mb-4">
          <div className="text-center">S</div>
          <div className="text-center">M</div>
          <div className="text-center">T</div>
          <div className="text-center">W</div>
          <div className="text-center">T</div>
          <div className="text-center">F</div>
          <div className="text-center">S</div>
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2 text-xs">
          {generateDays().map((day, index) => (
            <div
              key={index}
              className={`relative w-full text-center text-[0.8rem] font-semibold  rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                day.day
                  ? isCurrentDay(day.day)
                    ? "bg-secondary text-background" // Highlight current day
                    : "bg-lightBackground hover:bg-gray-700"
                  : ""
              } ${
                day.day && selectedMonthHolidays.has(day.day)
                  ? "text-red-600"
                  : ""
              }`}
            >
              {/* Group Wrapper for Tooltip */}
              <div className="group relative p-[9px] w-full flex align-middle justify-center">
                {/* Display Day */}
                {day.day}

                {day.day && selectedMonthHolidays.has(day.day) && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[150px] bg-black text-white text-[0.7rem] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-ellipsis overflow-hidden whitespace-nowrap"
                    style={{
                      zIndex: 10,
                      transform: `translateX(${
                        index % 7 >= 5 ? "-75%" : "-50%"
                      })`, // Adjust if near the right edge
                    }}
                  >
                    {selectedMonthHolidays.get(day.day)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
