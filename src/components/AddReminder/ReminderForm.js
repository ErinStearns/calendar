import React, {useState} from "react";
import {
  useMutation
} from 'react-query'
import './reminders.css';

const ReminderForm = () => {
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();

  const handleTitleChange = (e) => {
    const titleLength = e.target.value.length
    setTitle(e.target.value);
    if (titleLength == 30) {
      setError(true);
    } else {
      setError(false);
    }
  }

  const createReminder = () => {
    const newReminder = {name: title, date: date, color: selectedColor}
    return (
      fetch("https://test-project-interview-f0793-default-rtdb.firebaseio.com/reminders.json", {
        method: "POST",
        body: JSON.stringify(
          newReminder
        ),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        })

    );
  }

  const createReminderMutation = useMutation(createReminder);

  // add date minimum
  const today = new Date().toISOString().split('T')[0];

  return (
    <form id="reminderForm">
      <div style={{display: "flex"}}>
        <div style={{marginRight: "100px"}}>
          <h4>Add reminder title</h4>
          <input type="text" name="title" onChange={handleTitleChange} maxLength={30} className="form-control" required={true} placeholder="title here..." />
          {error && <div style={{color: 'red', fontSize: "11px", marginTop: "3px"}}>Maximum characters reached...</div>}
          <div>
            <h4>Select a date</h4>
            <input type="date" name="date" className="form-control" required={true} onChange={(e) => setDate(e.target.value)} min={today} />
          </div>
        </div>
        <div>
          <h4>Choose a color</h4>
          <label style={{color: selectedColor === 'red' && 'red', marginRight: "10px", cursor: "pointer"}}>
            <input
              type="radio"
              name="color"
              value="red"
              checked={selectedColor === 'red'}
              onChange={() => setSelectedColor("red")}
            /> Red
          </label>
          <label style={{color: selectedColor === 'green' && 'green', marginRight: "10px", cursor: "pointer"}}>
            <input
              type="radio"
              name="color"
              value="green"
              checked={selectedColor === 'green'}
              onChange={() => setSelectedColor("green")}
            /> Green
          </label>
          <label style={{color: selectedColor === 'orange' && 'orange', marginRight: "10px", cursor: "pointer"}}>
            <input
              type="radio"
              name="color"
              value="orange"
              checked={selectedColor === 'orange'}
              onChange={() => setSelectedColor("orange")}
            /> Orange
          </label>
        </div>
      </div>
      <button type="button" onClick={() => createReminderMutation.mutate()} className="submit-btn">Add reminder</button>
    </form>
  )
}

export default ReminderForm;