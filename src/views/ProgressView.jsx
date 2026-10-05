import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Lightbulb, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Compass,
  Sparkles,
  Calendar,
  Check,
  ChevronRight,
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import ScoreTrajectoryChart from '../components/ScoreTrajectoryChart';

export default function ProgressView({ 
  student, 
  scoreTrajectoryData, 
  onNavigate, 
  onStartDrill,
  lang = 'uz' 
}) {
  const currentScore = student?.currentScore || 1320;
  const goalScore = student?.goalScore || 1450;
  const improvement = student?.improvement || 140;
  const pointsRemaining = goalScore - currentScore; // 130
  const mathScore = student?.mathScore || 690;
  const readingWritingScore = student?.readingWritingScore || 630;

  // Milestones progression data
  const milestones = [
    { score: 1180, labelUz: "Diagnostika", labelEn: "Baseline", status: "completed" },
    { score: 1320, labelUz: "Hozirgi Ball", labelEn: "Current Score", status: "current" },
    { score: 1350, labelUz: "Keyingi Marra", labelEn: "Next Milestone", status: "next" },
    { score: 1400, labelUz: "Yuqori Marra", labelEn: "Advanced", status: "upcoming" },
    { score: 1450, labelUz: "Yakuniy Maqsad", labelEn: "Target Goal", status: "goal" }
  ];

  const handleStartReadingDrill = () => {
    if (onStartDrill) {
      onStartDrill(lang === 'uz' ? "Reading: Dalillar va Tarixiy Matnlar Mashqi" : "Reading: Evidence in History Drill");
    } else if (onNavigate) {
      onNavigate('practice');
    }
  };

  return (
    <div className="progress-view-container animate-fade-in">
      {/* =========================================================================
          1. PROGRESS HERO: Performance Header + The 1320 -> 1450 Master Bridge
          ========================================================================= */}
      <div className="progress-hero-bar glass-card">
        <div className="prog-hero-left">
          <div className="prog-tag-row">
            <span className="prog-badge-tag">
              {lang === 'uz' ? 'CHUQUR BALL DIAGNOSTIKASI' : 'DEEP SCORE DIAGNOSTICS'}
            </span>
            <div className="exam-countdown-chip">
              <Calendar size={13} className="text-mint" />
              <span>
                {lang === 'uz' ? 'SAT Imtihoni: 21-Noyabr, 2026 • 47 kun qoldi' : 'SAT Date: Nov 21, 2026 • 47 days left'}
              </span>
            </div>
          </div>
          <h1 className="prog-view-title">
            {lang === 'uz' ? 'Natijalar va Rivojlanish Trayektoriyasi' : 'Performance & Trajectory Analytics'}
          </h1>
          <p className="prog-view-desc">
            {lang === 'uz' 
              ? `${goalScore} ballik maqsad sari har bir mavzu va bo'lim bo'yicha aniq tahliliy ma'lumotlar.`
              : `Evidence-backed analytics tracking your progress toward your target score of ${goalScore}.`}
          </p>
        </div>

        {/* Master Score Relationship Bridge: 1320 -> 1450 */}
        <div className="score-bridge-module">
          <div className="bridge-step current-step">
            <span className="bridge-label">{lang === 'uz' ? 'Hozirgi Ball' : 'Current Score'}</span>
            <span className="bridge-val current-val">{currentScore}</span>
            <span className="bridge-gain">+{improvement} {lang === 'uz' ? 'o\'sish' : 'pts'}</span>
          </div>

          <div className="bridge-arrow-connector">
            <div className="connector-line"></div>
            <div className="connector-badge">
              <span className="remaining-number">{pointsRemaining}</span>
              <span className="remaining-text">{lang === 'uz' ? 'ball qoldi' : 'pts left'}</span>
            </div>
            <ArrowRight size={16} className="connector-arrow-icon" />
          </div>

          <div className="bridge-step goal-step">
            <span className="bridge-label">{lang === 'uz' ? 'Yakuniy Maqsad' : 'Target Goal'}</span>
            <span className="bridge-val goal-val">{goalScore}</span>
            <span className="bridge-sub">{lang === 'uz' ? '99th percentile' : 'Top 1% Tier'}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SCORE TRAJECTORY: Baseline -> Current -> Goal Path
          ========================================================================= */}
      <div className="trajectory-full-section">
        <ScoreTrajectoryChart 
          data={scoreTrajectoryData}
          currentScore={currentScore}
          targetScore={goalScore}
          improvement={improvement}
          lang={lang}
        />
      </div>

      {/* =========================================================================
          3. SUBJECT PERFORMANCE HIERARCHY: Writing (Strongest) vs Math vs Reading
          ========================================================================= */}
      <div className="subject-hierarchy-container">
        <div className="section-head-row">
          <div className="section-title-wrap">
            <h2 className="section-subtitle">
              {lang === 'uz' ? 'Bo\'limlar Bo\'yicha Aniqlik va Ierarxiya' : 'Section Mastery & Performance Hierarchy'}
            </h2>
            <p className="section-subdesc">
              {lang === 'uz' 
                ? 'Eng kuchli yo\'nalishdan tortib asosiy e\'tibor qaratiladigan sohalargacha taqsimot'
                : 'Prioritized from your strongest mastery area to your highest-yield growth opportunity.'}
            </p>
          </div>
        </div>

        <div className="subject-hierarchy-grid">
          {/* Card 1: WRITING 88% — STRONGEST AREA */}
          <div className="subject-tier-card tier-strongest glass-card">
            <div className="tier-header">
              <span className="tier-badge badge-strongest">
                <Sparkles size={12} />
                {lang === 'uz' ? 'ENG KUCHLI SOHA' : 'STRONGEST AREA'}
              </span>
              <span className="tier-subject-name">Writing & Language</span>
            </div>

            <div className="tier-score-display">
              <span className="tier-pct-big">88%</span>
              <div className="tier-score-meta">
                <span className="tier-score-label">{lang === 'uz' ? 'Grammatika Aniqligi' : 'Conventions Mastery'}</span>
                <span className="tier-pacing-tag text-lime">{lang === 'uz' ? 'A\'lo darajada' : 'Mastery Level'}</span>
              </div>
            </div>

            <div className="tier-breakdown-list">
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Tinish belgilari va vergul qoidalari' : 'Boundaries & Punctuation'}</span>
                <span className="sub-val highlight-lime">92%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Grammatik kelishuv & zamonlar' : 'Form, Structure & Sense'}</span>
                <span className="sub-val highlight-lime">88%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Ritorik tuzilish & sintaksis' : 'Rhetorical Synthesis'}</span>
                <span className="sub-val">84%</span>
              </div>
            </div>

            <div className="tier-card-footer">
              <span className="footer-status-text">
                {lang === 'uz' ? 'Strategiya: Barqaror ushlab turish' : 'Strategy: Maintain high precision'}
              </span>
            </div>
          </div>

          {/* Card 2: MATH 82% — ON TRACK */}
          <div className="subject-tier-card tier-ontrack glass-card">
            <div className="tier-header">
              <span className="tier-badge badge-ontrack">
                <Check size={12} />
                {lang === 'uz' ? 'REJA BO\'YICHA' : 'ON TRACK'}
              </span>
              <span className="tier-subject-name">Math ({mathScore} / 800)</span>
            </div>

            <div className="tier-score-display">
              <span className="tier-pct-big text-mint">82%</span>
              <div className="tier-score-meta">
                <span className="tier-score-label">{lang === 'uz' ? 'Matematik Aniqlik' : 'Math Section Accuracy'}</span>
                <span className="tier-pacing-tag text-mint">{lang === 'uz' ? '700+ ballga yaqin' : 'Near 700+ Mark'}</span>
              </div>
            </div>

            <div className="tier-breakdown-list">
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Algebra va Chiziqli Tenglamalar' : 'Algebra & Linear Systems'}</span>
                <span className="sub-val highlight-mint">88%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Murakkab Funksiyalar & Parabolalar' : 'Advanced Math & Quadratics'}</span>
                <span className="sub-val">82%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Geometriya & Trigonometriya' : 'Geometry & Trigonometry'}</span>
                <span className="sub-val text-warning">76%</span>
              </div>
            </div>

            <div className="tier-card-footer">
              <span className="footer-status-text">
                {lang === 'uz' ? 'Strategiya: Module 2 qiyin savollar' : 'Strategy: Drill Hard Module 2'}
              </span>
            </div>
          </div>

          {/* Card 3: READING 74% — PRIORITY AREA */}
          <div className="subject-tier-card tier-priority glass-card">
            <div className="tier-header">
              <span className="tier-badge badge-priority">
                <AlertCircle size={12} />
                {lang === 'uz' ? 'BIRINCHI NAVBATDAGI' : 'PRIORITY AREA'}
              </span>
              <span className="tier-subject-name">Reading ({readingWritingScore} / 800)</span>
            </div>

            <div className="tier-score-display">
              <span className="tier-pct-big text-warning">74%</span>
              <div className="tier-score-meta">
                <span className="tier-score-label">{lang === 'uz' ? 'Reading Aniqligi' : 'Reading Comprehension'}</span>
                <span className="tier-pacing-tag text-warning">{lang === 'uz' ? 'Eng katta zaxira' : 'Highest Growth Upside'}</span>
              </div>
            </div>

            <div className="tier-breakdown-list">
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Tuzilish va matn maqsadi' : 'Craft & Structure'}</span>
                <span className="sub-val">80%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Matn dalillari va xulosalar' : 'Information & Ideas'}</span>
                <span className="sub-val text-warning">74%</span>
              </div>
              <div className="tier-sub-row">
                <span>{lang === 'uz' ? 'Tarixiy va juft matnlar' : 'Paired Historical Passages'}</span>
                <span className="sub-val text-danger">68%</span>
              </div>
            </div>

            <div className="tier-card-footer priority-footer">
              <span className="footer-status-text text-warning">
                {lang === 'uz' ? '+80 balllik asosiy o\'sish manbai' : '+80 pts potential score boost'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. STRATEGY ROW: Actionable Next Priority + Realistic Milestones
          ========================================================================= */}
      <div className="progress-strategy-grid">
        {/* Next Priority Recommendation Card */}
        <div className="next-priority-card glass-card">
          <div className="priority-card-header">
            <div className="priority-header-left">
              <span className="priority-pill">
                <Target size={13} />
                {lang === 'uz' ? 'ASOSIY KEYINGI QADAM' : 'NEXT PRIORITY'}
              </span>
              <h3 className="priority-title">
                {lang === 'uz' ? 'Reading Dalil Tahlili (74%)' : 'Reading Evidence Accuracy (74%)'}
              </h3>
            </div>
            <div className="opportunity-badge">
              <Flame size={14} className="text-warning" />
              <span>+60–80 ball</span>
            </div>
          </div>

          <p className="priority-explanation">
            {lang === 'uz' 
              ? "Sizning eng katta o'sish imkoniyatingiz — Reading bo'limi aniqligini 74% dan 84% ga ko'tarishdir. Juft tarixiy matnlardagi dalil savollarini o'zlashtirish orqali 1450 maqsadiga eng tez yetasiz."
              : "Your strongest opportunity is improving Reading accuracy from 74% to 84%. Mastering paired-passage evidence questions will bridge the remaining gap to 1450."}
          </p>

          <div className="priority-action-row">
            <button 
              className="btn-primary-mint priority-action-btn"
              onClick={handleStartReadingDrill}
            >
              <BookOpen size={16} />
              <span>{lang === 'uz' ? 'Reading Mashqlarini Boshlash' : 'Review Reading Drills'}</span>
              <ArrowRight size={15} />
            </button>
            <span className="priority-meta-hint">
              {lang === 'uz' ? 'Taxminiy vaqt: 18 daqiqa • 12 ta savol' : '~18 mins • 12 curated questions'}
            </span>
          </div>
        </div>

        {/* Milestones Progression Roadmap */}
        <div className="milestones-card glass-card">
          <div className="milestones-header">
            <div className="milestone-title-group">
              <Award size={18} className="text-mint" />
              <h3 className="milestones-title">
                {lang === 'uz' ? 'Ball Pog\'onalari (Milestones)' : 'Score Milestones Roadmap'}
              </h3>
            </div>
            <span className="milestone-pace-tag">
              {lang === 'uz' ? 'Keyingi: 1350 ball' : 'Next: 1350 pts'}
            </span>
          </div>

          <div className="milestones-timeline-wrapper">
            <div className="timeline-track-line">
              <div className="timeline-track-fill" style={{ width: '45%' }}></div>
            </div>

            <div className="milestone-steps-row">
              {milestones.map((m, idx) => {
                const isCompleted = m.status === 'completed';
                const isCurrent = m.status === 'current';
                const isNext = m.status === 'next';
                const isGoal = m.status === 'goal';

                return (
                  <div 
                    key={idx} 
                    className={`milestone-step-node ${m.status}`}
                  >
                    <div className="node-marker-box">
                      {isCompleted ? (
                        <Check size={12} className="check-icon" />
                      ) : isCurrent ? (
                        <div className="current-pulse-dot"></div>
                      ) : isGoal ? (
                        <Award size={13} className="goal-icon" />
                      ) : (
                        <span className="step-num">{idx + 1}</span>
                      )}
                    </div>
                    <span className="step-score-num">{m.score}</span>
                    <span className="step-desc-label">
                      {lang === 'uz' ? m.labelUz : m.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="milestone-next-callout">
            <span className="next-callout-bold">
              {lang === 'uz' ? 'Keyingi marra: 1350 ball' : 'Immediate Target: 1350 pts'}
            </span>
            <span className="next-callout-sub">
              {lang === 'uz' ? 'Erishish uchun bor-yo\'g\'i +30 ball kerak' : 'Only +30 points away from next tier'}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. PERSONALIZED DIAGNOSTIC INSIGHTS
          ========================================================================= */}
      <div className="insights-panel glass-card">
        <div className="insights-header">
          <div className="insight-title-group">
            <Lightbulb size={20} className="text-lime" />
            <h3 className="insight-heading">
              {lang === 'uz' ? 'Shaxsiy Rivojlanish Tavsiyalari' : 'Personalized Learning Insights'}
            </h3>
          </div>
          <span className="insight-badge">MINDORA Diagnostic Engine</span>
        </div>

        <div className="insights-list-grid">
          <div className="insight-card">
            <div className="insight-icon-tag positive">
              <TrendingUp size={16} />
            </div>
            <div className="insight-content">
              <h4 className="card-insight-title">
                {lang === 'uz' ? 'Algebrada Barqaror O\'sish (+140 ball)' : 'Algebra Accuracy Surge (+140 pts)'}
              </h4>
              <p className="card-insight-body">
                {lang === 'uz' 
                  ? "Boshlang'ich natijaga nisbatan umumiy o'sish +140 ballga yetdi. Kvadratik funksiyalar va chiziqli tizimlar bo'yicha aniqlik 82% ga chiqdi."
                  : "Overall score improved +140 points since diagnostic baseline. Quadratic functions and linear systems reached 82% accuracy."}
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon-tag opportunity">
              <Clock size={16} />
            </div>
            <div className="insight-content">
              <h4 className="card-insight-title">
                {lang === 'uz' ? 'Reading: Vaqt Taqsimoti (1.7 daqiqa)' : 'Reading Timing Optimization (1.7 mins)'}
              </h4>
              <p className="card-insight-body">
                {lang === 'uz' 
                  ? "Reading bo'limida har bir savolga o'rtacha 1.7 daqiqa sarflanmoqda. Asosiy e'tiborni dalil qidirish tezligini 1.2 daqiqaga tushirishga qarating."
                  : "Reading timing is currently your biggest growth opportunity. You spend 1.7 mins on paired-passage questions versus the 1.2 min benchmark."}
              </p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon-tag strategy">
              <Compass size={16} />
            </div>
            <div className="insight-content">
              <h4 className="card-insight-title">
                {lang === 'uz' ? '1450 Maqsadiga Yo\'l (130 ball qoldi)' : 'Target Score Pathway (130 pts left)'}
              </h4>
              <p className="card-insight-body">
                {lang === 'uz' 
                  ? "1450 ballga yetish uchun qolgan 130 ballni Module 2 qiyin geometriya (+50 ball) va Reading dalil tahlillari (+80 ball) orqali yig'ish tavsiya etiladi."
                  : "To bridge the remaining 130 points to reach 1450, focus on Module 2 hard geometry (+50 pts) and paired historical passages (+80 pts)."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

