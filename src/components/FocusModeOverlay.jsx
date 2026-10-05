import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, Wind } from 'lucide-react';
import { ambientEngine } from '../utils/audioSynth';

export default function FocusModeOverlay({ onClose }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins pomodoro
  const [isRunning, setIsRunning] = useState(true);
  const [breathText, setBreathText] = useState("Inhale calm...");
  const [soundMode, setSoundMode] = useState("forest");

  useEffect(() => {
    ambientEngine.toggle('forest');
    return () => {
      ambientEngine.stop();
    };
  }, []);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Breathing cycle
  useEffect(() => {
    const breathCycles = [
      { text: "Breathe in deeply...", delay: 4000 },
      { text: "Hold gently...", delay: 4000 },
      { text: "Exhale stress slowly...", delay: 4000 }
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % breathCycles.length;
      setBreathText(breathCycles[step].text);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatMins = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSoundChange = (mode) => {
    setSoundMode(mode);
    ambientEngine.toggle(mode);
  };

  return (
    <div className="focus-mode-fullscreen animate-fade-in">
      {/* Background ambient visuals */}
      <div className="focus-backdrop-trees"></div>

      {/* Top bar */}
      <div className="focus-top-bar">
        <div className="focus-brand-pill">
          <Sparkles size={16} className="text-mint" />
          <span>MINDORA ZEN FOCUS ROOM</span>
        </div>
        <button className="focus-exit-btn" onClick={onClose}>
          <X size={20} />
          <span>Exit Focus Mode</span>
        </button>
      </div>

      {/* Center Focus Core */}
      <div className="focus-center-content">
        {/* Breathing Orb */}
        <div className="breathing-orb-container">
          <div className="breathing-orb-ring ring-3"></div>
          <div className="breathing-orb-ring ring-2"></div>
          <div className="breathing-orb-core">
            <span className="breathing-timer">{formatMins(timeLeft)}</span>
            <span className="breathing-phase-text">{breathText}</span>
          </div>
        </div>

        {/* Motivational Microcopy */}
        <p className="focus-quote">"A calm mind retains 3× more context. Focus on one problem at a time."</p>

        {/* Controls */}
        <div className="focus-controls-row">
          <button 
            className="focus-btn-round"
            onClick={() => setTimeLeft(25 * 60)}
            title="Reset to 25m"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            className="focus-btn-main"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
          </button>
        </div>

        {/* Quick sound switcher */}
        <div className="focus-sound-toggles">
          {['forest', 'rain', 'ocean', 'night'].map(s => (
            <button
              key={s}
              className={`sound-chip ${soundMode === s ? 'active' : ''}`}
              onClick={() => handleSoundChange(s)}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
