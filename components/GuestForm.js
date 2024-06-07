'use client'
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase.config";
import AddToCalendar from '../api/AddToCalendar';

const generateToken = () => {
  return Math.random().toString(36).substr(2, 9);
};

const GuestForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [assistance, setAssistance] = useState(false);
  const [accompanist, setAccompanist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGuest = {
      name,
      surname,
      email,
      photos: [],
      token: generateToken(),
      assistance,
      accompanist,
      comment: ''
    };

    try {
      await addDoc(collection(db, "guests"), newGuest);
      alert("Guest created successfully!");
      
      // Limpiar el formulario después de enviar
      setName('');
      setSurname('');
      setEmail('');
      setAssistance(false);
      setAccompanist(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating guest. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Surname:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Assistance:
          <input type="checkbox" checked={assistance} onChange={(e) => setAssistance(e.target.checked)} />
        </label>
      </div>
      {assistance && (
        <div>
          <h3>Agregar al calendario</h3>
          <AddToCalendar event={{ title: 'Evento de Asistencia', description: 'Descripción del evento', location: 'Ubicación del evento', startTime: '2024-06-30T10:00:00', endTime: '2024-06-30T12:00:00' }} />
        </div>
      )}
      <div>
        <label>
          Accompanist:
          <input type="checkbox" checked={accompanist} onChange={(e) => setAccompanist(e.target.checked)} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestForm;
