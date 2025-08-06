import { useEffect, useState } from 'react';

// Rotates through tab indexes every 5 seconds
export default function useAutoTab(tabCount, delay = 5000) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabCount);
    }, delay);
    return () => clearInterval(interval);
  }, [tabCount, delay]);

  return [activeTab, setActiveTab];
}