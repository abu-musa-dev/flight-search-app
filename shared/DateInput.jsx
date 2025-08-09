import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ date, setDate }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      minDate={new Date()}
      placeholderText="Select a date"
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
      dateFormat="yyyy-MM-dd"
      // optional: show popper arrow
      popperPlacement="bottom-start"
      showPopperArrow={false}
    />
  );
};

export default DateInput;
