import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Clock, 
  Award, 
  Play, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { practiceTestsList } from '../data/mockData';

export default function PracticeTestsView({ onStartDrill, lang = 'uz' }) {
  const [filterType, setFilterType] = useState('all');

  const filteredTests = practiceTestsList.filter(t => {
    if (filterType === 'all') return true;
    if (filterType === 'full') return t.type.includes('Full');
    if (filterType === 'math') return t.type.includes('Math');
    if (filterType === 'rw') return t.type.includes('Reading');
    return true;
  });

  return (
    <div className="practice-tests-view animate-fade-in">
      {/* Hero Header */}
      <div className="practice-hero-card glass-card">
        <div className="practice-hero-info">
          <span className="practice-tag-badge">
            {lang === 'uz' ? "MINDORA ADAPTIV SAT SIMULATSIYASI" : "MINDORA ADAPTIVE SAT SIMULATION"}
          </span>
          <h1 className="practice-title">
            {lang === 'uz' ? "MINDORA To'liq SAT Sinov Imtihonlari" : "MINDORA Full-Length Practice Exams"}
          </h1>
          <p className="practice-desc">
            {lang === 'uz' 
              ? "Ko'p bosqichli adaptiv qiyinlik, qat'iy vaqt nazorati va tezkor diagnostik ball hisoblash tizimi bilan to'liq raqamli SAT muhitini his eting."
              : "Experience the exact MINDORA Digital SAT adaptive environment with strict section timers, multi-stage difficulty calibration, and instant score scaling."}
          </p>
        </div>

        <div className="practice-diagnostic-summary">
          <div className="summary-score-box">
            <span className="summary-label">{lang === 'uz' ? "So'nggi natija" : "Latest Composite"}</span>
            <span className="summary-value">1320</span>
            <span className="summary-change">+140 vs Baseline</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="practice-filter-bar glass-card">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            {lang === 'uz' ? "Barcha Testlar" : "All Exams"}
          </button>
          <button 
            className={`filter-btn ${filterType === 'full' ? 'active' : ''}`}
            onClick={() => setFilterType('full')}
          >
            {lang === 'uz' ? "To'liq Imtihon (1600 ball)" : "Full Length (1600 pts)"}
          </button>
          <button 
            className={`filter-btn ${filterType === 'math' ? 'active' : ''}`}
            onClick={() => setFilterType('math')}
          >
            {lang === 'uz' ? "Matematika Bo'limi (800 ball)" : "Math Section (800 pts)"}
          </button>
          <button 
            className={`filter-btn ${filterType === 'rw' ? 'active' : ''}`}
            onClick={() => setFilterType('rw')}
          >
            {lang === 'uz' ? "O'qish va Yozish (800 ball)" : "Reading & Writing (800 pts)"}
          </button>
        </div>
      </div>

      {/* Test Cards List */}
      <div className="practice-cards-list">
        {filteredTests.map((test) => (
          <div key={test.id} className="practice-test-card glass-card">
            <div className="test-card-col-main">
              <div className="test-card-tags">
                <span className="test-type-pill">{test.type}</span>
                <span className="test-difficulty-pill">{test.difficulty}</span>
              </div>
              <h3 className="test-title">{test.title}</h3>
              <div className="test-sections-row">
                {test.sections.map((sec, idx) => (
                  <span key={idx} className="section-capsule">
                    • {sec}
                  </span>
                ))}
              </div>

              {test.previousScore && (
                <div className="test-score-progression">
                  <TrendingUp size={13} className="text-mint" />
                  <span>
                    {lang === 'uz' ? "Avvalgi natija: " : "Previous attempt: "}
                    <strong>{test.previousScore} → {test.bestScore}</strong> ({test.scoreDelta})
                  </span>
                </div>
              )}
            </div>

            <div className="test-card-col-stats">
              <div className="stat-unit">
                <Clock size={15} />
                <span>{test.duration}</span>
              </div>
              <div className="stat-unit">
                <FileSpreadsheet size={15} />
                <span>{test.questions} {lang === 'uz' ? "ta savol" : "Questions"}</span>
              </div>
              <div className="stat-unit">
                <Award size={15} />
                <span>{lang === 'uz' ? "Eng yaxshi: " : "Best: "}<strong>{test.bestScore}</strong></span>
              </div>
            </div>

            <div className="test-card-col-action">
              <span className="last-attempt-note">
                {lang === 'uz' ? "Oxirgi marta: " : "Attempted: "}{test.lastAttempt}
              </span>
              <button 
                className="btn-primary-mint"
                onClick={() => onStartDrill(test.title)}
              >
                <span>{test.status === 'Completed' ? (lang === 'uz' ? "Testni ko'rish" : "Review Test") : (lang === 'uz' ? "Testni boshlash" : "Start Test")}</span>
                <Play size={14} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
