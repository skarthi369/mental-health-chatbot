import React, { useState, useEffect, useRef } from 'react';
import RealTimeAnalysis from './RealTimeAnalysis';

const ChatInterface = ({ language, onEndSession }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: `Hello! I am here to support you in ${language}. How are you feeling today?` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState({ emotion: 'Neutral', stress_level: 'Low' });
    const messagesEndRef = useRef(null);

    // Unique session ID for this chat instance
    const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg.content,
                    language: language,
                    session_id: sessionId
                }),
            });

            const data = await response.json();

            setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
            setAnalysis({
                emotion: data.emotion,
                stress_level: data.stress_level
            });

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const endSession = async () => {
        try {
            const response = await fetch('http://localhost:8000/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            });
            const data = await response.json();
            onEndSession(data.report);
        } catch (e) {
            console.error("Error generating report", e);
            onEndSession("Could not generate report at this time.");
        }
    };

    return (
        <div className="page-transition container chat-interface" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🤖</span>
                    Support Session ({language})
                </h2>
                <button className="glass-button" style={{ borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={endSession}>
                    End Session & Get Report
                </button>
            </div>

            <div className="chat-container">
                <div className="glass-panel chat-box">
                    <div className="messages-area">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="message ai" style={{ opacity: 0.7 }}>
                                Thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="input-area" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            className="glass-input"
                            style={{ flex: 1 }}
                            placeholder="Type your feelings here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={loading}
                        />
                        <button className="glass-button primary" onClick={sendMessage} disabled={loading}>
                            Send
                        </button>
                    </div>
                </div>

                <RealTimeAnalysis emotion={analysis.emotion} stressLevel={analysis.stress_level} />
            </div>
        </div>
    );
};

export default ChatInterface;
