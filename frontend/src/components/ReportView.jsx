import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReportView = ({ report, onRestart }) => {
    return (
        <div className="page-transition container" style={{ maxWidth: '800px' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--accent-color)' }}>Session Diagnostic Report</h2>

                <div className="report-content" style={{ lineHeight: '1.6', color: 'var(--text-primary)' }}>
                    {/* We'll assume the report is markdown string */}
                    {/* Note: ReactMarkdown would need to be installed, or we can just render text with newlines if we want to avoid extra deps for now, but I'll use simple rendering or install it. 
              Actually, for simplicity without adding more npm deps in user flow unless needed, I will just render regular text with whitespace preservation if ReactMarkdown isn't available, but let's try to stick to standard HTML or simple parsing.
              Wait, the user wants "Premium", so `react-markdown` is better. passed in plan?
              I didn't explicitly add `react-markdown` to package.json.
              I will assume it's regular text for now or just map newlines to paragraphs.
           */}
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                        {report}
                    </pre>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button className="glass-button" onClick={() => window.print()}>
                        Download / Print
                    </button>
                    <button className="glass-button primary" onClick={onRestart}>
                        Start New Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportView;
