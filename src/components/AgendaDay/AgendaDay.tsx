import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
  });

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose } = props;
  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

    const unsortedArray = [
      {
        id: 1,
        title: "Reminder 1",
        date: "2023-08-24",
        color: "red"
      },
      {
        id: 2,
        title: "Reminder 2",
        date: "2023-08-21",
        color: "orange"
      },
      {
        id: 3,
        title: "Reminder 3",
        date: "2023-08-30",
        color: "green"
      },
      {
        id: 4,
        title: "Reminder 3",
        date: "2023-08-11",
        color: "green"
      }
    ];
    
    const sortedArray = [...unsortedArray].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    const sortedList = sortedArray.map((event) => {
      return (
        <div style={{margin: "10px", padding: "10px", background: `${event.color}`, borderRadius: "5px"}}>
          <div style={{padding: "5px", color: "white"}}>{event.title}</div>
          <div style={{padding: "5px", color: "white"}}>{event.date}</div>
        </div>
      )
    })

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        {sortedList}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
