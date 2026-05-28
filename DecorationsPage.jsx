import React from 'react';

function DecorationsPage() {
  const decorations = [
    {
      id: 1,
      name: "Балонено парти",
      image: "/images/party-baloni.png",
      description: "Цветен океан от радост! Хиляди балони в невероятни форми и цветове, които създават лека и игрива атмосфера. Идеалният декор за тези, които искат едно наистина обемно и впечатляващо тържество."
    },
    {
      id: 2,
      name: "Парти с динозаври",
      image: "/images/party-dinozavri.png",
      description: "Върнете се милиони години назад в праисторическия свят! Джунгла от балони, гигантски динозаври и изследователски декор, който ще превърне всеки малък гост в истински палеонтолог."
    },
    {
      id: 3,
      name: "Парти с еднорози",
      image: "/images/party-ednorog.png",
      description: "Влезте в едно вълшебно кралство от дъги и облаци. Магически декор в пастелни цветове, блестящи еднорози и пухкава украса, която превръща мечтите в реалност."
    },
    {
      id: 4,
      name: "Парти с Елза и Анна",
      image: "/images/party-elza.png",
      description: "Ледено приключение в Арендел! Кристални сини балони, снежинки и зимна приказка, която ще стопли сърцето на всяко малко дете. Магията на Замръзналото кралство е точно тук."
    },
    {
      id: 5,
      name: "Супергеройски Щаб",
      image: "/images/party-supergeroi.png",
      description: "Призоваваме всички герои! Динамичен декор с комикс елементи, емблеми на любимите суперсили и градски пейзажи. Мястото, където всеки малчуган ще открие своята скрита сила и ще спаси деня!"
    },
      {
      id: 6,
      name: "Парти с феи",
      image: "/images/party-fei.png",
      description: "Вълшебна градина, изпълнена с цветя и горски дух. Деликатна украса с крилца, светлинки и горски елементи, които ще накарат децата да повярват в магията на природата."
    },
      {
      id: 7,
      name: "Парти с коли",
      image: "/images/party-koli.png",
      description: "Старт на най-бързото парти в града! Карирани флагове, състезателни писти и декор, вдъхновен от Формула 1 и Маккуин Светкавицата за феновете на високите скорости."
    },
      {
      id: 8,
      name: "Парти с пирати",
      image: "/images/party-pirati.png",
      description: "Вдигнете платната и тръгнете на лов за съкровища! Ковчежета със злато, пиратски знамена и истински корабен декор за едно смело приключение в открито море."
    },
      {
      id: 9,
      name: "Парти с принцеси",
      image: "/images/party-princesi.png",
      description: "Кралски бал за малките благородници! Изискан декор с тиари, златни орнаменти и нежни воали. Превърнете рожден ден в истинска коронация в най-красивия замък, строен някога."
    },
      {
      id: 10,
      name: "Розово парти",
      image: "/images/party-rozovo.png",
      description: "Стил, нежност и много блясък! Елегантна декорация в различни нюанси на розовото, идеална за малки дами, които обичат естетиката и празничната атмосфера."
      },
      {
      id: 11,
      name: "Space Party",
      image: "/images/party-space.png",
      description: "Едно междугалактическо пътешествие извън пределите на въображението! Светещи планети, ракети, готови за излитане, и звезден прах за малките астронавти и откриватели."
    }
  ];

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Магическа Украса 🎨</h1>
        <p style={subtitleStyle}>Превръщаме всяко кътче в декор от любима приказка</p>
      </header>

      <div style={galleryGridStyle}>
        {decorations.map((item) => (
          <div key={item.id} style={galleryItemStyle} className="decor-card">
            <div style={imageContainerStyle}>
              <img src={item.image} alt={item.name} style={imgStyle} />
              <div style={overlayStyle} className="overlay">
                <h3 style={overlayTitleStyle}>{item.name}</h3>
                <p style={overlayDescStyle}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .decor-card {
          position: relative;
          cursor: pointer;
          border-radius: 30px;
          overflow: hidden;
        }
        .overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .decor-card:hover .overlay {
          opacity: 1;
        }
        .decor-card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

// СТИЛИЗАЦИЯ
const pageStyle = { padding: '60px 20px', backgroundColor: '#ffffff', minHeight: '100vh' };
const headerStyle = { textAlign: 'center', marginBottom: '60px' };
const titleStyle = { color: '#ff85a2', fontSize: '3.2rem', fontWeight: 'bold' };
const subtitleStyle = { color: '#888', fontSize: '1.2rem', marginTop: '10px' };

const galleryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '20px',
  maxWidth: '1300px',
  margin: '0 auto'
};

const galleryItemStyle = {
  height: '400px',
  borderRadius: '30px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
};

const imageContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(101, 90, 92, 0.85)', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Центрира текста вертикално
  alignItems: 'center',     // Центрира текста хоризонтално
  padding: '20px',
  color: 'white',
  textAlign: 'center',      // Подравнява текста в центъра
  boxSizing: 'border-box'
};

const overlayTitleStyle = { 
  fontSize: '1.8rem', 
  margin: '0 0 10px 0', 
  fontWeight: 'bold',
  textShadow: '1px 1px 4px rgba(0,0,0,0.2)' 
};

const overlayDescStyle = { 
  fontSize: '1.1rem', 
  lineHeight: '1.4', 
  margin: 0,
  maxWidth: '90%' // Да не залепва за краищата
};
export default DecorationsPage;