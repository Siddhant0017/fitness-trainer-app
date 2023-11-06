import React, { useState, useRef } from 'react';
import '../App.css';

const AppointmentItem = ({ client, deleteAppointment, editClient, deleteClient }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({
    firstName: client.firstName,
    lastName: client.lastName,
    location: client.location,
    appointments: [...client.appointments],
  });

  const confirmDeleteRef = useRef(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveEdit = () => {
    editClient(client.id, editedClient);
    setEditMode(false);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updatedAppointments = editedClient.appointments.filter(
        (appointment) => appointment.id !== appointmentId
      );
      setEditedClient({ ...editedClient, appointments: updatedAppointments });
    }
  };

  const handleDeleteClient = () => {
    if (!confirmDeleteRef.current && window.confirm('Are you sure you want to delete this client?')) {
      confirmDeleteRef.current = true;
      deleteClient(client.id);
    }
    confirmDeleteRef.current = false; // Reset the ref for the next delete
  };

  return (
    <div className={`appointment-item ${editMode ? 'edit-mode' : ''}`}>
      <h3>
        {client.firstName} {client.lastName}
      </h3>
      <p>Location: {client.location}</p>
      {client.appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-details">
          <span>Date: {appointment.date}</span>
          <span>Time: {appointment.time}</span>
        </div>
      ))}
      {editMode && (
        <div className="edit-mode-content">
          <label>
            First Name:
            <input
              type="text"
              value={editedClient.firstName}
              onChange={(e) =>
                setEditedClient({ ...editedClient, firstName: e.target.value })
              }
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={editedClient.lastName}
              onChange={(e) =>
                setEditedClient({ ...editedClient, lastName: e.target.value })
              }
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={editedClient.location}
              onChange={(e) =>
                setEditedClient({ ...editedClient, location: e.target.value })
              }
            />
          </label>
          <div className="appointment-details">
            <label>
              Date:
              <input
                type="date"
                value={editedClient.appointments[0].date} // Assuming only one appointment for simplicity
                onChange={(e) =>
                  setEditedClient((prevClient) => {
                    const updatedAppointments = [...prevClient.appointments];
                    updatedAppointments[0] = {
                      ...updatedAppointments[0],
                      date: e.target.value,
                    };
                    return { ...prevClient, appointments: updatedAppointments };
                  })
                }
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={editedClient.appointments[0].time} // Assuming only one appointment for simplicity
                onChange={(e) =>
                  setEditedClient((prevClient) => {
                    const updatedAppointments = [...prevClient.appointments];
                    updatedAppointments[0] = {
                      ...updatedAppointments[0],
                      time: e.target.value,
                    };
                    return { ...prevClient, appointments: updatedAppointments };
                  })
                }
              />
            </label>
          </div>
          <div className="button-group">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </div>
        </div>
      )}
      {!editMode && (
        <div className="button-group">
          <button onClick={handleEditToggle}>Edit</button>
          <button onClick={handleDeleteClient}>Delete Client</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentItem;







