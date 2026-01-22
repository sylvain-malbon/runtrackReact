import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')}
        role="button" tabIndex={0} aria-label="Retour à l'accueil"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/')}
      >
        <span className="header-logo-text">
          <svg width="54" height="54" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle', marginRight:'-0.05em', position:'relative', top:'-4px'}}>
            {/* Marmite moderne minimaliste */}
            <ellipse cx="18" cy="15" rx="11" ry="3" fill="#ff8000"/>
            <rect x="7" y="15" width="22" height="12" rx="6" fill="#ff8000"/>
            <ellipse cx="18" cy="13" rx="9" ry="2" fill="#ffb366"/>
            <rect x="15" y="8" width="6" height="4" rx="2" fill="#ff8000"/>
          </svg>
          milmiton
        </span>
      </div>
      <div className="header-right-block">
        <span className="header-powered-by-bar">
          <span className="powered-label">powered by</span><span className="g-style">Goût</span><span className="orange-gle">gle</span>
        </span>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
