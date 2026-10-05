import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, ArrowRight } from 'lucide-react';
import { ambientEngine } from '../utils/audioSynth';
import { translations } from '../utils/i18n';

export default function StudyEnvironment({ onOpenAll, lang = 'en' }) {
  const t = translations[lang] || translations.en;
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const presets = [
    {
      id: 'forest',
      label: t.forest,
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&auto=format&fit=crop&q=80',
      description: lang === 'uz' ? 'Qarag\'ay shabadasi' : 'Pine breeze & canopy'
    },
    {
      id: 'rain',
      label: t.rain,
      img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=200&auto=format&fit=crop&q=80',
      description: lang === 'uz' ? 'Yengil yomg\'ir' : 'Gentle raindrops'
    },
    {
      id: 'ocean',
      label: t.ocean,
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80',
      description: lang === 'uz' ? 'Tinch ko\'l to\'lqini' : 'Misty shoreline swell'
    },
    {
      id: 'night',
      label: t.night,
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80',
      description: lang === 'uz' ? 'Sokin oqshom sadosi' : 'Calm nocturnal hum'
    }
  ];

  const handleToggle = (id) => {
    if (activeSound === id && isPlaying) {
      ambientEngine.stop();
      setIsPlaying(false);
      setActiveSound(null);
    } else {
      ambientEngine.setVolume(volume);
      ambientEngine.toggle(id);
      setActiveSound(id);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientEngine.setVolume(val);
  };

  useEffect(() => {
    return () => {
      ambientEngine.stop();
    };
  }, []);

  return (
    <div className="study-environment-widget glass-card">
      <div className="widget-header">
        <div className="widget-title-wrap">
          <span className="widget-title">{t.studyEnvironmentTitle}</span>
          <span className="widget-subtitle">{t.binauralAudio}</span>
        </div>
        <button className="widget-view-all" onClick={onOpenAll}>
          <span>{t.viewAll}</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="presets-row">
        {presets.map((preset) => {
          const isActive = activeSound === preset.id && isPlaying;
          return (
            <div
              key={preset.id}
              className={`preset-card ${isActive ? 'active' : ''}`}
              onClick={() => handleToggle(preset.id)}
            >
              <div 
                className="preset-thumb" 
                style={{ backgroundImage: `url(${preset.img})` }}
              >
                <div className="preset-overlay"></div>
                <div className={`preset-play-btn ${isActive ? 'playing' : ''}`}>
                  {isActive ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                </div>
              </div>
              <span className="preset-label">{preset.label}</span>
            </div>
          );
        })}

        {/* Dynamic Sound Wave Indicator */}
        <div className={`soundwave-badge ${isPlaying ? 'wave-active' : ''}`} title={isPlaying ? `Playing ${activeSound}` : "Sound paused"}>
          <div className="wave-bars">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
          </div>
        </div>
      </div>

      {/* Quick volume slider when sound is active */}
      {isPlaying && (
        <div className="audio-volume-bar animate-fade-in">
          <Volume2 size={13} className="volume-icon" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05"
            value={volume} 
            onChange={handleVolumeChange} 
            className="volume-slider"
          />
          <span className="volume-text">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </div>
  );
}
