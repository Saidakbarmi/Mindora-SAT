import React, { useState } from 'react';
import { 
  Target, 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Calendar, 
  ArrowRight, 
  Bookmark, 
  Play, 
  Lock, 
  Check, 
  Clock, 
  Award, 
  Smile, 
  Frown, 
  Meh, 
  Sparkles,
  ChevronRight,
  BookOpen,
  FileCheck,
  FileText,
  Layers,
  CalendarDays,
  AlertTriangle,
  Zap
} from 'lucide-react';
import ScoreTrajectoryChart from '../components/ScoreTrajectoryChart';
import StudyEnvironment from '../components/StudyEnvironment';
import { todaysLesson, homeworkList, leaderboardUsers } from '../data/mockData';
import { translations } from '../utils/i18n';

export default function DashboardView({ 
  student, 
  onNavigate, 
  onStartDrill,
  scoreTrajectoryData,
  currentLesson,
  onStartLesson,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [hwFilter, setHwFilter] = useState('all');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedMood, setSelectedMood] = useState('Okay');
  const [moodMessage, setMoodMessage] = useState(
    lang === 'uz' 
      ? "Tiniq va muvozanatli holat. 20 daqiqalik matematika mashqi uchun ayni muddao." 
      : "Balanced mind. Perfect state for a 20-minute math drill."
  );

  // Filter homework list
  const filteredHw = homeworkList.filter(item => {
    if (hwFilter === 'all') return true;
    return item.status === hwFilter;
  });

  const hwCounts = {
    all: homeworkList.length,
    'not-started': homeworkList.filter(h => h.status === 'not-started').length,
    'in-progress': homeworkList.filter(h => h.status === 'in-progress').length,
    overdue: homeworkList.filter(h => h.status === 'overdue').length,
    completed: homeworkList.filter(h => h.status === 'completed').length,
  };

  const handleMoodSelect = (mood, noteEn, noteUz) => {
    setSelectedMood(mood);
    setMoodMessage(lang === 'uz' ? noteUz : noteEn);
  };

  // Canonical numbers: 1320 current, 1450 goal -> 130 pts remaining
  const pointsRemaining = student.goalScore - student.currentScore;
  const goalProgressPercent = Math.round(((student.currentScore - 1000) / (student.goalScore - 1000)) * 100);

  return (
    <div className="dashboard-view animate-fade-in">
      {/* =========================================================================
          TOP HERO ROW: Refined Editorial Greeting + Dominant Score + SAT Countdown
          ========================================================================= */}
      <div className="hero-top-row">
        {/* Left: Compact Greeting + Dominant Current Score Hierarchy */}
        <div className="hero-greeting-container">
          <div className="greeting-compact-bar">
            <div className="greeting-text-wrap">
              <h1 className="hero-greeting-title">
                {t.greetingAfternoon} <span className="highlight-name">{student.name}.</span>
              </h1>
              <p className="hero-greeting-sub">{t.tagline}</p>
            </div>
            <div className="goal-distance-pill">
              <Sparkles size={14} className="text-lime" />
              <span>{t.greetingGoalDistance}</span>
            </div>
          </div>

          {/* Unified Score Hierarchy Module (Not 4 identical cards!) */}
          <div className="score-hero-hierarchy-card glass-hero">
            {/* Dominant Current Score Pillar */}
            <div className="dominant-score-col">
              <span className="dominant-score-badge">{t.currentScoreTitle}</span>
              <div className="dominant-number-cluster">
                <span className="dominant-number">{student.currentScore}</span>
                <span className="dominant-scale">/ 1600</span>
              </div>
              <div className="score-goal-progress-wrap">
                <div className="score-goal-track">
                  <div 
                    className="score-goal-fill"
                    style={{ width: `${goalProgressPercent}%` }}
                  ></div>
                </div>
                <div className="score-goal-meta">
                  <span className="goal-target-text">{t.goalLabel}: <strong>{student.goalScore}</strong></span>
                  <span className="goal-diff-text highlight-diff">{pointsRemaining} {lang === 'uz' ? "ball qoldi" : "pts to goal"}</span>
                </div>
              </div>
            </div>

            {/* Supporting Micro-Metrics in Right Stack */}
            <div className="score-supporting-metrics-col">
              {/* Gain metric */}
              <div className="supporting-metric-row">
                <div className="metric-mini-icon lime-bg">
                  <TrendingUp size={16} />
                </div>
                <div className="supporting-metric-text">
                  <span className="metric-bold-value text-lime">+{student.improvement}</span>
                  <span className="metric-tiny-label">{t.sinceStarting}</span>
                </div>
              </div>

              {/* Streak metric */}
              <div className="supporting-metric-row">
                <div className="metric-mini-icon flame-bg">
                  <Flame size={16} />
                </div>
                <div className="supporting-metric-text">
                  <span className="metric-bold-value text-orange">{student.streak} {lang === 'uz' ? "kun" : "days"}</span>
                  <span className="metric-tiny-label">{t.keepGoing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Prominent SAT Countdown Card */}
        <div 
          className="sat-countdown-card glass-hero"
          onClick={() => onNavigate('practice')}
        >
          <div className="sat-card-backdrop" style={{ backgroundImage: `url('/assets/sat_lake.jpg')` }}></div>
          <div className="sat-card-scrim"></div>
          <div className="sat-card-content">
            <span className="sat-test-tag">{t.satTestDay}</span>
            <div className="sat-days-cluster">
              <span className="sat-days-number">{student.daysLeft}</span>
              <span className="sat-days-label">{t.daysLeft}</span>
            </div>
            <div className="sat-date-pill">
              <Calendar size={13} />
              <span>{t.examDateFormatted}</span>
            </div>
            <button className="sat-card-arrow" aria-label="Go to Practice Tests">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MIDDLE MAIN ROW: Today's Lesson (NOW → NEXT) + Score Trajectory
          ========================================================================= */}
      <div className="middle-dashboard-grid">
        {/* Today's Lesson Module: Obvious Primary Action (Level 1 Hero Glass) */}
        <div className="todays-lesson-module glass-hero">
          <div className="module-top-row">
            <div className="module-title-with-pill">
              <span className="next-action-pill">{t.nextStepBadge}</span>
              <h2 className="module-title">{t.todaysLesson}</h2>
            </div>
          </div>

          <div className="lesson-module-content">
            {/* Visual YouTube Thumbnail */}
            <div className="lesson-hero-thumb-wrap">
              <img 
                src={currentLesson ? `https://i.ytimg.com/vi/${currentLesson.videoId}/hqdefault.jpg` : todaysLesson.thumbnail} 
                alt={currentLesson?.title || todaysLesson.title} 
                className="lesson-hero-thumb"
                onError={(e) => {
                  e.target.src = '/assets/lesson_quadratic.jpg';
                }}
              />
              <div 
                className="thumb-play-overlay" 
                onClick={() => onStartLesson ? onStartLesson(currentLesson) : onNavigate('video-lesson')}
              >
                <Play size={22} fill="currentColor" />
              </div>
            </div>

            {/* Center: Details & Actions */}
            <div className="lesson-details-col">
              <div className="lesson-tags-row">
                <span className="lesson-subject-pill">
                  {currentLesson ? currentLesson.subjects?.join(' + ') : todaysLesson.subject}
                </span>
                <span className="lesson-unit-text">
                  {currentLesson ? `${t.dayLabel} ${currentLesson.dayNumber} / 90` : (lang === 'uz' ? "4-dars / 12 tadan" : "Lesson 4 of 12")}
                </span>
              </div>

              <h3 className="lesson-heading-title">
                {currentLesson ? currentLesson.cleanTitle : (lang === 'uz' ? "Kvadratik Funksiyalar" : todaysLesson.title)}
              </h3>
              <p className="lesson-desc-text">
                {currentLesson ? currentLesson.summary : (lang === 'uz' 
                  ? "Kvadratik tenglamalar, parabola cho'qqisi va grafik masalalarini o'rganing." 
                  : "Understand quadratic equations, vertex form, parabolas, and real-world modeling.")}
              </p>

              <div className="lesson-meta-progress-row">
                <div className="lesson-meta-item">
                  <Clock size={14} />
                  <span>{currentLesson?.duration || "18 min"}</span>
                </div>
                <div className="lesson-progress-capsule">
                  <div className="capsule-track">
                    <div className="capsule-fill" style={{ width: `64%` }}></div>
                  </div>
                  <span className="capsule-percent">64% {t.lessonCompleted}</span>
                </div>
              </div>

              <div className="lesson-cta-buttons">
                <button 
                  className="btn-primary-mint cta-continue-btn"
                  onClick={() => onStartLesson ? onStartLesson(currentLesson) : onNavigate('video-lesson')}
                >
                  <span>{t.continueLesson}</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  className={`btn-glass bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  title={t.saveLesson}
                >
                  <Bookmark size={16} fill={isBookmarked ? "#8FE3D0" : "none"} />
                </button>
              </div>
            </div>

            {/* Right: Only ONE Clear Next Recommendation (NOW → NEXT) */}
            <div className="lesson-next-up-col">
              <span className="next-up-tag-label">{t.nextUpLabel}</span>
              <div 
                className="next-recommendation-box"
                onClick={() => onNavigate('video-lesson')}
              >
                <div className="next-rec-icon">
                  <Play size={14} fill="currentColor" />
                </div>
                <div className="next-rec-body">
                  <span className="next-rec-title">{t.nextUpLesson}</span>
                  <span className="next-rec-sub">{t.nextUpMeta}</span>
                </div>
                <ChevronRight size={16} className="text-mint" />
              </div>
            </div>
          </div>
        </div>

        {/* Score Trajectory Chart (Supporting Level 2 Glass) */}
        <div className="score-trajectory-container">
          <ScoreTrajectoryChart 
            data={scoreTrajectoryData}
            currentScore={student.currentScore}
            targetScore={student.goalScore}
            improvement={student.improvement}
            lang={lang}
          />
        </div>
      </div>

      {/* =========================================================================
          LOWER GRID ROW: Homework + Attendance & Achievement + Leaderboard
          ========================================================================= */}
      <div className="lower-dashboard-grid">
        {/* 1. Homework Preview & Filter Workspace (Level 2 Glass with Level 3 rows) */}
        <div className="homework-dashboard-panel glass-card">
          <div className="panel-header-row">
            <h3 className="panel-heading">{t.homeworkTitle}</h3>
            <button className="panel-view-all" onClick={() => onNavigate('homework')}>
              <span>{t.viewAll}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Filter Pills (Level 3 Utility) */}
          <div className="hw-filter-pills-row">
            <button 
              className={`filter-pill ${hwFilter === 'all' ? 'active' : ''}`}
              onClick={() => setHwFilter('all')}
            >
              {t.tabAll} <span className="pill-count">{hwCounts.all}</span>
            </button>
            <button 
              className={`filter-pill ${hwFilter === 'not-started' ? 'active' : ''}`}
              onClick={() => setHwFilter('not-started')}
            >
              {t.tabNotStarted} <span className="pill-count">{hwCounts['not-started']}</span>
            </button>
            <button 
              className={`filter-pill ${hwFilter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setHwFilter('in-progress')}
            >
              {t.tabInProgress} <span className="pill-count">{hwCounts['in-progress']}</span>
            </button>
            <button 
              className={`filter-pill ${hwFilter === 'overdue' ? 'active' : ''}`}
              onClick={() => setHwFilter('overdue')}
            >
              {t.tabOverdue} <span className="pill-count">{hwCounts.overdue}</span>
            </button>
            <button 
              className={`filter-pill ${hwFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setHwFilter('completed')}
            >
              {t.tabCompleted} <span className="pill-count">{hwCounts.completed}</span>
            </button>
          </div>

          {/* Homework Items List (Level 3 Flat Rows for high contrast) */}
          <div className="homework-items-list">
            {filteredHw.slice(0, 4).map((hw) => {
              const statusLabels = {
                'in-progress': t.tabInProgress,
                'not-started': t.tabNotStarted,
                'overdue': t.tabOverdue,
                'completed': t.tabCompleted
              };

              const dueLabels = {
                'Due today': t.dueToday,
                'Due tomorrow': t.dueTomorrow,
                '2 days overdue': t.twoDaysOverdue,
                'Completed': t.tabCompleted,
                'Due in 3 days': lang === 'uz' ? "3 kundan keyin" : "Due in 3 days",
                'Completed yesterday': lang === 'uz' ? "Kecha bajarilgan" : "Completed yesterday"
              };

              return (
                <div 
                  key={hw.id} 
                  className="homework-row-card utility-card"
                  onClick={() => onStartDrill(hw.title)}
                  title="Click to open interactive practice drill"
                >
                  <div className="hw-icon-indicator" style={{ backgroundColor: `${hw.color}20`, color: hw.color }}>
                    <BookOpen size={16} />
                  </div>

                  <div className="hw-main-info">
                    <span className="hw-item-title">{hw.title}</span>
                    <span className="hw-item-sub">{hw.subject}</span>
                  </div>

                  <div className="hw-meta-cell">
                    <FileCheck size={14} className="meta-icon" />
                    <span>{hw.questionsCount} {t.questionsLabel}</span>
                  </div>

                  <div className="hw-meta-cell">
                    <Clock size={14} className="meta-icon" />
                    <span>{dueLabels[hw.dueDate] || hw.dueDate}</span>
                  </div>

                  <div className="hw-status-cell">
                    <span className={`badge-status badge-${hw.status}`}>
                      {statusLabels[hw.status]}
                    </span>
                  </div>

                  <div className="hw-arrow-cell">
                    <ChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Column: Attendance + Achievement (Level 2 Glass) */}
        <div className="attendance-achievement-col">
          {/* Attendance Widget */}
          <div className="attendance-widget glass-card">
            <div className="widget-header">
              <span className="widget-title">{t.attendanceTitle}</span>
              <button 
                className="calendar-icon-btn" 
                onClick={() => onNavigate('attendance')}
                title="Open Attendance Calendar"
              >
                <CalendarDays size={16} />
              </button>
            </div>

            {/* Weekly Days Row */}
            <div className="weekly-days-row">
              {[
                { day: t.mon, checked: true },
                { day: t.tue, checked: true },
                { day: t.wed, checked: true },
                { day: t.thu, checked: true },
                { day: t.fri, checked: true },
                { day: t.sat, checked: false },
                { day: t.sun, checked: false },
              ].map((d, i) => (
                <div key={i} className="day-bubble-col">
                  <span className="day-label">{d.day}</span>
                  <div className={`day-check-circle ${d.checked ? 'checked' : ''}`}>
                    {d.checked ? <Check size={13} strokeWidth={2.6} /> : <span className="empty-dot"></span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="attendance-rate-bar-group">
              <div className="att-label-row">
                <span className="att-sessions"><strong>{t.weeklySessions}</strong></span>
                <span className="att-rate-badge">{t.weeklyGoal}</span>
              </div>
              <div className="att-track">
                <div className="att-fill" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* Achievement Widget */}
          <div className="achievement-widget glass-card">
            <div className="widget-header">
              <span className="widget-title">{t.achievementTitle}</span>
              <button className="widget-view-all" onClick={() => onNavigate('achievements')}>
                <span>{t.viewAll}</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="achievement-card-body" onClick={() => onNavigate('achievements')}>
              <div className="gold-medal-icon-wrap">
                <Flame size={24} className="flame-gold" />
              </div>
              <div className="achievement-text-info">
                <h4 className="ach-title">{t.momentumBuilder}</h4>
                <span className="ach-streak-note">{t.streak12days}</span>
                <p className="ach-goal-desc">{t.unlockNextBadge}</p>
                <div className="ach-progress-row">
                  <div className="ach-track">
                    <div className="ach-fill" style={{ width: `${(student.streak / 14) * 100}%` }}></div>
                  </div>
                  <span className="ach-ratio">{student.streak} / 14</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Leaderboard Podium & Top Ranking */}
        <div className="leaderboard-dashboard-widget glass-card">
          <div className="panel-header-row">
            <h3 className="panel-heading">{t.leaderboardTitle}</h3>
            <button className="panel-view-all" onClick={() => onNavigate('leaderboard')}>
              <span>{t.viewAll}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Top 3 Podium */}
          <div className="podium-cluster">
            {/* 2nd Place: Daniel */}
            <div className="podium-item place-2">
              <div className="podium-avatar-wrap">
                <span className="podium-rank-badge rank-2">2</span>
                <img src={leaderboardUsers[1].avatar} alt={leaderboardUsers[1].name} className="podium-avatar" />
              </div>
              <span className="podium-name">{leaderboardUsers[1].name}</span>
              <span className="podium-xp">{leaderboardUsers[1].xp.toLocaleString()} XP</span>
            </div>

            {/* 1st Place: Emma (Champion Crown) */}
            <div className="podium-item place-1">
              <div className="podium-avatar-wrap first-place">
                <span className="podium-rank-badge rank-1">1</span>
                <img src={leaderboardUsers[0].avatar} alt={leaderboardUsers[0].name} className="podium-avatar" />
              </div>
              <span className="podium-name">{leaderboardUsers[0].name}</span>
              <span className="podium-xp gold-xp">{leaderboardUsers[0].xp.toLocaleString()} XP</span>
            </div>

            {/* 3rd Place: Sarah */}
            <div className="podium-item place-3">
              <div className="podium-avatar-wrap">
                <span className="podium-rank-badge rank-3">3</span>
                <img src={leaderboardUsers[2].avatar} alt={leaderboardUsers[2].name} className="podium-avatar" />
              </div>
              <span className="podium-name">{leaderboardUsers[2].name}</span>
              <span className="podium-xp">{leaderboardUsers[2].xp.toLocaleString()} XP</span>
            </div>
          </div>

          {/* Nearby Rank list: Noah #7, Saidakbar #8 (You), Liam #9, Olivia #10 */}
          <div className="leaderboard-mini-list">
            {leaderboardUsers.slice(6, 10).map((u) => {
              const isMe = u.isCurrentUser;
              return (
                <div key={u.rank} className={`lb-mini-row ${isMe ? 'lb-current-user' : ''}`}>
                  <span className="lb-rank-num">{u.rank}</span>
                  <img src={u.avatar} alt={u.name} className="lb-mini-avatar" />
                  <div className="lb-user-name-group">
                    <span className="lb-mini-name">{u.name}</span>
                    {isMe && <span className="lb-you-badge">{t.youTag}</span>}
                  </div>
                  <span className="lb-mini-xp">{u.xp.toLocaleString()} XP</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM TIER: Quick Tools + Mood Tracker + Study Environment Audio
          ========================================================================= */}
      <div className="bottom-dashboard-grid">
        {/* 1. Quick Tools Row */}
        <div className="quick-tools-widget glass-card">
          <span className="widget-title">{t.quickToolsTitle}</span>
          <div className="tools-buttons-grid">
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('practice')}>
              <Clock size={16} />
              <span>{t.practiceTestBtn}</span>
            </button>
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('flashcards')}>
              <Layers size={16} />
              <span>{t.flashcardsBtn}</span>
            </button>
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('notes')}>
              <FileText size={16} />
              <span>{t.notesBtn}</span>
            </button>
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('attendance')}>
              <CalendarDays size={16} />
              <span>{t.studyPlanBtn}</span>
            </button>
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('vocabulary')}>
              <BookOpen size={16} />
              <span>{t.vocabBtn}</span>
            </button>
            <button className="quick-tool-btn utility-card" onClick={() => onNavigate('mistakes')}>
              <AlertTriangle size={16} />
              <span>{t.mistakesBtn}</span>
            </button>
          </div>
        </div>

        {/* 2. Mood Tracker: How do you feel today? */}
        <div className="mood-tracker-widget glass-card">
          <span className="widget-title">{t.howDoYouFeel}</span>
          <div className="mood-icons-row">
            {[
              { 
                id: 'Not great', 
                label: t.moodNotGreat, 
                icon: Frown, 
                noteEn: "Try a 10-minute review instead of a full lesson.", 
                noteUz: "To'liq dars o'rniga 10 daqiqalik yengil takrorlashni sinab ko'ring." 
              },
              { 
                id: 'Tired', 
                label: t.moodTired, 
                icon: Meh, 
                noteEn: "A short 15-minute nature ambient break will restore your mental sharpness.", 
                noteUz: "15 daqiqalik sokin tabiat sadolari zehnni tiklashga yordam beradi." 
              },
              { 
                id: 'Okay', 
                label: t.moodOkay, 
                icon: Smile, 
                noteEn: "Balanced state. Ready for standard quadratic function drills.", 
                noteUz: "Muvozanatli holat. Kvadratik funksiyalar mashqi uchun qulay fursat." 
              },
              { 
                id: 'Good', 
                label: t.moodGood, 
                icon: Smile, 
                noteEn: "Perfect time for a timed practice set.", 
                noteUz: "Vaqtga mo'ljallangan test mashqini yechish uchun ideal vaqt." 
              },
              { 
                id: 'Amazing', 
                label: t.moodAmazing, 
                icon: Sparkles, 
                noteEn: "Peak flow state detected. Excellent day for a Full SAT Diagnostic Test!", 
                noteUz: "Eng yuqori diqqat holati! To'liq SAT diagnostika testini yechish tavsiya etiladi." 
              },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  className={`mood-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleMoodSelect(m.id, m.noteEn, m.noteUz)}
                  title={m.label}
                >
                  <div className="mood-icon-circle">
                    <Icon size={18} />
                  </div>
                  <span className="mood-label">{m.label}</span>
                </button>
              );
            })}
          </div>
          {moodMessage && (
            <p className="mood-feedback-text animate-fade-in">"{moodMessage}"</p>
          )}
        </div>

        {/* 3. Study Environment Soundscape */}
        <StudyEnvironment onOpenAll={() => onNavigate('progress')} lang={lang} />
      </div>
    </div>
  );
}
