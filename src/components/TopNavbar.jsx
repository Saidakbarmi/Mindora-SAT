import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Menu, 
  X,
  Globe,
  PanelLeft
} from 'lucide-react';
import { translations } from '../utils/i18n';

const UzFlag = () => (
  <svg width="18" height="13" viewBox="0 0 24 16" className="lang-flag-svg" style={{ borderRadius: '2.5px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
    <rect width="24" height="5" fill="#1eb53a" y="11" />
    <rect width="24" height="6" fill="#ffffff" y="5" />
    <rect width="24" height="5" fill="#0099b5" y="0" />
    <rect width="24" height="0.6" fill="#d52b1e" y="5" />
    <rect width="24" height="0.6" fill="#d52b1e" y="10.4" />
    <circle cx="4.5" cy="2.5" r="1.5" fill="#ffffff" />
    <circle cx="5.1" cy="2.5" r="1.3" fill="#0099b5" />
  </svg>
);

const UsFlag = () => (
  <svg width="18" height="13" viewBox="0 0 24 16" className="lang-flag-svg" style={{ borderRadius: '2.5px', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
    <rect width="24" height="16" fill="#b22234" />
    <rect width="24" height="1.23" fill="#ffffff" y="1.23" />
    <rect width="24" height="1.23" fill="#ffffff" y="3.69" />
    <rect width="24" height="1.23" fill="#ffffff" y="6.15" />
    <rect width="24" height="1.23" fill="#ffffff" y="8.61" />
    <rect width="24" height="1.23" fill="#ffffff" y="11.07" />
    <rect width="24" height="1.23" fill="#ffffff" y="13.53" />
    <rect width="10" height="8.6" fill="#3c3b6e" />
  </svg>
);

export default function TopNavbar({ 
  onOpenSearch, 
  onToggleFocusMode, 
  isFocusMode, 
  isCollapsed,
  setIsCollapsed,
  isMobileOpen, 
  setIsMobileOpen,
  lang,
  setLang,
  unreadCount = 1
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const t = translations[lang] || translations.en;

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'uz' : 'en');
  };

  const notifications = [
    {
      id: 1,
      title: lang === 'uz' ? "Algebra bo'yicha yutuq" : "Algebra Mastery Update",
      desc: lang === 'uz' ? "Kvadratik funksiyalar aniqligi 88% ga yetdi!" : "Your quadratic function accuracy reached 88%! Keep up the momentum.",
      time: "10m ago",
      unread: true
    },
    {
      id: 2,
      title: lang === 'uz' ? "12 kunlik seriya himoyalandi" : "Daily Streak Protected",
      desc: lang === 'uz' ? "'Kuchli Sur'at' nishonini olishga 2 kun qoldi." : "12-day streak locked in. Only 2 days left to earn 'Momentum Builder'.",
      time: "2h ago",
      unread: false
    }
  ];

  return (
    <header className="mindora-topbar">
      <div className="topbar-left-zone">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => {
            setIsMobileOpen(!isMobileOpen);
            if (setIsCollapsed) setIsCollapsed(false);
          }}
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* ChatGPT Style Open Sidebar button when collapsed on desktop */}
        {isCollapsed && (
          <button 
            className="topbar-sidebar-open-btn"
            onClick={() => setIsCollapsed(false)}
            title={t.openSidebar}
            aria-label="Open Sidebar"
          >
            <PanelLeft size={19} />
          </button>
        )}

        {/* Global Search Input Bar */}
        <div className="search-bar-wrapper" onClick={onOpenSearch}>
          <Search size={16} className="search-icon" />
          <span className="search-placeholder-text desktop-search-text">
            {t.searchPlaceholder}
          </span>
          <span className="search-placeholder-text mobile-search-text">
            {lang === 'uz' ? "Qidirish..." : "Search..."}
          </span>
          <kbd className="search-shortcut-badge">Ctrl K</kbd>
        </div>
      </div>

      {/* Right Action Cluster */}
      <div className="topbar-actions-cluster">
        {/* Modern Segmented Dual-Language Switcher (🇺🇿 O‘Z | 🇺🇸 EN) */}
        <div className="language-segmented-pill" role="group" aria-label="Til tanlash">
          <button 
            type="button"
            className={`lang-pill-btn ${lang === 'uz' ? 'active' : ''}`}
            onClick={() => setLang('uz')}
            title="O'zbek tili (Tanlangan)"
            aria-pressed={lang === 'uz'}
          >
            <UzFlag />
            <span className="lang-pill-text">O‘Z</span>
          </button>

          <span className="lang-pill-separator"></span>

          <button 
            type="button"
            className={`lang-pill-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
            title="English (Switch language)"
            aria-pressed={lang === 'en'}
          >
            <UsFlag />
            <span className="lang-pill-text">EN</span>
          </button>
        </div>

        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button 
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-popover glass-card animate-fade-in">
              <div className="notif-header">
                <span className="notif-title">{t.notifications}</span>
                <span className="notif-mark-all">{t.markAllRead}</span>
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-indicator"></div>
                    <div className="notif-body">
                      <p className="notif-item-title">{n.title}</p>
                      <p className="notif-item-desc">{n.desc}</p>
                      <span className="notif-item-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Focus Mode CTA */}
        <button 
          onClick={onToggleFocusMode}
          className={`focus-mode-pill-btn ${isFocusMode ? 'active' : ''}`}
          title="Enter Zen Focus Room"
        >
          <Sparkles size={16} className="focus-sparkle-icon" />
          <span>{t.focusMode}</span>
        </button>

        {/* Live Date Indicator */}
        <div className="topbar-date-pill">
          <CalendarIcon size={16} className="date-icon" />
          <div className="date-text-wrap">
            <span className="date-day">{lang === 'uz' ? "Yakshanba" : "Sunday"}</span>
            <span className="date-full">{lang === 'uz' ? "5-Okt, 2026" : "Oct 5, 2026"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
