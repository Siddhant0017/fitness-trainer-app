import React, { useState } from 'react';
import '../App.css';

const AppointmentForm = ({ addClient }) => {
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    location: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const [message] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleAddClient = () => {
    if (
      clientInfo.firstName.trim() === '' ||
      clientInfo.lastName.trim() === '' ||
      clientInfo.location.trim() === '' ||
      clientInfo.appointmentDate.trim() === '' ||
      clientInfo.appointmentTime.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    const newClient = {
      id: new Date().getTime(), // Unique ID for each client
      ...clientInfo,
      appointments: [
        {
          id: new Date().getTime(), // Unique ID for each appointment
          date: clientInfo.appointmentDate,
          time: clientInfo.appointmentTime,
        },
      ],
    };

    addClient(newClient);
    alert('Client added successfully!');
    // Reset form fields after adding client
    setClientInfo({
      firstName: '',
      lastName: '',
      location: '',
      appointmentDate: '',
      appointmentTime: '',
    });
  };

  return (
    <div className="AppointmentForm">
     
  <h2>Client Details</h2>
  {message && <p style={{ color: 'green' }}>{message}</p>}
  <div className="form-row">
    <label>First Name</label>
    <input
      type="text"
      name="firstName"
      value={clientInfo.firstName}
      onChange={handleChange}
      placeholder="Enter your First name"
    />
  </div>
  <div className="form-row">
    <label>Last Name</label>
    <input
      type="text"
      name="lastName"
      value={clientInfo.lastName}
      onChange={handleChange}
      placeholder="Enter your Last name"
    />
  </div>
  <div className="form-row">
    <label>Location</label>
    <input
      type="text"
      name="location"
      value={clientInfo.location}
      onChange={handleChange}
      placeholder="Enter your Location"
    />
  </div>
  <div className="form-row">
    <label>Appointment Date</label>
    <input
      type="date"
      name="appointmentDate"
      value={clientInfo.appointmentDate}
      onChange={handleChange}
      
    />
  </div>
  <div className="form-row">
    <label>Appointment Time</label>
    <input
      type="time"
      name="appointmentTime"
      value={clientInfo.appointmentTime}
      onChange={handleChange}
      
    />
  </div>
  <button onClick={handleAddClient}>Add Client</button>
</div>




  );
};


export default AppointmentForm;


