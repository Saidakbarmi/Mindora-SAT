import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Layers, FileCheck, ArrowRight } from 'lucide-react';

export default function SearchModal({ onClose, onNavigate, lang = 'uz' }) {
  const [query, setQuery] = useState("");

  const searchableItems = [
    { 
      type: 'lesson', 
      title: lang === 'uz' ? 'Kvadratik Funksiyalar va Parabolalar' : 'Quadratic Functions & Parabolas', 
      sub: lang === 'uz' ? 'Matematika • 4-dars' : 'Math • Lesson 4', 
      target: 'video-lesson' 
    },
    { 
      type: 'lesson', 
      title: lang === 'uz' ? "Ko'paytuvchilarga ajratish usullari" : 'Factoring Techniques & Special Products', 
      sub: lang === 'uz' ? 'Matematika • 5-dars' : 'Math • Lesson 5', 
      target: 'learn' 
    },
    { 
      type: 'homework', 
      title: lang === 'uz' ? 'Algebra mashqi (12 ta savol)' : 'Algebra Drill Practice (12 questions)', 
      sub: lang === 'uz' ? 'Bugun muddat • Matematika' : 'Due Today • Mathematics', 
      target: 'homework' 
    },
    { 
      type: 'homework', 
      title: lang === 'uz' ? "O'qish mashqi va Tarixiy matnlar" : 'Reading Practice & Historical Passages', 
      sub: lang === 'uz' ? 'Ertaga muddat • Reading' : 'Due Tomorrow • Reading', 
      target: 'homework' 
    },
    { 
      type: 'practice', 
      title: 'MINDORA SAT Practice Test #4', 
      sub: lang === 'uz' ? "Moslashuvchan 98 savol • To'liq imtihon" : 'Adaptive 98 Questions • Full Test', 
      target: 'practice' 
    },
    { 
      type: 'flashcard', 
      title: lang === 'uz' ? 'Kvadratik tenglama cho\'qqi formasi' : 'Vertex Form of Quadratic Equations', 
      sub: lang === 'uz' ? 'Fleshkarta #1 • Muhim mavzu' : 'Flashcard #1 • High Frequency', 
      target: 'flashcards' 
    },
    { 
      type: 'vocab', 
      title: lang === 'uz' ? 'Pragmatic & Lucid Lug\'at tahlili' : 'Pragmatic & Lucid Contextual Vocabulary', 
      sub: lang === 'uz' ? 'MINDORA Lug\'at banki' : 'SAT Vocabulary Bank', 
      target: 'vocabulary' 
    },
  ];

  const filtered = query.trim() === "" 
    ? searchableItems.slice(0, 5) 
    : searchableItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="mindora-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container glass-card animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="search-modal-input-row">
          <Search size={20} className="search-modal-icon" />
          <input 
            type="text"
            placeholder={lang === 'uz' ? "Darslar, formulalar, testlar yoki lug'atni qidirish..." : "Search lessons, formulas, tests, or vocabulary..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="search-modal-input"
          />
          <button className="search-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-results-list">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div 
                key={idx}
                className="search-result-item"
                onClick={() => {
                  onNavigate(item.target);
                  onClose();
                }}
              >
                <div className="result-icon-tag">
                  {item.type === 'lesson' && <BookOpen size={16} />}
                  {item.type === 'homework' && <FileCheck size={16} />}
                  {item.type === 'flashcard' && <Layers size={16} />}
                  {item.type === 'vocab' && <BookOpen size={16} />}
                  {item.type === 'practice' && <Search size={16} />}
                </div>
                <div className="result-text-body">
                  <span className="result-title">{item.title}</span>
                  <span className="result-sub">{item.sub}</span>
                </div>
                <ArrowRight size={14} className="result-arrow" />
              </div>
            ))
          ) : (
            <div className="search-empty-state">
              <p>
                {lang === 'uz' 
                  ? `"${query}" bo'yicha hech narsa topilmadi. "Algebra", "Kvadratik" yoki "Fleshkarta" so'zlarini sinab ko'ring.` 
                  : `No results found for "${query}". Try "Algebra", "Quadratic" or "Flashcards".`}
              </p>
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <span>{lang === 'uz' ? "Bosish orqali o'tish • Chiqish uchun ESC" : "Navigate with click • ESC to exit"}</span>
        </div>
      </div>
    </div>
  );
}
