import React, { memo } from "react";

export const Header = memo(() => {
    console.log("Headre")
  return (
    <div className="space-y-2">
      <div className="text-center flex justify-between">
        <h2 className="font-semibold">Chat With AI</h2>
        <div className="font-semibold text-lightTextColor">
          {/* <CalendarHeart /> */}
        </div>
      </div>
      <div>
        <hr className="border-lightTextColor" />
      </div>
    </div>
  );
});