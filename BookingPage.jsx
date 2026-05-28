/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSelector from '../components/ThemeSelector';
import MenuSelector from '../components/MenuSelector';
import ServiceSelector from '../components/ServiceSelector';
import BookingCalendar from '../components/BookingCalendar';

function BookingPage() {
  const [gender, setGender] = useState('');
  const [themes, setThemes] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [kidsCount, setKidsCount] = useState(1);
  const [childName, setChildName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(null);

  // --- НОВО: Състояние за Модалния прозорец ---
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (gender !== '') {
      axios.get(`http://localhost/kids-center/get_options.php?gender=${gender}`)
        .then(res => setThemes(Array.isArray(res.data) ? res.data : []))
        .catch(err => console.error("Грешка теми:", err));
    }
    axios.get(`http://localhost/kids-center/get_menus.php`)
      .then(res => setMenus(res.data))
      .catch(err => console.error("Грешка менюта:", err));
    axios.get(`http://localhost/kids-center/get_services.php`)
      .then(res => setAllServices(res.data))
      .catch(err => console.error("Грешка услуги:", err));
  }, [gender]);

  const calculateTotal = () => {
    const menuPrice = selectedMenu ? selectedMenu.price * kidsCount : 0;
    const servicesPrice = selectedServices.reduce((sum, s) => sum + parseFloat(s.price), 0);
    return (menuPrice + servicesPrice).toFixed(2);
  };

  const handleBooking = () => {
    if (!childName || !selectedTime || !selectedMenu || !gender || !selectedTheme) {
      alert("Моля, попълнете всички полета!");
      return;
    }

    // ТУК Е ПРОМЯНАТА: Добавихме kidsCount в обекта finalData
    const finalData = {
      childName: childName,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      themeId: selectedTheme.id,
      menuId: selectedMenu.id,
      notes: notes,
      kidsCount: kidsCount, // Вече броят се изпраща към create_reservation.php
    };

    axios.post('http://localhost/kids-center/create_reservation.php', finalData)
      .then(res => {
        if (res.data.success || res.data.status === "success") {
          setShowModal(true);
          // Изчистваме формата
          setChildName('');
          setNotes('');
          setSelectedTime(null);
          setSelectedTheme(null);
          setKidsCount(1); // Връщаме броя деца на 1 за следващия клиент
        } else {
          alert("Грешка: " + res.data.message);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={pageWrapperStyle}>
      <h1 style={titleStyle}>Направи Резервация ✨</h1>
      
      <div style={mainFormContainerStyle}>
        
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>1. Избери тема 🎈</h3>
          <ThemeSelector themes={themes} setGender={setGender} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>2. Меню и гости 🍕</h3>
          <MenuSelector menus={menus} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} kidsCount={kidsCount} setKidsCount={setKidsCount} />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>3. Допълнителни услуги ✨</h3>
          <ServiceSelector services={allServices} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>4. Дата и час 📅</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BookingCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </div>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>5. Детайли за рожденика 📝</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Име на детето" value={childName} onChange={(e) => setChildName(e.target.value)} style={inputStyle} />
            <textarea placeholder="Бележки (алергии, предпочитания...)" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'none' }} />
          </div>
        </section>

        <div style={totalSummaryStyle}>
           <p style={{ margin: 0, fontSize: '1.1rem' }}>Избран час: <strong>{selectedTime || '---'}</strong></p>
           <h2 style={{ margin: '10px 0 0 0', fontSize: '2rem' }}>Обща сума: {calculateTotal()} €</h2>
        </div>

        <button onClick={handleBooking} style={bookingButtonStyle}>
          ПОТВЪРДИ РЕЗЕРВАЦИЯТА
        </button>
      </div>

      {/* --- МОДАЛЕН ПРОЗОРЕЦ ЗА УСПЕХ --- 
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ fontSize: '5rem', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ color: '#ff85a2', fontSize: '2.2rem', marginBottom: '10px' }}>Честито!</h2>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
              Вашето парти е резервирано успешно! ✨<br />
              Очакваме ви за един незабравим празник.
            </p>
            <button 
              onClick={() => window.location.href = '/'} 
              style={modalButtonStyle}
            >
              Към началната страница
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// СТИЛИЗАЦИЯ
const pageWrapperStyle = { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '50px' };
const titleStyle = { textAlign: 'center', color: '#ff85a2', fontSize: '2.8rem', marginBottom: '30px' };
const mainFormContainerStyle = { background: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', width: '100%', maxWidth: '850px' };
const sectionStyle = { marginBottom: '40px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' };
const sectionTitleStyle = { color: '#444', marginBottom: '20px', fontSize: '1.4rem' };
const inputStyle = { padding: '15px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1.1rem', outline: 'none' };
const totalSummaryStyle = { marginTop: '30px', padding: '25px', background: 'linear-gradient(135deg, #ff85a2 0%, #ffacbe 100%)', color: '#fff', borderRadius: '20px', textAlign: 'center' };
const bookingButtonStyle = { marginTop: '30px', width: '100%', padding: '20px', backgroundColor: '#4CAF50', color: 'white', fontSize: '1.3rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer' };

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(8px)'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '50px',
  borderRadius: '40px',
  textAlign: 'center',
  maxWidth: '500px',
  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
};

const modalButtonStyle = {
  marginTop: '30px',
  padding: '15px 40px',
  backgroundColor: '#ff85a2',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(255,133,162,0.3)'
};

export default BookingPage;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeSelector from '../components/ThemeSelector';
import MenuSelector from '../components/MenuSelector';
import ServiceSelector from '../components/ServiceSelector';
import BookingCalendar from '../components/BookingCalendar';

function BookingPage() {
  const [gender, setGender] = useState('');
  const [allThemes, setAllThemes] = useState([]); // Пазим всички теми
  const [filteredThemes, setFilteredThemes] = useState([]); // Само тези за избрания пол
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [kidsCount, setKidsCount] = useState(1);
  const [childName, setChildName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://localhost:5000";

  // 1. Първоначално зареждане на данните от JSON Server
  useEffect(() => {
    // Вземаме ТЕМИ
    axios.get(`${API_URL}/themes`)
      .then(res => setAllThemes(res.data))
      .catch(err => console.error("Грешка теми:", err));

    // Вземаме МЕНЮТА
    axios.get(`${API_URL}/menus`)
      .then(res => setMenus(res.data))
      .catch(err => console.error("Грешка менюта:", err));

    // Вземаме УСЛУГИ
    axios.get(`${API_URL}/services`)
      .then(res => setAllServices(res.data))
      .catch(err => console.error("Грешка услуги:", err));
  }, []);

  // 2. Филтриране на темите спрямо пола
  useEffect(() => {
    if (gender === 'boy') {
      setFilteredThemes(allThemes.filter(t => t.category === 'boy' || t.category === 'universal'));
    } else if (gender === 'girl') {
      setFilteredThemes(allThemes.filter(t => t.category === 'girl' || t.category === 'universal'));
    } else {
      setFilteredThemes([]);
    }
    setSelectedTheme(null); // Нулираме избраната тема при смяна на пола
  }, [gender, allThemes]);

  const calculateTotal = () => {
    const menuPrice = selectedMenu ? selectedMenu.price * kidsCount : 0;
    const servicesPrice = selectedServices.reduce((sum, s) => sum + parseFloat(s.price), 0);
    return (menuPrice + servicesPrice).toFixed(2);
  };

  const handleBooking = () => {
    if (!childName || !selectedTime || !selectedMenu || !gender || !selectedTheme) {
      alert("Моля, попълнете всички полета!");
      return;
    }

    const finalData = {
      childName: childName,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      themeName: selectedTheme.name,
      menuName: selectedMenu.name,
      kidsCount: kidsCount,
      totalPrice: calculateTotal(),
      notes: notes,
      status: "pending", // Новите резервации влизат като "чакащи"
      createdAt: new Date().toISOString()
    };

    // ЗАПИС В JSON SERVER
    axios.post(`${API_URL}/reservations`, finalData)
      .then(res => {
        setShowModal(true);
        // Изчистване
        setChildName('');
        setNotes('');
        setSelectedTime(null);
        setSelectedTheme(null);
        setKidsCount(1);
        setSelectedServices([]);
      })
      .catch(err => {
        alert("Грешка при свързване със сървъра!");
        console.error(err);
      });
  };

  return (
    <div style={pageWrapperStyle}>
      <h1 style={titleStyle}>Направи Резервация ✨</h1>
      
      <div style={mainFormContainerStyle}>
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>1. Избери тема 🎈</h3>
          <ThemeSelector 
            themes={filteredThemes} 
            setGender={setGender} 
            selectedTheme={selectedTheme} 
            setSelectedTheme={setSelectedTheme} 
          />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>2. Меню и гости 🍕</h3>
          <MenuSelector 
            menus={menus} 
            selectedMenu={selectedMenu} 
            setSelectedMenu={setSelectedMenu} 
            kidsCount={kidsCount} 
            setKidsCount={setKidsCount} 
          />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>3. Допълнителни услуги ✨</h3>
          <ServiceSelector 
            services={allServices} 
            selectedServices={selectedServices} 
            setSelectedServices={setSelectedServices} 
          />
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>4. Дата и час 📅</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BookingCalendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              selectedTime={selectedTime} 
              setSelectedTime={setSelectedTime} 
            />
          </div>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>5. Детайли за рожденика 📝</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Име на детето" value={childName} onChange={(e) => setChildName(e.target.value)} style={inputStyle} />
            <textarea placeholder="Бележки (алергии, предпочитания...)" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'none' }} />
          </div>
        </section>

        <div style={totalSummaryStyle}>
           <p style={{ margin: 0, fontSize: '1.1rem' }}>Избран час: <strong>{selectedTime || '---'}</strong></p>
           <h2 style={{ margin: '10px 0 0 0', fontSize: '2rem' }}>Обща сума: {calculateTotal()} €</h2>
        </div>

        <button onClick={handleBooking} style={bookingButtonStyle}>
          ПОТВЪРДИ РЕЗЕРВАЦИЯТА
        </button>
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ fontSize: '5rem', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ color: '#ff85a2', fontSize: '2.2rem', marginBottom: '10px' }}>Честито!</h2>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
              Вашето парти е резервирано успешно! ✨<br />
              Очакваме ви за един незабравим празник.
            </p>
            <button onClick={() => window.location.href = '/'} style={modalButtonStyle}>
              Към началната страница
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// СТИЛИЗАЦИЯ
const pageWrapperStyle = { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '50px' };
const titleStyle = { textAlign: 'center', color: '#ff85a2', fontSize: '2.8rem', marginBottom: '30px' };
const mainFormContainerStyle = { background: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', width: '100%', maxWidth: '850px' };
const sectionStyle = { marginBottom: '40px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' };
const sectionTitleStyle = { color: '#444', marginBottom: '20px', fontSize: '1.4rem' };
const inputStyle = { padding: '15px', borderRadius: '12px', border: '2px solid #eee', fontSize: '1.1rem', outline: 'none' };
const totalSummaryStyle = { marginTop: '30px', padding: '25px', background: 'linear-gradient(135deg, #ff85a2 0%, #ffacbe 100%)', color: '#fff', borderRadius: '20px', textAlign: 'center' };
const bookingButtonStyle = { marginTop: '30px', width: '100%', padding: '20px', backgroundColor: '#4CAF50', color: 'white', fontSize: '1.3rem', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer' };

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(8px)'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '50px',
  borderRadius: '40px',
  textAlign: 'center',
  maxWidth: '500px',
  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
};

const modalButtonStyle = {
  marginTop: '30px',
  padding: '15px 40px',
  backgroundColor: '#ff85a2',
  color: 'white',
  border: 'none',
  borderRadius: '50px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(255,133,162,0.3)'
};

export default BookingPage;

// СТИЛИЗАЦИЯТА ОСТАВА СЪЩАТА (копирай я от твоя оригинален файл)
// ...