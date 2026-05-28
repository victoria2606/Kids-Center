import React from 'react';

function Gallery() {
  const images = [
    "https://animatoriplovdiv.com/wp-content/uploads/2018/07/%D0%BF%D0%B0%D1%80%D1%82%D0%B8-%D0%B7%D0%B0-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD-%D0%B4%D0%B5%D0%BD.jpg",
    "https://s13emagst.akamaized.net/products/64321/64320022/images/res_09b8a79d3a06feefe4df1d47f9b493c1.jpg",
    "https://giventertainment.com/wp-content/uploads/2019/02/%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%BE-%D0%BF%D0%B0%D1%80%D1%82%D0%B8-%D0%B7%D0%B0-%D0%B8%D0%BC%D0%B5%D0%BD-%D0%B4%D0%B5%D0%BD.jpg",
    "https://www.zzentertainment-bg.com/wp-content/uploads/2018/12/detski-partita.jpg",
    "https://imgrabo.com/pics/deals/17025602388980.jpg",
    "https://eextra.eu/image/catalog/Blog/children-at-birthday-party.jpg"
  ];

  return (
    // Добавяме flex и центриране на основния контейнер
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '100%' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#ff85a2', 
        fontSize: '2.5rem', 
        marginBottom: '10px' 
      }}>
        📸 Нашата Галерия
      </h2>

      {/* НОВОТО ПОДЗАГЛАВИЕ */}
      <h3 style={{
        textAlign: 'center',
        color: '#555',
        fontWeight: 'normal',
        fontSize: '1.2rem',
        maxWidth: '600px',
        marginBottom: '40px', // Увеличаваме разстоянието до снимките
        lineHeight: '1.6'
      }}>
        Разгледайте малка част от нашите незабравими партита! Тук споделяме усмивките и радостта на децата, които празнуват своите специални моменти при нас. ✨
      </h3>

      <div style={{ 
        display: 'grid', 
        // auto-fit разпределя снимките равномерно в центъра
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '25px',
        width: '100%',
        maxWidth: '1100px', // Ограничаваме широчината, за да не се "разтягат" прекалено
        justifyContent: 'center' // Центрира самите колони
      }}>
        {images.map((img, index) => (
          <div key={index} style={{ overflow: 'hidden', borderRadius: '15px' }}>
            <img 
              src={img} 
              alt="Kids party" 
              style={{ 
                width: '100%', 
                height: '250px', // Фиксирана височина за по-подреден вид
                objectFit: 'cover', // Изрязва снимката, без да я разтяга
                transition: 'transform 0.3s ease', // Ефект при посочване
                cursor: 'pointer',
                display: 'block'
              }} 
              // Малък бонус: ефект при посочване с мишката
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;