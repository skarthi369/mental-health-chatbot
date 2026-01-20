import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import ChatInterface from './components/ChatInterface';
import ReportView from './components/ReportView';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // landing, chat, report
  const [language, setLanguage] = useState('English');
  const [reportData, setReportData] = useState(null);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setCurrentView('chat');
  };

  const handleEndSession = (report) => {
    setReportData(report);
    setCurrentView('report');
  };

  const handleRestart = () => {
    setReportData(null);
    setLanguage('English');
    setCurrentView('landing');
  };

  return (
    <>
      {currentView === 'landing' && (
        <LanguageSelector onSelect={handleLanguageSelect} />
      )}

      {currentView === 'chat' && (
        <ChatInterface
          language={language}
          onEndSession={handleEndSession}
        />
      )}

      {currentView === 'report' && (
        <ReportView
          report={reportData}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
