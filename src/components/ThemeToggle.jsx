import { useEffect, useState } from 'react';
import { Moon, Sun, iconProps } from './icons.js';

export default function ThemeToggle({ labelled = false }) {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('docaine-theme', theme);
    } catch {}
    window.dispatchEvent(new CustomEvent('docaine-theme-change', { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const onThemeChange = (e) => setTheme(e.detail);
    window.addEventListener('docaine-theme-change', onThemeChange);
    return () => window.removeEventListener('docaine-theme-change', onThemeChange);
  }, []);

  const dark = theme === 'dark';
  const label = dark ? 'Mode clair' : 'Mode sombre';
  const toggle = () => {
    setTheme(dark ? 'light' : 'dark');
    setSpin((n) => n + 1);
  };
  return (
    <button
      className={labelled ? 'text-btn' : 'icon-btn'}
      onClick={toggle}
      aria-label={`Passer en ${label.toLowerCase()}`}
      title={label}
    >
      {labelled ? label : (
        <span key={spin} className={`theme-toggle-icon${spin ? ' theme-toggle-icon--spin' : ''}`}>
          {dark ? <Sun {...iconProps} /> : <Moon {...iconProps} />}
        </span>
      )}
    </button>
  );
}
