import React, { useEffect, useState } from 'react';

/**
 * ViewCounter Component
 * 
 * This component displays the total page view count by interacting with a backend API.
 * It prevents double-incrementing the count during a single page load, even in React's StrictMode.
 * 
 * Props:
 *  - apiUrl (string): The API endpoint to POST/GET the view count. Default: '/api/views'.
 *  - storageKey (string): A unique key to track if the count has been incremented during the current page load. Default: 'frontend_views_count'.
 */

export default function ViewCounter({ apiUrl = '/api/views', storageKey = 'frontend_views_count' }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let mounted = true;
    const windowObj = typeof window !== 'undefined' ? window : {};
    windowObj.__incrementedKeys = windowObj.__incrementedKeys || new Set();

    // Avoid double-incrementing during a single page load
    if (windowObj.__incrementedKeys.has(storageKey)) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
          if (mounted) setCount(json.count ?? json.value ?? json.views);
        })
        .catch(() => { });
      return;
    }

    // Increment the count on the backend
    fetch(apiUrl, { method: 'POST' })
      .then(response => response.json())
      .then(json => {
        if (mounted) setCount(json.count ?? json.value ?? json.views);
      })
      .catch(() => { });

    windowObj.__incrementedKeys.add(storageKey);

    return () => {
      mounted = false;
    };
  }, [apiUrl, storageKey]);

  return (
    <div className="view-counter" aria-live="polite">
      <span className="view-label">Page views:</span>{' '}
      <strong className="view-count">{count === null ? '—' : count}</strong>
    </div>
  );
}