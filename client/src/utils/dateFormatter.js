// modify the due date of task to show
  export const getFormattedDueDate = (dueDate) => {
    const selectedDate = new Date(dueDate); // Convert to Date object

    const currentDate = new Date(); // Get current date
    currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1); // Set to tomorrow

    // Compare the dates
    if (selectedDate.getTime() === currentDate.getTime()) {
      return "Today";
    } else if (selectedDate.getTime() === tomorrowDate.getTime()) {
      return "Tomorrow";
    } else {
      const year = currentDate.getFullYear();
      const selectedDateYear = selectedDate.getFullYear();
      const selectedDateMonth =
        selectedDate
          .toLocaleString("default", { month: "short" }) // 'Jan', 'Feb', etc.
          .charAt(0)
          .toUpperCase() +
        selectedDate.toLocaleString("default", { month: "short" }).slice(1);
      const selectedDateDay = selectedDate.getDate();
      if (year === selectedDateYear) {
        return `${selectedDateMonth} ${selectedDateDay}`;
      } else {
        return `${selectedDateMonth} ${selectedDateDay}, ${selectedDateYear}`;
      }
    }
  };

  // find the due date to the task is expired
  export const isTaskDueDateIsPassed = (dueDate) => {
    const currentDate = new Date(); // Current date and time

    // Convert input date string to a Date object
    const selectedDate = new Date(dueDate);

    // Reset currentDate to remove time part for accurate comparison
    currentDate.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (selectedDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };
