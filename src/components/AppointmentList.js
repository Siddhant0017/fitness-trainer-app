// src/components/AppointmentList.js
import React from 'react';
import AppointmentItem from './AppointmentItem';
import '../App.css';

const AppointmentList = ({ clients, deleteAppointment, editClient, deleteClient }) => {
  return (
    <div className="client-list-container">
      <div className="client-list-header">Client Appointment List</div>
    <div className="AppointmentList">
      
      {clients.map((client) => (
        <div key={client.id} className="AppointmentItem">
          <AppointmentItem
            client={client}
            deleteAppointment={deleteAppointment}
            editClient={editClient}
            deleteClient={() => deleteClient(client.id)}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default AppointmentList;



