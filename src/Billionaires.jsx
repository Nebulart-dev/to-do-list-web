import React, { useState, useEffect } from 'react';

export default function Billionaires() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка API:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка рейтинга миллиардеров...</p>;

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px', backgroundColor: '#fff', color: '#000' }}>
      <h3>💰 Мировой рейтинг богатейших людей (Интеграция с внешним API)</h3>
      <ol>
        {people.map((person, index) => (
          <li key={person.id} style={{ margin: '8px 0' }}>
            <strong>{person.name}</strong> — {person.company?.name || 'Global Industries'} 
            <span style={{ color: 'green', marginLeft: '10px' }}>
              (${(150 - index * 7.5).toFixed(1)} млрд)
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
