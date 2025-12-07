import React, { useEffect, useState, useRef } from 'react';

/**
 * ViewCounter Component
 * 
 * This component displays the total page view count by interacting with a backend API.
 */

export default function CounterBlock() {

  const [count, setCount] = useState(0);
  const endpoint = import.meta.env.VITE_COUNTER_ENDPOINT;
  console.log("CounterBlock using endpoint:", endpoint);
  // const endpoint = "";
  const hasIncremented = useRef(false);

  useEffect(() => {

    if (hasIncremented.current) return;
    hasIncremented.current = true;

    fetch(endpoint + "/counter", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(Number(data.count) || 0))
      .catch((err) => console.error("Error incrementing count:", err));

  }, []);

  
  return (
    <div className="view-counter" aria-live="polite">
      <span className="view-label">Page views:</span>{' '}
      <strong className="view-count">{count}</strong>
    </div>
  );
}






// const increment = () => {
// };

{/* <strong className="view-count">{count === null ? '—' : increment}</strong> */ }

// fetch(endpoint + "/counter")
//   .then((res) => res.json())
//   .then((data) => setCount(Number(data.count) || 0))
//   .catch((err) => console.error("Error fetching count:", err));

// { apiUrl = '/api/views', storageKey = 'frontend_views_count' }
