import React, { useState } from 'react';
import { Target, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { translations } from '../utils/i18n';

export default function ScoreTrajectoryChart({ 
  data, 
  currentScore = 1320, 
  targetScore = 1450, 
  improvement = 140, 
  lang = 'uz' 
}) {
  const t = translations[lang] || translations.en;
  const isUz = lang === 'uz';

  const defaultData = [
    { month: isUz ? "Mart" : "Mar", score: 1180, label: isUz ? "Diagnostika" : "Baseline", actual: true },
    { month: isUz ? "Aprel" : "Apr", score: 1210, label: "+30 pts", actual: true },
    { month: isUz ? "May" : "May", score: 1260, label: "+50 pts", actual: true },
    { month: isUz ? "Iyun" : "Jun", score: 1320, label: isUz ? "Hozirgi ball" : "Current score", actual: true, current: true },
    { month: isUz ? "Iyul" : "Jul", score: 1380, label: isUz ? "Kutilayotgan" : "Projected", projected: true },
    { month: isUz ? "Avgust" : "Aug", score: 1450, label: isUz ? "Yakuniy maqsad" : "Target goal", target: true },
  ];

  const chartData = (data && data.length >= 4) ? data.map((d, i) => ({
    ...d,
    actual: i <= 3,
    current: d.score === currentScore || i === 3,
    projected: i === 4,
    target: d.score === targetScore || i === 5,
    month: isUz 
      ? (d.month === "Mar" ? "Mart" : d.month === "Apr" ? "Aprel" : d.month === "May" ? "May" : d.month === "Jun" ? "Iyun" : d.month === "Jul" ? "Iyul" : d.month === "Aug" ? "Avgust" : d.month)
      : d.month
  })) : defaultData;

  const [selectedPoint, setSelectedPoint] = useState(chartData[3]); // Jun (current)

  // Chart dimensions — 800x280 gives an optimal, professional wide aspect-ratio that never stretches
  const width = 800;
  const height = 280;
  const paddingLeft = 60;
  const paddingRight = 50;
  const paddingTop = 42;
  const paddingBottom = 44;

  const minScore = 1100;
  const maxScore = 1520;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft - paddingRight;

  const points = chartData.map((item, index) => {
    const x = paddingLeft + (index / (chartData.length - 1)) * chartWidth;
    const y = height - paddingBottom - ((item.score - minScore) / (maxScore - minScore)) * chartHeight;
    return { ...item, x, y };
  });

  const actualPoints = points.slice(0, 4);   // Mar, Apr, May, Jun
  const projectedPoints = points.slice(3);  // Jun, Jul, Aug

  const createSmoothPath = (pts) => {
    if (pts.length < 2) return "";
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const midX = (p0.x + p1.x) / 2;
      path += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const actualLinePath = createSmoothPath(actualPoints);
  const projectedLinePath = createSmoothPath(projectedPoints);

  const actualAreaPath = actualPoints.length > 1
    ? `${actualLinePath} L ${actualPoints[actualPoints.length - 1].x} ${height - paddingBottom} L ${actualPoints[0].x} ${height - paddingBottom} Z`
    : "";

  const targetY = height - paddingBottom - ((targetScore - minScore) / (maxScore - minScore)) * chartHeight;

  return (
    <div className="score-trajectory-card glass-card">
      {/* Trajectory Header */}
      <div className="trajectory-header">
        <div className="trajectory-title-group">
          <div className="trajectory-badge-tag">
            <TrendingUp size={14} className="text-mint" />
            <span>{isUz ? "BALL TRAYEKTORIYASI VA PROGNOZ" : "SCORE TRAJECTORY & PROJECTION"}</span>
          </div>
          <div className="trajectory-gain-row">
            <span className="gain-number">+{improvement}</span>
            <span className="gain-desc">
              {isUz ? "ball — diagnostikadan beri umumiy o‘sish" : "pts — total improvement since baseline"}
            </span>
          </div>
        </div>

        {/* Legend pills */}
        <div className="trajectory-legend-cluster">
          <div className="trajectory-legend-pill actual-legend">
            <span className="legend-indicator solid-dot"></span>
            <span>{isUz ? "Haqiqiy natija (1180 → 1320)" : "Actual Score"}</span>
          </div>
          <div className="trajectory-legend-pill projected-legend">
            <span className="legend-indicator dashed-dot"></span>
            <span>{isUz ? "Prognoz (1320 → 1450)" : "Projected Path"}</span>
          </div>
          <div className="trajectory-legend-pill target-legend">
            <Target size={12} className="text-lime" />
            <span>{isUz ? `Maqsad: ${targetScore}` : `Target: ${targetScore}`}</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Display with strict aspect preservation */}
      <div className="trajectory-chart-container">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="trajectory-svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Score Trajectory Chart"
        >
          <defs>
            {/* Actual score area gradient fill */}
            <linearGradient id="actualScoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8FE3D0" stopOpacity="0.28" />
              <stop offset="65%" stopColor="#2F7F78" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0B252C" stopOpacity="0.0" />
            </linearGradient>

            {/* Main curve vibrant stroke gradient */}
            <linearGradient id="scoreLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2F7F78" />
              <stop offset="45%" stopColor="#8FE3D0" />
              <stop offset="100%" stopColor="#A8F06A" />
            </linearGradient>

            {/* Projected line gradient */}
            <linearGradient id="projectedLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A8F06A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
            </linearGradient>

            {/* Soft glow filter */}
            <filter id="trajectoryGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {[1150, 1250, 1350, 1450].map((level) => {
            const y = height - paddingBottom - ((level - minScore) / (maxScore - minScore)) * chartHeight;
            const isTargetLevel = level === 1450;
            return (
              <g key={level} className="chart-grid-line">
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={width - paddingRight} 
                  y2={y} 
                  stroke={isTargetLevel ? "rgba(168, 240, 106, 0.35)" : "rgba(255,255,255,0.06)"} 
                  strokeDasharray={isTargetLevel ? "5 4" : "3 4"} 
                  strokeWidth={isTargetLevel ? "1.5" : "1"}
                />
                <text 
                  x={paddingLeft - 10} 
                  y={y + 3.5} 
                  fill={isTargetLevel ? "#A8F06A" : "rgba(185, 215, 210, 0.45)"} 
                  fontSize="11" 
                  fontWeight={isTargetLevel ? "700" : "500"}
                  textAnchor="end"
                  fontFamily="inherit"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Target Score Horizontal Reference Badge on Right */}
          <g className="target-horizontal-ref">
            <rect 
              x={width - paddingRight - 88} 
              y={targetY - 11} 
              width="92" 
              height="20" 
              rx="10" 
              fill="rgba(11, 37, 44, 0.88)" 
              stroke="rgba(168, 240, 106, 0.45)" 
              strokeWidth="1"
            />
            <text 
              x={width - paddingRight - 42} 
              y={targetY + 3.5} 
              textAnchor="middle" 
              fill="#A8F06A" 
              fontSize="10" 
              fontWeight="700"
              letterSpacing="0.04em"
            >
              {isUz ? "MAQSAD 1450" : "TARGET 1450"}
            </text>
          </g>

          {/* Area fill under actual curve */}
          {actualAreaPath && (
            <path d={actualAreaPath} fill="url(#actualScoreAreaGradient)" />
          )}

          {/* Actual Score Solid Line */}
          {actualLinePath && (
            <path 
              d={actualLinePath} 
              fill="none" 
              stroke="url(#scoreLineGradient)" 
              strokeWidth="3.6" 
              strokeLinecap="round"
              filter="url(#trajectoryGlow)"
            />
          )}

          {/* Projected Score Dashed Line */}
          {projectedLinePath && (
            <path 
              d={projectedLinePath} 
              fill="none" 
              stroke="url(#projectedLineGradient)" 
              strokeWidth="3" 
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((pt, idx) => {
            const isCurrent = pt.score === currentScore || idx === 3;
            const isTarget = pt.score === targetScore || idx === 5;
            const isBaseline = idx === 0;
            const isSelected = selectedPoint && selectedPoint.month === pt.month;

            return (
              <g 
                key={idx} 
                className="chart-point-group"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPoint(pt)}
                onMouseEnter={() => setSelectedPoint(pt)}
              >
                {/* Current Score Beacon Pulse */}
                {isCurrent && (
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="14" 
                    fill="rgba(168, 240, 106, 0.22)"
                    className="pulse-circle" 
                  />
                )}

                {/* Selected point halo */}
                {isSelected && !isCurrent && (
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="13" 
                    fill="rgba(143, 227, 208, 0.2)"
                    stroke="rgba(143, 227, 208, 0.4)"
                    strokeWidth="1"
                  />
                )}

                {/* Base Node */}
                {isTarget ? (
                  // Target Milestone Bullseye
                  <g>
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="10" 
                      fill="rgba(255, 255, 255, 0.12)" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.5" 
                      strokeDasharray="3 3"
                    />
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="6" 
                      fill="#FFFFFF" 
                      stroke="#06191E" 
                      strokeWidth="2" 
                    />
                  </g>
                ) : (
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={isCurrent ? 6.5 : (isBaseline ? 5.5 : 4.5)} 
                    fill={isCurrent ? "#A8F06A" : (pt.projected ? "#0B252C" : "#8FE3D0")}
                    stroke={pt.projected ? "#8FE3D0" : "#06191E"}
                    strokeWidth={isCurrent ? 3 : 2}
                  />
                )}

                {/* Callout Pill for Current Score (1320) */}
                {isCurrent && (
                  <g className="point-badge-current">
                    <rect 
                      x={pt.x - 48} 
                      y={pt.y - 34} 
                      width="96" 
                      height="23" 
                      rx="11.5" 
                      fill="rgba(11, 37, 44, 0.95)" 
                      stroke="#A8F06A" 
                      strokeWidth="1.2" 
                      filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
                    />
                    <text 
                      x={pt.x} 
                      y={pt.y - 19} 
                      textAnchor="middle" 
                      fill="#A8F06A" 
                      fontSize="11" 
                      fontWeight="800"
                    >
                      {pt.score} • {isUz ? "Hozirgi" : "Current"}
                    </text>
                  </g>
                )}

                {/* Callout Pill for Target Score (1450) */}
                {isTarget && (
                  <g className="point-badge-target">
                    <rect 
                      x={pt.x - 50} 
                      y={pt.y - 34} 
                      width="100" 
                      height="23" 
                      rx="11.5" 
                      fill="rgba(11, 37, 44, 0.95)" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.2" 
                      filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
                    />
                    <text 
                      x={pt.x} 
                      y={pt.y - 19} 
                      textAnchor="middle" 
                      fill="#FFFFFF" 
                      fontSize="11" 
                      fontWeight="800"
                    >
                      {pt.score} • {isUz ? "Maqsad" : "Goal"}
                    </text>
                  </g>
                )}

                {/* Intermediate Score Labels for non-current/non-target */}
                {!isCurrent && !isTarget && (
                  <text 
                    x={pt.x} 
                    y={pt.y - 11} 
                    textAnchor="middle" 
                    fill={isSelected ? "#8FE3D0" : "rgba(220, 240, 237, 0.75)"} 
                    fontSize="11" 
                    fontWeight={isSelected ? "700" : "500"}
                  >
                    {pt.score}
                  </text>
                )}

                {/* Month Labels at bottom */}
                <text 
                  x={pt.x} 
                  y={height - 12} 
                  textAnchor="middle" 
                  fill={isCurrent ? "#A8F06A" : (isTarget ? "#FFFFFF" : (isSelected ? "#8FE3D0" : "rgba(185, 215, 210, 0.6)"))} 
                  fontSize="12"
                  fontWeight={isCurrent || isTarget || isSelected ? "700" : "500"}
                  fontFamily="inherit"
                >
                  {pt.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip & Context Footer */}
      {selectedPoint && (
        <div className="trajectory-footer-meta">
          <div className="footer-meta-pill">
            <span className="meta-dot"></span>
            <span>
              <strong>{selectedPoint.month}:</strong> {selectedPoint.score} ball 
              {selectedPoint.label ? ` • ${selectedPoint.label}` : ''}
            </span>
          </div>

          <div className="footer-meta-pace">
            <Sparkles size={12} className="text-mint" />
            <span>
              {selectedPoint.target 
                ? (isUz ? "Yakuniy 1450 maqsadiga 130 ball qoldi" : "130 pts remaining to 1450 goal")
                : (isUz ? "O‘sish sur’ati reja bo‘yicha ketmoqda (Haftalik +15 ball)" : "Pacing on track (+15 pts weekly momentum)")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
