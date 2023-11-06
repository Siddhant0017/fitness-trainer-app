import React from 'react';

const CalendarPage = ({ appointments, deleteAppointment, calendarData }) => {
  return (
    <div>
      <h2>Calendar</h2>
      {calendarData.map((entry) => (
        <div key={entry.appointmentDate} className='calendar-entry'>
          <p>
            Name: {entry.clientName}<br />
            Date: {entry.appointmentDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CalendarPage;













