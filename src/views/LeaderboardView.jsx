import React, { useState } from 'react';
import { Trophy, Flame, Award, Sparkles, Crown, ArrowUpRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { leaderboardUsers } from '../data/mockData';

export default function LeaderboardView({ student, onStartDrill, lang = 'uz' }) {
  const [timeframe, setTimeframe] = useState('weekly'); // 'weekly' | 'monthly' | 'all-time'

  // Timeframe XP calculations for realistic interactive feel
  const multiplier = timeframe === 'weekly' ? 1 : timeframe === 'monthly' ? 3.9 : 13.5;

  const usersWithTimeframe = leaderboardUsers.map(u => ({
    ...u,
    currentXp: Math.round(u.xp * multiplier)
  }));

  const topThree = usersWithTimeframe.slice(0, 3);
  const currentUser = usersWithTimeframe.find(u => u.isCurrentUser) || usersWithTimeframe[7];
  const userAhead = usersWithTimeframe[6]; // rank 7 Noah
  const xpNeeded = userAhead ? (userAhead.currentXp - currentUser.currentXp) : 80;

  return (
    <div className="leaderboard-view-container animate-fade-in">
      {/* Hero Header */}
      <div className="leaderboard-hero glass-card">
        <div className="lb-hero-text">
          <span className="lb-badge-tag">
            {lang === 'uz' ? 'TALABALAR HAMJAMIYATI' : 'SCHOLAR COMMUNITY'}
          </span>
          <h1 className="lb-title">
            {lang === 'uz' ? 'Global SAT Reytingi' : 'Global SAT Leaderboard'}
          </h1>
          <p className="lb-desc">
            {lang === 'uz' 
              ? "Vazifalarni bajarish, kunlik ketma-ketlikni (streak) ushlab turish va sinov testlarida yuqori natija ko'rsatish orqali tajriba (XP) to'plang."
              : "Earn XP by solving homework drills, maintaining daily study streaks, and showing mastery on practice tests."}
          </p>
        </div>

        {/* Timeframe switch */}
        <div className="lb-timeframe-toggle">
          <button 
            className={`time-pill ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            {lang === 'uz' ? 'Haftalik Liga' : 'Weekly League'}
          </button>
          <button 
            className={`time-pill ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('monthly')}
          >
            {lang === 'uz' ? 'Oylik Sprint' : 'Monthly Sprint'}
          </button>
          <button 
            className={`time-pill ${timeframe === 'all-time' ? 'active' : ''}`}
            onClick={() => setTimeframe('all-time')}
          >
            {lang === 'uz' ? 'Butun Davr' : 'All-Time'}
          </button>
        </div>
      </div>

      {/* Prominent Scholar Standing Banner: Answer "How am I performing compared with others?" */}
      <div className="lb-standing-insight-banner glass-card">
        <div className="lb-standing-left">
          <div className="my-rank-badge">
            <span className="my-rank-hash">#8</span>
            <span className="my-rank-name">{student?.name || "Saidakbar"}</span>
            <span className="you-pill">{lang === 'uz' ? 'SIZ' : 'YOU'}</span>
          </div>
          <div className="standing-context-desc">
            <p className="standing-insight-text">
              {lang === 'uz' ? (
                <>
                  Siz platformadagi <strong>eng kuchli 12%</strong> o'quvchilar safidasiz. 7-o'rindagi <strong>Noah ({userAhead.currentXp.toLocaleString()} XP)</strong>dan atigi <strong>+{xpNeeded} XP</strong> orqadasiz!
                </>
              ) : (
                <>
                  You are ranked in the <strong>Top 12%</strong> of active scholars. Only <strong>+{xpNeeded} XP</strong> needed to overtake rank #7 (<strong>Noah, {userAhead.currentXp.toLocaleString()} XP</strong>).
                </>
              )}
            </p>
          </div>
        </div>

        <div className="lb-standing-right">
          <div className="my-standing-xp">
            <span className="standing-xp-val">{currentUser.currentXp.toLocaleString()} XP</span>
            <span className="standing-xp-sub">{timeframe === 'weekly' ? (lang === 'uz' ? 'Ushbu haftada' : 'This week') : timeframe === 'monthly' ? (lang === 'uz' ? 'Ushbu oyda' : 'This month') : (lang === 'uz' ? 'Jami to\'plangan' : 'All time')}</span>
          </div>
          {onStartDrill && (
            <button 
              className="btn-primary-mint advance-rank-btn"
              onClick={() => onStartDrill("Algebra Mastery Drill")}
            >
              <Zap size={15} />
              <span>{lang === 'uz' ? "1 ta mashq bilan o'tish →" : "Advance Rank (+100 XP) →"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Compact Top 3 Podium Showcase (Reduced vertical dominance so table is immediately visible) */}
      <div className="podium-grand-display compact-podium glass-card">
        <div className="podium-pedestal-container">
          {/* #2 Daniel */}
          <div className="grand-podium-slot rank-2-slot">
            <div className="podium-crown-badge silver-badge">2</div>
            <img src={topThree[1].avatar} alt={topThree[1].name} className="grand-avatar" />
            <span className="grand-name">{topThree[1].name}</span>
            <span className="grand-badge-title">{topThree[1].badge}</span>
            <div className="grand-xp-pill">{topThree[1].currentXp.toLocaleString()} XP</div>
            <div className="grand-pedestal pedestal-2">
              <span className="pedestal-rank">2nd</span>
            </div>
          </div>

          {/* #1 Emma (Winner) */}
          <div className="grand-podium-slot rank-1-slot">
            <div className="crown-icon-wrap">
              <Crown size={24} className="gold-crown-icon" />
            </div>
            <div className="podium-crown-badge gold-badge">1</div>
            <img src={topThree[0].avatar} alt={topThree[0].name} className="grand-avatar first-avatar" />
            <span className="grand-name first-name">{topThree[0].name}</span>
            <span className="grand-badge-title">{topThree[0].badge}</span>
            <div className="grand-xp-pill gold-xp-pill">{topThree[0].currentXp.toLocaleString()} XP</div>
            <div className="grand-pedestal pedestal-1">
              <span className="pedestal-rank">1st Place</span>
            </div>
          </div>

          {/* #3 Sarah */}
          <div className="grand-podium-slot rank-3-slot">
            <div className="podium-crown-badge bronze-badge">3</div>
            <img src={topThree[2].avatar} alt={topThree[2].name} className="grand-avatar" />
            <span className="grand-name">{topThree[2].name}</span>
            <span className="grand-badge-title">{topThree[2].badge}</span>
            <div className="grand-xp-pill">{topThree[2].currentXp.toLocaleString()} XP</div>
            <div className="grand-pedestal pedestal-3">
              <span className="pedestal-rank">3rd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="lb-table-container glass-card">
        <div className="lb-table-header">
          <span className="col-rank">{lang === 'uz' ? 'O\'rin' : 'Rank'}</span>
          <span className="col-student">{lang === 'uz' ? 'O\'quvchi' : 'Student'}</span>
          <span className="col-badge">{lang === 'uz' ? 'Daraja / Unvon' : 'Distinction'}</span>
          <span className="col-streak">{lang === 'uz' ? 'Ketma-ketlik' : 'Streak'}</span>
          <span className="col-xp">{lang === 'uz' ? 'Jami Ball' : 'Total Score'}</span>
        </div>

        <div className="lb-table-rows">
          {usersWithTimeframe.map((u) => {
            const isMe = u.isCurrentUser;
            return (
              <div key={u.rank} className={`lb-table-row ${isMe ? 'user-highlight-row' : ''}`}>
                <div className="col-rank">
                  <span className={`rank-number-box ${u.rank <= 3 ? `top-${u.rank}` : ''}`}>
                    #{u.rank}
                  </span>
                </div>

                <div className="col-student">
                  <img src={u.avatar} alt={u.name} className="row-avatar" />
                  <div className="row-student-name-box">
                    <span className="student-name">{u.name}</span>
                    {isMe && <span className="you-pill">{lang === 'uz' ? 'Siz' : 'You'}</span>}
                  </div>
                </div>

                <div className="col-badge">
                  <span className="badge-distinction-tag">{u.badge}</span>
                </div>

                <div className="col-streak">
                  <div className="streak-badge-row">
                    <Flame size={14} className="text-orange" />
                    <span>{u.streak}{lang === 'uz' ? 'k' : 'd'}</span>
                  </div>
                </div>

                <div className="col-xp">
                  <span className="xp-total-bold">{u.currentXp.toLocaleString()} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
