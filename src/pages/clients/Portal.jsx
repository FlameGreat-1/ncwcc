import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

const Portal = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Portal with basic hooks</h1>
        <p>User: {user?.email}</p>
        <p>Theme: {isDark ? 'Dark' : 'Light'}</p>
      </div>
    </div>
  );
};
