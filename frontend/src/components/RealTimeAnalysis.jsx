import React from 'react';

const RealTimeAnalysis = ({ emotion, stressLevel }) => {
    const getStressColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'low': return 'stress-low';
            case 'medium': return 'stress-medium';
            case 'high': return 'stress-high';
            default: return '';
        }
    };

    return (
        <div className="glass-panel analysis-panel">
            <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', marginBottom: '0' }}>Real-time Analysis</h3>

            <div className="indicator">
                <h4>Dominant Emotion</h4>
                <div className="value" style={{ color: 'var(--accent-color)' }}>
                    {emotion || 'Neutral'}
                </div>
            </div>

            <div className="indicator">
                <h4>Stress Level</h4>
                <div className={`value ${getStressColor(stressLevel)}`}>
                    {stressLevel || 'Unknown'}
                </div>
            </div>

            <div className="indicator" style={{ marginTop: 'auto' }}>
                <h4>Session Status</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Active Monitoring
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--success-color)', borderRadius: '50%', marginLeft: '8px', animation: 'pulse 2s infinite' }}></span>
                </div>
            </div>

            <style>
                {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
            </style>
        </div>
    );
};

export default RealTimeAnalysis;
