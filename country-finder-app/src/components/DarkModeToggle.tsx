import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeContext'; // Adjust the path based on your project structure
import MoonIcon from '../assets/moon-outline.svg';
import SunIcon from '../assets/sun-outline.svg'; // Import the sunlight icon

const DarkModeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider'); // Add a fallback for development
  }

  const { theme, toggleTheme } = themeContext;

  const [active, setActive] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    setActive(theme === 'dark');
  }, [theme]);

  const toggle = () => {
    toggleTheme();
    setActive((prevActive) => !prevActive);
  };

  return (
    <button
      aria-pressed={active}
      onClick={toggle}
      className="button no-padding flex items-center gap-2"
    >
      <img
        src={active ? MoonIcon : SunIcon} // Use the sunlight icon when in light mode
        className="icon icon-stroke"
        aria-hidden="true"
        style={{ fill: active ? 'currentColor' : 'none' }}
        alt=""
      /> 
      <span className="sr-only sm:not-sr-only">{active ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;