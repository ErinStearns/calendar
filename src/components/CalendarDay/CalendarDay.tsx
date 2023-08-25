import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  useQuery,
} from 'react-query'
import { isSameMonth, isSameDay, getDate, parseISO } from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
      maxHeight: "100px",
      overflow: "scroll"
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick } = props;
  const [focused, setFocused] = useState(false);
  

  const getReminders = () => {
    return (
      fetch("https://test-project-interview-f0793-default-rtdb.firebaseio.com/reminders.json", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        const objects = keys.map((key) => { return {...data[key], id:key}})
        return objects;
      })
    )
  }
  
  const query = useQuery('todos', getReminders)

  // console.log(new Date(query.data ? (query.data[1] as any).date : undefined));

  const todaysReminders = (query.data ?? []).filter((item: any) => isSameDay(parseISO(item.date), dateObj.date));

  const isToday = isSameDay(dateObj.date, new Date());
  console.log(isToday);
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  const todaysRemindersList = todaysReminders.map((item:any) => {
    return (
      <div key={item.id} style={{backgroundColor: `${item.color}`, margin: "5px"}}>
        {item.name}
      </div>
    )
  })

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {todaysRemindersList}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
