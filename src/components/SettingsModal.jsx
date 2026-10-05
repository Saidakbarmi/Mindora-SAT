import React, { useState } from 'react';
import { X, Moon, Sun, Volume2, Shield, User, Sliders, Bell } from 'lucide-react';

export default function SettingsModal({ onClose, student, onUpdateStudent, lang = 'uz' }) {
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState(student.name);
  const [goalScore, setGoalScore] = useState(student.goalScore);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateStudent) {
      onUpdateStudent({
        ...student,
        name,
        goalScore: Number(goalScore)
      });
    }
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <div className="mindora-modal-backdrop" onClick={onClose}>
      <div className="settings-modal-container glass-card animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <div className="settings-title-group">
            <Sliders size={20} className="text-mint" />
            <h3>{lang === 'uz' ? 'Sozlamalar va Tanlovlar' : 'Settings & Preferences'}</h3>
          </div>
          <button className="settings-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="settings-layout">
          {/* Settings Tabs */}
          <div className="settings-nav-sidebar">
            <button 
              className={`settings-tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <User size={16} />
              <span>{lang === 'uz' ? 'Profil va Maqsad' : 'Profile & Goals'}</span>
            </button>
            <button 
              className={`settings-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Moon size={16} />
              <span>{lang === 'uz' ? 'Ko\'rinish' : 'Appearance'}</span>
            </button>
            <button 
              className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} />
              <span>{lang === 'uz' ? 'Bildirishnomalar' : 'Notifications'}</span>
            </button>
          </div>

          {/* Settings Body */}
          <div className="settings-content-pane">
            {activeTab === 'account' && (
              <form onSubmit={handleSave} className="settings-form">
                <div className="form-group">
                  <label>{lang === 'uz' ? 'Foydalanuvchi Ismi' : 'Display Name'}</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="settings-input"
                  />
                </div>

                <div className="form-group">
                  <label>{lang === 'uz' ? 'Maqsadli SAT Bali' : 'Target SAT Score'}</label>
                  <input 
                    type="number" 
                    min="1000" 
                    max="1600" 
                    step="10"
                    value={goalScore} 
                    onChange={e => setGoalScore(e.target.value)} 
                    className="settings-input"
                  />
                  <span className="field-hint">
                    {lang === 'uz' 
                      ? `Maqsad hozirda ${goalScore} ball (Hozirgi: ${student.currentScore || 1320})`
                      : `Target is currently ${goalScore} (Current: ${student.currentScore || 1320})`}
                  </span>
                </div>

                <div className="form-group">
                  <label>{lang === 'uz' ? 'Imtihon Sanasi' : 'SAT Target Exam Date'}</label>
                  <input 
                    type="text" 
                    disabled 
                    value={lang === 'uz' ? "21-Noyabr, 2026 (47 kun qoldi)" : "November 21, 2026 (47 days remaining)"} 
                    className="settings-input disabled"
                  />
                </div>

                <div className="settings-actions">
                  <button type="submit" className="btn-primary-mint">
                    {lang === 'uz' ? 'Saqlash' : 'Save Changes'}
                  </button>
                  {savedToast && (
                    <span className="save-confirm-text">
                      {lang === 'uz' ? '✓ Sozlamalar saqlandi!' : '✓ Preferences saved!'}
                    </span>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'appearance' && (
              <div className="appearance-options-list">
                <div className="settings-toggle-row">
                  <div>
                    <span className="toggle-title">{lang === 'uz' ? 'Interfeys Mavzusi' : 'Interface Theme'}</span>
                    <p className="toggle-desc">
                      {lang === 'uz' 
                        ? 'Atmosferali Deep Teal va Tiniq Yorug\' mavzular orasida almashish.' 
                        : 'Switch between Atmospheric Deep Glass and Crisp High-Contrast Light.'}
                    </p>
                  </div>
                  <div className="theme-toggle-group">
                    <button 
                      type="button"
                      className={`theme-pill ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <Moon size={14} /> {lang === 'uz' ? 'Tungi Teal' : 'Dark Deep'}
                    </button>
                    <button 
                      type="button"
                      className={`theme-pill ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <Sun size={14} /> {lang === 'uz' ? 'Oq Mavzu' : 'Calm Light'}
                    </button>
                  </div>
                </div>

                <div className="settings-toggle-row">
                  <div>
                    <span className="toggle-title">{lang === 'uz' ? 'Harakatni Kamaytirish' : 'Reduced Motion'}</span>
                    <p className="toggle-desc">
                      {lang === 'uz' 
                        ? 'Kartalarning ko\'tarilishi va fon to\'lqinlari animatsiyasini minimallashtirish.'
                        : 'Minimize subtle card elevation and background wave transitions.'}
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={reducedMotion} 
                    onChange={e => setReducedMotion(e.target.checked)} 
                    className="settings-checkbox"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="notif-preferences">
                <div className="settings-toggle-row">
                  <div>
                    <span className="toggle-title">{lang === 'uz' ? 'Kunlik Streak Eslatmasi' : 'Daily Streak Reminder'}</span>
                    <p className="toggle-desc">
                      {lang === 'uz' 
                        ? 'Kunlik dars bajarilmagan bo\'lsa, soat 18:00 da muloyim eslatma jo\'natish.'
                        : 'Send gentle reminder at 18:00 if daily SAT practice is not completed.'}
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="settings-checkbox" />
                </div>
                <div className="settings-toggle-row">
                  <div>
                    <span className="toggle-title">{lang === 'uz' ? 'Sinov Testi Xabarlari' : 'Practice Test Milestone Alerts'}</span>
                    <p className="toggle-desc">
                      {lang === 'uz' 
                        ? 'Har bir sinov testidan keyin batafsil ball diagnostikasini taqdim etish.'
                        : 'Receive diagnostic score analysis reports after each practice test.'}
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="settings-checkbox" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
