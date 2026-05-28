import React from 'react';

function ServiceSelector({ services, selectedServices, setSelectedServices }) {
  
  const handleToggle = (service) => {
    const exists = selectedServices.find(s => s.id === service.id);
    if (exists) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Допълнителни услуги</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {services.map(service => (
          <label key={service.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox"
              checked={selectedServices.some(s => s.id === service.id)}
              onChange={() => handleToggle(service)}
              style={{ marginRight: '10px', width: '18px', height: '18px' }}
            />
            <span>{service.name} (+{service.price} €)</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ServiceSelector;