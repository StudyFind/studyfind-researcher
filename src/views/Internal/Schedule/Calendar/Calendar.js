import React, { useState, useEffect } from "react";
import { Grid } from "@chakra-ui/react";

import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

function Calendar({ date, setDate, today }) {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  useEffect(() => {
    const now = new Date();
    setMonth(now.getMonth());
    setYear(now.getFullYear());
  }, []);

  const backMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        backYear();
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        nextYear();
        return 0;
      }
      return prev + 1;
    });
  };

  const backYear = () => {
    setYear((prev) => prev - 1);
  };

  const nextYear = () => {
    setYear((prev) => prev + 1);
  };

  return (
    <Grid gap="8px" w="300px">
      <CalendarHead
        month={month}
        year={year}
        backYear={backYear}
        backMonth={backMonth}
        nextYear={nextYear}
        nextMonth={nextMonth}
      />
      <hr />
      <CalendarBody month={month} year={year} today={today} date={date} setDate={setDate} />
    </Grid>
  );
}

export default Calendar;
