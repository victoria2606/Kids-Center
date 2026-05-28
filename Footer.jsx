import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* Секция Контакти */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>📞 Контакти</h4>
          <p style={textStyle}>Телефон: +359 888 123 456</p>
          <p style={textStyle}>Email: info@kidscenter.bg</p>
        </div>

        {/* Секция Адрес */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>📍 Къде сме </h4>
          <p style={textStyle}>гр. София, кв. Младост 4</p>
          <p style={textStyle}>ул. "Детска мечта" №15</p>
        </div>

        {/* Секция Работно време */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>⏰ Работно време</h4>
          <p style={textStyle}>Пон - Пет: 09:00 - 20:00</p>
          <p style={textStyle}>Съб - Нед: 10:00 - 21:00</p>
        </div>

      </div>
      
      <div style={bottomLineStyle}>
        © 2026 Kids Center - Всички права запазени. Изработено с ❤️ за усмивките на децата.
      </div>
    </footer>
  );
}

// Стилизация
const footerStyle = { backgroundColor: '#333', color: 'white', padding: '40px 0 20px 0', marginTop: '50px', width: '100%' };
const containerStyle = { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '0 20px' };
const sectionStyle = { minWidth: '200px', marginBottom: '20px' };
const headingStyle = { color: '#ff85a2', marginBottom: '15px', fontSize: '1.2rem' };
const textStyle = { margin: '5px 0', fontSize: '0.9rem', color: '#ccc' };
const bottomLineStyle = { textAlign: 'center', borderTop: '1px solid #444', marginTop: '30px', paddingTop: '20px', fontSize: '0.8rem', color: '#888' };

export default Footer;