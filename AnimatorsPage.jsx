import React from 'react';

function AnimatorsPage() {
  const animators = [
    {
      id: 1,
      name: "Елза и Анна",
      image: "/images/animator-elza.png",
      specialty: "Замръзналото кралство",
      description: "Магическо приключение със сняг, песни и много ледени игри."
    },
    {
      id: 2,
      name: "Спайдърмен",
      image: "/images/animator-supergeroi.png",
      specialty: "Супергерои",
      description: "Обучение за супергерои, преодоляване на препятствия и спасяване на партито."
    },
    {
      id: 3,
      name: "Парти с балони",
      image: "/images/animator-baloni.png",
      specialty: "Класическо Парти",
      description: "Фокуси, животни от балони и безкрайни смешки за всички възрасти."
    },
    {
      id: 4,
      name: "Динозаври",
      image: "/images/animator-dinozavri.png",
      specialty: "Щура Забава",
      description: "Танци, банани и много бели с любимите жълти герои."
    },
      {
      id: 5,
      name: "Еднорози",
      image: "/images/animator-ednorog.png",
      specialty: "Щура Забава",
      description: "Танци, еднорози и много от любимите герои."
    },
    {
      id: 6,
      name: "Парти с феи",
      image: "/images/animator-fei.png",
      specialty: "Щура Забава",
      description: "Танци, феи и много от любимите герои."
    },
    {
      id: 7,
      name: "Коли",
      image: "/images/animator-koli.png",
      specialty: "Щура Забава",
      description: "Танци, коли и много от любимите герои."
    },
      {
      id: 8,
      name: "Пирати",
      image: "/images/animator-pirati.png",
      specialty: "Щура Забава",
      description: "Танци, пирати и много от любимите герои."
    },
      {
      id: 9,
      name: "Принцеси",
      image: "/images/animator-princesi.png",
      specialty: "Щура Забава",
      description: "Танци, принцеси и много от любимите герои."
    },
      {
      id: 10,
      name: "Розово парти",
      image: "/images/animator-rozovo.png",
      specialty: "Щура Забава",
      description: "Танци, розово парти и много от любимите герои."
    },
      {
      id: 11,
      name: "Space party",
      image: "/images/animator-space.png",
      specialty: "Щура Забава",
      description: "Танци, космически приключения и много от любимите герои."
    },
  ];

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Нашите Звездни Аниматори 🤡</h1>
        <p style={subtitleStyle}>Професионални актьори, които превръщат всяко парти в магия</p>
      </header>

      <div style={gridStyle}>
        {animators.map((animator) => (
          <div key={animator.id} style={cardStyle} className="animator-card">
            <div style={imageContainerStyle}>
              <img src={animator.image} alt={animator.name} style={imgStyle} />
            </div>
            <h3 style={nameStyle}>{animator.name}</h3>
            <div style={badgeStyle}>{animator.specialty}</div>
            <p style={descStyle}>{animator.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        .animator-card { transition: all 0.3s ease; }
        .animator-card:hover { transform: translateY(-10px); }
      `}</style>
    </div>
  );
}

// СТИЛИЗАЦИЯ
const pageStyle = { padding: '60px 20px', backgroundColor: '#f0faff', minHeight: '100vh' };
const headerStyle = { textAlign: 'center', marginBottom: '60px' };
const titleStyle = { color: '#1976d2', fontSize: '3rem', marginBottom: '10px' };
const subtitleStyle = { color: '#666', fontSize: '1.2rem' };

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  width: '280px',
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '30px 20px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  border: '2px solid #e3f2fd'
};

const imageContainerStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  overflow: 'hidden',
  margin: '0 auto 20px',
  border: '5px solid #ff85a2'
};

const imgStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const nameStyle = { fontSize: '1.6rem', color: '#444', marginBottom: '10px' };
const badgeStyle = { 
  display: 'inline-block', 
  padding: '5px 15px', 
  backgroundColor: '#ff85a2', 
  color: 'white', 
  borderRadius: '20px', 
  fontSize: '0.85rem', 
  fontWeight: 'bold',
  marginBottom: '15px' 
};
const descStyle = { color: '#777', lineHeight: '1.5', fontSize: '0.95rem' };

export default AnimatorsPage;