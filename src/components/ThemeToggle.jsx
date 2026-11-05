import { useEffect, useState } from 'react';

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
          {dark ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
          )}
        </span>
      )}
    </button>
  );
}
