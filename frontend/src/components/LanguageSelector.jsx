import React from 'react';

const languages = [
    { code: 'English', label: 'English', flag: '🇬🇧' },
    { code: 'Tamil', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'Hindi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'Spanish', label: 'Español', flag: '🇪🇸' },
    { code: 'French', label: 'Français', flag: '🇫🇷' },
];

const LanguageSelector = ({ onSelect }) => {
    return (
        <div className="page-transition container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Welcome to Serenity AI
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Your personal mental health support companion. Select your preferred language to begin.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', width: '100%', maxWidth: '800px' }}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        className="glass-button glass-panel"
                        onClick={() => onSelect(lang.code)}
                        style={{ padding: '20px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                    >
                        <span style={{ fontSize: '2rem' }}>{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
