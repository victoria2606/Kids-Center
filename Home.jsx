import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={containerStyle}>
      
      {/* 1. HERO SECTION */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h1 style={heroTitleStyle}>Където мечтите на децата оживяват! ✨</h1>
          <p style={heroSubtitleStyle}>Най-вълшебните партита в града се случват точно тук.</p>
          <Link to="/book" className="pulse-button" style={ctaButtonStyle}>
            Резервирай своето парти сега
          </Link>
        </div>
      </section>

      {/* 2. НАШАТА ИСТОРИЯ */}
      <section style={storySectionStyle}>
        <div style={waveDividerStyle}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '70px', fill: '#ffffff', opacity: 0.3 }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        <div style={floatingIconStyle(10, 5, -15)}>🎈</div>
        <div style={floatingIconStyle(70, 85, 20)}>✨</div>
        <div style={floatingIconStyle(40, 90, 10)}>🧸</div>

        <div style={contentWrapperStyle}>
          <div style={textSideStyle}>
            <h2 style={sectionHeadingStyle}>Приказката на Kids Center 🎈</h2>
            <p style={storyTextStyle}>
              Всичко започна преди 5 години с една проста мечта – да създадем място, където смехът на децата никога не спира. 
              Ние не просто организираме рождени дни, ние създаваме спомени, които остават за цял живот.
            </p>
          </div>
          
          <div style={imageDecorationStyle}>
            <div style={circleDecorator}>🎉</div>
            <div style={circleDecoratorSmall}>🎂</div>
          </div>
        </div>
      </section>

      {/* 3. ДИНАМИЧНИ КАРТИ С ПРЕДИМСТВА (ВЕЧЕ С ЛИНКОВЕ) */}
      <section style={featuresSectionStyle}>
        
        {/* КАРТА АНИМАТОРИ */}
        <Link to="/animators" style={linkWrapperStyle}>
          <div style={featureCardStyle} className="feature-card">
            <span style={{fontSize: '3.5rem', display: 'block', marginBottom: '15px'}}>🤡</span>
            <h3 style={{color: '#444'}}>Професионални Аниматори</h3>
            <p style={{color: '#777'}}>Нашите герои знаят как да забавляват малчуганите.</p>
            <span style={moreInfoStyle}>Виж повече →</span>
          </div>
        </Link>

        {/* КАРТА МЕНЮ */}
        <Link to="/menus" style={linkWrapperStyle}>
          <div style={featureCardStyle} className="feature-card">
            <span style={{fontSize: '3.5rem', display: 'block', marginBottom: '15px'}}>🍕</span>
            <h3 style={{color: '#444'}}>Вкусно Меню</h3>
            <p style={{color: '#777'}}>Специално подбрана храна за деца и родители.</p>
            <span style={moreInfoStyle}>Виж повече →</span>
          </div>
        </Link>

        {/* КАРТА УКРАСА */}
        <Link to="/decorations" style={linkWrapperStyle}>
          <div style={featureCardStyle} className="feature-card">
            <span style={{fontSize: '3.5rem', display: 'block', marginBottom: '15px'}}>🎨</span>
            <h3 style={{color: '#444'}}>Тематична Украса</h3>
            <p style={{color: '#777'}}>Превръщаме залата в декор от любимите им филми.</p>
            <span style={moreInfoStyle}>Виж повече →</span>
          </div>
        </Link>

      </section>

      {/* Вграден CSS за Hover ефект */}
      <style>{`
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: #ff85a2;
        }
      `}</style>
    </div>
  );
}

// Помощни стилове
const floatingIconStyle = (top, left, rotate) => ({
  position: 'absolute', top: `${top}%`, left: `${left}%`, fontSize: '5rem', opacity: 0.07, transform: `rotate(${rotate}deg)`, pointerEvents: 'none'
});

const linkWrapperStyle = { textDecoration: 'none', color: 'inherit' };
const moreInfoStyle = { display: 'block', marginTop: '15px', color: '#ff85a2', fontWeight: 'bold', fontSize: '0.9rem' };

// ОСТАНАЛИТЕ СТИЛОВЕ
const containerStyle = { width: '100%', overflowX: 'hidden', backgroundColor: '#fff' };
const heroSectionStyle = { height: '75vh', backgroundImage: 'url("https://trafficnews.bg/news/2022/05/29/detsko-parti-i-bezplaten-sladoled-denia-277.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 0 80px 80px' };
const heroOverlayStyle = { textAlign: 'center', color: 'white', padding: '50px', background: 'rgba(0,0,0,0.35)', borderRadius: '40px', backdropFilter: 'blur(4px)', maxWidth: '80%' };
const heroTitleStyle = { fontSize: '3.8rem', marginBottom: '20px', textShadow: '3px 3px 6px rgba(0,0,0,0.4)' };
const heroSubtitleStyle = { fontSize: '1.6rem', marginBottom: '35px', fontWeight: '300' };
const ctaButtonStyle = { padding: '18px 45px', backgroundColor: '#ff85a2', color: 'white', textDecoration: 'none', borderRadius: '50px', fontSize: '1.4rem', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(255,133,162,0.5)', display: 'inline-block' };
const storySectionStyle = { padding: '120px 20px', background: 'linear-gradient(180deg, #ffffff 0%, #fff5f7 40%, #f0faff 100%)', position: 'relative', overflow: 'hidden' };
const waveDividerStyle = { position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0 };
const contentWrapperStyle = { maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', position: 'relative', zIndex: 2 };
const textSideStyle = { flex: 1.2, minWidth: '320px' };
const sectionHeadingStyle = { color: '#ff85a2', fontSize: '2.8rem', marginBottom: '25px' };
const storyTextStyle = { fontSize: '1.2rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' };
const imageDecorationStyle = { flex: 0.8, display: 'flex', justifyContent: 'center', position: 'relative', height: '250px' };
const circleDecorator = { width: '180px', height: '180px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', boxShadow: '0 15px 30px rgba(0,0,0,0.08)' };
const circleDecoratorSmall = { position: 'absolute', bottom: '10px', right: '20px', width: '90px', height: '90px', backgroundColor: '#e0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 8px 15px rgba(0,0,0,0.05)' };
const featuresSectionStyle = { display: 'flex', justifyContent: 'center', gap: '40px', padding: '80px 20px', flexWrap: 'wrap', backgroundColor: '#f0faff' };
const featureCardStyle = { width: '280px', padding: '40px 30px', backgroundColor: 'white', borderRadius: '30px', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.04)', border: '1px solid #f0f0f0', cursor: 'pointer' };

export default Home;