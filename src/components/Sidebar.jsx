import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileCheck, 
  FileSpreadsheet, 
  Trophy, 
  CalendarCheck, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Layers, 
  FileText, 
  Settings,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { translations } from '../utils/i18n';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  student, 
  onOpenSettings,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile || isMobileOpen) {
      if (setIsMobileOpen) setIsMobileOpen(false);
      if (setIsCollapsed) setIsCollapsed(false);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const navGroups = [
    {
      title: t.navMain,
      items: [
        { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
        { id: 'learn', label: t.navLearn, icon: GraduationCap },
        { id: 'homework', label: t.navHomework, icon: FileCheck },
        { id: 'practice', label: t.navPractice, icon: FileSpreadsheet },
      ]
    },
    {
      title: t.navTrack,
      items: [
        { id: 'progress', label: t.navProgress, icon: TrendingUp },
        { id: 'leaderboard', label: t.navLeaderboard, icon: Trophy },
        { id: 'attendance', label: t.navAttendance, icon: CalendarCheck },
        { id: 'achievements', label: t.navAchievements, icon: Award },
      ]
    },
    {
      title: t.navTools,
      items: [
        { id: 'flashcards', label: t.navFlashcards, icon: Layers },
        { id: 'vocabulary', label: t.navVocabulary, icon: BookOpen },
        { id: 'notes', label: t.navNotes, icon: FileText },
        { id: 'mistakes', label: t.navMistakes, icon: AlertCircle },
      ]
    }
  ];

  const effectiveCollapsed = isCollapsed && !isMobile;

  return (
    <aside className={`mindora-sidebar ${effectiveCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header & Toggle */}
      <div className="sidebar-brand-container">
        {!effectiveCollapsed && (
          <div 
            className="brand-clickable-area" 
            onClick={() => {
              setCurrentTab('dashboard');
              if (isMobile && setIsMobileOpen) setIsMobileOpen(false);
            }}
          >
            <div className="brand-logo-mark">
              <img 
                src="/Mindora көк қанат эмблемасы.png" 
                alt="Mindora Logo" 
                className="brand-logo-img"
                onError={(e) => { e.currentTarget.src = "/mindora-logo.png"; }}
              />
            </div>
            <div className="brand-text-group">
              <span className="brand-title">{t.brandName}</span>
              <span className="brand-tagline">{t.tagline}</span>
            </div>
          </div>
        )}

        {effectiveCollapsed && (
          <div className="brand-logo-mark mini-logo" onClick={() => setIsCollapsed(false)} title={t.openSidebar}>
            <img 
              src="/Mindora көк қанат эмблемасы.png" 
              alt="Mindora Logo" 
              className="brand-logo-img"
              onError={(e) => { e.currentTarget.src = "/mindora-logo.png"; }}
            />
          </div>
        )}

        {/* Toggle Button: Close (X) on mobile, PanelLeft/PanelLeftClose on desktop */}
        <button 
          className="sidebar-collapse-toggle-btn"
          onClick={handleToggle}
          title={isMobile ? (lang === 'uz' ? "Menyuni yopish" : "Close Menu") : (effectiveCollapsed ? t.openSidebar : t.closeSidebar)}
          aria-label={isMobile ? "Close Navigation" : "Toggle Sidebar"}
        >
          {isMobile ? (
            <PanelLeftClose size={20} />
          ) : (
            effectiveCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Nav Scroll Area */}
      <div className="sidebar-nav-scroll">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="nav-group-wrapper">
            {!effectiveCollapsed && (
              <div className="nav-section-title">{group.title}</div>
            )}
            {effectiveCollapsed && <div className="nav-group-divider"></div>}

            <nav className="sidebar-nav-list">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      window.location.hash = item.id;
                      if (setIsMobileOpen) setIsMobileOpen(false);
                    }}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''} ${effectiveCollapsed ? 'item-collapsed' : ''}`}
                    title={effectiveCollapsed ? item.label : undefined}
                  >
                    <div className="nav-icon-wrap">
                      <Icon size={18} strokeWidth={isActive ? 2.4 : 1.7} />
                    </div>
                    {!effectiveCollapsed && <span className="nav-label">{item.label}</span>}
                    {!effectiveCollapsed && isActive && <ChevronRight size={14} className="nav-active-arrow" />}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Today's Quote Mini Banner (Only when expanded) */}
        {!effectiveCollapsed && (
          <div className="sidebar-quote-card">
            <div className="quote-overlay-gradient"></div>
            <div className="quote-content">
              <span className="quote-badge">{t.quoteToday}</span>
              <p className="quote-text">{t.quoteText}</p>
            </div>
          </div>
        )}
      </div>

      {/* User Footer Profile */}
      <div className={`sidebar-user-footer ${effectiveCollapsed ? 'user-footer-collapsed' : ''}`}>
        <div 
          className="user-profile-info" 
          onClick={() => {
            setCurrentTab('progress');
            if (isMobile && setIsMobileOpen) setIsMobileOpen(false);
          }}
          title={effectiveCollapsed ? `${student.name} (${t.studentRole})` : undefined}
        >
          <img 
            src={student.avatar} 
            alt={student.name} 
            className="user-avatar-img"
          />
          {!effectiveCollapsed && (
            <div className="user-text-info">
              <span className="user-name">{student.name}</span>
              <span className="user-role">{t.studentRole} • {t.level} {student.level}</span>
            </div>
          )}
        </div>
        {!effectiveCollapsed && (
          <button 
            onClick={onOpenSettings} 
            className="settings-trigger-btn"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}
