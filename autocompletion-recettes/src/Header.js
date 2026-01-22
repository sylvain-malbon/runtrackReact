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
        <span className="header-logo-text">RecipeFinder</span>
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
