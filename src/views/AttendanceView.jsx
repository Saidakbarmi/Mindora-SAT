import React, { useState } from 'react';
import { CalendarCheck, Check, X, Clock, ChevronLeft, ChevronRight, ShieldCheck, Flame } from 'lucide-react';

export default function AttendanceView({ student, lang = 'uz' }) {
  const [currentMonth, setCurrentMonth] = useState(lang === 'uz' ? "Oktabr 2026" : "October 2026");

  // Generate calendar days for October 2026 (starts on Thursday, 31 days)
  // Day states: 'attended' | 'missed' | 'late' | 'upcoming'
  const daysData = [
    { day: 1, status: 'attended' },
    { day: 2, status: 'attended' },
    { day: 3, status: 'attended' },
    { day: 4, status: 'attended' },
    { day: 5, status: 'attended', isToday: true }, // Today Oct 5
    { day: 6, status: 'upcoming' },
    { day: 7, status: 'upcoming' },
    { day: 8, status: 'upcoming' },
    { day: 9, status: 'upcoming' },
    { day: 10, status: 'upcoming' },
    { day: 11, status: 'upcoming' },
    { day: 12, status: 'upcoming' },
    { day: 13, status: 'upcoming' },
    { day: 14, status: 'upcoming' },
    { day: 15, status: 'upcoming' },
    { day: 16, status: 'upcoming' },
    { day: 17, status: 'upcoming' },
    { day: 18, status: 'upcoming' },
    { day: 19, status: 'upcoming' },
    { day: 20, status: 'upcoming' },
    { day: 21, status: 'upcoming' },
    { day: 22, status: 'upcoming' },
    { day: 23, status: 'upcoming' },
    { day: 24, status: 'upcoming' },
    { day: 25, status: 'upcoming' },
    { day: 26, status: 'upcoming' },
    { day: 27, status: 'upcoming' },
    { day: 28, status: 'upcoming' },
    { day: 29, status: 'upcoming' },
    { day: 30, status: 'upcoming' },
    { day: 31, status: 'upcoming' },
  ];

  const daysOfWeek = lang === 'uz' 
    ? ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="attendance-view-container animate-fade-in">
      {/* Hero Bar */}
      <div className="attendance-hero-bar glass-card">
        <div className="att-hero-info">
          <span className="att-badge-top">
            {lang === 'uz' ? 'DAVOMAT VA DARS REJASI' : 'ATTENDANCE & DISCIPLINE'}
          </span>
          <h1 className="att-view-title">
            {lang === 'uz' ? 'Dars Davomati va Reja Qaydnomasi' : 'Commitment & Session Log'}
          </h1>
          <p className="att-view-desc">
            {lang === 'uz' 
              ? "Doimiy va tartibli tayyorgarlik — yuqori SAT balining eng muhim omili. Har bir dars va sessiyaga o'z vaqtida qatnashing."
              : "Consistency is the primary differentiator in SAT score progression. Track your study adherence footprint."}
          </p>
        </div>

        {/* Clean, Non-Promotional Rate Display */}
        <div className="att-rate-display">
          <span className="att-rate-label">
            {lang === 'uz' ? 'Umumiy Davomat' : 'Overall Attendance'}
          </span>
          <span className="att-rate-big">{student?.attendanceRate || 94}%</span>
          <span className="att-rate-sub">
            {lang === 'uz' 
              ? `Rejadagi 50 ta sessiyadan ${student?.attendedClasses || 47} tasi bajarildi` 
              : `${student?.attendedClasses || 47} of 50 sessions completed`}
          </span>
        </div>
      </div>

      {/* 4 Clear Stats Cards */}
      <div className="att-stats-row">
        <div className="att-stat-card glass-card">
          <div className="stat-icon-wrap mint-icon">
            <Check size={18} />
          </div>
          <div>
            <span className="stat-label">
              {lang === 'uz' ? 'Qatnashgan Sessiyalar' : 'Attended Sessions'}
            </span>
            <span className="stat-num">{student?.attendedClasses || 47}</span>
          </div>
        </div>

        <div className="att-stat-card glass-card">
          <div className="stat-icon-wrap red-icon">
            <X size={18} />
          </div>
          <div>
            <span className="stat-label">
              {lang === 'uz' ? 'Qoldirilgan Darslar' : 'Missed Sessions'}
            </span>
            <span className="stat-num red-text">{student?.missedClasses || 3}</span>
          </div>
        </div>

        <div className="att-stat-card glass-card">
          <div className="stat-icon-wrap yellow-icon">
            <Clock size={18} />
          </div>
          <div>
            <span className="stat-label">
              {lang === 'uz' ? 'Kechikishlar' : 'Late Arrivals'}
            </span>
            <span className="stat-num yellow-text">{student?.lateClasses || 1}</span>
          </div>
        </div>

        <div className="att-stat-card glass-card">
          <div className="stat-icon-wrap lime-icon">
            <Flame size={18} />
          </div>
          <div>
            <span className="stat-label">
              {lang === 'uz' ? 'Ketma-ketlik (Streak)' : 'Current Streak'}
            </span>
            <span className="stat-num lime-text">{student?.streak || 12} {lang === 'uz' ? 'kun' : 'days'}</span>
          </div>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className="calendar-panel glass-card">
        <div className="calendar-controls-bar">
          <h2 className="calendar-month-title">{currentMonth}</h2>
          <div className="month-nav-btns">
            <button className="nav-arrow-btn" aria-label="Previous month"><ChevronLeft size={16} /></button>
            <button className="nav-arrow-btn" aria-label="Next month"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Legend */}
        <div className="calendar-legend-bar">
          <div className="legend-item"><span className="legend-dot attended"></span> {lang === 'uz' ? 'Qatnashgan' : 'Attended'}</div>
          <div className="legend-item"><span className="legend-dot late"></span> {lang === 'uz' ? 'Kechikkan' : 'Late Arrival'}</div>
          <div className="legend-item"><span className="legend-dot missed"></span> {lang === 'uz' ? 'Qoldirilgan' : 'Missed'}</div>
          <div className="legend-item"><span className="legend-dot upcoming"></span> {lang === 'uz' ? 'Rejalashtirilgan' : 'Scheduled'}</div>
        </div>

        {/* Day of Week Headers */}
        <div className="calendar-grid-header">
          {daysOfWeek.map(d => (
            <div key={d} className="dow-header-cell">{d}</div>
          ))}
        </div>

        {/* Month Days Grid */}
        <div className="calendar-days-grid">
          {/* Offset for Oct 1 (Thursday, so Mon, Tue, Wed are blanks) */}
          <div className="day-cell blank"></div>
          <div className="day-cell blank"></div>
          <div className="day-cell blank"></div>

          {daysData.map(d => {
            return (
              <div 
                key={d.day} 
                className={`day-cell ${d.status} ${d.isToday ? 'is-today' : ''}`}
              >
                <span className="day-number">{d.day}</span>
                {d.isToday && <span className="today-chip">{lang === 'uz' ? 'Bugun' : 'Today'}</span>}
                <div className="day-status-indicator">
                  {d.status === 'attended' && <Check size={12} />}
                  {d.status === 'late' && <Clock size={12} />}
                  {d.status === 'missed' && <X size={12} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
