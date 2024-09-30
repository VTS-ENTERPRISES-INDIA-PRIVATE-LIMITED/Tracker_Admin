import React, { useState } from "react";

const Datetime = () => {
  const [currDate, setCurrDate] = useState();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDate = (date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${day} ${month} ${year}, ${dayOfWeek}`;
  };
  return <div className="date-cnt">{getDate(new Date())}</div>;
};

export default Datetime;
