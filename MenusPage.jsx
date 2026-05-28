import React from 'react';

function MenusPage() {
  // ТУК ДОБАВИ ТВОИТЕ ДАННИ И ИМЕНА НА СНИМКИ
  const menus = [
    {
      id: 1,
      name: "Меню 'Пица'",
      image: "images/menu-pica.png", // Снимката трябва да е в public/images/
      description: "Мини пици, пресни зеленчуци, картофки, плодов сок и малка изненада.",
      price: "15.00 € / дете"
    },
    {
      id: 2,
      name: "Меню 'Тост'",
      image: "images/menu-tost.png",
      description: "Домашни сандвич тост, картофки, плодов сок и малка изненада.",
      price: "13.00 € / дете"
    },
    {
      id: 3,
      name: "Меню 'Бургер'",
      image: "images/menu-burger.png",
      description: "Домашен бургер, картофки, плодов сок и малка изненада.",
      price: "18.00 € / дете"
    },
    {
        id: 4,
        name: "Сладко меню",
        image: "images/menu-keks.png",
        description: "Домашни сладки, плодов сок и малка изненада.",
        price: "12.00 € / дете"
      }
  ];

  return (
    <div style={pageContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Нашите Вкусни Менюта 🍕</h1>
        <p style={subtitleStyle}>Подбрани с любов и грижа за малките ни гости</p>
      </header>

      <div style={gridStyle}>
        {menus.map((menu) => (
          <div key={menu.id} style={cardStyle} className="menu-card">
            <div style={imageWrapperStyle}>
              <img src={menu.image} alt={menu.name} style={imgStyle} />
            </div>
            <div style={infoStyle}>
              <h3 style={menuTitleStyle}>{menu.name}</h3>
              <p style={descStyle}>{menu.description}</p>
              <div style={priceTagStyle}>{menu.price}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .menu-card { transition: transform 0.3s ease; }
        .menu-card:hover { transform: scale(1.03); }
      `}</style>
    </div>
  );
}

// СТИЛИЗАЦИЯ
const pageContainerStyle = { padding: '60px 20px', backgroundColor: '#fff5f7', minHeight: '100vh' };
const headerStyle = { textAlign: 'center', marginBottom: '50px' };
const titleStyle = { color: '#ff85a2', fontSize: '3rem', marginBottom: '10px' };
const subtitleStyle = { color: '#777', fontSize: '1.2rem' };

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '40px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '25px',
  overflow: 'hidden',
  boxShadow: '0 15px 35px rgba(255,133,162,0.1)',
  display: 'flex',
  flexDirection: 'column'
};

const imageWrapperStyle = { width: '100%', height: '250px', overflow: 'hidden' };
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover' };

const infoStyle = { padding: '25px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const menuTitleStyle = { color: '#444', fontSize: '1.5rem', marginBottom: '15px' };
const descStyle = { color: '#666', lineHeight: '1.6', marginBottom: '20px' };
const priceTagStyle = { 
  backgroundColor: '#ff85a2', 
  color: 'white', 
  padding: '10px 20px', 
  borderRadius: '50px', 
  fontWeight: 'bold', 
  display: 'inline-block',
  alignSelf: 'center'
};

export default MenusPage;