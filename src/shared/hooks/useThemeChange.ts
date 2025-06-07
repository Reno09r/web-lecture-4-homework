import { useState, useEffect } from 'react';

export const useThemeChange = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    const handleThemeChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    document.addEventListener('themeChange', handleThemeChange);
    return () => {
      document.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);
  
  return forceUpdate;
}; 