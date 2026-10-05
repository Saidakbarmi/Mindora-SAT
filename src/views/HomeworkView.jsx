import React, { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { homeworkList } from '../data/mockData';

export default function HomeworkView({ onStartDrill, lang = 'uz' }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHw = homeworkList.filter(item => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const matchesSubject = selectedSubject === 'all' || item.subjectTag.toLowerCase() === selectedSubject.toLowerCase();
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSubject && matchesQuery;
  });

  const tabCounts = {
    all: homeworkList.length,
    'not-started': homeworkList.filter(h => h.status === 'not-started').length,
    'in-progress': homeworkList.filter(h => h.status === 'in-progress').length,
    overdue: homeworkList.filter(h => h.status === 'overdue').length,
    completed: homeworkList.filter(h => h.status === 'completed').length,
  };

  return (
    <div className="homework-view-container animate-fade-in">
      {/* Hero Header */}
      <div className="homework-hero-bar glass-card">
        <div className="hw-hero-left">
          <span className="hw-badge-top">
            {lang === 'uz' ? 'VAZIFA VA MASHQLAR MARKAZI' : 'ASSIGNMENT WORKSPACE'}
          </span>
          <h1 className="hw-view-title">
            {lang === 'uz' ? 'SAT Mashqlari va Vazifalar' : 'SAT Practice & Problem Sets'}
          </h1>
          <p className="hw-view-desc">
            {lang === 'uz' 
              ? "Mavzularni mustahkamlash, tezlikni oshirish va imtihongacha xatolarni bartaraf etish uchun mo'ljallangan mashqlar to'plami."
              : "Complete targeted question drills to reinforce lessons and calibrate your pacing before test day."}
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="hw-quick-stats">
          <div className="hw-stat-chip">
            <span className="chip-label">{lang === 'uz' ? 'Bugun muddat' : 'Due Today'}</span>
            <span className="chip-val warning-val">1 {lang === 'uz' ? 'vazifa' : 'task'}</span>
          </div>
          <div className="hw-stat-chip">
            <span className="chip-label">{lang === 'uz' ? 'Bajarilgan' : 'Completed'}</span>
            <span className="chip-val success-val">{tabCounts.completed} {lang === 'uz' ? 'to\'plam' : 'sets'}</span>
          </div>
        </div>
      </div>

      {/* Tabs and Filters Row */}
      <div className="hw-controls-bar glass-card">
        {/* Status Tabs */}
        <div className="hw-status-tabs">
          <button 
            className={`hw-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {lang === 'uz' ? 'Barchasi' : 'All'} <span>({tabCounts.all})</span>
          </button>
          <button 
            className={`hw-tab ${activeTab === 'not-started' ? 'active' : ''}`}
            onClick={() => setActiveTab('not-started')}
          >
            {lang === 'uz' ? 'Boshlanmagan' : 'Not Started'} <span>({tabCounts['not-started']})</span>
          </button>
          <button 
            className={`hw-tab ${activeTab === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in-progress')}
          >
            {lang === 'uz' ? 'Jarayonda' : 'In Progress'} <span>({tabCounts['in-progress']})</span>
          </button>
          <button 
            className={`hw-tab ${activeTab === 'overdue' ? 'active' : ''}`}
            onClick={() => setActiveTab('overdue')}
          >
            {lang === 'uz' ? 'Muddati o\'tgan' : 'Overdue'} <span>({tabCounts.overdue})</span>
          </button>
          <button 
            className={`hw-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            {lang === 'uz' ? 'Bajarilgan' : 'Completed'} <span>({tabCounts.completed})</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="hw-filter-inputs">
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="hw-subject-select"
          >
            <option value="all">{lang === 'uz' ? 'Barcha Fanlar' : 'All Subjects'}</option>
            <option value="math">{lang === 'uz' ? 'Matematika' : 'Mathematics'}</option>
            <option value="reading">{lang === 'uz' ? 'Reading' : 'Reading'}</option>
            <option value="writing">{lang === 'uz' ? 'Writing' : 'Writing'}</option>
          </select>

          <div className="hw-search-box">
            <Search size={14} className="hw-search-icon" />
            <input 
              type="text" 
              placeholder={lang === 'uz' ? "Vazifalarni qidirish..." : "Search assignments..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hw-search-input"
            />
          </div>
        </div>
      </div>

      {/* Homework Cards Grid */}
      <div className="hw-cards-grid">
        {filteredHw.length > 0 ? (
          filteredHw.map((hw) => {
            const statusConfig = {
              'in-progress': { 
                label: lang === 'uz' ? 'Jarayonda' : 'In Progress', 
                class: 'badge-in-progress', 
                action: lang === 'uz' ? 'Davom etish →' : 'Continue →',
                priority: lang === 'uz' ? 'Muhim' : 'High Priority'
              },
              'not-started': { 
                label: lang === 'uz' ? 'Boshlanmagan' : 'Not Started', 
                class: 'badge-not-started', 
                action: lang === 'uz' ? 'Boshlash →' : 'Start Drill →',
                priority: lang === 'uz' ? 'Navbatda' : 'Queued'
              },
              'overdue': { 
                label: lang === 'uz' ? 'Muddati o\'tgan' : 'Overdue', 
                class: 'badge-overdue', 
                action: lang === 'uz' ? 'Darhol yechish →' : 'Resolve Now →',
                priority: lang === 'uz' ? 'Shoshilinch' : 'Urgent'
              },
              'completed': { 
                label: lang === 'uz' ? 'Bajarilgan' : 'Completed', 
                class: 'badge-completed', 
                action: lang === 'uz' ? 'Natijani ko\'rish' : 'Review Answers',
                priority: lang === 'uz' ? 'Tugatildi' : 'Done'
              }
            };

            const cfg = statusConfig[hw.status];

            return (
              <div key={hw.id} className="hw-full-card glass-card">
                {/* Header line with Subject and clean Status indicator */}
                <div className="hw-card-top-line">
                  <div className="hw-card-subject-line">
                    <span className="hw-subject-name" style={{ color: hw.color }}>
                      {hw.subjectTag}
                    </span>
                    <span className="hw-dot-sep">·</span>
                    <span className="hw-q-count">
                      {hw.questionsCount} {lang === 'uz' ? 'ta savol' : 'questions'}
                    </span>
                  </div>

                  <span className={`badge-status ${cfg.class}`}>
                    {cfg.label}
                  </span>
                </div>

                <h3 className="hw-card-title">{hw.title}</h3>

                {/* Deadline & Estimated Time */}
                <div className="hw-card-meta-line">
                  <span className={`hw-due-text ${hw.status === 'overdue' ? 'text-red' : ''}`}>
                    {hw.dueDate}
                  </span>
                  <span className="hw-dot-sep">·</span>
                  <span className="hw-time-text">
                    ~{hw.estimatedMinutes} {lang === 'uz' ? 'daqiqa' : 'min'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="hw-card-progress">
                  <div className="hw-progress-track">
                    <div 
                      className="hw-progress-fill" 
                      style={{ 
                        width: `${hw.progress}%`,
                        backgroundColor: hw.status === 'completed' ? '#A8F06A' : hw.status === 'overdue' ? '#E47B7B' : '#8FE3D0'
                      }}
                    ></div>
                  </div>
                  <div className="hw-progress-labels">
                    <span className="hw-pct-label">{hw.progress}% {lang === 'uz' ? 'bajarildi' : 'completed'}</span>
                    {hw.score && <span className="hw-score-pill">{lang === 'uz' ? 'Natija' : 'Score'}: {hw.score}</span>}
                  </div>
                </div>

                {/* Action button: Obvious CTA */}
                <div className="hw-card-footer">
                  <button 
                    className={hw.status === 'in-progress' || hw.status === 'overdue' ? 'btn-primary-mint w-100' : 'btn-glass w-100'}
                    onClick={() => onStartDrill(hw.title)}
                  >
                    <span>{cfg.action}</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state-card glass-card">
            <Sparkles size={36} className="text-mint empty-icon" />
            <h3 className="empty-title">
              {lang === 'uz' ? "Mos keluvchi vazifalar topilmadi" : "No assignments match your criteria"}
            </h3>
            <p className="empty-text">
              {lang === 'uz' 
                ? "Filtrlar bo'yicha hech qanday vazifa chiqmadi. Filtrlarni tozalang yoki mustaqil mashq tanlang."
                : "No homework due here. Enjoy the breathing room — or pick an adaptive diagnostic drill."}
            </p>
            <button 
              className="btn-primary-mint" 
              onClick={() => { setActiveTab('all'); setSelectedSubject('all'); setSearchQuery(''); }}
            >
              {lang === 'uz' ? "Filtrlarni Tozalash" : "Reset Filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
