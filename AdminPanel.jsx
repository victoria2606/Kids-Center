import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [reservations, setReservations] = useState([]);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    if (isLoggedIn) fetchReservations();
  }, [isLoggedIn]);

  const fetchReservations = () => {
    axios.get(`${API_URL}/reservations`)
      .then(res => {
        setReservations(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error("Грешка при зареждане:", err));
  };

  // Помощна функция за проверка дали датата е минала
  const isPastDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Нулираме часа за коректно сравнение само по дата
    const reservationDate = new Date(dateStr);
    return reservationDate < today;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`${API_URL}/admins`)
      .then(res => {
        const admins = res.data;
        const user = admins.find(a => a.username === credentials.username && a.password === credentials.password);
        
        if (user) {
          setIsLoggedIn(true);
          setUserRole(user.username === 'admin' ? 'admin' : 'worker');
        } else {
          alert("Грешно потребителско име или парола!");
        }
      });
  };

  const handleAction = (id, action) => {
    if (action === 'delete') {
      if (!window.confirm("Сигурни ли сте, че искате да изтриете тази резервация?")) return;
      axios.delete(`${API_URL}/reservations/${id}`)
        .then(() => fetchReservations());
    } else if (action === 'confirm') {
      axios.patch(`${API_URL}/reservations/${id}`, { status: 'confirmed' })
        .then(() => fetchReservations());
    }
  };

  const handleEditKids = (id, currentCount) => {
    const newCount = window.prompt("Промяна на брой деца:", currentCount);
    if (newCount !== null && newCount !== "") {
      axios.patch(`${API_URL}/reservations/${id}`, { 
        kidsCount: parseInt(newCount) 
      })
      .then(() => fetchReservations())
      .catch(() => alert("Грешка при обновяване."));
    }
  };

  const calculateTotalRevenue = () => {
    return reservations.reduce((total, res) => {
      return total + (parseFloat(res.totalPrice) || 0);
    }, 0).toFixed(2);
  };

  if (!isLoggedIn) {
    return (
      <div style={loginContainerStyle}>
        <h2 style={{ color: '#ff85a2' }}>Вход в Системата 🔐</h2>
        <form onSubmit={handleLogin} style={loginFormStyle}>
          <input type="text" placeholder="Потребител" style={inputStyle} value={credentials.username} onChange={e => setCredentials({...credentials, username: e.target.value})} />
          <input type="password" placeholder="Парола" style={inputStyle} value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} />
          <button type="submit" style={loginButtonStyle}>Влез</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff85a2' }}>
          {userRole === 'admin' ? '👑 Администратор' : '👋 Служител'}: {credentials.username}
        </h2>
        <button onClick={() => setIsLoggedIn(false)} style={logoutButtonStyle}>Изход</button>
      </div>

      {userRole === 'admin' && (
        <div style={revenueCardStyle}>
          <h3 style={{ margin: 0 }}>💰 Общи приходи от резервации: {calculateTotalRevenue()} €</h3>
        </div>
      )}

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={thStyle}>Дете</th>
              <th style={thStyle}>Брой Деца</th>
              <th style={thStyle}>Дата / Час</th>
              <th style={thStyle}>Тема</th>
              <th style={thStyle}>Меню</th>
              <th style={thStyle}>Сума</th>
              <th style={thStyle}>Статус</th>
              <th style={thStyle}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr><td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>Няма намерени резервации.</td></tr>
            ) : (
              reservations.map(res => {
                const past = isPastDate(res.date);
                return (
                  <tr 
                    key={res.id} 
                    style={{
                      ...tableRowStyle, 
                      backgroundColor: past ? '#f2f2f2' : 'white',
                      opacity: past ? 0.7 : 1,
                      fontStyle: past ? 'italic' : 'normal'
                    }}
                  >
                    <td style={tdStyle}>
                      <b>{res.childName}</b> {past && <span style={{fontSize: '0.7rem'}}>(Минало)</span>}
                    </td>
                    <td style={tdStyle}>
                      {res.kidsCount} 
                      {!past && <button onClick={() => handleEditKids(res.id, res.kidsCount)} style={editSmallButtonStyle}>✏️</button>}
                    </td>
                    <td style={tdStyle}>{res.date} | {res.time}</td>
                    <td style={tdStyle}><span style={themeBadgeStyle}>{res.themeName}</span></td>
                    <td style={tdStyle}>{res.menuName}</td>
                    <td style={tdStyle}>{res.totalPrice} €</td>
                    <td style={tdStyle}>
                       <span style={statusBadgeStyle(res.status)}>
                         {res.status === 'confirmed' ? '✅ Потвърдена' : '⏳ Чакаща'}
                       </span>
                    </td>
                    <td style={tdStyle}>
                      {!past && res.status !== 'confirmed' && (
                        <button onClick={() => handleAction(res.id, 'confirm')} style={confirmButtonStyle}>Потвърди</button>
                      )}
                      {userRole === 'admin' && (
                        <button onClick={() => handleAction(res.id, 'delete')} style={deleteButtonStyle}>Изтрий</button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// СТИЛИЗАЦИЯ
const thStyle = { padding: '15px', textAlign: 'left', borderBottom: '2px solid #ff85a2' };
const tdStyle = { padding: '15px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const tableHeaderStyle = { backgroundColor: '#fff5f7' };
const tableRowStyle = { borderBottom: '1px solid #eee', transition: 'background 0.3s' };
const loginContainerStyle = { maxWidth: '350px', margin: '150px auto', textAlign: 'center', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '20px' };
const loginFormStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const loginButtonStyle = { padding: '12px', backgroundColor: '#ff85a2', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const logoutButtonStyle = { padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ff85a2', color: '#ff85a2', background: 'none' };
const revenueCardStyle = { background: 'linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)', color: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const tableWrapperStyle = { boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee' };
const themeBadgeStyle = { background: '#fce4ec', color: '#c2185b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500' };
const confirmButtonStyle = { background: '#4CAF50', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' };
const deleteButtonStyle = { background: '#f44336', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' };
const editSmallButtonStyle = { background: 'none', border: 'none', marginLeft: '5px', cursor: 'pointer', fontSize: '1.1rem' };
const statusBadgeStyle = (status) => ({ 
  color: status === 'confirmed' ? '#2e7d32' : '#ef6c00', 
  fontWeight: 'bold',
  fontSize: '0.9rem'
});

export default AdminPanel;