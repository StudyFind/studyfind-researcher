import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import { UserContext } from "context";

import { Grid } from "@chakra-ui/react";

import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

function Calendar({ date, setDate, today }) {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const { timezone } = useContext(UserContext);

  useEffect(() => {
    const now = moment().utc().tz(timezone);
    setMonth(now.month());
    setYear(now.year());
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
    <Grid gap="8px" w="300px" h="320px">
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
