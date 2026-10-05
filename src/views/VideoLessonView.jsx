import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  Clock, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Share2, 
  Award,
  Sparkles,
  Save,
  Check,
  RotateCcw
} from 'lucide-react';
import { translations } from '../utils/i18n';

export default function VideoLessonView({ 
  lesson, 
  onBack, 
  onGoToHomework, 
  onStartDrill, 
  onCompleteLesson,
  isCompleted = false,
  lang = 'uz' 
}) {
  const t = translations[lang] || translations.en;

  // Fallback safe lesson
  const currentLesson = lesson || {
    id: 'day-4',
    dayNumber: 4,
    videoId: 'hV6kNWuXeDk',
    title: 'Day 4 of 90 Days of Free SAT Prep Lessons! By a 1590 SAT Scorer! Math Equations and Writing Tips!',
    cleanTitle: 'Day 4: Math Equations & Writing Tips',
    duration: '20:00',
    subjects: ['Math', 'Writing'],
    instructor: 'Hayden Rhodea (1590 SAT Scorer)',
    summary: 'Core algebraic equation solving techniques paired with punctuation and grammar rules.'
  };

  // Persistent student notes per lesson
  const storageKey = `mindora_notes_${currentLesson.id}`;
  const [studentNote, setStudentNote] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || (lang === 'uz' 
        ? "Bugungi darsdan muhim eslatma:\n- Kvadratik tenglamalar va diskriminant formulasi: b² - 4ac.\n- Vergul va nuqta-vergul (semicolon) qoidalari: mustaqil gaplarni bog'lashda ishlatiladi."
        : "Key takeaways from today's lesson:\n- Standard form: ax² + bx + c = 0.\n- Semicolon precision: separates two independent clauses without coordinating conjunctions.");
    } catch(e) {
      return '';
    }
  });

  const [savedNotification, setSavedNotification] = useState(false);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(storageKey, studentNote);
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2200);
    } catch(e) {}
  };

  return (
    <div className="video-lesson-workspace animate-fade-in">
      {/* 1. TOP NAVIGATION & BREADCRUMB */}
      <div className="video-workspace-topbar glass-card">
        <button className="workspace-back-btn" onClick={onBack}>
          <ChevronLeft size={18} />
          <span>{t.backToLearn}</span>
        </button>

        <div className="workspace-title-center">
          <span className="workspace-day-pill">{t.dayLabel} {currentLesson.dayNumber}</span>
          {currentLesson.subjects?.map((sub, idx) => (
            <span key={idx} className="workspace-subject-pill">{sub}</span>
          ))}
          <h2 className="workspace-header-title">{currentLesson.cleanTitle}</h2>
        </div>

        <div className="workspace-quick-actions">
          {isCompleted ? (
            <span className="completed-status-badge">
              <CheckCircle2 size={16} />
              <span>{t.lessonMarkedComplete}</span>
            </span>
          ) : (
            <button 
              className="btn-primary-mint mark-complete-btn"
              onClick={() => onCompleteLesson && onCompleteLesson(currentLesson.id)}
            >
              <Check size={16} />
              <span>{t.markLessonComplete}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TWO-COLUMN WORKSPACE GRID */}
      <div className="workspace-grid-layout">
        {/* Left Column: Official YouTube Embed + About */}
        <div className="workspace-player-column">
          {/* YouTube Video Container */}
          <div className="youtube-player-frame-wrapper glass-card">
            <div className="responsive-video-box">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
                title={currentLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="official-youtube-iframe"
              ></iframe>
            </div>

            {/* Video Footer Metadata */}
            <div className="video-frame-footer">
              <div className="footer-left">
                <span className="duration-tag">
                  <Clock size={14} />
                  <span>{currentLesson.duration}</span>
                </span>
                <span className="attribution-tag">
                  <Award size={14} />
                  <span>{currentLesson.instructor}</span>
                </span>
              </div>

              <div className="footer-right">
                <span className={`status-pill ${isCompleted ? 'pill-completed' : 'pill-active'}`}>
                  {isCompleted ? `✓ ${t.completedBadge}` : `● ${t.currentBadge}`}
                </span>
              </div>
            </div>
          </div>

          {/* About This Lesson Card */}
          <div className="lesson-about-card glass-card">
            <div className="about-header">
              <BookOpen size={18} className="text-mint" />
              <h3 className="about-title">{t.aboutThisLesson}</h3>
            </div>
            <h4 className="real-source-title">{currentLesson.title}</h4>
            <p className="about-summary-text">{currentLesson.summary}</p>

            <div className="curriculum-credit-notice">
              <span>{lang === 'uz' ? "Manba:" : "Source:"}</span>
              <strong> YouTube / Hayden Rhodea — 90-Day Free SAT Prep Course</strong>
              <span className="source-disclaimer">({lang === 'uz' ? "Rasmiy YouTube player orqali mualliflik huquqlari to'liq saqlangan holda uzatilmoqda" : "Presented via official YouTube player preserving creator attribution"})</span>
            </div>
          </div>
        </div>

        {/* Right Column: Learning Loop & Student Notes */}
        <div className="workspace-side-panel">
          {/* Loop Card: What's Next? (Practice -> Homework) */}
          <div className="learning-loop-card glass-card">
            <div className="loop-card-header">
              <Sparkles size={18} className="text-mint" />
              <h3 className="loop-card-title">{t.watchedLesson}</h3>
            </div>
            <p className="loop-card-sub">{t.practiceIt}</p>

            <div className="loop-actions-stack">
              <button 
                className="btn-primary-mint loop-primary-btn"
                onClick={() => onStartDrill && onStartDrill(`${t.dayLabel} ${currentLesson.dayNumber} Drill`)}
              >
                <span>{t.startPractice}</span>
                <ArrowRight size={16} />
              </button>

              <button 
                className="btn-glass loop-secondary-btn"
                onClick={onGoToHomework}
              >
                <span>{t.continueToHomework}</span>
                <BookOpen size={16} />
              </button>
            </div>
          </div>

          {/* Student Notes Card */}
          <div className="student-notes-card glass-card">
            <div className="notes-card-header">
              <div className="notes-title-group">
                <FileText size={17} className="text-mint" />
                <h3 className="notes-heading">{t.myNotes}</h3>
              </div>
              <button 
                className="save-notes-btn"
                onClick={handleSaveNotes}
                title="Save Notes"
              >
                <Save size={14} />
                <span>{savedNotification ? (lang === 'uz' ? "Saqlandi!" : "Saved!") : (lang === 'uz' ? "Saqlash" : "Save")}</span>
              </button>
            </div>

            <textarea
              className="notes-textarea"
              placeholder={t.myNotesPlaceholder}
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              rows={8}
            />

            <span className="notes-auto-hint">
              {lang === 'uz' ? "Qaydlaringiz brauzer xotirasida avtomatik saqlanadi." : "Notes are persistently stored for this lesson."}
            </span>
          </div>

          {/* Quick Resources & Help Card */}
          <div className="lesson-resources-card glass-card">
            <h4 className="resources-title">{lang === 'uz' ? "Darsga oid tezkor vositalar" : "Lesson Study Tools"}</h4>
            <div className="resource-links-list">
              <div className="resource-item" onClick={() => onStartDrill && onStartDrill("Algebra Formulas Practice")}>
                <Award size={15} />
                <span>{lang === 'uz' ? "Algebra & Geometriya formulalari" : "Algebra & Geometry Cheat Sheet"}</span>
              </div>
              <div className="resource-item" onClick={onGoToHomework}>
                <FileText size={15} />
                <span>{lang === 'uz' ? "Ushbu mavzu bo'yicha uy vazifasi" : "Targeted Homework Assignment"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
