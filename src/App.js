import React, { useState, useEffect } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import CalendarPage from './components/CalendarPage';
import './App.css';

const App = () => {
  const [clients, setClients] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  const addClient = (newClient) => {
    setClients([...clients, newClient]);

    // Update calendarData with the new client's appointment
    const newAppointmentData = {
      clientId: newClient.id,
      clientName: `${newClient.firstName} ${newClient.lastName}`,
      appointmentDate: newClient.appointments[0].date,
      appointmentTime: newClient.appointments[0].time,
    };

    setCalendarData([...calendarData, newAppointmentData]);
  };

  const editClient = (clientId, updatedClient) => {
    const updatedClients = clients.map((client) =>
      client.id === clientId ? { ...client, ...updatedClient } : client
    );
    setClients(updatedClients);
  };

  const deleteAppointment = (clientId, appointmentId) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        const updatedAppointments = client.appointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
        return { ...client, appointments: updatedAppointments };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
    if (!showCalendar) {
      const calendarData = clients.flatMap((client) =>
        client.appointments.map((appointment) => ({
          clientId: client.id,
          clientName: `${client.firstName} ${client.lastName}`,
          appointmentDate: appointment.date,
          appointmentTime: appointment.time,
        }))
      );
      setCalendarData(calendarData);
    }
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updatedClients = clients.filter((client) => client.id !== clientId);
      setClients(updatedClients);

      // Remove client's information from the calendar
      const updatedCalendarData = calendarData.filter((entry) => entry.clientId !== clientId);
      setCalendarData(updatedCalendarData);
    }
  };

  useEffect(() => {
    if (showCalendar) {
      // Force a re-render by toggling showCalendar off and on
      setShowCalendar(false);
      setShowCalendar(true);
    }
  }, [calendarData, showCalendar]);

  return (
    <div className="App">
      <div className="background-layer layer-1"></div>
      <h1>Fitness Training Appointment Scheduling</h1>
      <div className="top-right-container">
        <div className="show-calendar-container">
          <button onClick={handleShowCalendar}>{showCalendar ? 'Hide Calendar' : 'Show Calendar'}</button>
          <div className={showCalendar ? 'calendar-container' : 'hidden'}>
            <CalendarPage calendarData={calendarData} />
          </div>
        </div>
      </div>
      <AppointmentForm addClient={addClient} />
      <AppointmentList
        clients={clients}
        deleteAppointment={deleteAppointment}
        editClient={editClient}
        deleteClient={handleDeleteClient}
      />
    </div>
  );
};

export default App;
