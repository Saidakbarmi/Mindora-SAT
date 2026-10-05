import React from 'react';
import { 
  Award, 
  Flame, 
  CheckCircle, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Sun, 
  Moon, 
  Lock,
  Sparkles
} from 'lucide-react';
import { achievementsList } from '../data/mockData';

export default function AchievementsView({ student, lang = 'uz' }) {
  const iconMap = {
    flame: Flame,
    'check-circle': CheckCircle,
    award: Award,
    'book-open': BookOpen,
    'trending-up': TrendingUp,
    zap: Zap,
    sun: Sun,
    moon: Moon,
  };

  const unlockedCount = achievementsList.filter(a => a.unlocked).length;

  return (
    <div className="achievements-view-container animate-fade-in">
      {/* Hero Bar */}
      <div className="achievements-hero glass-card">
        <div className="ach-hero-info">
          <span className="ach-badge-tag">
            {lang === 'uz' ? 'TALABA YUTUQLARI VA UNVONLARI' : 'SCHOLAR HONORS & BADGES'}
          </span>
          <h1 className="ach-view-title">
            {lang === 'uz' ? 'Akademik SAT Yutuqlari' : 'Collectible SAT Achievements'}
          </h1>
          <p className="ach-view-desc">
            {lang === 'uz' 
              ? "Ketma-ketlik, sinov testlaridagi o'sish, diagnostika tezligi va tizimli mashqlar uchun beriladigan maxsus yutuqlar."
              : "Milestones celebrating your consistency, score breakthroughs, diagnostic speed, and deliberate practice."}
          </p>
        </div>

        <div className="ach-progress-trophy">
          <Award size={36} className="trophy-gold" />
          <div className="trophy-text">
            <span className="trophy-count">{unlockedCount} / {achievementsList.length}</span>
            <span className="trophy-sub">{lang === 'uz' ? 'Yutuqlar ochildi' : 'Badges Unlocked'}</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="badges-collection-grid">
        {achievementsList.map((ach) => {
          const Icon = iconMap[ach.icon] || Award;
          const isUnlocked = ach.unlocked;
          const pct = Math.min(100, Math.round((ach.progress / ach.max) * 100));

          return (
            <div 
              key={ach.id} 
              className={`achievement-card glass-card ${isUnlocked ? 'unlocked-card' : 'locked-card'}`}
            >
              <div className="ach-card-top">
                <div 
                  className="ach-icon-circle"
                  style={{ 
                    backgroundColor: isUnlocked ? `${ach.color}25` : 'rgba(255,255,255,0.06)',
                    color: isUnlocked ? ach.color : 'rgba(255,255,255,0.3)'
                  }}
                >
                  <Icon size={24} />
                </div>
                <span className={`ach-tier-badge ${isUnlocked ? 'tier-achieved' : 'tier-locked'}`}>
                  {isUnlocked ? ach.tier : <><Lock size={11} /> {ach.tier}</>}
                </span>
              </div>

              <h3 className="ach-card-title">{ach.title}</h3>
              <p className="ach-card-desc">{ach.description}</p>

              {/* Progress Bar */}
              <div className="ach-card-progress-wrap">
                <div className="ach-track">
                  <div 
                    className="ach-fill" 
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: ach.color
                    }}
                  ></div>
                </div>
                <div className="ach-labels-row">
                  <span>{pct}% {lang === 'uz' ? 'Bajarildi' : 'Completed'}</span>
                  <span>{ach.progress} / {ach.max}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
