import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import BookingPage from './pages/BookingPage';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import MenusPage from './pages/MenusPage';
import AnimatorsPage from './pages/AnimatorsPage';
import DecorationsPage from './pages/DecorationsPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f0faff' }}>
        
        {/* НАВИГАЦИЯ */}
        <nav style={navStyle}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff85a2' }}>🎨 Kids Center</div>
          </Link>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={linkStyle}>Начало</Link>
            <Link to="/gallery" style={linkStyle}>Галерия</Link>
            <Link to="/book" style={bookingLinkStyle}>Резервирай</Link>
            <Link to="/admin" style={{ ...linkStyle, fontSize: '0.8rem', opacity: 0.6 }}>Вход</Link>
          </div>
        </nav>

        {/* СЪДЪРЖАНИЕ */}
        <div style={{ paddingBottom: '50px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* НОВИТЕ ПЪТИЩА */}
            <Route path="/menus" element={<MenusPage />} />
            <Route path="/animators" element={<AnimatorsPage />} />
            <Route path="/decorations" element={<DecorationsPage />} />
          </Routes>
        </div>

        {/* ФУТЪР */}
        <Footer />
      </div>
    </Router>
  );
}

const navStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '15px 50px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const linkStyle = { textDecoration: 'none', color: '#555', fontWeight: '600' };

const bookingLinkStyle = {
  textDecoration: 'none', backgroundColor: '#ff85a2', color: 'white',
  padding: '8px 20px', borderRadius: '25px', fontWeight: 'bold'
};

export default App;