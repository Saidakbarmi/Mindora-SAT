import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  RotateCw, 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  Check, 
  Plus, 
  Search,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Trash2,
  BookMarked,
  Filter,
  X
} from 'lucide-react';
import { flashcardsData, vocabularyWords } from '../data/mockData';

export default function StudyToolsView({ activeTool = 'flashcards', onStartDrill, lang = 'uz' }) {
  const [currentTool, setCurrentTool] = useState(activeTool);

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardCategory, setFlashcardCategory] = useState('all');

  // Vocab state
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState('all');

  // Notebook state
  const [notesSubTab, setNotesSubTab] = useState('notes'); // 'notes' | 'cheatsheets'
  const [notesList, setNotesList] = useState(() => {
    try {
      const saved = localStorage.getItem('mindora_user_notes');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      { id: 1, title: "Quadratic Vertex Form", date: "Oct 5, 2026", content: "y = a(x - h)² + k. (h, k) is vertex. If a is positive, opens up." },
      { id: 2, title: "Circle Formula SAT Trap", date: "Oct 3, 2026", content: "Remember to complete the square if given in general form x² + y² + Dx + Ey + F = 0. Right side is r², don't forget to take square root!" },
      { id: 3, title: "Rhetorical Synthesis Strategy", date: "Oct 1, 2026", content: "Always read the student's stated goal first before reading bullet points!" }
    ];
  });
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  // Mistakes Bank state
  const [mistakesFilter, setMistakesFilter] = useState('all'); // 'all' | 'needs-review' | 'resolved'
  const [mistakesSubject, setMistakesSubject] = useState('all'); // 'all' | 'math' | 'reading'
  const [reviewingMistake, setReviewingMistake] = useState(null);

  const [mistakesList, setMistakesList] = useState(() => {
    try {
      const saved = localStorage.getItem('mindora_mistakes_bank');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      {
        id: 24,
        topic: "Quadratic Equation",
        subject: "Math",
        subjectTag: "Advanced Math",
        status: "needs-review",
        question: "For the equation 2x² + 5x - 3 = 0, what are the values of x?",
        userAnswer: "B",
        userAnswerText: "x = 3, x = -1/2",
        correctAnswer: "D",
        correctAnswerText: "x = -3, x = 1/2",
        whyMissed: "Sign error while expanding brackets: factored as (2x - 1)(x - 3) instead of (2x - 1)(x + 3).",
        conceptReview: "When factoring ax² + bx + c with negative constant c, the signs inside the binomials must differ. Double-check by FOIL expansion: (2x - 1)(x + 3) = 2x² + 6x - x - 3 = 2x² + 5x - 3."
      },
      {
        id: 23,
        topic: "Circle Standard Form",
        subject: "Math",
        subjectTag: "Geometry",
        status: "resolved",
        question: "In the xy-plane, the graph of (x - 4)² + (y + 1)² = 16 is a circle. What is the radius?",
        userAnswer: "C",
        userAnswerText: "16",
        correctAnswer: "A",
        correctAnswerText: "4",
        whyMissed: "Forgot that the equation format is (x-h)² + (y-k)² = r², so the right side is r squared, not r directly.",
        conceptReview: "Standard circle form is (x - h)² + (y - k)² = r². Here r² = 16, so the radius r = √16 = 4. Center is (4, -1)."
      },
      {
        id: 22,
        topic: "Rhetorical Synthesis",
        subject: "Reading",
        subjectTag: "Reading & Writing",
        status: "needs-review",
        question: "The student wants to emphasize a difference between the two archaeological methods. Which choice most effectively uses relevant information?",
        userAnswer: "A",
        userAnswerText: "Radiocarbon dating and dendrochronology were both used in the 20th century excavation.",
        correctAnswer: "C",
        correctAnswerText: "While radiocarbon dating measures isotopic decay in organic remains, dendrochronology relies on tree-ring growth patterns.",
        whyMissed: "Read all bullet points first before reading the prompt's explicit requirement. Option A provided background, not the requested contrast.",
        conceptReview: "SAT Rhetorical Synthesis questions test whether you fulfill the specific prompt goal. Always isolate the prompt condition ('emphasize a difference') and eliminate choices that merely list facts without contrasting."
      },
      {
        id: 21,
        topic: "Dangling Modifiers",
        subject: "Writing",
        subjectTag: "Reading & Writing",
        status: "resolved",
        question: "Having arrived late to the auditorium, the final lecture on astrophysics had already ended.",
        userAnswer: "B",
        userAnswerText: "NO CHANGE (the final lecture on astrophysics had already ended)",
        correctAnswer: "D",
        correctAnswerText: "Michael found that the final lecture on astrophysics had already ended.",
        whyMissed: "The modifying participle phrase 'Having arrived late...' must immediately precede the person who arrived, not the lecture.",
        conceptReview: "Introductory modifier rule: The noun immediately following the comma must be the logical subject performing the introductory action. A lecture cannot 'arrive late'."
      }
    ];
  });

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mindora_user_notes', JSON.stringify(notesList));
    } catch(e) {}
  }, [notesList]);

  // Save mistakes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mindora_mistakes_bank', JSON.stringify(mistakesList));
    } catch(e) {}
  }, [mistakesList]);

  // Flashcards filter
  const filteredFlashcards = flashcardCategory === 'all' 
    ? flashcardsData 
    : flashcardsData.filter(c => c.category.toLowerCase().includes(flashcardCategory.toLowerCase()));

  const card = filteredFlashcards[activeCardIndex] || filteredFlashcards[0] || flashcardsData[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setActiveCardIndex(prev => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setActiveCardIndex(prev => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };

  // Vocab filter
  const filteredVocab = vocabularyWords.filter(v => {
    const matchesQuery = v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                         v.def.toLowerCase().includes(vocabSearch.toLowerCase());
    return matchesQuery;
  });

  // Notes actions
  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      date: lang === 'uz' ? "5-Oktabr, 2026" : "Oct 5, 2026",
      content: newNoteContent
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNote(false);
  };

  const handleDeleteNote = (id) => {
    setNotesList(notesList.filter(n => n.id !== id));
  };

  // Mistakes actions
  const handleToggleMistakeStatus = (id) => {
    setMistakesList(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: m.status === 'resolved' ? 'needs-review' : 'resolved'
        };
      }
      return m;
    }));
  };

  const filteredMistakes = mistakesList.filter(m => {
    const matchesStatus = mistakesFilter === 'all' || m.status === mistakesFilter;
    const matchesSubject = mistakesSubject === 'all' || m.subject.toLowerCase() === mistakesSubject.toLowerCase();
    return matchesStatus && matchesSubject;
  });

  const needsReviewCount = mistakesList.filter(m => m.status === 'needs-review').length;

  return (
    <div className="study-tools-view-container animate-fade-in">
      {/* Top Selector Bar */}
      <div className="tools-top-selector glass-card">
        <div className="selector-tabs">
          <button 
            className={`tool-selector-tab ${currentTool === 'flashcards' ? 'active' : ''}`}
            onClick={() => setCurrentTool('flashcards')}
          >
            <Layers size={16} />
            <span>{lang === 'uz' ? 'Fleshkartalar' : 'Interactive Flashcards'}</span>
          </button>
          <button 
            className={`tool-selector-tab ${currentTool === 'vocabulary' ? 'active' : ''}`}
            onClick={() => setCurrentTool('vocabulary')}
          >
            <BookOpen size={16} />
            <span>{lang === 'uz' ? "SAT Lug'at Banki" : 'SAT Vocabulary Bank'}</span>
          </button>
          <button 
            className={`tool-selector-tab ${currentTool === 'notes' ? 'active' : ''}`}
            onClick={() => setCurrentTool('notes')}
          >
            <FileText size={16} />
            <span>{lang === 'uz' ? 'Daftar & Formulalar' : 'Notebook & Cheatsheets'}</span>
          </button>
          <button 
            className={`tool-selector-tab ${currentTool === 'mistakes' ? 'active' : ''}`}
            onClick={() => setCurrentTool('mistakes')}
          >
            <AlertTriangle size={16} />
            <span>{lang === 'uz' ? 'Xatolar Banki' : 'Mistakes Bank'}</span>
            {needsReviewCount > 0 && (
              <span className="mistakes-count-badge">{needsReviewCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          TOOL 1: FLASHCARDS
          ========================================================================= */}
      {currentTool === 'flashcards' && (
        <div className="flashcards-tool-pane animate-fade-in">
          {/* Category Filter Pills */}
          <div className="tool-category-pills">
            {['all', 'math', 'reading'].map(cat => (
              <button 
                key={cat}
                className={`category-pill ${flashcardCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setFlashcardCategory(cat);
                  setActiveCardIndex(0);
                  setIsFlipped(false);
                }}
              >
                {cat === 'all' ? (lang === 'uz' ? 'Barcha Mavzular' : 'All Topics') : cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flashcard-counter-row">
            <span className="card-counter">
              {lang === 'uz' ? 'Karta' : 'Card'} <strong>{activeCardIndex + 1}</strong> / {filteredFlashcards.length}
            </span>
            <span className="card-category-pill">{card?.category}</span>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            className={`flip-card-viewport ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flip-card-inner">
              {/* Front side */}
              <div className="flip-card-front glass-card">
                <span className="card-side-tag">
                  {lang === 'uz' ? 'SAVOL • JAVOBNI KO\'RISH UCHUN BOSING' : 'QUESTION • TAP TO FLIP'}
                </span>
                <span className="card-topic-tag">{card?.topic}</span>
                <p className="card-prompt-text">{card?.front}</p>
                <div className="card-flip-prompt">
                  <RotateCw size={15} />
                  <span>{lang === 'uz' ? "Javobni ochish uchun bosing" : "Click to reveal answer"}</span>
                </div>
              </div>

              {/* Back side */}
              <div className="flip-card-back glass-card">
                <span className="card-side-tag answer-tag">
                  {lang === 'uz' ? 'JAVOB VA QOIDA' : 'ANSWER & LOGIC'}
                </span>
                <p className="card-answer-text">{card?.back}</p>
                <div className="card-flip-prompt">
                  <RotateCw size={15} />
                  <span>{lang === 'uz' ? "Savolga qaytish" : "Click to flip back"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="card-actions-row">
            <button className="btn-glass" onClick={handlePrevCard}>
              {lang === 'uz' ? 'Oldingi' : 'Previous'}
            </button>
            <button className="btn-glass" onClick={() => setIsFlipped(!isFlipped)}>
              <RotateCw size={15} /> {lang === 'uz' ? 'Aylantirish' : 'Flip Card'}
            </button>
            <button className="btn-primary-mint" onClick={handleNextCard}>
              {lang === 'uz' ? 'Tushundim / Keyingi →' : 'Got It / Next →'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOOL 2: VOCABULARY
          ========================================================================= */}
      {currentTool === 'vocabulary' && (
        <div className="vocab-tool-pane animate-fade-in">
          <div className="vocab-search-row glass-card">
            <Search size={16} className="text-mint" />
            <input 
              type="text" 
              placeholder={lang === 'uz' ? "Muhim SAT so'zlarini qidirish..." : "Search high-yield SAT vocabulary..."}
              value={vocabSearch}
              onChange={(e) => setVocabSearch(e.target.value)}
              className="vocab-search-input"
            />
            {vocabSearch && (
              <button className="clear-search-btn" onClick={() => setVocabSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {filteredVocab.length > 0 ? (
            <div className="vocab-words-grid">
              {filteredVocab.map((w, idx) => (
                <div key={idx} className="vocab-word-card glass-card">
                  <div className="word-head-line">
                    <h3 className="word-title">{w.word}</h3>
                    <span className="word-pos">{w.pos}</span>
                  </div>
                  <p className="word-definition">{w.def}</p>
                  <div className="word-example-box">
                    <strong>SAT Context:</strong> "{w.ex}"
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-card glass-card">
              <Sparkles size={32} className="text-mint" />
              <h3>{lang === 'uz' ? "Lug'at topilmadi" : "No vocabulary words found"}</h3>
              <p>
                {lang === 'uz' 
                  ? `"${vocabSearch}" so'zi bo'yicha natija yo'q. "Pragmatic" yoki "Ambivalent" so'zlarini sinab ko'ring.`
                  : `No results matching "${vocabSearch}". Try searching for words like "pragmatic" or "ambivalent".`}
              </p>
              <button className="btn-primary-mint" onClick={() => setVocabSearch('')}>
                {lang === 'uz' ? "Qidiruvni tozalash" : "Clear Search"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TOOL 3: NOTES & CHEATSHEETS
          ========================================================================= */}
      {currentTool === 'notes' && (
        <div className="notes-tool-pane animate-fade-in">
          <div className="notes-subnav-row">
            <div className="notes-subnav-toggle">
              <button 
                className={`subnav-pill ${notesSubTab === 'notes' ? 'active' : ''}`}
                onClick={() => setNotesSubTab('notes')}
              >
                {lang === 'uz' ? 'Mening Qaydlarim' : 'My Notebook'}
              </button>
              <button 
                className={`subnav-pill ${notesSubTab === 'cheatsheets' ? 'active' : ''}`}
                onClick={() => setNotesSubTab('cheatsheets')}
              >
                {lang === 'uz' ? 'Asosiy SAT Formulalari' : 'Essential Formula Cheatsheet'}
              </button>
            </div>

            {notesSubTab === 'notes' && (
              <button 
                className="btn-primary-mint"
                onClick={() => setShowAddNote(!showAddNote)}
              >
                <Plus size={16} />
                <span>{showAddNote ? (lang === 'uz' ? "Bekor qilish" : "Cancel") : (lang === 'uz' ? "Yangi Qayd" : "Add Note")}</span>
              </button>
            )}
          </div>

          {notesSubTab === 'notes' ? (
            <>
              {showAddNote && (
                <form onSubmit={handleCreateNote} className="add-note-form glass-card animate-fade-in">
                  <input 
                    type="text" 
                    placeholder={lang === 'uz' ? "Qayd sarlavhasi (masalan: Parabola simmetriya o'qi)..." : "Note title (e.g. Parabola Axis Formula)..."}
                    value={newNoteTitle}
                    onChange={e => setNewNoteTitle(e.target.value)}
                    className="note-input-title"
                    required
                  />
                  <textarea 
                    placeholder={lang === 'uz' ? "Formulalar, eslatmalar va strategiyalar..." : "Note details, derivations, reminders..."}
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    className="note-input-body"
                    rows={4}
                    required
                  />
                  <div className="form-submit-row">
                    <button type="submit" className="btn-primary-mint">
                      {lang === 'uz' ? "Qaydni Saqlash" : "Save Note"}
                    </button>
                  </div>
                </form>
              )}

              {notesList.length > 0 ? (
                <div className="notes-list-grid">
                  {notesList.map((n) => (
                    <div key={n.id} className="note-item-card glass-card">
                      <div className="note-card-top">
                        <h3 className="note-item-title">{n.title}</h3>
                        <div className="note-card-meta">
                          <span className="note-item-date">{n.date}</span>
                          <button 
                            className="delete-note-btn"
                            onClick={() => handleDeleteNote(n.id)}
                            title="Delete note"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <p className="note-item-content">{n.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card glass-card">
                  <FileText size={32} className="text-mint" />
                  <h3>{lang === 'uz' ? "Qaydlar mavjud emas" : "No notes yet"}</h3>
                  <p>{lang === 'uz' ? "Muhim formula va qoidalarni shu yerga yozib boring." : "Record your custom derivations, formulas and exam reminders here."}</p>
                  <button className="btn-primary-mint" onClick={() => setShowAddNote(true)}>
                    <Plus size={15} /> {lang === 'uz' ? "Birinchi qayd yaratish" : "Create First Note"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Essential Formula Cheatsheets */
            <div className="cheatsheets-grid animate-fade-in">
              <div className="cheatsheet-card glass-card">
                <span className="cs-tag">MATH • ALGEBRA</span>
                <h3 className="cs-title">Quadratic Form Transitions</h3>
                <div className="cs-formula-block">
                  <div className="cs-f-row">
                    <strong>Standard:</strong> <code>y = ax² + bx + c</code> (y-intercept is c)
                  </div>
                  <div className="cs-f-row">
                    <strong>Vertex:</strong> <code>y = a(x - h)² + k</code> (Vertex is (h, k))
                  </div>
                  <div className="cs-f-row">
                    <strong>Factored:</strong> <code>y = a(x - r₁)(x - r₂)</code> (Roots are r₁, r₂)
                  </div>
                  <div className="cs-f-row">
                    <strong>Axis of Symmetry:</strong> <code>x = -b / (2a)</code>
                  </div>
                </div>
              </div>

              <div className="cheatsheet-card glass-card">
                <span className="cs-tag">MATH • GEOMETRY</span>
                <h3 className="cs-title">Circle & Special Triangles</h3>
                <div className="cs-formula-block">
                  <div className="cs-f-row">
                    <strong>Circle Equation:</strong> <code>(x - h)² + (y - k)² = r²</code>
                  </div>
                  <div className="cs-f-row">
                    <strong>30-60-90 Triangle:</strong> <code>x, x√3, 2x</code>
                  </div>
                  <div className="cs-f-row">
                    <strong>45-45-90 Triangle:</strong> <code>x, x, x√2</code>
                  </div>
                  <div className="cs-f-row">
                    <strong>Arc Length:</strong> <code>s = r · θ (radians)</code>
                  </div>
                </div>
              </div>

              <div className="cheatsheet-card glass-card">
                <span className="cs-tag">RW • GRAMMAR</span>
                <h3 className="cs-title">Punctuation & Boundary Rules</h3>
                <div className="cs-formula-block">
                  <div className="cs-f-row">
                    <strong>Semicolon (;):</strong> Joins 2 independent clauses without conjunction.
                  </div>
                  <div className="cs-f-row">
                    <strong>Colon (:):</strong> Must follow an independent clause; introduces explanation or list.
                  </div>
                  <div className="cs-f-row">
                    <strong>Comma Splice:</strong> Two complete sentences joined by only a comma = ERROR.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TOOL 4: MISTAKES BANK (High-Impact Learning Loop)
          ========================================================================= */}
      {currentTool === 'mistakes' && (
        <div className="mistakes-tool-pane animate-fade-in">
          {/* Header Bar */}
          <div className="mistakes-header-card glass-card">
            <div className="mistakes-header-left">
              <span className="mistake-tag">
                {lang === 'uz' ? 'MAQSADLI XATOLAR TAHLILI' : 'TARGETED ERROR ANALYSIS'}
              </span>
              <h2 className="mistakes-title">
                {lang === 'uz' ? 'Xatolar Banki' : 'Your Mistakes Bank'}
              </h2>
              <p className="mistakes-desc">
                {lang === 'uz' 
                  ? "Har bir noto'g'ri yechilgan savolning tub sababini tahlil qilish — 1500+ ballga erishishning eng ishonchli usulidir."
                  : "Reviewing every missed question until the core misconception is resolved is the fastest path to 1500+."}
              </p>
            </div>
            {onStartDrill && (
              <button 
                className="btn-primary-mint" 
                onClick={() => onStartDrill("Mistakes Mastery Drill")}
              >
                <Sparkles size={16} />
                <span>{lang === 'uz' ? "Xatolarni Qayta Mashq Qilish" : "Re-Drill Mistakes"}</span>
              </button>
            )}
          </div>

          {/* Controls Bar: Filter by Status & Subject */}
          <div className="mistakes-controls-bar glass-card">
            <div className="mistakes-status-tabs">
              <button 
                className={`mistake-tab ${mistakesFilter === 'all' ? 'active' : ''}`}
                onClick={() => setMistakesFilter('all')}
              >
                {lang === 'uz' ? 'Barchasi' : 'All'} ({mistakesList.length})
              </button>
              <button 
                className={`mistake-tab ${mistakesFilter === 'needs-review' ? 'active' : ''}`}
                onClick={() => setMistakesFilter('needs-review')}
              >
                {lang === 'uz' ? 'Qayta ko\'rish kerak' : 'Needs Review'} ({needsReviewCount})
              </button>
              <button 
                className={`mistake-tab ${mistakesFilter === 'resolved' ? 'active' : ''}`}
                onClick={() => setMistakesFilter('resolved')}
              >
                {lang === 'uz' ? 'O\'zlashtirilgan' : 'Resolved'} ({mistakesList.length - needsReviewCount})
              </button>
            </div>

            <div className="mistakes-subject-select-wrap">
              <select 
                value={mistakesSubject}
                onChange={(e) => setMistakesSubject(e.target.value)}
                className="mistakes-subject-select"
              >
                <option value="all">{lang === 'uz' ? 'Barcha Fanlar' : 'All Subjects'}</option>
                <option value="math">Math</option>
                <option value="reading">Reading & Writing</option>
              </select>
            </div>
          </div>

          {/* Mistakes Cards List */}
          {filteredMistakes.length > 0 ? (
            <div className="mistakes-cards-list">
              {filteredMistakes.map((m) => {
                const isNeedsReview = m.status === 'needs-review';
                return (
                  <div key={m.id} className={`mistake-analysis-card glass-card ${isNeedsReview ? 'state-needs-review' : 'state-resolved'}`}>
                    {/* Top line */}
                    <div className="mistake-card-top-line">
                      <div className="mistake-id-group">
                        <span className="mistake-hash">#{m.id}</span>
                        <h3 className="mistake-topic-title">{m.topic}</h3>
                        <span className="mistake-subject-chip">{m.subjectTag}</span>
                      </div>

                      <div className="mistake-status-actions">
                        <span className={`mistake-status-chip ${isNeedsReview ? 'chip-pending' : 'chip-resolved'}`}>
                          {isNeedsReview 
                            ? (lang === 'uz' ? "Qayta ko'rish kerak" : "Needs Review") 
                            : (lang === 'uz' ? "O'zlashtirildi ✓" : "Resolved ✓")}
                        </span>
                        <button 
                          className="status-toggle-btn"
                          onClick={() => handleToggleMistakeStatus(m.id)}
                          title={isNeedsReview ? "Mark as Resolved" : "Re-open"}
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Problem Statement */}
                    <p className="mistake-problem-text">"{m.question}"</p>

                    {/* Comparison Block: Incorrect Answer vs Correct Answer */}
                    <div className="mistake-comparison-grid">
                      <div className="mistake-choice-box wrong-choice">
                        <span className="choice-indicator-label">
                          {lang === 'uz' ? "Siz belgilagan xato javob:" : "Incorrect answer:"} <strong>{m.userAnswer}</strong>
                        </span>
                        <span className="choice-val-text">{m.userAnswerText}</span>
                      </div>

                      <div className="mistake-choice-box correct-choice">
                        <span className="choice-indicator-label">
                          {lang === 'uz' ? "To'g'ri javob:" : "Correct answer:"} <strong>{m.correctAnswer}</strong>
                        </span>
                        <span className="choice-val-text">{m.correctAnswerText}</span>
                      </div>
                    </div>

                    {/* Reflection: Why I missed it */}
                    <div className="mistake-reflection-box">
                      <span className="reflection-title">
                        {lang === 'uz' ? "Nega xato qildim:" : "Why I missed it:"}
                      </span>
                      <p className="reflection-text">{m.whyMissed}</p>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="mistake-card-bottom-actions">
                      <button 
                        className="btn-glass review-concept-btn"
                        onClick={() => setReviewingMistake(m)}
                      >
                        <BookMarked size={14} />
                        <span>{lang === 'uz' ? "Qoidani Ko'rish →" : "Review Concept →"}</span>
                      </button>

                      {onStartDrill && (
                        <button 
                          className="btn-primary-mint redrill-q-btn"
                          onClick={() => onStartDrill(`${m.topic} Drill`)}
                        >
                          <ArrowRight size={14} />
                          <span>{lang === 'uz' ? "Savolni Qayta Yechish →" : "Re-Drill Question →"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Intentional Empty State (Rule 17) */
            <div className="empty-state-card glass-card">
              <CheckCircle2 size={36} className="text-mint" />
              <h3>{lang === 'uz' ? "Xatoliklar mavjud emas" : "No mistakes yet"}</h3>
              <p>
                {lang === 'uz' 
                  ? "Test yoki mashq topshirganingizda, noto'g'ri ishlangan savollar avtomatik ravishda tahlil qilish uchun shu yerga tushadi."
                  : "Complete a practice session and your missed questions will appear here for review."}
              </p>
              {onStartDrill && (
                <button 
                  className="btn-primary-mint"
                  onClick={() => onStartDrill("Algebra Mastery Drill")}
                >
                  <Sparkles size={16} />
                  <span>{lang === 'uz' ? "Mashqni Boshlash" : "Start Practice"}</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Review Concept Modal / Drawer */}
      {reviewingMistake && (
        <div className="mindora-modal-backdrop" onClick={() => setReviewingMistake(null)}>
          <div className="concept-modal-box glass-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="concept-modal-header">
              <div>
                <span className="cs-tag">{reviewingMistake.subjectTag}</span>
                <h3 className="concept-modal-title">{reviewingMistake.topic} — {lang === 'uz' ? "Asosiy Qoida" : "Core Concept"}</h3>
              </div>
              <button className="concept-close-btn" onClick={() => setReviewingMistake(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="concept-modal-body">
              <p className="concept-explanation">{reviewingMistake.conceptReview}</p>
              <div className="concept-reminder-pill">
                <Sparkles size={14} className="text-lime" />
                <span>{lang === 'uz' ? "Ushbu qoidani daftaringizga qayd qilishni tavsiya qilamiz." : "Recommendation: Add this rule to your study notebook."}</span>
              </div>
            </div>
            <div className="concept-modal-footer">
              <button 
                className="btn-primary-mint"
                onClick={() => {
                  if (onStartDrill) onStartDrill(`${reviewingMistake.topic} Drill`);
                  setReviewingMistake(null);
                }}
              >
                <span>{lang === 'uz' ? "Tushundim, Mashq Qilish →" : "Understood, Practice Now →"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
