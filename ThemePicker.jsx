import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ThemeSelector() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    // Извикваме PHP скрипта
    axios.get('http://localhost/kids-center/get_themes.php')
      .then(response => {
        setThemes(response.data);
      })
      .catch(error => console.error("Грешка при извличане:", error));
  }, []);

  return (
    <div>
      <h3>Изберете тема:</h3>
      <select>
        {themes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.name} ({theme.gender})
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSelector;