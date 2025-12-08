import React, { useEffect, useState, useRef } from 'react';

/**
 * ViewCounter Component
 * 
 * This component displays the total page view count by interacting with a backend API.
 */

export default function CounterBlock() {

  const endpoint = import.meta.env.VITE_COUNTER_ENDPOINT || "";
  console.log("CounterBlock using endpoint:", endpoint);

  const [count, setCount] = useState(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    // Prevent double increment in React Strict Mode
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    // Automatically increment on page load
    increment();
  }, []);

  const increment = () => {
    fetch(endpoint + "/counter", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(Number(data.count) || 0))
      .catch((err) => console.error("Error incrementing count:", err));
  };

  return (
    <div className="view-counter" aria-live="polite">
      <span className="view-label">Page views:</span>{' '}
      <strong className="view-count">{count === null ? '' : count}</strong>
    </div>
  );
}