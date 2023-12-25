"use client";

import Cards from "./cards";
import CalendarDateRangePicker from "./date-range-picker";

const UserBalance = () => {
  return (
    <div className="flex flex-col bg-primary">
      <div className="flex items-center mt-4 px-5 gap-2 justify-between">
        <h1 className="font-semibold text-xl lg:text-2xl text-white">
          Dashboard
        </h1>
        <CalendarDateRangePicker />
      </div>
      <Cards />
    </div>
  );
};

export default UserBalance;
