
import React from 'react';

// Увери се, че имената в скобите { } съвпадат точно с тези в BookingPage
function ThemeSelector({ themes, setGender, selectedTheme, setSelectedTheme }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Празник за:</label>
        <select 
          onChange={(e) => setGender(e.target.value)} 
          style={{ padding: '10px', borderRadius: '10px', border: '2px solid #ff85a2', outline: 'none' }}
        >
          <option value="">Изберете...</option>
          <option value="girl">Момиче 🎀</option>
          <option value="boy">Момче 💙</option>
        </select>
      </div>

      {themes && themes.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px',
          marginTop: '20px' 
        }}>
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              style={{
                padding: '20px',
                borderRadius: '15px',
                border: selectedTheme?.id === theme.id ? '3px solid #ff85a2' : '2px solid #eee',
                backgroundColor: selectedTheme?.id === theme.id ? '#fff0f3' : 'white',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedTheme?.id === theme.id ? '0 5px 15px rgba(255,133,162,0.3)' : 'none',
                fontWeight: selectedTheme?.id === theme.id ? 'bold' : 'normal',
                color: '#444'
              }}
            >
              {theme.name}
            </div>
          ))}
        </div>
      ) : (
        
        <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
          Моля, изберете пол, за да видите наличните теми...
        </p>
      )}
    </div>
  );
}

export default ThemeSelector;
