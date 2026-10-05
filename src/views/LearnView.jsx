import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Award, 
  BookOpen, 
  CheckCircle,
  FileSpreadsheet,
  RotateCcw,
  Layers,
  Search
} from 'lucide-react';
import { sat90DayCourse, weeklyThemes } from '../data/satCourseData';
import { translations } from '../utils/i18n';

export default function LearnView({ 
  onStartLesson, 
  completedLessonIds = [], 
  currentLessonId = 'day-13', 
  lang = 'uz' 
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: true, 3: true });

  const t = translations[lang] || translations.en;

  // Resolve current active lesson
  const currentLesson = sat90DayCourse.find(l => l.id === currentLessonId) || sat90DayCourse[0];
  const completedCount = completedLessonIds.length;
  const totalDays = 90;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  // Toggle week collapse
  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  // Filter lessons
  const filteredLessons = sat90DayCourse.filter(lesson => {
    // Subject filter
    if (activeFilter === 'math') {
      if (!lesson.subjects.includes('Math')) return false;
    } else if (activeFilter === 'reading') {
      if (!lesson.subjects.includes('Reading')) return false;
    } else if (activeFilter === 'writing') {
      if (!lesson.subjects.includes('Writing')) return false;
    } else if (activeFilter === 'practice') {
      if (lesson.type !== 'practice_test') return false;
    } else if (activeFilter === 'review') {
      if (lesson.type !== 'test_review') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchSub = lesson.subjects.some(s => s.toLowerCase().includes(q));
      const matchDay = `day ${lesson.dayNumber}`.includes(q);
      if (!matchTitle && !matchSub && !matchDay) return false;
    }

    return true;
  });

  // Group filtered lessons by week
  const groupedWeeks = {};
  filteredLessons.forEach(lesson => {
    const w = lesson.weekNumber;
    if (!groupedWeeks[w]) groupedWeeks[w] = [];
    groupedWeeks[w].push(lesson);
  });

  // Week days for the weekly strip (Talab 17)
  const weekDays = [
    { day: lang === 'uz' ? 'DUSH' : 'MON', status: 'completed' },
    { day: lang === 'uz' ? 'SESH' : 'TUE', status: 'completed' },
    { day: lang === 'uz' ? 'CHOR' : 'WED', status: 'completed' },
    { day: lang === 'uz' ? 'PAY' : 'THU', status: 'current' },
    { day: lang === 'uz' ? 'JUM' : 'FRI', status: 'upcoming' },
    { day: lang === 'uz' ? 'SHAN' : 'SAT', status: 'upcoming' },
    { day: lang === 'uz' ? 'YAK' : 'SUN', status: 'upcoming' },
  ];

  return (
    <div className="learn-view-container animate-fade-in">
      {/* 1. HEADER SECTION (Talab 04) */}
      <div className="learn-hero-header glass-card">
        <div className="learn-hero-text">
          <span className="learn-badge-pill">{t.learnPathTitle}</span>
          <h1 className="learn-title">90-Day Digital SAT Prep Curriculum</h1>
          <p className="learn-subtitle">
            "{t.learnPathSubtitle}" — {t.instructorAttribution}
          </p>
        </div>

        <div className="learn-hero-stats">
          <div className="hero-stat-box">
            <span className="stat-label">{completedCount} / {totalDays} {t.daysCompleted}</span>
            <div className="stat-progress-bar">
              <div className="stat-progress-fill" style={{ width: `${Math.max(6, progressPercent)}%` }}></div>
            </div>
            <span className="stat-sub">{progressPercent}% complete</span>
          </div>

          <div className="hero-score-badge">
            <span className="score-badge-label">{t.currentEstimated}</span>
            <span className="score-badge-val">1320</span>
            <span className="score-badge-goal">{t.targetGoal}: 1450 (+130 pts)</span>
          </div>
        </div>
      </div>

      {/* 2. WEEKLY STRIP & RECENT PACE (Talab 17) */}
      <div className="weekly-learning-strip glass-card">
        <div className="weekly-strip-header">
          <span className="weekly-strip-title">
            <Calendar size={15} />
            <span>{lang === 'uz' ? "Haftalik o'rganish ritmi (Hozirgi hafta)" : "Weekly Learning Rhythm (Current Week)"}</span>
          </span>
          <span className="weekly-streak-tag">
            <Sparkles size={13} />
            <span>12 {lang === 'uz' ? "kunlik seriya davom etmoqda" : "day study streak on track"}</span>
          </span>
        </div>

        <div className="weekly-days-row">
          {weekDays.map((wd, idx) => (
            <div 
              key={idx} 
              className={`weekly-day-cell ${wd.status === 'completed' ? 'cell-completed' : ''} ${wd.status === 'current' ? 'cell-current' : ''}`}
            >
              <span className="day-name">{wd.day}</span>
              <div className="day-status-indicator">
                {wd.status === 'completed' && <CheckCircle2 size={16} className="text-mint" />}
                {wd.status === 'current' && <span className="current-dot-pulse">●</span>}
                {wd.status === 'upcoming' && <span className="empty-ring">○</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DOMINANT "CONTINUE LEARNING" MODULE (Talab 04 & 16) */}
      {currentLesson && (
        <div className="continue-learning-hero-card glass-card">
          <div className="continue-hero-media">
            <img 
              src={`https://i.ytimg.com/vi/${currentLesson.videoId}/hqdefault.jpg`} 
              alt={currentLesson.title}
              className="continue-thumbnail-img"
              onError={(e) => {
                e.target.src = '/assets/lesson_quadratic.jpg';
              }}
            />
            <button 
              className="continue-play-overlay-btn"
              onClick={() => onStartLesson(currentLesson)}
              aria-label="Play Lesson"
            >
              <Play size={30} fill="#092025" />
            </button>
            <span className="media-duration-badge">{currentLesson.duration}</span>
          </div>

          <div className="continue-hero-info">
            <div className="continue-hero-tags">
              <span className="continue-eyebrow-tag">
                <Sparkles size={12} />
                <span>{t.continueLearningHero}</span>
              </span>
              <span className="day-pill-badge">{t.dayLabel} {currentLesson.dayNumber}</span>
              {currentLesson.subjects.map((sub, sIdx) => (
                <span key={sIdx} className="subject-pill-tag">{sub}</span>
              ))}
            </div>

            <h2 className="continue-lesson-title">{currentLesson.cleanTitle}</h2>
            <p className="continue-lesson-desc">{currentLesson.summary}</p>

            <div className="continue-progress-meta">
              <div className="progress-info-row">
                <span className="progress-label">{lang === 'uz' ? "Dars jarayoni" : "Lesson Progress"}</span>
                <span className="progress-percent">64%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div className="continue-action-row">
              <button 
                className="btn-primary-mint continue-btn"
                onClick={() => onStartLesson(currentLesson)}
              >
                <span>{t.continueLessonBtn}</span>
                <ArrowRight size={16} />
              </button>
              <span className="instructor-credit">{currentLesson.instructor}</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBJECT FILTERS & SEARCH (Talab 06) */}
      <div className="learn-controls-bar glass-card">
        <div className="filter-pill-group">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'math', label: t.filterMath },
            { id: 'reading', label: t.filterReading },
            { id: 'writing', label: t.filterWriting },
            { id: 'practice', label: t.filterPractice },
            { id: 'review', label: t.filterReview },
          ].map(f => (
            <button 
              key={f.id}
              className={`filter-pill-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input 
            type="text" 
            placeholder={lang === 'uz' ? "Dars yoki mavzuni qidiring..." : "Search topics, days..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="learn-search-field"
          />
        </div>
      </div>

      {/* 5. 90-DAY PROGRESSION CURRICULUM (Talab 05 & 20) */}
      <div className="curriculum-weeks-container">
        {weeklyThemes.map(week => {
          const weekLessons = groupedWeeks[week.week] || [];
          if (weekLessons.length === 0 && searchQuery) return null;

          const isExpanded = expandedWeeks[week.week] ?? (week.week <= 3);
          const weekCompleted = weekLessons.length > 0 && weekLessons.every(l => completedLessonIds.includes(l.id));

          return (
            <div key={week.week} className="week-curriculum-block glass-card">
              {/* Week Header Banner */}
              <div 
                className="week-header-row"
                onClick={() => toggleWeek(week.week)}
              >
                <div className="week-header-left">
                  <div className="week-badge-node">
                    {weekCompleted ? (
                      <CheckCircle2 size={18} className="text-mint" />
                    ) : (
                      <span>{week.week}</span>
                    )}
                  </div>
                  <div className="week-header-info">
                    <div className="week-title-row">
                      <span className="week-num-tag">{t.weekLabel} {week.week.toString().padStart(2, '0')}</span>
                      <h3 className="week-title-text">{week.title}</h3>
                      <span className="week-range-text">{week.daysRange}</span>
                    </div>
                    <span className="week-focus-text">{week.focus}</span>
                  </div>
                </div>

                <div className="week-header-right">
                  <span className="week-count-tag">
                    {weekLessons.filter(l => completedLessonIds.includes(l.id)).length} / {weekLessons.length} {t.daysCompleted}
                  </span>
                  <span className="week-toggle-arrow">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Lessons Timeline List */}
              {isExpanded && (
                <div className="week-lessons-timeline">
                  {weekLessons.map((lesson, idx) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isCurrent = lesson.id === currentLessonId;
                    const isPracticeTest = lesson.type === 'practice_test';
                    const isReview = lesson.type === 'test_review';

                    let itemStatusClass = 'status-upcoming';
                    if (isCompleted) itemStatusClass = 'status-completed';
                    if (isCurrent) itemStatusClass = 'status-current';

                    return (
                      <div 
                        key={lesson.id} 
                        className={`timeline-lesson-row ${itemStatusClass} ${isPracticeTest ? 'row-practice-test' : ''} ${isReview ? 'row-test-review' : ''}`}
                        onClick={() => onStartLesson(lesson)}
                      >
                        {/* Timeline Node Column */}
                        <div className="timeline-node-col">
                          <div className="timeline-node-circle">
                            {isCompleted ? (
                              <CheckCircle size={15} />
                            ) : isCurrent ? (
                              <span className="node-current-pulse"></span>
                            ) : (
                              <span>{lesson.dayNumber}</span>
                            )}
                          </div>
                          {idx < weekLessons.length - 1 && <div className="timeline-v-line"></div>}
                        </div>

                        {/* Lesson Content Column */}
                        <div className="timeline-content-col">
                          <div className="lesson-meta-chips">
                            <span className="chip-day-number">{t.dayLabel} {lesson.dayNumber}</span>

                            {isPracticeTest && (
                              <span className="chip-special chip-practice-test">
                                <FileSpreadsheet size={12} />
                                <span>{t.practiceTestBadge}</span>
                              </span>
                            )}

                            {isReview && (
                              <span className="chip-special chip-test-review">
                                <RotateCcw size={12} />
                                <span>{t.testReviewBadge}</span>
                              </span>
                            )}

                            {lesson.subjects.map((sub, sIdx) => (
                              <span key={sIdx} className="chip-subject">{sub}</span>
                            ))}

                            <span className="chip-duration">
                              <Clock size={12} />
                              <span>{lesson.duration}</span>
                            </span>
                          </div>

                          <h4 className="timeline-lesson-title">{lesson.cleanTitle}</h4>
                          <p className="timeline-lesson-summary">{lesson.summary}</p>
                        </div>

                        {/* State & CTA Column */}
                        <div className="timeline-action-col">
                          {isCompleted ? (
                            <span className="badge-state state-done">
                              <CheckCircle2 size={14} />
                              <span>{t.completedBadge}</span>
                            </span>
                          ) : isCurrent ? (
                            <button className="btn-primary-mint btn-sm-timeline">
                              <span>{t.continueLessonBtn}</span>
                              <Play size={13} fill="currentColor" />
                            </button>
                          ) : (
                            <button className="btn-glass-sm">
                              <span>{t.startLessonBtn}</span>
                              <Play size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
