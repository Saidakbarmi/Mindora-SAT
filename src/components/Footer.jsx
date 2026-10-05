import React from 'react';
import { 
  Mail, 
  Send, 
  Globe, 
  ExternalLink, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer({ lang = 'uz' }) {
  const isUz = lang === 'uz';

  return (
    <footer className="mindora-footer" role="contentinfo">
      <div className="footer-glow-atmosphere" aria-hidden="true"></div>

      <div className="footer-content-inner">
        {/* Main Columns Grid */}
        <div className="footer-main-grid">
          {/* Left Column: Brand & Mission */}
          <div className="footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-logo-badge">
                <img 
                  src="/Mindora көк қанат эмблемасы.png" 
                  alt="MINDORA" 
                  className="footer-logo-img"
                  onError={(e) => { e.currentTarget.src = "/mindora-logo.png"; }}
                />
              </div>
              <div className="footer-brand-titles">
                <span className="footer-brand-name">MINDORA</span>
                <span className="footer-brand-tagline">
                  {isUz ? "Tiniq aql. Yuqori natija." : "Clear Mind. Higher Score."}
                </span>
              </div>
            </div>

            <p className="footer-brand-desc">
              {isUz 
                ? "Fokuslangan tayyorgarlik va yuqori natijalar uchun yaratilgan original SAT ta'lim platformasi."
                : "An original SAT learning experience built for focused preparation."}
            </p>

            <div className="footer-badge-pill">
              <Sparkles size={13} className="text-mint" />
              <span>{isUz ? "Raqamli SAT Standarti • 2026" : "Digital SAT Standard • 2026"}</span>
            </div>
          </div>

          {/* Center Column: Creator & Design Credit */}
          <div className="footer-col-creator">
            <span className="footer-col-title">
              {isUz ? "LOYIHA MUALLIFI" : "CREATED BY"}
            </span>

            <div className="creator-card-box">
              <div className="creator-card-glow" aria-hidden="true"></div>
              <p className="creator-lead-text">
                {isUz ? (
                  <>
                    Yaratuvchi va dizayner: <span className="creator-name-accent">Saidakbar</span>
                  </>
                ) : (
                  <>
                    Created & designed by <span className="creator-name-accent">Saidakbar</span>
                  </>
                )}
              </p>
              <p className="creator-sub-text">
                {isUz
                  ? "SAT imtihoniga tayyorgarlik ko'ruvchi talabalar uchun estetik, aniq va maqsadli tahliliy ish maydoni."
                  : "An intentional digital SAT workspace engineered for clarity, speed, and real score breakthroughs."}
              </p>
              <a 
                href="https://abdujabborov-portfolio.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="creator-portfolio-cta"
                title="Saidakbar portfolio"
              >
                <span>{isUz ? "Muallif portfoliosini ko'rish" : "View Creator Portfolio"}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Connect & Social Links */}
          <div className="footer-col-connect">
            <span className="footer-col-title">
              {isUz ? "BOG‘LANISH" : "CONNECT"}
            </span>

            <ul className="footer-links-list" aria-label="Creator links">
              <li>
                <a 
                  href="https://github.com/Saidakbarmi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link-item"
                  title="GitHub profile"
                >
                  <span className="link-icon-wrap"><GithubIcon size={15} /></span>
                  <span className="link-label">GitHub</span>
                  <ExternalLink size={12} className="link-external-arrow" />
                </a>
              </li>

              <li>
                <a 
                  href="https://t.me/abdujabborvvvv" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link-item"
                  title="Telegram"
                >
                  <span className="link-icon-wrap"><Send size={14} /></span>
                  <span className="link-label">Telegram</span>
                  <ExternalLink size={12} className="link-external-arrow" />
                </a>
              </li>

              <li>
                <a 
                  href="https://abdujabborov-portfolio.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link-item"
                  title="Portfolio"
                >
                  <span className="link-icon-wrap"><Globe size={14} /></span>
                  <span className="link-label">Portfolio</span>
                  <ExternalLink size={12} className="link-external-arrow" />
                </a>
              </li>

              <li>
                <a 
                  href="mailto:saidakbarabdujabborovv@gmail.com" 
                  className="footer-link-item email-link"
                  title="Email Saidakbar"
                >
                  <span className="link-icon-wrap"><Mail size={14} /></span>
                  <span className="link-label email-text">saidakbarabdujabborovv@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Mission Row */}
        <div className="footer-bottom-divider"></div>

        <div className="footer-bottom-row">
          <div className="footer-copy-text">
            © 2026 MINDORA. {isUz ? "Barcha huquqlar himoyalangan." : "All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
}
