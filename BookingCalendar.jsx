/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingCalendar({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const timeSlots = ["10:00","12:00", "14:00", "16:00", "18:00"];

  // Логика за получаване на днешната дата в ISO формат (YYYY-MM-DD)
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  useEffect(() => {
    // Форматиране на избраната дата за PHP заявката
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    axios.get(`http://localhost/kids-center/get_booked_slots.php?date=${formattedDate}`)
      .then(res => setBookedSlots(res.data))
      .catch(err => console.error("Грешка календар:", err));
  }, [selectedDate]);

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#fff' }}>
      <h3 style={{ color: '#ff85a2' }}>Избор на дата и час</h3>
      <div className="calendar-container">
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Дата на партито:</label>
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]} 
          min={todayFormatted} // ЗАБРАНЯВА минали дати
          onChange={(e) => {
            setSelectedDate(new Date(e.target.value));
            setSelectedTime(""); // Нулираме часа при смяна на датата
          }}
          style={{ 
            padding: '10px', 
            fontSize: '16px', 
            borderRadius: '8px', 
            border: '2px solid #ff85a2', 
            outline: 'none',
            cursor: 'pointer' 
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontWeight: 'bold' }}>Налични часове:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {timeSlots.map(time => {
            const isBooked = bookedSlots.includes(time);
            return (
              <button
                key={time}
                disabled={isBooked}
                type="button" // Предотвратява случайно изпращане на формата
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isBooked ? '#eee' : (selectedTime === time ? '#ff85a2' : '#f0f0f0'),
                  color: isBooked ? '#aaa' : (selectedTime === time ? '#fff' : '#444'),
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  boxShadow: selectedTime === time ? '0 4px 10px rgba(255,133,162,0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {time} {isBooked ? '🚫' : ''}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingCalendar({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"];

  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  useEffect(() => {
    // 1. Форматираме датата точно както се пази в db.json (YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // 2. Викаме всички резервации за тази дата от JSON Server
    // Използваме вградения филтър на json-server: ?date=YYYY-MM-DD
    axios.get(`http://localhost:5000/reservations?date=${formattedDate}`)
      .then(res => {
        // Вземаме само часовете от намерените резервации
        const booked = res.data.map(reservation => reservation.time);
        setBookedSlots(booked);
      })
      .catch(err => {
        console.error("Грешка при проверка на свободни часове:", err);
        setBookedSlots([]);
      });
  }, [selectedDate]);

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '15px', marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
      <h3 style={{ color: '#ff85a2', textAlign: 'center' }}>Избор на дата и час ✨</h3>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Дата на партито:</label>
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]} 
          min={todayFormatted}
          onChange={(e) => {
            // Важно: създаваме нова дата, за да се задейства useEffect
            setSelectedDate(new Date(e.target.value));
            setSelectedTime(""); 
          }}
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            borderRadius: '10px', 
            border: '2px solid #ff85a2', 
            outline: 'none',
            cursor: 'pointer',
            textAlign: 'center'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Налични часове за избраната дата:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {timeSlots.map(time => {
            const isBooked = bookedSlots.includes(time);
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                disabled={isBooked}
                type="button"
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: '12px 25px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: isBooked ? '#f0f0f0' : (isSelected ? '#ff85a2' : '#fff5f7'),
                  color: isBooked ? '#ccc' : (isSelected ? '#fff' : '#ff85a2'),
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  boxShadow: isSelected ? '0 4px 12px rgba(255,133,162,0.4)' : 'none',
                  transition: 'all 0.2s ease',
                  border: isSelected ? 'none' : '1px solid #ffdae3',
                  fontSize: '1rem'
                }}
              >
                {time} {isBooked ? '🚫' : ''}
              </button>
            );
          })}
        </div>
      </div>
      {bookedSlots.length === timeSlots.length && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>
          Всички часове за тази дата са заети! 
        </p>
      )}
    </div>
  );
}

export default BookingCalendar;