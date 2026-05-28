import React from 'react';

function MenuSelector({ menus, selectedMenu, setSelectedMenu, kidsCount, setKidsCount }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Избор на меню</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Брой деца: </label>
        <input 
          type="number" 
          min="1" 
          value={kidsCount} 
          onChange={(e) => setKidsCount(e.target.value)}
          style={{ width: '60px', padding: '5px' }}
        />
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {menus.map(menu => (
          <div 
            key={menu.id} 
            onClick={() => setSelectedMenu(menu)}
            style={{
              padding: '10px',
              border: selectedMenu?.id === menu.id ? '2px solid #28a745' : '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: selectedMenu?.id === menu.id ? '#f4fff4' : '#fff'
            }}
          >
            <strong>{menu.name}</strong> - {menu.price} €/дете 
            <p style={{ fontSize: '0.85em', margin: '5px 0' }}>{menu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuSelector;