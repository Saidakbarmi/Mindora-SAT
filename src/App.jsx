import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardView from './views/DashboardView';
import LearnView from './views/LearnView';
import VideoLessonView from './views/VideoLessonView';
import HomeworkView from './views/HomeworkView';
import PracticeTestsView from './views/PracticeTestsView';
import LeaderboardView from './views/LeaderboardView';
import AttendanceView from './views/AttendanceView';
import ProgressView from './views/ProgressView';
import AchievementsView from './views/AchievementsView';
import StudyToolsView from './views/StudyToolsView';
import InteractiveDrillModal from './components/InteractiveDrillModal';
import FocusModeOverlay from './components/FocusModeOverlay';
import SearchModal from './components/SearchModal';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';
import { initialStudent, scoreTrajectory as initialTrajectory } from './data/mockData';
import { sat90DayCourse } from './data/satCourseData';
import { translations } from './utils/i18n';

export default function App() {
  const [lang, setLang] = useState('uz'); // Defaulting to Uzbek as per user's preference or easily toggleable
  const [student, setStudent] = useState(initialStudent);
  const [currentTab, setCurrentTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'dashboard';
  });

  // 90-Day SAT Learning Path State
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const saved = localStorage.getItem('mindora_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return ['day-1', 'day-2', 'day-3', 'day-4', 'day-5', 'day-6', 'day-7', 'day-8', 'day-9', 'day-10', 'day-11', 'day-12'];
  });

  const [currentLessonId, setCurrentLessonId] = useState(() => {
    try {
      const saved = localStorage.getItem('mindora_current_lesson');
      if (saved) return saved;
    } catch(e) {}
    return 'day-13';
  });

  const [activeLesson, setActiveLesson] = useState(() => {
    return sat90DayCourse.find(l => l.id === 'day-13') || sat90DayCourse[0];
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentTab(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [scoreTrajectoryData, setScoreTrajectoryData] = useState(initialTrajectory);
  
  // ChatGPT style sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals & Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeDrillTitle, setActiveDrillTitle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const t = translations[lang] || translations.en;

  // Global Ctrl+K Shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDrillComplete = ({ correct, total, time, earnedXP }) => {
    setStudent(prev => ({
      ...prev,
      xp: prev.xp + earnedXP,
      improvement: prev.improvement + 10,
      currentScore: Math.min(1600, prev.currentScore + 10)
    }));

    setScoreTrajectoryData(prev => {
      return prev.map(p => {
        if (p.month === 'Jun') {
          return { ...p, score: p.score + 10 };
        }
        return p;
      });
    });

    const successMsg = lang === 'uz'
      ? `🎉 Mashq yakunlandi! +${earnedXP} XP qo'shildi va hozirgi ball +10 ga oshdi!`
      : `🎉 Drill finished! +${earnedXP} XP earned and current estimated score increased by +10 points!`;
    triggerToast(successMsg);
  };

  const handleStartLesson = (lesson) => {
    const target = lesson || sat90DayCourse.find(l => l.id === currentLessonId) || sat90DayCourse[0];
    setActiveLesson(target);
    setCurrentTab('video-lesson');
    window.location.hash = 'video-lesson';
  };

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      try {
        localStorage.setItem('mindora_completed_lessons', JSON.stringify(updated));
      } catch(e) {}
      
      setStudent(prev => ({
        ...prev,
        completedLessons: updated.length
      }));
    }

    // Advance to next lesson
    const currentIndex = sat90DayCourse.findIndex(l => l.id === lessonId);
    if (currentIndex !== -1 && currentIndex < sat90DayCourse.length - 1) {
      const nextLesson = sat90DayCourse[currentIndex + 1];
      setCurrentLessonId(nextLesson.id);
      setActiveLesson(nextLesson);
      try {
        localStorage.setItem('mindora_current_lesson', nextLesson.id);
      } catch(e) {}
    }

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch(e) {}

    triggerToast(t.lessonMarkedComplete);
  };

  return (
    <div className="mindora-ambient-viewport">
      {/* Mindora Adaptive Atmosphere Layer */}
      <div className={`ambient-background-layer atmosphere-${currentTab}`}></div>
      <div className="ambient-overlay-scrim"></div>

      {/* Main Application Container */}
      <div className="mindora-app-layout">
        {/* Mobile Sidebar Backdrop / Scrim */}
        {isMobileOpen && (
          <div 
            className="sidebar-mobile-backdrop"
            onClick={() => {
              setIsMobileOpen(false);
              setIsCollapsed(false);
            }}
            aria-hidden="true"
          />
        )}

        {/* Persistent Collapsible Sidebar (ChatGPT Style) */}
        <Sidebar 
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          student={student}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          lang={lang}
        />

        {/* Right Main Content Area */}
        <div className={`mindora-main-content ${isCollapsed ? 'expanded-content' : ''}`}>
          {/* Top Sticky Navbar */}
          <TopNavbar 
            onOpenSearch={() => setIsSearchOpen(true)}
            onToggleFocusMode={() => setIsFocusMode(true)}
            isFocusMode={isFocusMode}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            lang={lang}
            setLang={setLang}
            unreadCount={1}
          />

          {/* Dynamic Page Router */}
          <main className="content-scroll-container">
            {currentTab === 'dashboard' && (
              <DashboardView 
                student={student}
                scoreTrajectoryData={scoreTrajectoryData}
                currentLesson={activeLesson || sat90DayCourse.find(l => l.id === currentLessonId)}
                onStartLesson={handleStartLesson}
                onNavigate={(tab) => setCurrentTab(tab)}
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}

            {currentTab === 'learn' && (
              <LearnView 
                onStartLesson={handleStartLesson}
                completedLessonIds={completedLessonIds}
                currentLessonId={currentLessonId}
                lang={lang}
              />
            )}

            {currentTab === 'video-lesson' && (
              <VideoLessonView 
                lesson={activeLesson || sat90DayCourse.find(l => l.id === currentLessonId)}
                onBack={() => {
                  setCurrentTab('learn');
                  window.location.hash = 'learn';
                }}
                onGoToHomework={() => {
                  setCurrentTab('homework');
                  window.location.hash = 'homework';
                  setActiveDrillTitle(`${t.dayLabel} ${(activeLesson || sat90DayCourse[0]).dayNumber} Drill`);
                }}
                onStartDrill={(title) => setActiveDrillTitle(title)}
                onCompleteLesson={handleCompleteLesson}
                isCompleted={completedLessonIds.includes((activeLesson || sat90DayCourse[0]).id)}
                lang={lang}
              />
            )}

            {currentTab === 'homework' && (
              <HomeworkView 
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}

            {currentTab === 'practice' && (
              <PracticeTestsView 
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}

            {currentTab === 'leaderboard' && (
              <LeaderboardView 
                student={student}
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}

            {currentTab === 'attendance' && (
              <AttendanceView 
                student={student}
                lang={lang}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressView 
                student={student}
                scoreTrajectoryData={scoreTrajectoryData}
                onNavigate={(tab) => setCurrentTab(tab)}
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}

            {currentTab === 'achievements' && (
              <AchievementsView 
                student={student}
                lang={lang}
              />
            )}

            {(['flashcards', 'vocabulary', 'notes', 'mistakes'].includes(currentTab)) && (
              <StudyToolsView 
                activeTool={currentTab}
                onStartDrill={(title) => setActiveDrillTitle(title)}
                lang={lang}
              />
            )}
          </main>

          {/* Shared MINDORA Application Footer */}
          <Footer lang={lang} />
        </div>
      </div>

      {/* Global Interactive Drill Modal */}
      {activeDrillTitle && (
        <InteractiveDrillModal 
          drillTitle={activeDrillTitle}
          onClose={() => setActiveDrillTitle(null)}
          onComplete={handleDrillComplete}
          lang={lang}
        />
      )}

      {/* Fullscreen Zen Focus Mode */}
      {isFocusMode && (
        <FocusModeOverlay 
          onClose={() => setIsFocusMode(false)}
          lang={lang}
        />
      )}

      {/* Ctrl+K Search Modal */}
      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)}
          onNavigate={(target) => setCurrentTab(target)}
          lang={lang}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal 
          student={student}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateStudent={(updated) => {
            setStudent(updated);
            triggerToast(lang === 'uz' ? "Profil sozlamalari yangilandi." : "Profile & study preferences updated.");
          }}
          lang={lang}
          setLang={setLang}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="mindora-toast animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
