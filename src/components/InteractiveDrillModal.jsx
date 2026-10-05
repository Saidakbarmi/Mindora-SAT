import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Zap, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { interactiveDrillQuestions } from '../data/mockData';

export default function InteractiveDrillModal({ drillTitle, onClose, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const questions = interactiveDrillQuestions;
  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optionId) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishDrill();
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishDrill = () => {
    setIsFinished(true);
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8FE3D0', '#A8F06A', '#48B99B', '#FFFFFF']
      });
    } catch (e) {}

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correctCount++;
    });

    if (onComplete) {
      onComplete({
        correct: correctCount,
        total: questions.length,
        time: seconds,
        earnedXP: correctCount * 25 + 50
      });
    }
  };

  // Calculate results
  const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correct).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="mindora-modal-backdrop">
      <div className="drill-modal-container glass-card animate-fade-in">
        {/* Modal Header */}
        <div className="drill-modal-header">
          <div className="drill-header-left">
            <span className="drill-badge-tag">SAT DIGITAL DRILL</span>
            <h3 className="drill-title">{drillTitle || "Algebra Drill Practice"}</h3>
          </div>
          <div className="drill-header-right">
            <div className="drill-timer-pill">
              <Clock size={15} />
              <span>{formatTime(seconds)}</span>
            </div>
            <button className="drill-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isFinished ? (
          <div className="drill-modal-body">
            {/* Question Progress Tracker */}
            <div className="drill-progress-bar-row">
              <div className="drill-q-counter">
                Question <strong>{currentIndex + 1}</strong> of {questions.length}
              </div>
              <div className="drill-progress-track">
                <div 
                  className="drill-progress-fill"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="drill-q-topic">{currentQ.subject}</span>
            </div>

            {/* Question Box */}
            <div className="question-content-box">
              <p className="question-statement">{currentQ.question}</p>
            </div>

            {/* Multiple Choice Options */}
            <div className="options-grid">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const isSubmitted = showExplanation;
                const isCorrect = opt.id === currentQ.correct;

                let stateClass = '';
                if (isSelected) stateClass = 'selected';
                if (isSubmitted && isCorrect) stateClass = 'correct';
                if (isSubmitted && isSelected && !isCorrect) stateClass = 'incorrect';

                return (
                  <div
                    key={opt.id}
                    className={`option-card ${stateClass}`}
                    onClick={() => handleSelectOption(opt.id)}
                  >
                    <div className="option-letter">{opt.id}</div>
                    <div className="option-text">{opt.text}</div>
                  </div>
                );
              })}
            </div>

            {/* Explanation Drawer if requested */}
            {showExplanation && (
              <div className="drill-explanation-box animate-fade-in">
                <div className="expl-title">
                  <Sparkles size={16} />
                  <span>CollegeBoard Solution & Logic</span>
                </div>
                <p className="expl-text">{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="drill-modal-footer">
              <button 
                className="btn-glass"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <div className="footer-middle-actions">
                <button 
                  className="btn-glass expl-toggle"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <BookOpen size={15} />
                  <span>{showExplanation ? "Hide Explanation" : "Hint & Logic"}</span>
                </button>
              </div>

              <button 
                className="btn-primary-mint"
                onClick={handleNext}
              >
                <span>{currentIndex === questions.length - 1 ? "Submit Homework" : "Next Question"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Finished Result View */
          <div className="drill-results-view animate-fade-in">
            <div className="results-celebration-icon">
              <Sparkles size={40} className="glow-spark" />
            </div>
            <h2 className="results-title">Drill Completed!</h2>
            <p className="results-subtitle">
              Outstanding work, Saidakbar. Your focus and speed were exemplary.
            </p>

            <div className="results-stats-grid">
              <div className="result-stat-box">
                <span className="stat-label">Accuracy Score</span>
                <span className="stat-number accent-num">{scorePercent}%</span>
                <span className="stat-sub">{correctCount} of {questions.length} correct</span>
              </div>
              <div className="result-stat-box">
                <span className="stat-label">Time Spent</span>
                <span className="stat-number">{formatTime(seconds)}</span>
                <span className="stat-sub">Avg 48s / question</span>
              </div>
              <div className="result-stat-box">
                <span className="stat-label">XP Earned</span>
                <span className="stat-number lime-num">+{correctCount * 25 + 50} XP</span>
                <span className="stat-sub">Level 14 Progress</span>
              </div>
            </div>

            <div className="results-action-row">
              <button 
                className="btn-glass"
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentIndex(0);
                  setIsFinished(false);
                  setSeconds(0);
                }}
              >
                <RotateCcw size={16} />
                <span>Review / Retake</span>
              </button>
              <button 
                className="btn-primary-mint"
                onClick={onClose}
              >
                <span>Return to Dashboard</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
